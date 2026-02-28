"""
Authentication service – signup, login, token management.
"""

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.security import hash_password, verify_password, create_access_token
from app.core.exceptions import ConflictException, CredentialsException
from app.db.collections import USERS
from app.models.user import new_user_doc


async def signup(db: AsyncIOMotorDatabase, name: str, email: str, password: str) -> dict:
    """Register a new user. Returns token response."""
    existing = await db[USERS].find_one({"email": email})
    if existing:
        raise ConflictException("Email already registered")

    doc = new_user_doc(name, email, hash_password(password))
    result = await db[USERS].insert_one(doc)
    user_id = str(result.inserted_id)

    token = create_access_token({"sub": user_id})
    return {"access_token": token, "token_type": "bearer"}


async def login(db: AsyncIOMotorDatabase, email: str, password: str) -> dict:
    """Authenticate and return a JWT."""
    user = await db[USERS].find_one({"email": email})
    if not user or not verify_password(password, user["hashed_password"]):
        raise CredentialsException("Invalid email or password")

    token = create_access_token({"sub": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer"}
