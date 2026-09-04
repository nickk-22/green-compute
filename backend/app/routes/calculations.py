from fastapi import APIRouter, Header, HTTPException

from app.schemas.calculation import (
    CalculationRequest,
    CompareRequest,
    CompareReduction,
    CompareResponse,
    SaveCalculationRequest,
)
from app.services.calculator import calculate
from app.services.supabase import (
    DatabaseUnavailableError,
    list_calculations,
    save_calculation,
)

router = APIRouter(prefix="/api/calculations", tags=["calculations"])


def _user_id_from_header(x_user_id: str | None) -> str | None:
    if x_user_id and x_user_id.strip() and x_user_id.strip().lower() != "null":
        return x_user_id.strip()
    return None


@router.post("/calculate")
def calculate_impact(payload: CalculationRequest):
    return calculate(payload)


@router.post("/compare")
def compare_impact(payload: CompareRequest):
    current = calculate(payload)
    scenario_input = CalculationRequest(
        device_type=payload.device_type,
        power_watts=payload.power_watts,
        hours_per_day=payload.compare_hours_per_day,
        usage_days=payload.usage_days,
        electricity_rate=payload.electricity_rate,
    )
    scenario = calculate(scenario_input)
    return CompareResponse(
        current=current,
        scenario=scenario,
        reduction=CompareReduction(
            energy_kwh=round(current.energy_kwh - scenario.energy_kwh, 2),
            monthly_cost=round(current.monthly_cost - scenario.monthly_cost, 2),
            co2_kg=round(current.co2_kg - scenario.co2_kg, 1),
        ),
    )


@router.post("/save")
def save_impact(
    payload: SaveCalculationRequest,
    x_user_id: str | None = Header(default=None),
):
    try:
        saved = save_calculation(payload, user_id=_user_id_from_header(x_user_id))
        return {"ok": True, "record": saved}
    except DatabaseUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="Could not save the calculation. Please try again.",
        )


@router.get("/history")
def history(x_user_id: str | None = Header(default=None)):
    try:
        records = list_calculations(user_id=_user_id_from_header(x_user_id))
        return {"records": records}
    except DatabaseUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="Could not load history. Please try again.",
        )
