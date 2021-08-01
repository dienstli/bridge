# Search module

Space for search algorithms.

`SearchBase` is the base class for the search and
all implemented solutions (listed below) are extending it. Each solution should have its
own implementation of `_search_person` and `_search_entity` methods. In addition, if parallelization is possible,
`search_batch` should be also updated, otherwise simple loop from `SearchBase` will be used.

#### Standard input for a single search method:
```
hrn_type: str ("P" vs "E")
name: Optional[str]
family_name: Optional[str]
given_name: Optional[str]
year: Optional[int] = None
month: Optional[int] = None
day: Optional[int] = None
nationality: Optional[str] = None (e.g. "US")
gender: Optional[str] = None ("Male" vs "Female")
```

##### Output example:
```
[HRNMatch(hrn_id='F_2203097', score=0.825289414437045), HRNMatch(hrn_id='F_1701327', score=0.7600029623877945)]
```

#### Standard input for a batch search method:
Pandas `dataframe` with columns `hrn_type`, `name`, `family_name`, `given_name`, `year`,
`month`, `day`, `nationality`, `gender`.

##### Output example (for `df` with 2 records):
```
[
[HRNMatch(hrn_id='F_2203097', score=0.825289414437045), HRNMatch(hrn_id='F_1701327', score=0.7600029623877945)],
[HRNMatch(hrn_id='F_11272614', score=0.7429252463907537), HRNMatch(hrn_id='F_3106360', score=0.7429252463907537)
]
```

## Implemented solutions

### Sparse dot topN search

Search method based on cosine similarity of TFIDF vector representation of name inputs.
This method is working with name inputs only and hence will serve mainly as a pre-selection for other algorithms.

### 2-stage weighted search

Search method running in 2 stages:
- 1st stage: shortlisting candidates based on name match (currently using `Sparse dot topN search` described above), returning also scores in respect of name match
- 2nd stage: updating scores based on matches of other input parameters

## Examples of usage

#### Single search:
```python
from entity_matching.search import SearchSparseTopN, SearchTwoStageWeighted

# search = SearchSparseTopN()
search = SearchTwoStageWeighted()

inp1 = ("P", "Albert Einstein", None, None, None, 3, 14, "DE", "Male")
print(search.search(*inp1))
inp2 = ("P", None, "Einstein", "Albert", 1879, 3, 14, "DE", "Male")
print(search.search(*inp2))
inp3 = ("E", "E. Corp", None, None, None, None, None, "US", None)
print(search.search(*inp3))
```

#### Batch search:
```python
import pandas as pd
from entity_matching.search import SearchSparseTopN, SearchTwoStageWeighted

input_df = pd.DataFrame(
    [
        ("P", "Albert Einstein", None, None, None, 3, 14, "DE", "Male"),
        ("P", None, "Einstein", "Albert", 1879, 3, 14, "DE", "Male"),
        ("E", "E. Corp", None, None, None, None, None, "US", None),
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

# search = SearchSparseTopN()
search = SearchTwoStageWeighted()

batch_res = search.search_batch(input_df)
print(batch_res)
```