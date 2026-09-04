"""Supabase persistence for calculations and tips."""

from app.database import get_supabase
from app.schemas.calculation import CalculationResult

FALLBACK_TIPS = [
    {
        "id": "seed-1",
        "title": "Enable Sleep Mode",
        "description": "Set your device to sleep automatically when inactive so it draws far less power between tasks.",
        "category": "Energy",
    },
    {
        "id": "seed-2",
        "title": "Reduce Screen Brightness",
        "description": "Lower brightness when maximum brightness is unnecessary. Displays are often a large share of device energy use.",
        "category": "Energy",
    },
    {
        "id": "seed-3",
        "title": "Unplug Idle Chargers",
        "description": "Chargers and peripherals can draw small amounts of power even when not in use. Unplug them when practical.",
        "category": "Energy",
    },
    {
        "id": "seed-4",
        "title": "Extend Device Lifespan",
        "description": "Maintain and repair devices instead of replacing them unnecessarily. Manufacturing new electronics has a large environmental cost.",
        "category": "Device Lifespan",
    },
    {
        "id": "seed-5",
        "title": "Recycle Responsibly",
        "description": "Send obsolete electronics to appropriate e-waste recycling channels instead of household waste.",
        "category": "E-Waste",
    },
    {
        "id": "seed-6",
        "title": "Close Unused Apps and Tabs",
        "description": "Idle software can keep CPUs and radios busy. Closing what you do not need reduces energy use on laptops and phones.",
        "category": "Responsible Computing",
    },
    {
        "id": "seed-7",
        "title": "Prefer Repair Over Replace",
        "description": "Replace batteries, storage, or screens when feasible rather than discarding a working device.",
        "category": "Device Lifespan",
    },
    {
        "id": "seed-8",
        "title": "Donate or Trade In",
        "description": "If a device still works, donate or trade it in so someone else can use it before it becomes e-waste.",
        "category": "E-Waste",
    },
]


class DatabaseUnavailableError(RuntimeError):
    pass


def _require_client():
    client = get_supabase()
    if client is None:
        raise DatabaseUnavailableError(
            "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to backend/.env."
        )
    return client


def save_calculation(result: CalculationResult, user_id: str | None = None) -> dict:
    client = _require_client()
    row = result.model_dump()
    row["user_id"] = user_id
    response = client.table("calculations").insert(row).execute()
    if not response.data:
        raise RuntimeError("Could not save the calculation.")
    return response.data[0]


def list_calculations(user_id: str | None = None, limit: int = 50) -> list[dict]:
    client = _require_client()
    query = client.table("calculations").select("*").order("created_at", desc=True).limit(limit)
    if user_id:
        query = query.eq("user_id", user_id)
    else:
        query = query.is_("user_id", "null")
    response = query.execute()
    return response.data or []


def list_tips() -> list[dict]:
    try:
        client = _require_client()
        response = client.table("green_tips").select("*").order("created_at").execute()
        if response.data:
            return response.data
    except Exception:
        pass
    return FALLBACK_TIPS
