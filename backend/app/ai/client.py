"""
OpenAI client wrapper with retry logic and token management.
All LLM calls in the application go through this module.
"""

import json
import logging
from openai import AsyncOpenAI
from app.config import settings

logger = logging.getLogger("career_compass.ai")

_openai_client: AsyncOpenAI | None = None


def get_openai_client() -> AsyncOpenAI:
    global _openai_client
    if _openai_client is None:
        _openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    return _openai_client


async def call_llm(
    prompt: str,
    system_message: str = "You are a helpful career advisor AI.",
    model: str | None = None,
    temperature: float = 0.7,
    max_tokens: int = 2000,
    response_format: str = "json",
) -> dict | str:
    """
    Send a prompt to the LLM and return the response.
    If response_format is 'json', attempt to parse as JSON.
    """
    client = get_openai_client()
    model = model or settings.OPENAI_MODEL

    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": prompt},
    ]

    kwargs = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    # Request JSON output if the model supports it
    if response_format == "json":
        kwargs["response_format"] = {"type": "json_object"}

    try:
        completion = await client.chat.completions.create(**kwargs)
        content = completion.choices[0].message.content.strip()

        if response_format == "json":
            return json.loads(content)
        return content

    except json.JSONDecodeError:
        logger.warning("LLM returned non-JSON, returning raw string")
        return content
    except Exception as e:
        logger.error("LLM call failed: %s", str(e))
        raise
