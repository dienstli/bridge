import os
import sys

_path = os.path.abspath(os.path.join(".", "..", ".."))
sys.path.append(_path)

import pandas as pd
from entity_matching.search import SearchTwoStageWeighted


def main():

    search = SearchTwoStageWeighted()

    inp1 = ("P", "Albert Einstein", None, None, None, 3, 14, "DE", "Male")
    print(search.search(*inp1))
    inp2 = ("P", None, "Einstein", "Albert", 1879, 3, 14, "DE", "Male")
    print(search.search(*inp2))
    inp3 = ("E", "E. Corp", None, None, None, None, None, "US", None)
    print(search.search(*inp3))

    input_df = pd.DataFrame(
        [
            ("P", "Albert Einstein", None, None, None, 3, 14, "DE", "Male"),
            ("P", "Tom Hanks", None, None, None, 3, 14, "DE", "Male"),
            ("P", "Ange Patase", None, None, None, 3, 14, "SA", "Male"),
            ("P", "Andrej Babis", None, None, None, 3, 14, "CZ", "Male"),
            ("P", "Harry POtter", None, None, None, 3, 14, "UK", "Male"),
            ("P", "Frodo Baggins", None, None, None, 3, 14, "NZ", "Male"),
            ("P", "Bilbo Baggins", None, None, None, 3, 14, "NZ", "Male"),
            ("P", None, "Einstein", "Albert", 1879, 3, 14, "DE", "Male"),
            ("P", None, "Trump", "Donald", 1949, 3, 14, "US", "Male"),
            ("P", None, "Obama", None, 1965, 3, 14, "US", "Male"),
            ("E", "E. Corp", None, None, None, None, None, "US", None),
            ("E", "Microsoft", None, None, None, None, None, "US", None),
        ],
        columns=[
            "hrn_type",
            "name",
            "family_name",
            "given_name",
            "year",
            "month",
            "day",
            "nationality",
            "gender",
        ],
    )
    input_df = input_df.where(pd.notnull(input_df), None)

    print("Running for batch ...")
    batch_res = search.search_batch(input_df)
    print(batch_res)


if __name__ == "__main__":
    main()
