"""
This file contains common utility functions that can be used across the whole package.
"""
from typing import Optional


def combine_names(given_name: Optional[str], family_name: Optional[str]) -> str:
    """
    Simple function that combines given and family names into one combined name.
    Combined name can be used for a single name field search.
    """
    return f"{given_name or ''} {family_name or ''}".strip()
