import { DEVICE_OPTIONS } from "../utils/devices.js";

export default function DeviceSelector({ value, onChange, id = "device_type" }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        Device
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm shadow-sm"
      >
        {DEVICE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
