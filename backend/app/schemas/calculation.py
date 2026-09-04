from pydantic import BaseModel, Field


class CalculationBase(BaseModel):
    device_type: str = Field(..., min_length=1, max_length=80)
    power_watts: float = Field(..., ge=1, le=5000)
    hours_per_day: float = Field(..., ge=0.1, le=24)
    usage_days: int = Field(..., ge=1, le=31)
    electricity_rate: float = Field(..., ge=0, le=1000)


class CalculationRequest(CalculationBase):
    pass


class CalculationResult(CalculationBase):
    energy_kwh: float
    monthly_cost: float
    co2_kg: float
    green_score: int
    impact_level: str


class CalculationRecord(CalculationResult):
    id: str
    user_id: str | None = None
    created_at: str


class SaveCalculationRequest(CalculationResult):
    pass


class CompareRequest(CalculationBase):
    compare_hours_per_day: float = Field(..., ge=0.1, le=24)


class CompareReduction(BaseModel):
    energy_kwh: float
    monthly_cost: float
    co2_kg: float


class CompareResponse(BaseModel):
    current: CalculationResult
    scenario: CalculationResult
    reduction: CompareReduction
