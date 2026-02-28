"""
User profile routes.
"""

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_db, get_current_user
from app.schemas.user import UserProfile, UserUpdate
from app.services import user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/profile", response_model=UserProfile)
async def get_profile(
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await user_service.get_profile(db, user_id)


@router.put("/profile", response_model=UserProfile)
async def update_profile(
    body: UserUpdate,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await user_service.update_profile(db, user_id, body.model_dump())
