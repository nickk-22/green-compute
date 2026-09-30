# 🌿 GreenCompute

> **Personal Green Computing Impact Analyzer**  
> An educational full-stack platform that demystifies consumer electronics energy consumption, calculates electricity costs, estimates carbon footprints ($\text{CO}_2$), and provides AI-powered sustainability strategies.

---

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.12%20%7C%203.13-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.0_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)

---

## 📌 Table of Contents

- [The Problem It Solves](#-the-problem-it-solves)
- [How GreenCompute Helps](#-how-greencompute-helps)
- [Key Features](#-key-features)
- [Architecture & Design Philosophy](#-architecture--design-philosophy)
- [Tech Stack](#-tech-stack)
- [Mathematical & Algorithmic Formulation](#-mathematical--algorithmic-formulation)
- [API Reference](#-api-reference)
- [Database Schema & Security](#-database-schema--security)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Supabase Setup](#4-supabase-setup)
  - [5. Gemini AI Setup](#5-gemini-ai-setup)
- [Environment Variables](#-environment-variables)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛑 The Problem It Solves

Everyday personal computing equipment—laptops, high-performance desktops, monitors, gaming consoles, network gear, and chargers—operates continuously in homes, schools, and offices. While each device appears minor on its own:

1. **Invisible Energy & Carbon Impact**: Users rarely see the real-world connection between active screen time, device wattage ratings, and the resulting kilowatt-hours ($\text{kWh}$) or greenhouse gas emissions.
2. **The "Phantom Load" Problem**: Standby power consumption and unoptimized background processes quietly drive up monthly utility expenses.
3. **E-Waste & Planned Obsolescence**: Hardware is often replaced prematurely rather than maintained, exacerbating the global electronic waste crisis and requiring resource-intensive new hardware manufacturing.
4. **Lack of Accessible Student Tools**: Existing carbon calculators focus broadly on flights or vehicle mileage, leaving everyday technology users without direct, hardware-level guidance.

---

## 💡 How GreenCompute Helps

GreenCompute transforms abstract environmental concepts into tangible, measurable habits:

- **Hardware-Level Precision**: Calculates exact power consumption based on rated hardware wattage, daily operating duration, and regional billing tariffs.
- **Project-Specific GreenCompute Score (0–100)**: A transparent, formula-driven metric rating energy intensity into clear impact tiers: **Low**, **Moderate**, and **High**.
- **GenAI Sustainability Copilot**: Leverages Google Gemini Flash models to translate numerical metrics into tailored, practical recommendations without hallucinating values.
- **"What-If" Habit Simulator**: Instantly visualizes the compound energy, financial, and carbon savings achieved by trimming daily usage.
- **Longitudinal Telemetry**: Persists calculation records to Supabase, enabling users to track their energy trajectory over time on interactive charts.
- **Actionable Knowledge Base**: Curated, categorized green computing best practices spanning device longevity, thermal health, power policies, and certified e-waste recycling.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **Deterministic Impact Calculator** | Accurately computes energy ($\text{kWh}$), electricity costs ($\text{₹}$), and estimated carbon emissions ($\text{kg CO}_2$). |
| **Hardware Preset Matrix** | 9 pre-configured device tiles with standard active wattage ratings (Laptops, Gaming PCs, Monitors, Routers, Mobile devices) plus custom wattage input. |
| **GreenCompute Score & Gauge** | Visual SVG circular radial meter displaying the 0–100 efficiency score and color-coded impact badge. |
| **Gemini AI Strategy Advisor** | Automated structured analysis delivering root-cause explanations and 3 concrete efficiency habits. |
| **What-If Reduction Simulator** | Dynamic comparative engine with shortcut chips (-1h, -2h, -50%) and dual-bar Recharts visualization. |
| **Historical Telemetry & Area Chart** | Interactive Recharts area chart showing chronological kWh trends, coupled with a searchable records table and inspection drawer. |
| **Green Computing Tips Catalog** | Filterable guidelines classified by **Energy**, **Device Lifespan**, **E-Waste**, and **Responsible Computing**. |
| **Zero-Friction Demo Mode** | Full feature set available instantly without requiring user sign-in or account registration. |
| **Real-Time Backend Beacon** | Live health indicator in the navigation bar checking API availability in real-time. |

---

## 🏗 Architecture & Design Philosophy

GreenCompute is engineered with a strict boundary separating **authoritative math**, **data storage**, and **generative intelligence**.

```
┌─────────────────────────────────────────────────────────────────┐
│                      React 19 Frontend                          │
│          (Vite 6, Tailwind CSS v4, React Router v7)             │
│                                                                 │
│  • DeviceSelector     • GreenScore Radial Gauge                 │
│  • WhatIfComparison   • Recharts Area & Bar Charts              │
│  • AI Copilot Card    • Live Backend Health Beacon              │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP JSON (Vite /api Proxy)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FastAPI Python Backend                      │
│             (Pydantic v2, Uvicorn, Python 3.13)                 │
│                                                                 │
│  • calculator.py ──> Deterministic Energy, Cost & Score Engine  │
│  • routes/       ──> /calculate, /compare, /save, /history, /ai │
└──────────────────┬─────────────────────────────┬────────────────┘
                   │                             │
                   ▼                             ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│         Supabase PostgreSQL          │  │       Google Gemini 2.0 Flash        │
│  • calculations table (RLS enabled)  │  │  • Structured schema validation      │
│  • green_tips table & seed data      │  │  • Strict "No Math Recalculation"    │
│  • Service Role / Anonymous auth     │  │  • Automatic graceful offline mode   │
└──────────────────────────────────────┘  └──────────────────────────────────────┘
```

### Architectural Safeguards

1. **Deterministic Authority**: The React client and Gemini LLM **never** compute authoritative numbers. All formulas reside in `backend/app/services/calculator.py`.
2. **Defensive AI Integration**: Gemini acts purely as an interpretation layer. Prompts provide pre-computed values and explicitly forbid recalculating or inventing numbers. Responses are strictly parsed through Pydantic schemas.
3. **Graceful Degradation**: If Supabase or Gemini is offline or unconfigured, the application falls back seamlessly to built-in seed tips and offline analysis banners.
4. **Credential Isolation**: Secrets (`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are restricted to the backend environment. The client receives zero access to private keys.

---

## 💻 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native CSS `@theme` variables
- **Data Visualization**: [Recharts](https://recharts.org/) (Responsive Area & Bar charts)
- **Typography**: Google Fonts (*Plus Jakarta Sans*)

### Backend
- **Framework**: [FastAPI 0.115+](https://fastapi.tiangolo.com/)
- **Validation & Serialization**: [Pydantic v2](https://docs.pydantic.dev/) & [Pydantic Settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)
- **ASGI Server**: [Uvicorn 0.32+](https://www.uvicorn.org/)
- **Language**: Python 3.11 / 3.12 / 3.13

### Cloud & Database
- **Database**: [Supabase](https://supabase.com/) (Managed PostgreSQL)
- **Security**: PostgreSQL Row-Level Security (RLS) & Indexed Queries
- **AI / LLM**: [Google Gemini 2.0 Flash](https://ai.google.dev/) via the official `google-genai` SDK

---

## 📐 Mathematical & Algorithmic Formulation

### 1. Energy Consumption
$$\text{Energy (kWh)} = \frac{\text{Power (Watts)} \times \text{Hours/Day} \times \text{Usage Days}}{1000}$$
*Example: A 50 W laptop used 6 hours/day for 30 days consumes:*
$$\frac{50 \times 6 \times 30}{1000} = 9.0\text{ kWh}$$

### 2. Electricity Cost
$$\text{Monthly Cost (₹)} = \text{Energy (kWh)} \times \text{Tariff Rate (₹/kWh)}$$
*Example: At ₹8.00/kWh, the monthly cost is:*
$$9.0 \times 8.00 = ₹72.00$$

### 3. Estimated Carbon Footprint
$$\text{Estimated }\text{CO}_2\text{ (kg)} = \text{Energy (kWh)} \times \text{Grid Emission Factor}$$
*The default factor is **0.72 kg $\text{CO}_2$/kWh**, calibrated to representative national grid mix figures. Configurable via `.env`.*
$$9.0 \times 0.72 = 6.48 \approx 6.5\text{ kg }\text{CO}_2$$

### 4. Educational GreenCompute Score (0–100)
Starting from a benchmark score of 100, penalties are subtracted based on usage intensity:

$$\text{Penalty} = \min(\text{Daily kWh} \times 5.0,\, 20.0) + \min(\text{Period kWh} \times 0.25,\, 16.0) + (\text{Hours/Day} \times 2.0) + (\text{Power Watts} \times 0.02)$$

$$\text{Score} = \text{round}\Big(\max\big(0.0,\, \min(100.0,\, 100.0 - \text{Penalty})\big)\Big)$$

#### Impact Classification
- 🟢 **Low Impact**: Score $\ge 70$ (Eco-friendly, energy-conscious hardware profile)
- 🟡 **Moderate Impact**: Score $45 - 69$ (Standard usage; room for optimization)
- 🔴 **High Impact**: Score $< 45$ (High consumption; significant savings potential)

---

## 🔌 API Reference

### Health Check
- **`GET /api/health`**
  - **Response**: `{"status": "ok"}`

### Calculations
- **`POST /api/calculations/calculate`**
  - **Payload**:
    ```json
    {
      "device_type": "laptop",
      "power_watts": 50.0,
      "hours_per_day": 6.0,
      "usage_days": 30,
      "electricity_rate": 8.0
    }
    ```
  - **Response**:
    ```json
    {
      "device_type": "laptop",
      "power_watts": 50.0,
      "hours_per_day": 6.0,
      "usage_days": 30,
      "electricity_rate": 8.0,
      "energy_kwh": 9.0,
      "monthly_cost": 72.0,
      "co2_kg": 6.5,
      "green_score": 83,
      "impact_level": "Low"
    }
    ```

- **`POST /api/calculations/compare`**
  - **Payload**:
    ```json
    {
      "device_type": "laptop",
      "power_watts": 50.0,
      "hours_per_day": 6.0,
      "usage_days": 30,
      "electricity_rate": 8.0,
      "compare_hours_per_day": 4.0
    }
    ```
  - **Response**: Returns current metrics, simulated scenario metrics, and delta reductions.

- **`POST /api/calculations/save`**
  - Header: Optional `X-User-Id` (defaults to null for demo mode).
  - Persists calculation result to Supabase.

- **`GET /api/calculations/history`**
  - Header: Optional `X-User-Id`.
  - Returns up to 50 saved calculations ordered by creation date.

### Artificial Intelligence
- **`POST /api/ai/analyze`**
  - Submits calculated metrics to Google Gemini Flash for structured analysis.
  - **Response**:
    ```json
    {
      "summary": "Your laptop usage results in a low environmental impact with an estimated CO2 emission of 6.5 kg over 30 days.",
      "impact_explanation": "The main contributor is 6 hours of daily usage at 50 W, totaling 9.0 kWh.",
      "recommendations": [
        "Enable built-in battery saver or power-saving display settings.",
        "Unplug chargers when battery reaches full charge to eliminate vampire load.",
        "Keep internal fans and vents clear of dust to preserve thermal efficiency."
      ],
      "improvement_message": "Trimming daily usage by 1 hour will reduce monthly consumption by 1.5 kWh.",
      "available": true,
      "fallback_message": null
    }
    ```

### Green Tips
- **`GET /api/tips`**
  - Returns list of sustainability guidelines from Supabase (or offline seed data).

---

## 🗄 Database Schema & Security

The database runs on Supabase PostgreSQL. Schema definitions are located in [`supabase/schema.sql`](supabase/schema.sql):

- **`calculations` Table**: Stores UUID, device type, power, hours, days, rate, calculated kWh, costs, $\text{CO}_2$, score, and timestamp.
- **`green_tips` Table**: Contains educational advice categorized by topic.
- **Row-Level Security (RLS)**:
  - Authenticated users can only read and write their own records (`auth.uid() = user_id`).
  - Public demo records (`user_id IS NULL`) are managed safely via the FastAPI backend using the service role key.
  - Tips table is publicly readable.

---

## 🚀 Getting Started

### Prerequisites

- **Python**: 3.11, 3.12, or 3.13
- **Node.js**: 18.x, 20.x, or 22.x
- **Package Managers**: `pip` and `npm`

---

### 1. Clone Repository

```bash
git clone https://github.com/nickk-22/green-compute.git
cd green-compute
```

---

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
```

Start the backend server:

```bash
python run.py
```

The API will be live at `http://127.0.0.1:8000` (Docs: `http://127.0.0.1:8000/docs`).

---

### 3. Frontend Setup

In a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 4. Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor** in the Supabase Dashboard.
3. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and execute the query.
4. Copy your **Project URL** and **Service Role Secret Key** into `backend/.env`.

---

### 5. Gemini AI Setup

1. Generate a free API key at [Google AI Studio](https://aistudio.google.com/).
2. Add your key to `backend/.env`:
   ```ini
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-2.0-flash
   ```

*Note: If no key is provided, the application will automatically run in fallback mode with offline tips.*

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`)

| Variable | Required | Default | Purpose |
| :--- | :---: | :---: | :--- |
| `GEMINI_API_KEY` | Optional | `""` | Google AI Studio API key |
| `GEMINI_MODEL` | Optional | `gemini-2.0-flash` | Gemini model ID for analysis |
| `SUPABASE_URL` | Optional | `""` | Supabase project endpoint |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | `""` | Backend server-side access key |
| `CO2_EMISSION_FACTOR_KG_PER_KWH`| Optional | `0.72` | Emissions factor in kg $\text{CO}_2$ per kWh |
| `ALLOWED_ORIGINS` | Optional | `http://localhost:5173,...`| Permitted CORS browser origins |
| `HOST` | Optional | `127.0.0.1` | Local bind address for Uvicorn |
| `PORT` | Optional | `8000` | Local port for Uvicorn |

### Frontend Configuration (`frontend/.env`)

| Variable | Required | Default | Purpose |
| :--- | :---: | :---: | :--- |
| `VITE_API_URL` | Optional | `""` | Backend URL. Leave empty to use Vite `/api` proxy. |

---

## 🧪 Testing & Quality Assurance

Verify that your local setup is functioning properly:

- [x] **Backend Health**: `GET http://127.0.0.1:8000/api/health` returns `{"status": "ok"}`
- [x] **Frontend Proxy**: `GET http://localhost:5173/api/health` routes through Vite seamlessly
- [x] **Math Accuracy**: Laptop (50 W, 6 h/day, 30 days, ₹8/kWh) produces `9.0 kWh`, `₹72.0`, `~6.5 kg CO₂`, Score `83`
- [x] **Form Constraints**: Inputs $> 24$ hours or negative power/rates are caught by client and Pydantic validation
- [x] **AI Fallback Resilience**: Disconnecting the Gemini API key preserves calculation functionality with a fallback notification
- [x] **Database Persistence**: Saved items appear immediately in the History table and populate the Recharts Area Chart
- [x] **Build Validation**: `npm run build` compiles with zero errors

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/InnovativeFeature`)
3. Commit your Changes (`git commit -m 'feat: add InnovativeFeature'`)
4. Push to the Branch (`git push origin feature/InnovativeFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with care for a cleaner, greener computing ecosystem. 🌍</sub>
</div>
