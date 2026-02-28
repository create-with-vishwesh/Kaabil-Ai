"""MongoDB document shape for users."""

from datetime import datetime, timezone


def new_user_doc(name: str, email: str, hashed_password: str) -> dict:
    now = datetime.now(timezone.utc)
    return {
        "name": name,
        "email": email,
        "hashed_password": hashed_password,
        "target_role": None,
        "skills": [],
        "created_at": now,
        "updated_at": now,
    }
