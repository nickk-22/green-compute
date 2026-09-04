import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "./EmptyState.jsx";
import { formatDate } from "../utils/format.js";

export default function ImpactChart({ records }) {
  if (!records || records.length < 2) {
    return (
      <EmptyState
        title="Energy Usage Trend"
        description="Complete more calculations to see your trend."
      />
    );
  }

  const data = [...records]
    .slice()
    .reverse()
    .map((row) => ({
      date: formatDate(row.created_at),
      energy: Number(row.energy_kwh),
    }));

  return (
    <section className="rounded-xl border border-line bg-card p-4 shadow-sm">
      <h2 className="text-sm font-medium text-ink">Energy Usage Trend</h2>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ value: "kWh", angle: -90, position: "insideLeft", fontSize: 12 }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="energy" stroke="#2f6f4e" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
