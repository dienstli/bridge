import numpy as np
import pandas as pd
from typing import List, Optional
from entity_matching.search.search_base import SearchBase, HRNMatch
from entity_matching.search.search_sparse_top_n import SearchSparseTopN
from tqdm import tqdm

from entity_matching.utilities.logging import get_logger
from entity_matching.utilities.config import CONFIG


logger = get_logger("ams_em")
MODEL_CONFIG = CONFIG["model"]


class SearchTwoStageWeighted(SearchBase):
    """
    2 stage search - 1st stage is running name based shortlisting and
    2nd stage is updating scores based on matches of other input parameters.
    """

    def __init__(
        self,
        lower_bound_1st: float = 0.3,
        top_n_1st: int = 1000,
        n_jobs_1st: int = 8,
        default_not_found_score_1st: float = 0,
        search_output_size_keep_all_1st: int = 1000,
        search_output_size_final_1st: int = 1000,
        model_suffix_1st: str = "n2_4_tf_l2_0.5",
        lower_bound: float = 0.3,
        nan_score: float = 0.5,
        name_score_weight: int = 50,
        nationality_weight: int = 3,
        year_weight: int = 2,
        month_weight: int = 1,
        day_weight: int = 1,
        gender_weight: int = 2,
        max_deviation_from_best: float = 0.15,
        search_output_size_final: int = 100,
        load_models=True,
    ):
        self.lower_bound_1st = lower_bound_1st
        self.top_n_1st = top_n_1st
        self.n_jobs_1st = n_jobs_1st
        self.default_not_found_score_1st = default_not_found_score_1st
        self.search_output_size_keep_all_1st = search_output_size_keep_all_1st
        self.search_output_size_final_1st = search_output_size_final_1st
        self.model_suffix_1st = model_suffix_1st

        self.lower_bound = lower_bound
        self.nan_score = nan_score
        self.name_score_weight = name_score_weight
        self.nationality_weight = nationality_weight
        self.year_weight = year_weight
        self.month_weight = month_weight
        self.day_weight = day_weight
        self.gender_weight = gender_weight
        self.max_deviation_from_best = max_deviation_from_best
        self.search_output_size_final = search_output_size_final

        self.model_location = MODEL_CONFIG["location"]
        if load_models:
            self.startup()
        else:
            logger.warning("Models and data were not loaded!")

    def startup(self):
        """
        Load search model objects.
        """

        logger.info(
            "Initialization of first stage model for name-based shortlist pre-selection ..."
        )
        self.name_based_preselector = SearchSparseTopN(
            self.lower_bound_1st,
            self.top_n_1st,
            self.n_jobs_1st,
            self.default_not_found_score_1st,
            self.search_output_size_keep_all_1st,
            self.search_output_size_final_1st,
            True,
            self.model_suffix_1st,
        )

        logger.info("Loading detail information of all IDs ...")
        self.id_unique_values_details = pd.read_pickle(
            f"{self.model_location}/id_unique_values_details.pkl",
            compression="gzip",
        )

        logger.info("Search objects initiated.")

    def score_value(self, list_, value_):
        """
        Helper function returning match scores: 0 for empty value_, -1 for mismatch, self.nan_score for empty list_
        and 1 for match.
        """

        if not value_:
            res = 0
        elif len(list_) == 0:
            res = self.nan_score
        elif value_ in list_:
            res = 1
        else:
            res = -1

        return res

    def score_date(self, list_, year, month, day):
        """
        Method to check if date params from search input are matching any of possible dates from a given list of dates.

        Parameters
        ----------
        list_ : list of str
            List of dates represented as strings (YYYY-MM-DD) with possible zeros if unknown (e.g. 1990-00-00).
        year : int
        month : int
        day : int

        Returns
        -------
        year_match, month_match, day_match
            Scores based on self.score_value method.
        """

        if len(list_) > 0:
            parsed_dates = [(int(i[0:4]), int(i[5:7]), int(i[8:10])) for i in list_]
            ymd_sets = [list(set(i)) for i in list(zip(*parsed_dates))]
            ymds = [[i for i in x if i != 0] for x in ymd_sets]
        else:
            ymds = [[], [], []]

        year_match = self.score_value(ymds[0], year)
        month_match = self.score_value(ymds[1], month)
        day_match = self.score_value(ymds[2], day)

        return year_match, month_match, day_match

    def add_match_info_for_list_col(self, df, col, value):
        """
        Method that creates a match column in a given dataframe based on a given param and specified column of the df.

        This method is used for instance to check if shortlisted candidates from the first step of the search
        have a nationality match. Match scores: 0 for empty param, -1 for mismatch, self.nan_score for empty df[col]
        and 1 for match.

        Parameters
        ----------
        df : pandas.core.frame.DataFrame
        col : str
            Column name of a given df. This column has to be a list.
        value : str
            Value to be checked (e.g. "US" for nationality check).

        Returns
        -------
        df : pandas.core.frame.DataFrame
            Input df enriched by 1 extra column.
        """

        new_col = col + "_match"

        if len(df) == 0:
            df[new_col] = 0
        else:
            df[new_col] = (
                0
                if not value
                else np.select(
                    [df[col].str.len() == 0, df[col].map(lambda x: value in x)],
                    [self.nan_score, 1],
                    -1,
                )
            )

        return df

    def add_params_match_info(self, df, nationality, gender, year, month, day):
        """
        Method to add match score for all of the relevant parameters.

        Returns
        -------
        df : pandas.core.frame.DataFrame
            Input df enriched by match score for each of a given parameter.
        """

        nationality = nationality.lower() if nationality else nationality
        gender = gender.lower() if gender else gender
        df = self.add_match_info_for_list_col(df, "nationalities", nationality)

        if df.empty:
            df["year_match"], df["month_match"], df["day_match"], df["gender_match"] = (0, 0, 0, 0)
        else:
            df["year_match"], df["month_match"], df["day_match"] = zip(
                *df["dobs"].apply(lambda x: self.score_date(x, year, month, day))
            )

            df["gender_match"] = (
                0
                if not gender
                else np.select(
                    [df["gender"] == "unknown", df["gender"].map(lambda x: gender == x)],
                    [self.nan_score, 1],
                    -1,
                )
            )

        return df

    def calculate_adjusted_score(self, df, nationality, gender, year, month, day):
        """
        Calculates adjusted score based on search parameters and their weights.
        """
        w_nationality = 0 if not nationality else self.nationality_weight
        w_year = 0 if not year else self.year_weight
        w_month = 0 if not month else self.month_weight
        w_day = 0 if not day else self.day_weight
        w_gender = 0 if not gender else self.gender_weight
        w_total = self.name_score_weight + w_nationality + w_year + w_month + w_day + w_gender

        df["score"] = (
            self.name_score_weight * df["score"]
            + w_nationality * df["nationalities_match"]
            + w_year * df["year_match"]
            + w_month * df["month_match"]
            + w_day * df["day_match"]
            + w_gender * df["gender_match"]
        ) / w_total

        return df

    def second_stage_scoring(self, shortlist, nationality, gender, year, month, day):
        """
        Second stage scoring logic.

        Updating score of a given shortlist of HRN IDs + scores based on match scores and weights.

        Parameters
        ----------
        shortlist : list of HRNMatch
        nationality : str
        gender : str
        year : int
        month : int
        day : int

        Returns
        -------
        clean_res : list of HRNMatch
            List of HRN matches with updated scores and respecting the output limits (lower_bound and size).
        -------

        """

        df_shortlist = (
            pd.DataFrame(shortlist, columns=["hrn_id", "record_id", "score", "match_string"])
            .set_index("hrn_id")
            .join(self.id_unique_values_details, how="left")
        )

        if not df_shortlist.empty:
            df_shortlist = self.add_params_match_info(
                df_shortlist, nationality, gender, year, month, day
            )
            df_shortlist = self.calculate_adjusted_score(
                df_shortlist, nationality, gender, year, month, day
            ).sort_values(by="score", ascending=False)

            res_df = df_shortlist.reset_index()[["hrn_id", "record_id", "score", "match_string"]]
            res_df = res_df[res_df["score"] >= self.lower_bound]

            max_score = res_df["score"].max()
            res_df = res_df[
                res_df["score"] >= max_score * (1.0 - self.max_deviation_from_best)
            ].head(self.search_output_size_final)

            clean_res = [HRNMatch(*i) for i in res_df.to_records(index=False)]
        else:
            clean_res = []

        return clean_res

    def search(
        self,
        hrn_type: str,
        name: Optional[str],
        family_name: Optional[str],
        given_name: Optional[str],
        year: Optional[int] = None,
        month: Optional[int] = None,
        day: Optional[int] = None,
        nationality: Optional[str] = None,
        gender: Optional[str] = None,
    ) -> List[HRNMatch]:
        """
        Search of one instance (entity or person).

        Returns
        -------
        result : list of HRN matches
            List of likely matches containing hrn_id and match score.
            Results are sorted by matching score (best match / highest score first).
        """

        shortlist = self.name_based_preselector.search(
            hrn_type, name, family_name, given_name, year, month, day, nationality, gender
        )

        result = self.second_stage_scoring(shortlist, nationality, gender, year, month, day)

        return result

    def search_batch(self, df):
        """
        Custom method for searching inputs in a given batch.

        Parameters
        ----------
        df : pandas.core.frame.DataFrame
            DataFrame with search inputs.

        Returns
        -------
        result : list of list of HRNMatch
            Results as list of HRNMatch objects for each record in a given DataFrame.
        """

        df = df.copy()
        df["rank"] = np.arange(len(df))

        logger.info("FIRST STEP - BATCH PROCESS - name based shortlisting ...")
        shortlists = self.name_based_preselector.search_batch(
            df.loc[:, ~df.columns.isin(["swap_candidate", "rank"])]
        )

        if len(shortlists) != len(df):
            logger.error(
                f"Number of results from first stage is {len(shortlists)} but the input dataframe has {len(df)} search inputs."
            )
            raise AssertionError("Unexpected length of shortlists")

        logger.info(
            f"FIRST STEP - BATCH PROCESS - name based shortlisting finished for {len(df)} inputs from input dataframe."
        )

        logger.info("SECOND STEP - Looping over shortlists from first step to update the score ...")
        result = []

        for i in tqdm(range(len(df)), mininterval=10):
            spec_params = df.iloc[i][["nationality", "gender", "year", "month", "day"]].to_list()
            res = self.second_stage_scoring(shortlists[i], *spec_params)
            result.append(res)

        return result
