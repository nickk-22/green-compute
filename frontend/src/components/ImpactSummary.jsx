import { formatCo2, formatCost, formatEnergy, impactMessage } from "../utils/format.js";
import ResultCard from "./ResultCard.jsx";

export default function ImpactSummary({ result }) {
  const periodLabel = result.usage_days === 30 ? "month" : `${result.usage_days} days`;

  const isLow = result.impact_level === "Low";
  const isModerate = result.impact_level === "Moderate";

  const impactBorder = isLow
    ? "border-leaf/30 bg-leaf-soft/50"
    : isModerate
    ? "border-amber-200 bg-amber-50/50"
    : "border-rose-200 bg-rose-50/50";

  const impactBadge = isLow
    ? "bg-leaf-soft text-leaf-dark"
    : isModerate
    ? "bg-amber-100 text-amber-900"
    : "bg-rose-100 text-rose-900";

  return (
    <section className="space-y-4" aria-labelledby="impact-heading">
      <h2 id="impact-heading" className="sr-only">
        Impact Summary
      </h2>

      {/* 3 Core Metric Cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <ResultCard
          label="Energy Usage"
          icon={
            <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          }
          value={formatEnergy(result.energy_kwh)}
          hint={`Per ${periodLabel} (${(result.energy_kwh / result.usage_days).toFixed(2)} kWh/day)`}
        />

        <ResultCard
          label="Electricity Cost"
          icon={
            <svg className="h-4 w-4 text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.001-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          value={formatCost(result.monthly_cost)}
          hint={`At ₹${result.electricity_rate}/kWh`}
        />

        <ResultCard
          label="Est. Carbon Footprint"
          icon={
            <svg className="h-4 w-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
            </svg>
          }
          value={formatCo2(result.co2_kg)}
          hint="Grid emission estimate (0.72 kg CO₂/kWh default)"
        />
      </div>

      {/* Impact Level Context Callout */}
      <div className={`flex flex-col gap-2 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${impactBorder}`}>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className={`rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${impactBadge}`}>
              {result.impact_level} Impact
            </span>
            <span className="text-xs font-semibold text-ink">Usage Assessment</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">{impactMessage(result.impact_level)}</p>
        </div>
      </div>
    </section>
  );
}
