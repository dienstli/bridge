from dataclasses import dataclass
from functools import total_ordering
from typing import List, Optional

from entity_matching.utilities.logging import get_logger


logger = get_logger("ams_em")


@total_ordering
@dataclass
class HRNMatch:
    hrn_id: str
    record_id: int
    score: float
    match_string: str

    def __lt__(self, other):
        return self.score < other.score

    def __eq__(self, other):
        return self.score == other.score


class SearchBase:
    """
    Base class for entity matching.
    """

    @staticmethod
    def _input_check_person(name, family_name, given_name, year, month, day, nationality, gender):
        """
        Input check for person search.
        """

        if not (name or family_name):
            raise ValueError('One of "name" or "family_name" is required.')

        if name and (family_name or given_name):
            raise ValueError("Use either family+given name or name only.")

        for s in [name, family_name, given_name]:
            if s and not isinstance(s, str):
                raise ValueError(f"{s} not allowed. String has to be provided.")

        if year and not (1800 <= year <= 2100):
            raise ValueError("If year is provided, it has to be an integer between 1800 and 2100.")

        if month and not (1 <= month <= 12):
            raise ValueError("If month is provided, it has to be an integer between 1 and 12.")

        if day and not (1 <= day <= 31):
            raise ValueError("If day is provided, it has to be an integer between 1 and 12.")

        if nationality and not (isinstance(nationality, str) and len(nationality) == 2):
            raise ValueError("If nationality is provided, it has to be a 2 character string.")

        if gender and not (isinstance(gender, str) and gender in ("Male", "Female")):
            raise ValueError('If gender is provided, it has to be a string ("Male" or "Female").')

    def _input_check_entity(self, name, year, month, day, nationality, gender):
        """
        Input check for entity search.
        """
        if not name:
            raise ValueError('Parameter "name" has to be provided for entity search.')
        self._input_check_person(name, None, None, year, month, day, nationality, gender)

    def input_check(
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
        **kwargs,
    ):
        """
        Validate search input.
        """
        if hrn_type == "P":
            self._input_check_person(
                name, family_name, given_name, year, month, day, nationality, gender
            )
        elif hrn_type == "E":
            self._input_check_entity(name, year, month, day, nationality, gender)
        else:
            raise ValueError('"hrn_type" has to be one of: ["P", "E"].')

    def input_check_batch(self, df):
        """
        Checking batch df.
        """
        logger.info("Checking batch inputs...")
        expected_columns = {
            "hrn_type",
            "name",
            "family_name",
            "given_name",
            "year",
            "month",
            "day",
            "nationality",
            "gender",
        }
        try:
            # we do not require the order of the columns to match
            assert set(df.columns).issuperset(expected_columns)
        except AssertionError:
            raise ValueError(f"Input df must have at least the columns: {expected_columns}.")

        for d in df.to_dict(orient="records"):
            self.input_check(**d)

        logger.info("Batch inputs okay.")

    def _search_person(self, name, family_name, given_name, year, month, day, nationality, gender):
        """
        Search method for persons.
        """
        raise NotImplementedError("Must implement person search.")

    def _search_entity(self, name, year, month, day, nationality, gender):
        """
        Search method for entities.
        """
        raise NotImplementedError("Must implement entity search.")

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
        self.input_check(
            hrn_type, name, family_name, given_name, year, month, day, nationality, gender
        )
        if hrn_type == "P":
            return self._search_person(
                name, family_name, given_name, year, month, day, nationality, gender
            )
        else:
            return self._search_entity(name, year, month, day, nationality, gender)

    def search_batch(self, df) -> List[List[HRNMatch]]:
        """
        Batch search for a given dataframe.

        If parallelization is possible, please update this method in respective child class.

        Parameters
        ----------
        df : pandas.core.frame.DataFrame

        Returns
        -------
        result : list of list of HRN matches
        """
        self.input_check_batch(df)

        result = []
        for r in df.to_records(index=False):
            one = self.search(*r)
            result.append(one)

        return result
