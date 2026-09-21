import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import HistoryTable from "../components/HistoryTable.jsx";
import ImpactChart from "../components/ImpactChart.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { deviceLabel } from "../utils/devices.js";
import { formatCo2, formatCost, formatEnergy, formatDate } from "../utils/format.js";
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
            Historical Telemetry
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Calculation History
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Track hardware power footprint across past calculations stored locally or in your database.
          </p>
        </div>

        <Link
          to="/calculator"
          className="inline-flex items-center gap-1.5 self-start rounded-full bg-leaf px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-leaf-dark active:scale-98"
        >
          <span>+ New Calculation</span>
        </Link>
      </div>

      <div className="mt-8 space-y-6">
        {loading && (
          <div className="rounded-2xl border border-stone-200/80 bg-white p-12 text-center shadow-sm">
            <LoadingSpinner label="Fetching historical records..." centered />
          </div>
        )}

        <ErrorMessage message={error} />

        {!loading && !error && records.length === 0 && (
          <EmptyState
            title="No Saved Calculations Yet"
            description="Run your first device analysis on the calculator and click 'Save Result' to start building your environmental track record."
            action={
              <Link
                to="/calculator"
                className="inline-flex items-center rounded-full bg-leaf px-4 py-2 text-xs font-semibold text-white hover:bg-leaf-dark"
              >
                Go to Calculator
              </Link>
            }
          />
        )}

        {records.length > 0 && (
          <>
            {/* Visual Usage Trajectory Area Chart */}
            <ImpactChart records={records} />

            {/* Historical Table */}
            <HistoryTable
              records={records}
              onSelect={setSelected}
              selectedId={selected?.id}
            />
          </>
        )}

        {/* Selected Record Detail Card */}
        {selected && (
          <section className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-leaf-soft text-leaf text-xs font-bold">
                  ✓
                </span>
                <div>
                  <h2 className="text-sm font-bold text-ink">
                    Record Details: {deviceLabel(selected.device_type)}
                  </h2>
                  <p className="text-[11px] text-muted">Recorded on {formatDate(selected.created_at)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                aria-label="Close details view"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <dl className="mt-4 grid gap-4 text-xs sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-3">
                <dt className="font-semibold uppercase tracking-wider text-muted text-[10px]">Device & Rating</dt>
                <dd className="mt-1 text-sm font-bold text-ink">{deviceLabel(selected.device_type)}</dd>
                <dd className="text-stone-500 font-medium">{selected.power_watts} Watts</dd>
              </div>

              <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-3">
                <dt className="font-semibold uppercase tracking-wider text-muted text-[10px]">Usage Duration</dt>
                <dd className="mt-1 text-sm font-bold text-ink">{selected.hours_per_day} hours/day</dd>
                <dd className="text-stone-500 font-medium">{selected.usage_days} days timeframe</dd>
              </div>

              <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-3">
                <dt className="font-semibold uppercase tracking-wider text-muted text-[10px]">Energy & Cost</dt>
                <dd className="mt-1 text-sm font-bold text-ink">{formatEnergy(selected.energy_kwh)}</dd>
                <dd className="text-stone-500 font-medium">{formatCost(selected.monthly_cost)}</dd>
              </div>

              <div className="rounded-xl border border-stone-100 bg-stone-50/50 p-3">
                <dt className="font-semibold uppercase tracking-wider text-muted text-[10px]">Carbon & Score</dt>
                <dd className="mt-1 text-sm font-bold text-ink">{formatCo2(selected.co2_kg)} CO₂</dd>
                <dd className="font-semibold text-leaf">{selected.green_score} / 100 ({selected.impact_level})</dd>
              </div>
            </dl>
          </section>
        )}
      </div>
    </div>
  );
}
