const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new Error("Something went wrong. Please try again.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const detail = data?.detail;
    const message =
      typeof detail === "string"
        ? detail
        : "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}

export function calculateImpact(payload) {
  return request("/api/calculations/calculate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function analyzeImpact(payload) {
  return request("/api/ai/analyze", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function saveCalculation(payload) {
  return request("/api/calculations/save", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getHistory() {
  return request("/api/calculations/history");
}

export function getTips() {
  return request("/api/tips");
}

export function compareImpact(payload) {
  return request("/api/calculations/compare", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getHealth() {
  return request("/api/health");
}
