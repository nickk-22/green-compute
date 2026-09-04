import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import HistoryTable from "../components/HistoryTable.jsx";
import ImpactChart from "../components/ImpactChart.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { deviceLabel } from "../utils/devices.js";
import { formatCo2, formatCost, formatEnergy } from "../utils/format.js";
import { getHistory } from "../services/api.js";

export default function HistoryPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let active = true;
    getHistory()
      .then((data) => {
        if (active) setRecords(data.records || []);
      })
      .catch((err) => {
        if (active) setError(err.message || "Something went wrong. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-ink">Your Impact History</h1>
      <p className="mt-2 text-sm text-muted">
        Demo mode stores calculations without an account. Authenticated users only see their own
        rows.
      </p>

      <div className="mt-8 space-y-6">
        {loading && <LoadingSpinner label="Loading your history..." />}
        <ErrorMessage message={error} />

        {!loading && !error && records.length === 0 && (
          <EmptyState
            title="No calculations yet."
            description="Complete your first calculation to start tracking your green-computing impact."
          />
        )}

        {records.length > 0 && (
          <>
            <ImpactChart records={records} />
            <HistoryTable records={records} onSelect={setSelected} />
          </>
        )}

        {selected && (
          <section className="rounded-xl border border-line bg-card p-5 shadow-sm">
            <h2 className="text-sm font-medium text-ink">Details</h2>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">Device</dt>
                <dd>{deviceLabel(selected.device_type)}</dd>
              </div>
              <div>
                <dt className="text-muted">Power</dt>
                <dd>{selected.power_watts} W</dd>
              </div>
              <div>
                <dt className="text-muted">Usage</dt>
                <dd>
                  {selected.hours_per_day} h/day · {selected.usage_days} days
                </dd>
              </div>
              <div>
                <dt className="text-muted">Energy</dt>
                <dd>{formatEnergy(selected.energy_kwh)}</dd>
              </div>
              <div>
                <dt className="text-muted">Cost</dt>
                <dd>{formatCost(selected.monthly_cost)}</dd>
              </div>
              <div>
                <dt className="text-muted">Estimated CO₂</dt>
                <dd>{formatCo2(selected.co2_kg)}</dd>
              </div>
              <div>
                <dt className="text-muted">GreenCompute Score</dt>
                <dd>
                  {selected.green_score} / 100 ({selected.impact_level})
                </dd>
              </div>
            </dl>
          </section>
        )}
      </div>
    </div>
  );
}
