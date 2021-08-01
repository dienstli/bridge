import re
import pandas as pd
import unicodedata


def strip_accents(text):
    text = unicodedata.normalize("NFD", text).encode("ascii", "ignore").decode("utf-8")

    return str(text)


def preprocess_whitespaces(s):
    xss = s.split("  ")
    s = ""
    for xs in xss:
        s = s + f"{xs.replace(' ', '')} "
    return s.strip()


def ngrams(string, ngram_from=3, ngram_to=5, clear_digits=True):
    # string = fix_text(string) # fix text encoding issues
    if not string or pd.isnull(string):
        # we are concerned about None, "", and float("nan") specifically
        return []
    elif clear_digits:
        string = re.sub(r"\d+", "", string)

    string_len = len(string) if string else 0
    space_count = string.count(" ")
    if 1 > space_count / string_len >= 0.4:
        string = preprocess_whitespaces(string)

    string = strip_accents(string)
    string = string.lower()  # make lower case
    chars_to_remove = [")", "(", ".", "|", "[", "]", "{", "}", "'", "?", "+"]
    rx = "[" + re.escape("".join(chars_to_remove)) + "]"
    string = re.sub(rx, "", string)  # remove the list of chars defined above
    string = string.replace(",", " ")
    string = string.replace("-", " ")
    string = re.sub(
        " +", " ", string
    ).strip()  # get rid of multiple spaces and replace with a single space
    string = " " + string + " "  # pad names for ngrams...
    string = re.sub(r"[,-./]|\sBD", r"", string)

    res = []
    res += string.split()  # all full words
    res += [w[0] for w in string.split()]

    ngram_from = min(ngram_from, string_len)
    ngram_to = min(ngram_to, string_len)

    for n in range(ngram_from, ngram_to + 1):
        n_grams = zip(*[string[i:] for i in range(n)])
        res += ["".join(n_gram) for n_gram in n_grams]

    return res
