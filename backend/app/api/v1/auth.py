"""
Auth routes – signup and login.
"""

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_db
from app.schemas.auth import SignupRequest, LoginRequest, TokenResponse
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=TokenResponse)
async def signup(body: SignupRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await auth_service.signup(db, body.name, body.email, body.password)


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    return await auth_service.login(db, body.email, body.password)
