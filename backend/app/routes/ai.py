from fastapi import APIRouter

from app.schemas.ai_analysis import AIAnalysisRequest, AIAnalysisResponse
from app.services.gemini import FALLBACK, analyze_green_impact

router = APIRouter(prefix="/api/ai", tags=["ai"])

FALLBACK_MESSAGE = (
    "AI insights are temporarily unavailable, but your calculation was completed successfully."
)


@router.post("/analyze", response_model=AIAnalysisResponse)
def analyze(payload: AIAnalysisRequest):
    try:
        result = analyze_green_impact(payload)
        if result.summary == FALLBACK.summary:
            return AIAnalysisResponse(
                **result.model_dump(),
                available=False,
                fallback_message=FALLBACK_MESSAGE,
            )
        return AIAnalysisResponse(**result.model_dump(), available=True)
    except Exception:
        return AIAnalysisResponse(
            **FALLBACK.model_dump(),
            available=False,
            fallback_message=FALLBACK_MESSAGE,
        )
