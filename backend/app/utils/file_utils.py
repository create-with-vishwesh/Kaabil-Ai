"""
File-handling helpers for resume uploads.
"""

import os
import uuid
from pathlib import Path

UPLOAD_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"


def ensure_upload_dir() -> None:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def save_temp_file(content: bytes, extension: str = ".pdf") -> Path:
    """Save bytes to a unique temp file and return the Path."""
    ensure_upload_dir()
    filename = f"{uuid.uuid4().hex}{extension}"
    filepath = UPLOAD_DIR / filename
    filepath.write_bytes(content)
    return filepath


def delete_file(filepath: Path) -> None:
    """Delete a file if it exists."""
    if filepath.exists():
        os.remove(filepath)
