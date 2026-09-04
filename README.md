# GreenCompute

Personal Green Computing Impact Analyzer — an educational student project that estimates electricity use, electricity cost, and CO₂ associated with everyday electronic devices.

Everyday computers, phones, and network gear consume electricity. That energy has a cost and, depending on how electricity is generated, an estimated carbon impact. Green computing is about using devices more efficiently, keeping hardware longer, and handling e-waste responsibly.

GreenCompute makes those ideas measurable with a simple calculator, a project-specific GreenCompute Score, optional Gemini explanations, and a history of your own estimates.

## Features

- Device energy, cost, and estimated CO₂ calculator
- Educational GreenCompute Score (0–100) and impact level
- Gemini structured insight (interpretation only — not the source of numbers)
- Save calculations to Supabase
- History table and energy trend chart
- What-if comparison when you reduce daily hours
- Green computing tips with category filters
- Works in demo mode without login (`user_id` is null)

## Architecture

```text
React
  ↓
FastAPI
  ↓
Supabase

FastAPI
  ↓
Gemini
```

Secrets stay on the backend. The React app never receives `GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY`.

## Tech stack

- Frontend: React, Vite, JavaScript, React Router, Tailwind CSS, Recharts
- Backend: Python, FastAPI, Pydantic, Uvicorn, python-dotenv, google-genai
- Database: Supabase PostgreSQL

## Setup

### 1. Clone or open the project

```bash
cd green-compute
```

### 2. Frontend

```bash
cd frontend
copy .env.example .env
npm install
```

On macOS/Linux use `cp .env.example .env`. Leave `VITE_API_URL` empty to use the Vite `/api` proxy during development.

### 3. Backend

```bash
cd backend
py -3 -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Use `python` instead of `py -3` if that is how Python is installed on your machine.

### 4. Create a Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql`.
3. Copy the project URL and **service role** key into `backend/.env`.

The service role key must never be placed in `frontend/.env`.

### 5. Gemini API key

1. Create an API key in [Google AI Studio](https://aistudio.google.com/).
2. Set `GEMINI_API_KEY` in `backend/.env` only.

The calculator still works if Gemini is missing; the UI shows a fallback insight message.

### 6. Environment variables

Backend (`backend/.env`):

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Google Gemini key (backend only) |
| `GEMINI_MODEL` | Flash model id (default `gemini-2.0-flash`) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side database access |
| `CO2_EMISSION_FACTOR_KG_PER_KWH` | kg CO₂ per kWh used for estimates (default `0.72`) |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins (no `*` for production) |

Frontend (`frontend/.env`):

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | FastAPI origin. Leave empty to use the Vite `/api` proxy in development. |

### 7. Run

Backend (from `backend/`):

```bash
python run.py
```

If `python` is not on your PATH, run `.venv\Scripts\python run.py`.

Frontend (from `frontend/`):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Calculations

All authoritative numbers are computed in FastAPI (`backend/app/services/calculator.py`).

**Energy (kWh)**

```text
energy_kwh = (power_watts × hours_per_day × usage_days) / 1000
```

Example: 50 W × 6 h × 30 days / 1000 = 9 kWh.

**Electricity cost**

```text
monthly_cost = energy_kwh × electricity_rate
```

Example: 9 × ₹8 = ₹72.

**Estimated CO₂**

```text
co2_kg = energy_kwh × CO2_EMISSION_FACTOR_KG_PER_KWH
```

Default factor `0.72` kg/kWh is an educational order-of-magnitude value similar to a carbon-intensive grid mix (for example India-scale public figures). Change the factor in `.env` to match a different grid.

### CO₂ disclaimer

CO₂ figures are **estimates**. They depend on the chosen emissions factor and on the real electricity-generation mix. They are not a measured footprint and should not be treated as exact.

## GreenCompute Score

The score is an **educational, project-specific indicator**, not a standardized environmental rating.

Start at 100 and subtract:

1. Daily energy: 5 points per kWh/day (capped at 20)
2. Period energy: 0.25 points per kWh (capped at 16)
3. Daily hours: 2 points per hour of use
4. Device power: 0.02 points per watt

Clamp to 0–100.

Impact levels:

- **Low**: score ≥ 70
- **Moderate**: score ≥ 45
- **High**: score < 45

Gemini never calculates this score.

## Gemini

Gemini is an interpretation layer. FastAPI first computes energy, cost, CO₂, and score, then sends those values to Gemini with instructions not to recalculate or invent numbers. Responses are validated with a Pydantic schema (`summary`, `impact_explanation`, `recommendations`, `improvement_message`). If Gemini fails, the calculation still succeeds and the UI shows a fallback message.

## API endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | `{ "status": "ok" }` |
| POST | `/api/calculations/calculate` | Deterministic impact calculation |
| POST | `/api/calculations/compare` | What-if hours comparison |
| POST | `/api/calculations/save` | Persist a result (optional `X-User-Id`) |
| GET | `/api/calculations/history` | Saved rows (demo: `user_id` is null) |
| POST | `/api/ai/analyze` | Structured Gemini insight |
| GET | `/api/tips` | Green computing tips |

## Authentication

Optional. The schema includes `user_id` and RLS so authenticated users can only read their own rows via the anon key. The student demo uses FastAPI + the service role and stores demo calculations with `user_id = null`. Login is not required to use the calculator.

## Testing checklist

- [ ] `GET /api/health` returns `ok`
- [ ] Calculator: Laptop, 50 W, 6 h, 30 days, ₹8 → 9 kWh, ₹72, ~6.5 kg CO₂
- [ ] Invalid hours (> 24) rejected on the form and by Pydantic
- [ ] Gemini missing: results still show, fallback insight appears
- [ ] Save result, then History lists the row
- [ ] Two or more saves: trend chart appears
- [ ] What-if compare updates energy/cost/CO₂ via FastAPI
- [ ] Tips page loads and filters by category
- [ ] Frontend has no `GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY`
