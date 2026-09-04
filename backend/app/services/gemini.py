"""Gemini interpretation layer. Never recalculates energy, cost, CO2, or score."""

from google import genai

from app.config import get_settings
from app.schemas.ai_analysis import AIAnalysis, AIAnalysisRequest

SYSTEM_INSTRUCTION = """You are an educational Green Computing assistant.

Your job is to explain a user's calculated device energy impact.

The numerical calculations supplied to you are authoritative.

Do NOT recalculate them.
Do NOT invent numbers.
Do NOT change the supplied values.
Do not make unsupported environmental claims.
Do not provide medical, financial or legal advice.

Explain the main contributor to the user's impact.

Provide exactly three practical recommendations.

Recommendations should focus on:
- reducing unnecessary energy use
- power-saving settings
- extending device lifespan
- responsible e-waste practices

Keep the language simple and suitable for a college student.

Do not exaggerate environmental consequences.

Make it clear that CO₂ values are estimates.

Return only the requested structured response.
"""

FALLBACK = AIAnalysis(
    summary="AI analysis is temporarily unavailable.",
    impact_explanation="Your calculated environmental impact is still available above.",
    recommendations=[
        "Enable sleep or power-saving mode when the device is inactive.",
        "Reduce unnecessary usage where practical.",
        "Use lower-power settings when full performance is not required.",
    ],
    improvement_message="Reducing daily usage can lower your monthly energy consumption.",
)


def _normalize(analysis: AIAnalysis) -> AIAnalysis:
    recs = [item.strip() for item in analysis.recommendations if item and item.strip()]
    while len(recs) < 3:
        recs.append("Reduce idle time and enable power-saving features when practical.")
    analysis.recommendations = recs[:3]
    return analysis


def analyze_green_impact(data: AIAnalysisRequest) -> AIAnalysis:
    settings = get_settings()
    if not settings.gemini_api_key:
        return FALLBACK

    prompt = (
        "Analyze the provided calculated results. "
        "Do not recalculate values. Do not invent numerical values.\n\n"
        f"Device type: {data.device_type}\n"
        f"Power: {data.power_watts} W\n"
        f"Daily usage: {data.hours_per_day} hours/day\n"
        f"Usage days: {data.usage_days}\n"
        f"Energy: {data.energy_kwh} kWh\n"
        f"Electricity cost: {data.monthly_cost}\n"
        f"Estimated CO2: {data.co2_kg} kg (estimate only)\n"
        f"GreenCompute Score: {data.green_score} / 100\n"
        f"Impact level: {data.impact_level}\n\n"
        "Provide a concise and practical explanation suitable for a college student. "
        "Identify the main reason for the user's impact. "
        "Provide exactly 3 practical recommendations. "
        "Mention one possible improvement if the user reduces daily usage."
    )

    client = genai.Client(api_key=settings.gemini_api_key)
    response = client.models.generate_content(
        model=settings.gemini_model,
        contents=prompt,
        config={
            "system_instruction": SYSTEM_INSTRUCTION,
            "response_mime_type": "application/json",
            "response_schema": AIAnalysis,
        },
    )

    text = (response.text or "").strip()
    if not text:
        return FALLBACK
    return _normalize(AIAnalysis.model_validate_json(text))
