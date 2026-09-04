from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.0-flash"

    supabase_url: str = ""
    supabase_service_role_key: str = ""

    # Educational estimate only. Typical order of magnitude for India's grid mix.
    co2_emission_factor_kg_per_kwh: float = 0.72

    allowed_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    host: str = "127.0.0.1"
    port: int = 8000

    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
