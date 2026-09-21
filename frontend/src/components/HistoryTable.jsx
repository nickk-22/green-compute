import { deviceLabel } from "../utils/devices.js";
import { formatCo2, formatCost, formatEnergy, formatDate } from "../utils/format.js";

export default function HistoryTable({ records, onSelect, selectedId }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
      <div className="border-b border-stone-100 px-5 py-3.5">
        <h2 className="text-sm font-bold text-ink">Calculation Records ({records.length})</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <caption className="sr-only">Saved calculations</caption>
          <thead className="border-b border-stone-200/80 bg-stone-50/80 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <tr>
              <th scope="col" className="px-5 py-3">Date</th>
              <th scope="col" className="px-5 py-3">Device</th>
              <th scope="col" className="px-5 py-3">Usage</th>
              <th scope="col" className="px-5 py-3">Energy</th>
              <th scope="col" className="px-5 py-3">Est. Cost</th>
              <th scope="col" className="px-5 py-3">Carbon (CO₂)</th>
              <th scope="col" className="px-5 py-3">Score</th>
              <th scope="col" className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {records.map((row) => {
              const isSelected = selectedId === row.id;
              const isHigh = row.green_score >= 70;
              const isMod = row.green_score >= 45 && row.green_score < 70;

              return (
                <tr
                  key={row.id}
                  className={`transition-colors hover:bg-stone-50/70 ${
                    isSelected ? "bg-leaf-soft/40" : ""
                  }`}
                >
                  <td className="px-5 py-3.5 font-medium text-stone-600 whitespace-nowrap">
                    {formatDate(row.created_at)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 font-semibold text-ink">
                      {deviceLabel(row.device_type)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted whitespace-nowrap">
                    {row.hours_per_day}h/d · {row.usage_days}d
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-ink whitespace-nowrap">
                    {formatEnergy(row.energy_kwh)}
                  </td>
                  <td className="px-5 py-3.5 text-stone-700 whitespace-nowrap">
                    {formatCost(row.monthly_cost)}
                  </td>
                  <td className="px-5 py-3.5 text-muted whitespace-nowrap">
                    {formatCo2(row.co2_kg)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isHigh
                          ? "bg-leaf-soft text-leaf-dark"
                          : isMod
                          ? "bg-amber-100 text-amber-900"
                          : "bg-rose-100 text-rose-900"
                      }`}
                    >
                      {row.green_score} pts
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSelect(row)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-leaf hover:text-leaf-dark hover:underline underline-offset-2"
                    >
                      <span>Details</span>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
