import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCo2, formatCost, formatEnergy } from "../utils/format.js";
import InputField from "./InputField.jsx";

export default function WhatIfComparison({
  currentHours,
  compareHours,
  onCompareHoursChange,
  onCompare,
  loading,
  result,
  error,
}) {
  const chartData = result
    ? [
        {
          metric: "Energy (kWh)",
          Current: Number(result.current.energy_kwh.toFixed(1)),
          Optimized: Number(result.scenario.energy_kwh.toFixed(1)),
        },
        {
          metric: "Cost (₹)",
          Current: Number(result.current.monthly_cost.toFixed(0)),
          Optimized: Number(result.scenario.monthly_cost.toFixed(0)),
        },
        {
          metric: "CO₂ (kg)",
          Current: Number(result.current.co2_kg.toFixed(1)),
          Optimized: Number(result.scenario.co2_kg.toFixed(1)),
        },
      ]
    : [];

  const currH = Number(currentHours) || 0;

  function setShortcut(reducedHours) {
    const val = Math.max(0.1, Number(reducedHours.toFixed(1)));
    onCompareHoursChange(String(val));
  }

  // Calculate percentage savings if result exists
  const energySavingsPercent =
    result && result.current.energy_kwh > 0
      ? Math.round(
          ((result.current.energy_kwh - result.scenario.energy_kwh) /
            result.current.energy_kwh) *
            100
        )
      : 0;

  return (
    <section className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-ink">
            What-If Usage Simulator
          </h2>
          <p className="text-xs text-muted">
            Simulate your savings by trimming unnecessary screen or active device time
          </p>
        </div>
        <span className="inline-flex items-center gap-1 self-start rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-700">
          Current: {currentHours} h/day
        </span>
      </div>

      {/* Simulator controls */}
      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          onCompare();
        }}
      >
        <div className="flex-1">
          <InputField
            id="compare_hours"
            label="Simulated Daily Usage"
            unit="hours/day"
            type="number"
            min="0.1"
            max="24"
            step="0.1"
            value={compareHours}
            onChange={(event) => onCompareHoursChange(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-leaf px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-leaf-dark active:scale-98 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Comparing…</span>
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              <span>Simulate</span>
            </>
          )}
        </button>
      </form>

      {/* Quick comparison chips */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-medium text-stone-500">Quick adjust:</span>
        {currH > 1 && (
          <button
            type="button"
            onClick={() => setShortcut(currH - 1)}
            className="rounded-md border border-stone-200 bg-white px-2 py-0.5 text-[11px] font-medium text-stone-700 hover:bg-stone-50"
          >
            -1 hr ({Math.max(0.1, currH - 1)}h)
          </button>
        )}
        {currH > 2 && (
          <button
            type="button"
            onClick={() => setShortcut(currH - 2)}
            className="rounded-md border border-stone-200 bg-white px-2 py-0.5 text-[11px] font-medium text-stone-700 hover:bg-stone-50"
          >
            -2 hrs ({Math.max(0.1, currH - 2)}h)
          </button>
        )}
        {currH > 1 && (
          <button
            type="button"
            onClick={() => setShortcut(currH * 0.5)}
            className="rounded-md border border-stone-200 bg-white px-2 py-0.5 text-[11px] font-medium text-stone-700 hover:bg-stone-50"
          >
            -50% ({Number((currH * 0.5).toFixed(1))}h)
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

      {/* Results Comparison Grid & Chart */}
      {result && (
        <div className="mt-6 space-y-5 border-t border-stone-100 pt-5">
          {/* Savings Highlight Banner */}
          <div className="flex flex-col gap-2 rounded-xl border border-leaf-border bg-leaf-soft/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-leaf-dark">
                <svg className="h-4 w-4 text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.001-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Potential Monthly Reduction</span>
              </div>
              <p className="mt-1 text-xs text-stone-700">
                Cutting usage by {(result.current.hours_per_day - result.scenario.hours_per_day).toFixed(1)} h/day saves{" "}
                <span className="font-semibold text-leaf-dark">{formatEnergy(result.reduction.energy_kwh)}</span> and{" "}
                <span className="font-semibold text-leaf-dark">{formatCost(result.reduction.monthly_cost)}</span>.
              </p>
            </div>
            {energySavingsPercent > 0 && (
              <span className="self-start rounded-full bg-leaf px-3 py-1 text-xs font-bold text-white sm:self-center">
                -{energySavingsPercent}% Impact
              </span>
            )}
          </div>

          {/* Metric Side-by-Side Comparison */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3 text-center">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted">Energy (kWh)</span>
              <div className="mt-1.5 flex items-baseline justify-center gap-2">
                <span className="text-xs text-stone-400 line-through">{result.current.energy_kwh.toFixed(1)}</span>
                <span className="text-base font-bold text-ink">{result.scenario.energy_kwh.toFixed(1)}</span>
              </div>
              <span className="text-[10px] text-leaf font-medium">
                ↓ {result.reduction.energy_kwh.toFixed(1)} kWh
              </span>
            </div>

            <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3 text-center">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted">Cost (₹)</span>
              <div className="mt-1.5 flex items-baseline justify-center gap-2">
                <span className="text-xs text-stone-400 line-through">₹{result.current.monthly_cost.toFixed(0)}</span>
                <span className="text-base font-bold text-ink">₹{result.scenario.monthly_cost.toFixed(0)}</span>
              </div>
              <span className="text-[10px] text-leaf font-medium">
                ↓ ₹{result.reduction.monthly_cost.toFixed(0)} saved
              </span>
            </div>

            <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-3 text-center">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted">CO₂ Footprint (kg)</span>
              <div className="mt-1.5 flex items-baseline justify-center gap-2">
                <span className="text-xs text-stone-400 line-through">{result.current.co2_kg.toFixed(1)}</span>
                <span className="text-base font-bold text-ink">{result.scenario.co2_kg.toFixed(1)}</span>
              </div>
              <span className="text-[10px] text-leaf font-medium">
                ↓ {result.reduction.co2_kg.toFixed(1)} kg avoided
              </span>
            </div>
          </div>

          {/* Clean Recharts Bar Chart */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-stone-600 mb-3">Side-by-side comparison</p>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0eeeb" vertical={false} />
                  <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "#78716c" }} axisLine={{ stroke: "#e7e5e4" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#78716c" }} axisLine={{ stroke: "#e7e5e4" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e7e5e4",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  <Bar dataKey="Current" fill="#a8a29e" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Bar dataKey="Optimized" fill="#2f6f4e" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
