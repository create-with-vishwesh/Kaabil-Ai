"""
Utility helpers for parsing and validating LLM JSON responses.
"""

from typing import Any


def safe_get(data: Any, key: str, default: Any = None) -> Any:
    """Safely extract a key from an LLM response that might be dict or str."""
    if isinstance(data, dict):
        return data.get(key, default)
    return default


def ensure_list(data: Any) -> list:
    """Ensure the value is a list."""
    if isinstance(data, list):
        return data
    if data is None:
        return []
    return [data]


def clamp_score(score: Any, min_val: int = 1, max_val: int = 10) -> int:
    """Clamp a score value to the valid range."""
    try:
        s = int(score)
        return max(min_val, min(s, max_val))
    except (TypeError, ValueError):
        return min_val
