"""
Career Compass — FastAPI Application Entry Point.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db.mongodb import connect_to_mongo, close_mongo_connection
from app.db.collections import ensure_indexes
from app.db.mongodb import get_database
from app.core.middleware import RequestLoggingMiddleware

# ── Route imports ──
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.resume import router as resume_router
from app.api.v1.skill_gap import router as skill_gap_router
from app.api.v1.roadmap import router as roadmap_router
from app.api.v1.interview import router as interview_router
from app.api.v1.portfolio import router as portfolio_router
from app.api.v1.dashboard import router as dashboard_router

# ── Logging ──
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("career_compass")


# ── Lifespan (startup / shutdown) ──
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    await ensure_indexes(get_database())
    logger.info("🚀 Career Compass API started")
    yield
    # Shutdown
    await close_mongo_connection()
    logger.info("Career Compass API shut down")


# ── App factory ──
app = FastAPI(
    title="Career Compass API",
    description="AI-powered Education & Skilling Platform for Freshers",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Custom middleware ──
app.add_middleware(RequestLoggingMiddleware)

# ── Register API v1 routes ──
API_V1 = "/api/v1"
app.include_router(auth_router, prefix=API_V1)
app.include_router(users_router, prefix=API_V1)
app.include_router(resume_router, prefix=API_V1)
app.include_router(skill_gap_router, prefix=API_V1)
app.include_router(roadmap_router, prefix=API_V1)
app.include_router(interview_router, prefix=API_V1)
app.include_router(portfolio_router, prefix=API_V1)
app.include_router(dashboard_router, prefix=API_V1)


# ── Health check ──
@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok", "service": "career-compass"}
