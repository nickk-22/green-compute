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

export default function CalculatorForm({ onSubmit, loading }) {
  const [deviceType, setDeviceType] = useState("laptop");
  const [power, setPower] = useState(String(DEFAULT_DEVICES.laptop.watts));
  const [hours, setHours] = useState("6");
  const [days, setDays] = useState("30");
  const [rate, setRate] = useState("8");
  const [errors, setErrors] = useState({});

  const selected = DEFAULT_DEVICES[deviceType];

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
    setPower(String(DEFAULT_DEVICES[nextType].watts));
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
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
        hint={`Estimated power consumption: ${selected.watts} W`}
      />
      <p className="text-xs text-muted">
        This is an estimate. Actual power usage varies by device and workload.
      </p>

      <InputField
        id="hours_per_day"
        label="Daily usage"
        unit="hours/day"
        type="number"
        min="0.1"
        max="24"
        step="0.1"
        value={hours}
        onChange={(event) => setHours(event.target.value)}
        error={errors.hours_per_day}
      />

      <InputField
        id="usage_days"
        label="Usage days"
        unit="days"
        type="number"
        min="1"
        max="31"
        step="1"
        value={days}
        onChange={(event) => setDays(event.target.value)}
        error={errors.usage_days}
      />

      <InputField
        id="electricity_rate"
        label="Electricity rate"
        unit="₹/kWh"
        type="number"
        min="0"
        step="0.1"
        value={rate}
        onChange={(event) => setRate(event.target.value)}
        error={errors.electricity_rate}
        tooltip="1 unit of electricity ≈ 1 kWh. You can check your electricity bill for the rate."
      />

      <button
        type="submit"
        className="w-full rounded-full bg-leaf px-4 py-2.5 text-sm font-medium text-white hover:bg-leaf-dark disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Calculating your impact..." : "Calculate"}
      </button>
    </form>
  );
}
