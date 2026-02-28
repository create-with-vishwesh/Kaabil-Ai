"""Pydantic schemas for readiness score dashboard."""

from pydantic import BaseModel
from typing import List, Optional


class SkillBreakdown(BaseModel):
    category: str
    score: float
    max_score: float


class ReadinessScore(BaseModel):
    user_id: str
    overall_score: float  # 0-100
    skill_coverage: float
    interview_readiness: float
    portfolio_strength: float
    breakdown: List[SkillBreakdown]
    recommendations: List[str]
