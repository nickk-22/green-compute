export function formatEnergy(value) {
  return `${Number(value).toFixed(1)} kWh`;
}

export function formatCost(value) {
  return `₹${Number(value).toFixed(0)}`;
}

export function formatCo2(value) {
  return `${Number(value).toFixed(1)} kg`;
}

export function formatDate(iso) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "2-digit",
  });
}

export function impactMessage(level) {
  if (level === "Low") {
    return "Your device usage is relatively efficient.";
  }
  if (level === "High") {
    return "Your current usage has a relatively high energy impact.";
  }
  return "Your usage has a moderate energy impact. Small changes can help.";
}
