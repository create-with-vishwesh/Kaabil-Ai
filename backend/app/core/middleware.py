"""
Custom middleware for logging and request tracking.
"""

import time
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

logger = logging.getLogger("career_compass")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.perf_counter()
        response = await call_next(request)
        elapsed = round((time.perf_counter() - start) * 1000, 2)
        logger.info(
            "%s %s → %s  (%s ms)",
            request.method,
            request.url.path,
            response.status_code,
            elapsed,
        )
        return response
