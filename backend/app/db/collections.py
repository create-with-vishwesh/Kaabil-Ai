"""
MongoDB collection name constants and index definitions.
"""

# ── Collection names ──
USERS = "users"
RESUMES = "resumes"
SKILL_GAPS = "skill_gaps"
ROADMAPS = "roadmaps"
INTERVIEWS = "interviews"
PORTFOLIOS = "portfolios"
DASHBOARD_SCORES = "dashboard_scores"


async def ensure_indexes(db) -> None:
    """Create indexes needed for performance and uniqueness."""
    await db[USERS].create_index("email", unique=True)
    await db[RESUMES].create_index("user_id")
    await db[SKILL_GAPS].create_index("user_id")
    await db[ROADMAPS].create_index("user_id")
    await db[INTERVIEWS].create_index("user_id")
    await db[PORTFOLIOS].create_index("user_id")
    await db[DASHBOARD_SCORES].create_index("user_id")
