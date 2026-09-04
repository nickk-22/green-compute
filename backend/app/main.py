from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routes.ai import router as ai_router
from app.routes.calculations import router as calculations_router
from app.routes.health import router as health_router
from app.routes.tips import router as tips_router

settings = get_settings()

app = FastAPI(
    title="GreenCompute API",
    description="Educational Green Computing impact analyzer.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins(),
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(calculations_router)
app.include_router(ai_router)
app.include_router(tips_router)
