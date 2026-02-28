"""
User profile CRUD operations.
"""

from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.collections import USERS
from app.core.exceptions import NotFoundException


async def get_profile(db: AsyncIOMotorDatabase, user_id: str) -> dict:
    """Fetch user profile by id."""
    user = await db[USERS].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise NotFoundException("User")
    return _serialize(user)


async def update_profile(db: AsyncIOMotorDatabase, user_id: str, updates: dict) -> dict:
    """Partial-update user profile."""
    updates = {k: v for k, v in updates.items() if v is not None}
    updates["updated_at"] = datetime.now(timezone.utc)

    result = await db[USERS].find_one_and_update(
        {"_id": ObjectId(user_id)},
        {"$set": updates},
        return_document=True,
    )
    if not result:
        raise NotFoundException("User")
    return _serialize(result)


def _serialize(user: dict) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "target_role": user.get("target_role"),
        "skills": user.get("skills", []),
        "created_at": user["created_at"].isoformat(),
        "updated_at": user["updated_at"].isoformat(),
    }
