import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "./EmptyState.jsx";
import { formatDate } from "../utils/format.js";
import { deviceLabel } from "../utils/devices.js";

export default function ImpactChart({ records }) {
  if (!records || records.length < 2) {
    return (
      <EmptyState
        title="Energy Consumption Trend"
        description="Save at least two calculations to chart your usage trajectory over time."
      />
    );
  }

  const data = [...records]
    .slice()
    .reverse()
    .map((row) => ({
      date: formatDate(row.created_at),
      energy: Number(Number(row.energy_kwh).toFixed(1)),
      device: deviceLabel(row.device_type),
      cost: Number(row.monthly_cost).toFixed(0),
    }));

  return (
    <section className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-ink">Energy Usage Trajectory</h2>
          <p className="text-xs text-muted">Chronological kWh consumption across saved calculations</p>
        </div>
        <span className="rounded-full bg-leaf-soft px-2.5 py-0.5 text-xs font-semibold text-leaf-dark">
          {records.length} Points
        </span>
      </div>

      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="leafAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2f6f4e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2f6f4e" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0eeeb" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#78716c" }} axisLine={{ stroke: "#e7e5e4" }} />
            <YAxis
              tick={{ fontSize: 11, fill: "#78716c" }}
              axisLine={{ stroke: "#e7e5e4" }}
              unit=" kWh"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-stone-200 bg-white p-3 shadow-md text-xs">
                      <p className="font-semibold text-stone-500">{label}</p>
                      <p className="mt-1 font-bold text-ink">{item.device}</p>
                      <p className="text-leaf font-bold">{item.energy} kWh</p>
                      <p className="text-stone-600">Est. ₹{item.cost}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="energy"
              stroke="#2f6f4e"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#leafAreaGradient)"
              dot={{ r: 3.5, fill: "#2f6f4e", strokeWidth: 1.5, stroke: "#ffffff" }}
              activeDot={{ r: 5, fill: "#24583e" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
