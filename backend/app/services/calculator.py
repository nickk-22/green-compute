"""Deterministic energy, cost, CO2, and GreenCompute Score calculations.

All formulas live here so the React app never owns authoritative numbers.
"""

from app.config import get_settings
from app.schemas.calculation import CalculationRequest, CalculationResult

LOW_THRESHOLD = 70
MODERATE_THRESHOLD = 45


def compute_energy_kwh(power_watts: float, hours_per_day: float, usage_days: int) -> float:
    return (power_watts * hours_per_day * usage_days) / 1000.0


def compute_monthly_cost(energy_kwh: float, electricity_rate: float) -> float:
    return energy_kwh * electricity_rate


def compute_co2_kg(energy_kwh: float, factor: float | None = None) -> float:
    if factor is None:
        factor = get_settings().co2_emission_factor_kg_per_kwh
    return energy_kwh * factor


def compute_green_score(
    power_watts: float,
    hours_per_day: float,
    energy_kwh: float,
) -> tuple[int, str]:
    """Educational GreenCompute Score (0–100). Not an official standard.

    Start at 100 and apply transparent penalties:

    * Daily energy (kWh/day): 5 points per kWh, capped at 20
    * Period energy (kWh): 0.25 points per kWh, capped at 16
    * Daily hours: 2 points per hour of use
    * Device power: 0.02 points per watt

    Impact levels: Low (>= 70), Moderate (>= 45), High (< 45).
    """
    daily_kwh = (power_watts * hours_per_day) / 1000.0

    penalty = 0.0
    penalty += min(daily_kwh * 5.0, 20.0)
    penalty += min(energy_kwh * 0.25, 16.0)
    penalty += hours_per_day * 2.0
    penalty += power_watts * 0.02

    score = int(round(max(0.0, min(100.0, 100.0 - penalty))))

    if score >= LOW_THRESHOLD:
        level = "Low"
    elif score >= MODERATE_THRESHOLD:
        level = "Moderate"
    else:
        level = "High"
    return score, level


def calculate(payload: CalculationRequest) -> CalculationResult:
    energy_kwh = compute_energy_kwh(
        payload.power_watts, payload.hours_per_day, payload.usage_days
    )
    monthly_cost = compute_monthly_cost(energy_kwh, payload.electricity_rate)
    co2_kg = compute_co2_kg(energy_kwh)
    green_score, impact_level = compute_green_score(
        payload.power_watts, payload.hours_per_day, energy_kwh
    )

    return CalculationResult(
        device_type=payload.device_type,
        power_watts=payload.power_watts,
        hours_per_day=payload.hours_per_day,
        usage_days=payload.usage_days,
        electricity_rate=payload.electricity_rate,
        energy_kwh=round(energy_kwh, 2),
        monthly_cost=round(monthly_cost, 2),
        co2_kg=round(co2_kg, 1),
        green_score=green_score,
        impact_level=impact_level,
    )
