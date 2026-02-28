"""
Portfolio project generator routes.
"""

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_db, get_current_user
from app.schemas.portfolio import PortfolioRequest, PortfolioResponse
from app.services import portfolio_service

router = APIRouter(prefix="/portfolio", tags=["Portfolio"])


@router.post("/generate", response_model=PortfolioResponse)
async def generate_portfolio(
    body: PortfolioRequest,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    return await portfolio_service.generate(
        db, user_id, body.target_role, body.skills, body.num_projects
    )
