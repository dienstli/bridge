import pickle
import numpy as np
import pandas as pd
from entity_matching.search.search_base import SearchBase, HRNMatch
from sparse_dot_topn import awesome_cossim_topn
from tqdm import tqdm

from entity_matching.utilities.logging import get_logger


logger = get_logger("ams_em")


class SearchSparseTopNOld(SearchBase):
    """
    Sparse dot top N search for text inputs (names).
    """

    def __init__(
        self,
        lower_bound: float = 0.5,
        top_n: int = 50000,
        n_jobs=8,
        default_not_found_score=0,
        first_name_weight=1,
        surname_weight: int = 3,
        search_output_size_keep_all=1000,
        search_output_size_final=1000,
        load_models=True,
        model_suffix: str = "n2_4_tf_l2_0.5",
    ):

        self.lower_bound = lower_bound
        self.top_n = top_n
        self.n_jobs = n_jobs
        self.default_not_found_score = default_not_found_score
        self.first_name_weight = first_name_weight
        self.surname_weight = surname_weight

        self.search_output_size_keep_all = search_output_size_keep_all
        self.search_output_size_final = search_output_size_final

        self.model_suffix = model_suffix

        if load_models:
            self.startup()
        else:
            logger.warning("Models were not loaded!")

    def startup(self):
        """
        Load search model objects.
        """

        logger.info("Loading data frames with persons and entities ...")
        self.entities_df = pd.read_pickle(
            "/mnt/data/mediascreen/sharedfolder/em/models/entities_df.pkl", compression="gzip"
        )
        self.first_names_df = pd.read_pickle(
            "/mnt/data/mediascreen/sharedfolder/em/models/first_names_df.pkl", compression="gzip"
        )
        self.full_names_df = pd.read_pickle(
            "/mnt/data/mediascreen/sharedfolder/em/models/full_names_df.pkl", compression="gzip"
        )
        self.last_names_df = pd.read_pickle(
            "/mnt/data/mediascreen/sharedfolder/em/models/last_names_df.pkl", compression="gzip"
        )

        logger.info("Loading vectorizers for search ...")
        self.vectorizer_entities = self.load_from_pickle(
            f"/mnt/data/mediascreen/sharedfolder/em/models/vectorizer_entities_{self.model_suffix}.pkl"
        )
        self.vectorizer_firstname = self.load_from_pickle(
            f"/mnt/data/mediascreen/sharedfolder/em/models/vectorizer_firstname_{self.model_suffix}.pkl"
        )
        self.vectorizer_fullname = self.load_from_pickle(
            f"/mnt/data/mediascreen/sharedfolder/em/models/vectorizer_fullname_{self.model_suffix}.pkl"
        )
        self.vectorizer_lastname = self.load_from_pickle(
            f"/mnt/data/mediascreen/sharedfolder/em/models/vectorizer_lastname_{self.model_suffix}.pkl"
        )

        logger.info("Loading sparse matrices for search ...")
        self.X_entities = self.load_from_pickle(
            f"/mnt/data/mediascreen/sharedfolder/em/models/X_entities_{self.model_suffix}.pkl"
        )
        self.X_firstname = self.load_from_pickle(
            f"/mnt/data/mediascreen/sharedfolder/em/models/X_firstname_{self.model_suffix}.pkl"
        )
        self.X_fullname = self.load_from_pickle(
            f"/mnt/data/mediascreen/sharedfolder/em/models/X_fullname_{self.model_suffix}.pkl"
        )
        self.X_lastname = self.load_from_pickle(
            f"/mnt/data/mediascreen/sharedfolder/em/models/X_lastname_{self.model_suffix}.pkl"
        )

        logger.info("Search objects initiated.")

    @staticmethod
    def load_from_pickle(filename):
        with open(filename, "rb") as fn:
            return pickle.load(fn)

    def sparse_dot_search(self, full_matrix, search_vector):
        """
        Simple search of 1 vector.

        Parameters
        ----------
        full_matrix : scipy.sparse.csr.csr_matrix
            Sparse matrix of shape NxM (N - number of names to search, M - size of TFIDF vector).
        search_vector : scipy.sparse.csr.csr_matrix
            Sparse matrix 1xM as a TFIDF representation for a vector to search.

        Returns
        -------
        res : list of list of tuple
            Result tuples (sim_score, full_matrix_row_id) sorted by score desc.
            Reason for having extra list (on top of list of tuple) is to be consistent with batch approach.
        """
        cos_top_n = awesome_cossim_topn(
            full_matrix,
            search_vector.transpose(),
            1,
            self.lower_bound,
            use_threads=True,
            n_jobs=self.n_jobs,
        )
        shortlist = zip(cos_top_n.data, cos_top_n.nonzero()[0])

        res = [sorted(shortlist, key=lambda x: -x[0])[: self.top_n]]

        return res

    @staticmethod
    def process_sparse_results(shortlist_, df_):
        """
        Method to process results of sparse_dot_search() and map original HRN and record ids based on the given df.

        Parameters
        ----------
        shortlist_ : list of list of tuple
            Non-empty list of list of cosine similarities returned by sparse_dot_search() method.
            Non-emptiness is guaranteed by method generating inputted shortlist.

        df_ : pandas.core.frame.DataFrame
            Dataframe with a names and their sets of HRN ids.
            Order of this dataframe is same as in full_matrix used by sparse_dot_search() to generate shortlist_.

        Returns
        -------
        res : pandas.core.frame.DataFrame
            Dataframe with id (HRN id) and score sorted by score desc.
        -------
        """
        s = shortlist_[0]
        matrix_indices = [int(i[1]) for i in s]
        shortlist_scores = [i[0] for i in s]

        ss_df = (
            pd.DataFrame({"matrix_id": matrix_indices, "score": shortlist_scores})
            .astype({"matrix_id": "int32"})
            .set_index("matrix_id")
        )

        res = df_.iloc[matrix_indices].copy()
        res = res.join(ss_df)

        res = (
            res.set_index(["name", "score"])[["ids", "record_ids"]]
            .apply(pd.Series.explode)
            .reset_index()
            .rename(columns={"ids": "hrn_id", "record_ids": "record_id", "name": "match_string"})
        )

        res = res[["score", "hrn_id", "record_id", "match_string"]]

        res = (
            res.sort_values(by=["score", "hrn_id"], ascending=[False, True])
            .drop_duplicates(subset=["hrn_id"], keep="first")
            .astype({"score": float})
            .reset_index()
        )

        return res

    def process_partial_name_results(self, shortlist_first, shortlist_last):
        """
        Method to combine results of single searches for first name and last name.

        Parameters
        ----------
        shortlist_first : list of tuple
            List of cosine similarities returned by sparse_dot_search() method.
        shortlist_last : list of tuple
            List of cosine similarities returned by sparse_dot_search() method.

        Returns
        -------
        res : pandas.core.frame.DataFrame
            Dataframe with hrn_id, record_id, score and match_string sorted by score desc.
        """
        res_first = self.process_sparse_results(shortlist_first, self.first_names_df)
        res_last = self.process_sparse_results(shortlist_last, self.last_names_df)
        res = res_first.merge(
            res_last, left_on="hrn_id", right_on="hrn_id", how="outer", suffixes=("_first", "_last")
        )

        res.fillna(
            value={
                "score_first": self.default_not_found_score,
                "score_last": self.default_not_found_score,
                "match_string_first": "",
                "match_string_last": "",
                "record_id_first": -1,
                "record_id_last": -1,
            },
            inplace=True,
        )

        res["score"] = (
            self.first_name_weight * res["score_first"] + self.surname_weight * res["score_last"]
        ) / (self.first_name_weight + self.surname_weight)

        res["match_string"] = (
            res["match_string_first"] + " " + res["match_string_last"]
        ).str.strip()

        res["record_id"] = np.where(
            res["record_id_last"] == -1, res["record_id_first"], res["record_id_last"]
        )

        return res

    def clean_results(self, raw_res):
        """
        Cleanup method for output preparation.

        Parameters
        ----------
        raw_res : pandas.core.frame.DataFrame
            Data frame with results (hrn_id, record_id, score, match_string).

        Returns
        -------
        clean_res : list of HRNMatch
            Result as list of HRNMatch objects.
        """
        clean_res = raw_res.sort_values(by="score", ascending=False)
        clean_res = (
            clean_res[["hrn_id", "record_id", "score", "match_string"]]
            .nlargest(self.search_output_size_keep_all, ["score"], keep="all")
            .head(self.search_output_size_final)
        )
        clean_res = [HRNMatch(*i) for i in clean_res.to_records(index=False)]

        return clean_res

    def _search_person(self, name, family_name, given_name, year, month, day, nationality, gender):
        """
        Base method for searching a single person.

        Method is differentiating between name input and first+last name input.

        Returns
        -------
        res : list of HRNMatch
            Result as list of HRNMatch objects.
        """
        if name:
            search_features_vec_full = self.vectorizer_fullname.transform([name])
            shortlist_fullname = self.sparse_dot_search(self.X_fullname, search_features_vec_full)
            res = self.process_sparse_results(shortlist_fullname, self.full_names_df)
        else:
            search_features_vec_first = self.vectorizer_firstname.transform([given_name])
            search_features_vec_last = self.vectorizer_lastname.transform([family_name])
            shortlist_firstname = self.sparse_dot_search(
                self.X_firstname, search_features_vec_first
            )
            shortlist_lastname = self.sparse_dot_search(self.X_lastname, search_features_vec_last)
            res = self.process_partial_name_results(shortlist_firstname, shortlist_lastname)

        res = self.clean_results(res)

        return res

    def _search_entity(self, name, year, month, day, nationality, gender):
        """
        Base method for searching a single entity.

        Returns
        -------
        res : list of HRNMatch
            Result as list of HRNMatch objects.
        """
        search_features_vec_entities = self.vectorizer_entities.transform([name])
        shortlist_entities = self.sparse_dot_search(self.X_entities, search_features_vec_entities)
        res = self.process_sparse_results(shortlist_entities, self.entities_df)

        res = self.clean_results(res)

        return res

    def sparse_dot_search_batch(self, df, vectorizer, column, full_matrix, chunk_size=200):
        """
        Sparse dot topN search for a given DataFrame.

        Parameters
        ----------
        df : pandas.core.frame.DataFrame
            DataFrame with search inputs.
        vectorizer : sklearn.feature_extraction.text.TfidfVectorizer
            Respective vectorizer for a data to be processed.
        column : str
            Column name of input df to be used for search.
        full_matrix : scipy.sparse.csr.csr_matrix
            Sparse matrix of shape NxM (N - number of names to search, M - size of TFIDF vector).
        chunk_size : int
            Number of searches to be done at once.

        Returns
        -------
        res : list of list of tuple
            Result tuples (sim_score, full_matrix_row_id) sorted by score desc for each input in a given df.
        """
        res = []
        counter = 1
        number_of_batches = np.ceil(len(df) / chunk_size).astype(int)
        logger.info(
            f"{len(df)} records in a given DataFrame will be processed in {number_of_batches} batches of size {chunk_size}."
        )

        for i_df in self.chunks(df, chunk_size):
            logger.info(f"Processing batch {counter} / {number_of_batches}.")
            counter += 1

            chunk_res = []

            search_features_vec = vectorizer.transform(i_df[column])

            cos_top_n = awesome_cossim_topn(
                full_matrix,
                search_features_vec.transpose(),
                ntop=chunk_size,
                lower_bound=self.lower_bound,
                use_threads=True,
                n_jobs=self.n_jobs,
            )

            sparse_data = cos_top_n.data
            sparse_rows = cos_top_n.nonzero()[1]
            sparse_cols = cos_top_n.nonzero()[0]

            for i in range(cos_top_n.shape[1]):
                positions = np.where(sparse_rows == i)[0]
                shortlist = list(zip(list(sparse_data[positions]), list(sparse_cols[positions])))

                chunk_res += [sorted(shortlist, key=lambda x: -x[0])[: self.top_n]]

            res += chunk_res

        return res

    @staticmethod
    def chunks(lst, n):
        """
        Yield successive n-sized chunks from lst.
        """
        for i in range(0, len(lst), n):
            yield lst[i : i + n]

    def search_batch(self, df):
        """
        Parallel method for searching inputs in a given batch.

        The input data frame is first split into 3 parts
        (persons - full name, persons - first+last name, entities).
        Each part is then solved separately in batches. At the end we connect the results
        together and reorder to fit the order from original input.

        Parameters
        ----------
        df : pandas.core.frame.DataFrame
            DataFrame with search inputs.

        Returns
        -------
        result : list of list of HRNMatch
            Results as list of HRNMatch objects for each record in a given DataFrame.
        """
        self.input_check_batch(df)
        df = df.copy()

        df["input_type"] = np.select(
            [(df["hrn_type"] == "P") & (df["name"].str.len() > 0), (df["hrn_type"] == "E")],
            ["person_name", "entity_name"],
            default="person_detail",
        )
        df["rank"] = np.arange(len(df))

        name_inputs = df[df["input_type"] == "person_name"]
        entity_inputs = df[df["input_type"] == "entity_name"]
        detail_inputs = df[df["input_type"] == "person_detail"]

        if len(name_inputs) > 0:
            logger.info(
                "BATCH PROCESS for all persons based on single name field: Sparse dot top N search."
            )
            batch_results_name = self.sparse_dot_search_batch(
                name_inputs, self.vectorizer_fullname, "name", self.X_fullname
            )
            logger.info(
                "BATCH PROCESS for all persons based on single name field: Processing sparse results."
            )
            name_results = [
                self.clean_results(self.process_sparse_results([i], self.full_names_df))
                for i in tqdm(batch_results_name, mininterval=10)
            ]
        else:
            name_results = []

        if len(entity_inputs) > 0:
            logger.info(
                "BATCH PROCESS for all entities based on single name field: Sparse dot top N search."
            )
            batch_results_ents = self.sparse_dot_search_batch(
                entity_inputs, self.vectorizer_entities, "name", self.X_entities
            )
            logger.info(
                "BATCH PROCESS for all entities based on single name field: Processing sparse results."
            )
            ents_results = [
                self.clean_results(self.process_sparse_results([i], self.entities_df))
                for i in tqdm(batch_results_ents, mininterval=10)
            ]
        else:
            ents_results = []

        if len(detail_inputs) > 0:
            logger.info(
                "BATCH PROCESS for all persons based on given name fields: Sparse dot top N search."
            )
            batch_results_detail_first = self.sparse_dot_search_batch(
                detail_inputs, self.vectorizer_firstname, "given_name", self.X_firstname
            )
            logger.info(
                "BATCH PROCESS for all persons based on family name fields: Sparse dot top N search."
            )
            batch_results_detail_last = self.sparse_dot_search_batch(
                detail_inputs, self.vectorizer_lastname, "family_name", self.X_lastname
            )
            logger.info(
                "BATCH PROCESS for all persons based on given + family name fields: Processing sparse results."
            )
            detail_results = [
                self.clean_results(
                    self.process_partial_name_results(
                        [batch_results_detail_first[i]], [batch_results_detail_last[i]]
                    )
                )
                for i in tqdm(range(len(batch_results_detail_last)), mininterval=10)
            ]
        else:
            detail_results = []

        all_results = name_results + ents_results + detail_results
        input_orders = (
            list(name_inputs["rank"]) + list(entity_inputs["rank"]) + list(detail_inputs["rank"])
        )

        result = [x for _, x in sorted(zip(input_orders, all_results))]

        return result
