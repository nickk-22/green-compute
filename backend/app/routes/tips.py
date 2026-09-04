from fastapi import APIRouter

from app.services.supabase import list_tips

router = APIRouter(prefix="/api", tags=["tips"])


@router.get("/tips")
def tips():
    return {"tips": list_tips()}
