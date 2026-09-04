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
          name: "Energy (kWh)",
          Current: result.current.energy_kwh,
          New: result.scenario.energy_kwh,
        },
        {
          name: "Cost (₹)",
          Current: result.current.monthly_cost,
          New: result.scenario.monthly_cost,
        },
        {
          name: "CO₂ (kg)",
          Current: result.current.co2_kg,
          New: result.scenario.co2_kg,
        },
      ]
    : [];

  return (
    <section className="rounded-xl border border-line bg-card p-5 shadow-sm">
      <h2 className="text-sm font-medium text-ink">What if I reduce my usage?</h2>
      <p className="mt-2 text-sm text-muted">
        Current: {currentHours} hours/day
      </p>
      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          onCompare();
        }}
      >
        <div className="sm:w-48">
          <InputField
            id="compare_hours"
            label="Try"
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
          className="rounded-full bg-leaf px-4 py-2 text-sm font-medium text-white hover:bg-leaf-dark disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Comparing…" : "Compare"}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      {result && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Current</p>
              <p className="mt-2 text-sm">{formatEnergy(result.current.energy_kwh)}</p>
              <p className="text-sm">{formatCost(result.current.monthly_cost)}</p>
              <p className="text-sm">{formatCo2(result.current.co2_kg)} CO₂</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">New</p>
              <p className="mt-2 text-sm">{formatEnergy(result.scenario.energy_kwh)}</p>
              <p className="text-sm">{formatCost(result.scenario.monthly_cost)}</p>
              <p className="text-sm">{formatCo2(result.scenario.co2_kg)} CO₂</p>
            </div>
          </div>
          <div className="rounded-lg bg-leaf-soft/70 px-4 py-3 text-sm">
            <p className="font-medium text-ink">Potential reduction</p>
            <p className="mt-1 text-muted">
              {formatEnergy(result.reduction.energy_kwh)} · {formatCost(result.reduction.monthly_cost)} ·{" "}
              {formatCo2(result.reduction.co2_kg)} CO₂
            </p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Current" fill="#57534e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="New" fill="#2f6f4e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
}
