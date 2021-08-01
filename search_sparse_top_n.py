import pickle
import numpy as np
import pandas as pd
from entity_matching.search.search_base import SearchBase, HRNMatch
from sparse_dot_topn import awesome_cossim_topn
from tqdm import tqdm
from itertools import chain

from entity_matching.utilities.logging import get_logger
from entity_matching.utilities.config import CONFIG
from entity_matching.utilities import combine_names


logger = get_logger("ams_em")
MODEL_CONFIG = CONFIG["model"]


class SearchSparseTopN(SearchBase):
    """
    Sparse dot top N search for text inputs (names).
    """

    def __init__(
        self,
        lower_bound: float = 0.5,
        top_n: int = 50000,
        n_jobs=8,
        default_not_found_score=0,
        search_output_size_keep_all=1000,
        search_output_size_final=1000,
        load_models=True,
        model_suffix: str = "n2_4_tf_l2_0.5",
    ):

        self.lower_bound = lower_bound
        self.top_n = top_n
        self.n_jobs = n_jobs
        self.default_not_found_score = default_not_found_score

        self.search_output_size_keep_all = search_output_size_keep_all
        self.search_output_size_final = search_output_size_final

        self.model_suffix = model_suffix
        self.model_location = MODEL_CONFIG["location"]

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
            f"{self.model_location}/entities_df.pkl", compression="gzip"
        )
        self.full_names_df = pd.read_pickle(
            f"{self.model_location}/full_names_df.pkl", compression="gzip"
        )

        logger.info("Loading vectorizers for search ...")
        self.vectorizer_entities = self.load_from_pickle(
            f"{self.model_location}/vectorizer_entities_{self.model_suffix}.pkl"
        )
        self.vectorizer_fullname = self.load_from_pickle(
            f"{self.model_location}/vectorizer_fullname_{self.model_suffix}.pkl"
        )

        logger.info("Loading sparse matrices for search ...")
        self.X_entities = self.load_from_pickle(
            f"{self.model_location}/X_entities_{self.model_suffix}.pkl"
        )
        self.X_fullname = self.load_from_pickle(
            f"{self.model_location}/X_fullname_{self.model_suffix}.pkl"
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
        input_name = [name if name else combine_names(given_name, family_name)]
        search_features_vec_full = self.vectorizer_fullname.transform(input_name)
        shortlist_fullname = self.sparse_dot_search(self.X_fullname, search_features_vec_full)
        res = self.process_sparse_results(shortlist_fullname, self.full_names_df)
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

    def sparse_dot_search_batch(self, df, vectorizer, column, full_matrix, name_df, chunk_size=200):
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

        for i_df in tqdm(self.chunks(df, chunk_size), total=number_of_batches):
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

            chunk_res_clean = [
                self.clean_results(self.process_sparse_results([i], name_df)) for i in chunk_res
            ]

            res += chunk_res_clean
            counter += 1

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

        combined_names = []
        for t in df.itertuples():
            combined_name = combine_names(t.given_name, t.family_name)
            combined_names.append(t.name or combined_name)
        df["name"] = combined_names

        df["rank"] = np.arange(len(df))

        name_inputs = df[df["hrn_type"] == "P"]
        entity_inputs = df[df["hrn_type"] == "E"]

        if len(name_inputs) > 0:
            logger.info(
                "BATCH PROCESS for all persons: Sparse dot top N search with result cleaning."
            )
            name_results = self.sparse_dot_search_batch(
                name_inputs, self.vectorizer_fullname, "name", self.X_fullname, self.full_names_df
            )
        else:
            name_results = []

        if len(entity_inputs) > 0:
            logger.info(
                "BATCH PROCESS for all entities: Sparse dot top N search with result cleaning."
            )
            ents_results = self.sparse_dot_search_batch(
                entity_inputs, self.vectorizer_entities, "name", self.X_entities, self.entities_df
            )
        else:
            ents_results = []

        all_results = name_results + ents_results
        input_orders = chain(name_inputs["rank"], entity_inputs["rank"])

        result = [x for _, x in sorted(zip(input_orders, all_results))]

        return result
