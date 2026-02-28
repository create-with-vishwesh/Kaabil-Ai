"""
Shared FastAPI dependencies – DB injection and current-user extraction.
"""

from fastapi import Depends, Header
from jose import JWTError
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.mongodb import get_database
from app.core.security import decode_access_token
from app.core.exceptions import CredentialsException


def get_db() -> AsyncIOMotorDatabase:
    """Dependency that returns the MongoDB database handle."""
    return get_database()


async def get_current_user(
    authorization: str = Header(..., description="Bearer <token>"),
    db: AsyncIOMotorDatabase = Depends(get_db),
) -> str:
    """
    Extract and validate JWT from Authorization header.
    Returns the user_id (str).
    """
    if not authorization.startswith("Bearer "):
        raise CredentialsException("Missing Bearer token")

    token = authorization.split(" ", 1)[1]
    try:
        payload = decode_access_token(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise CredentialsException()
    except JWTError:
        raise CredentialsException()

    return user_id
