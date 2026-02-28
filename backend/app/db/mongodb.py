"""
Async MongoDB connection using Motor.
"""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import settings

_client: AsyncIOMotorClient | None = None
_database: AsyncIOMotorDatabase | None = None


async def connect_to_mongo() -> None:
    """Initialize the Motor client and select the database."""
    global _client, _database
    _client = AsyncIOMotorClient(settings.MONGO_URI)
    _database = _client[settings.MONGO_DB_NAME]
    # Verify connectivity
    await _client.admin.command("ping")
    print(f"✔ Connected to MongoDB: {settings.MONGO_DB_NAME}")


async def close_mongo_connection() -> None:
    """Gracefully close the Motor client."""
    global _client, _database
    if _client:
        _client.close()
        _client = None
        _database = None
        print("✔ MongoDB connection closed")


def get_database() -> AsyncIOMotorDatabase:
    """Return the current database handle (call after connect_to_mongo)."""
    if _database is None:
        raise RuntimeError("MongoDB not initialised – call connect_to_mongo first")
    return _database
