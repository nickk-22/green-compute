export const DEFAULT_DEVICES = {
  laptop: { label: "Laptop", watts: 50 },
  desktop: { label: "Desktop PC", watts: 200 },
  gaming_pc: { label: "Gaming PC", watts: 400 },
  monitor: { label: "Monitor", watts: 40 },
  printer: { label: "Printer", watts: 30 },
  wifi_router: { label: "Wi-Fi Router", watts: 10 },
  smartphone: { label: "Smartphone", watts: 10 },
  tablet: { label: "Tablet", watts: 15 },
  custom: { label: "Custom Device", watts: 50 },
};

export const DEVICE_OPTIONS = Object.entries(DEFAULT_DEVICES).map(([value, meta]) => ({
  value,
  label: meta.label,
  watts: meta.watts,
}));

export function deviceLabel(deviceType) {
  return DEFAULT_DEVICES[deviceType]?.label || deviceType;
}
