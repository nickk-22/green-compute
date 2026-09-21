import { useMemo, useState } from "react";
import { DEFAULT_DEVICES } from "../utils/devices.js";
import DeviceSelector from "./DeviceSelector.jsx";
import InputField from "./InputField.jsx";

function validate(form) {
  const errors = {};
  const power = Number(form.power_watts);
  const hours = Number(form.hours_per_day);
  const days = Number(form.usage_days);
  const rate = Number(form.electricity_rate);

  if (!(power > 0) || power > 5000) {
    errors.power_watts = "Enter a power value between 1 and 5000 W.";
  }
  if (!(hours > 0) || hours > 24) {
    errors.hours_per_day = "Hours must be greater than 0 and at most 24.";
  }
  if (!Number.isInteger(days) || days < 1 || days > 31) {
    errors.usage_days = "Usage days must be between 1 and 31.";
  }
  if (!(rate >= 0)) {
    errors.electricity_rate = "Electricity rate cannot be negative.";
  }
  return errors;
}

const HOUR_SHORTCUTS = [2, 4, 6, 8, 12];
const DAY_SHORTCUTS = [7, 15, 30];

export default function CalculatorForm({ onSubmit, loading }) {
  const [deviceType, setDeviceType] = useState("laptop");
  const [power, setPower] = useState(String(DEFAULT_DEVICES.laptop.watts));
  const [hours, setHours] = useState("6");
  const [days, setDays] = useState("30");
  const [rate, setRate] = useState("8");
  const [errors, setErrors] = useState({});

  const selected = DEFAULT_DEVICES[deviceType] || DEFAULT_DEVICES.laptop;

  const payload = useMemo(
    () => ({
      device_type: deviceType,
      power_watts: Number(power),
      hours_per_day: Number(hours),
      usage_days: Number(days),
      electricity_rate: Number(rate),
    }),
    [deviceType, power, hours, days, rate]
  );

  function handleDeviceChange(nextType) {
    setDeviceType(nextType);
    setPower(String(DEFAULT_DEVICES[nextType]?.watts || 50));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate({
      power_watts: power,
      hours_per_day: hours,
      usage_days: days,
      electricity_rate: rate,
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(payload);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* 1. Device Selection */}
      <section className="space-y-3">
        <DeviceSelector value={deviceType} onChange={handleDeviceChange} />

        <InputField
          id="power_watts"
          label="Power consumption"
          unit="Watts (W)"
          type="number"
          min="1"
          max="5000"
          step="1"
          value={power}
          onChange={(event) => setPower(event.target.value)}
          error={errors.power_watts}
          hint={`Default rating for ${selected.label}: ${selected.watts} W`}
        />
      </section>

      <div className="border-t border-stone-200/80" />

      {/* 2. Usage Pattern */}
      <section className="space-y-4">
        <div>
          <InputField
            id="hours_per_day"
            label="Daily active usage"
            unit="hours/day"
            type="number"
            min="0.1"
            max="24"
            step="0.1"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
            error={errors.hours_per_day}
          />
          {/* Quick hour shortcuts */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-stone-500">Quick set:</span>
            {HOUR_SHORTCUTS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHours(String(h))}
                className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                  Number(hours) === h
                    ? "bg-leaf-soft text-leaf-dark font-semibold border border-leaf/30"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        <div>
          <InputField
            id="usage_days"
            label="Calculation period"
            unit="days"
            type="number"
            min="1"
            max="31"
            step="1"
            value={days}
            onChange={(event) => setDays(event.target.value)}
            error={errors.usage_days}
          />
          {/* Quick day shortcuts */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-stone-500">Preset:</span>
            {DAY_SHORTCUTS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(String(d))}
                className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                  Number(days) === d
                    ? "bg-leaf-soft text-leaf-dark font-semibold border border-leaf/30"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {d === 30 ? "Monthly (30d)" : `${d} days`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-stone-200/80" />

      {/* 3. Tariff */}
      <section>
        <InputField
          id="electricity_rate"
          label="Electricity tariff"
          unit="₹/kWh"
          type="number"
          min="0"
          step="0.1"
          value={rate}
          onChange={(event) => setRate(event.target.value)}
          error={errors.electricity_rate}
          tooltip="1 unit = 1 kWh. Check your electricity bill for exact state/regional tariff."
        />
      </section>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-leaf px-4 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-leaf-dark hover:shadow-sm active:scale-98 disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span>Calculating Impact…</span>
          </>
        ) : (
          <>
            <span>Compute Environmental Impact</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
