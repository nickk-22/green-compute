from pydantic import BaseModel, Field


class AIAnalysisRequest(BaseModel):
    device_type: str
    power_watts: float
    hours_per_day: float
    usage_days: int
    energy_kwh: float
    monthly_cost: float
    co2_kg: float
    green_score: int
    impact_level: str


class AIAnalysis(BaseModel):
    summary: str
    impact_explanation: str
    recommendations: list[str] = Field(..., min_length=1, max_length=5)
    improvement_message: str


class AIAnalysisResponse(AIAnalysis):
    available: bool = True
    fallback_message: str | None = None
