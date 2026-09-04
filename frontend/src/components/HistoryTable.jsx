import { deviceLabel } from "../utils/devices.js";
import { formatCo2, formatEnergy, formatDate } from "../utils/format.js";

export default function HistoryTable({ records, onSelect }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-card shadow-sm">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">Saved calculations</caption>
        <thead className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Date
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Device
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Energy
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              CO₂
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3">{formatDate(row.created_at)}</td>
              <td className="px-4 py-3">{deviceLabel(row.device_type)}</td>
              <td className="px-4 py-3">{formatEnergy(row.energy_kwh)}</td>
              <td className="px-4 py-3">{formatCo2(row.co2_kg)}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  className="text-leaf underline-offset-2 hover:underline"
                  onClick={() => onSelect(row)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
