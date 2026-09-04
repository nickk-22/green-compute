import { formatCo2, formatCost, formatEnergy, impactMessage } from "../utils/format.js";
import ResultCard from "./ResultCard.jsx";

export default function ImpactSummary({ result }) {
  return (
    <section className="space-y-4" aria-labelledby="impact-heading">
      <h2 id="impact-heading" className="sr-only">
        Impact summary
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <ResultCard
          label="Energy"
          icon="⚡"
          value={`${formatEnergy(result.energy_kwh)} / month`}
        />
        <ResultCard
          label="Electricity"
          icon="₹"
          value={`${formatCost(result.monthly_cost)} / month`}
        />
        <ResultCard
          label="Estimated CO₂"
          icon="🌍"
          value={`${formatCo2(result.co2_kg)} / month`}
          hint="Depends on the electricity-generation mix. This is only an estimate."
        />
      </div>
      <div className="rounded-xl border border-line bg-leaf-soft/60 px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Impact level</p>
        <p className="mt-1 text-lg font-semibold text-ink">{result.impact_level.toUpperCase()}</p>
        <p className="mt-1 text-sm text-muted">{impactMessage(result.impact_level)}</p>
      </div>
    </section>
  );
}
