"""
Dashboard service – computes overall readiness score from all user data.
"""

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.db.collections import RESUMES, SKILL_GAPS, INTERVIEWS, PORTFOLIOS, DASHBOARD_SCORES


async def compute_readiness(db: AsyncIOMotorDatabase, user_id: str) -> dict:
    """Aggregate data from all features to produce a readiness score."""

    # ── Skill coverage ──
    skill_gap = await db[SKILL_GAPS].find_one(
        {"user_id": user_id}, sort=[("_id", -1)]
    )
    gap_pct = skill_gap.get("gap_percentage", 100) if skill_gap else 100
    skill_coverage = round(100 - gap_pct, 1)

    # ── Interview readiness ──
    interview_cursor = db[INTERVIEWS].find({"user_id": user_id, "overall_score": {"$ne": None}})
    interview_scores = []
    async for doc in interview_cursor:
        if doc.get("overall_score") is not None:
            interview_scores.append(doc["overall_score"])
    interview_readiness = round(
        (sum(interview_scores) / len(interview_scores)) * 10, 1
    ) if interview_scores else 0

    # ── Portfolio strength ──
    portfolio_count = await db[PORTFOLIOS].count_documents({"user_id": user_id})
    portfolio_strength = min(portfolio_count * 25, 100)  # 4 projects = 100%

    # ── Resume presence ──
    has_resume = await db[RESUMES].count_documents({"user_id": user_id}) > 0
    resume_score = 100 if has_resume else 0

    # ── Overall ──
    overall = round(
        (skill_coverage * 0.30)
        + (interview_readiness * 0.30)
        + (portfolio_strength * 0.20)
        + (resume_score * 0.20),
        1,
    )

    breakdown = [
        {"category": "Skill Coverage", "score": skill_coverage, "max_score": 100},
        {"category": "Interview Readiness", "score": interview_readiness, "max_score": 100},
        {"category": "Portfolio Strength", "score": portfolio_strength, "max_score": 100},
        {"category": "Resume", "score": resume_score, "max_score": 100},
    ]

    recommendations = []
    if not has_resume:
        recommendations.append("Upload your resume to get started")
    if skill_coverage < 50:
        recommendations.append("Work on closing skill gaps for your target role")
    if interview_readiness < 50:
        recommendations.append("Practice more mock interviews")
    if portfolio_strength < 50:
        recommendations.append("Build portfolio projects to showcase your skills")

    result = {
        "user_id": user_id,
        "overall_score": overall,
        "skill_coverage": skill_coverage,
        "interview_readiness": interview_readiness,
        "portfolio_strength": float(portfolio_strength),
        "breakdown": breakdown,
        "recommendations": recommendations,
    }

    # Upsert dashboard score
    await db[DASHBOARD_SCORES].update_one(
        {"user_id": user_id}, {"$set": result}, upsert=True
    )

    return result
