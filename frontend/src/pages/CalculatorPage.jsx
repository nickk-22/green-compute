import { useState } from "react";
import { Link } from "react-router-dom";
import AIInsight from "../components/AIInsight.jsx";
import CalculatorForm from "../components/CalculatorForm.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import GreenScore from "../components/GreenScore.jsx";
import ImpactSummary from "../components/ImpactSummary.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import WhatIfComparison from "../components/WhatIfComparison.jsx";
import { analyzeImpact, calculateImpact, compareImpact, saveCalculation } from "../services/api.js";

export default function CalculatorPage() {
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [aiError, setAiError] = useState("");
  const [compareHours, setCompareHours] = useState("");
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareResult, setCompareResult] = useState(null);
  const [compareError, setCompareError] = useState("");

  async function handleCalculate(payload) {
    setError("");
    setAiError("");
    setSaved(false);
    setCompareResult(null);
    setCalculating(true);
    setAnalysis(null);
    try {
      const data = await calculateImpact(payload);
      setResult(data);
      setCompareHours(String(Math.max(0.1, Number((data.hours_per_day - 1).toFixed(1)))));
      setAnalyzing(true);
      try {
        const insight = await analyzeImpact({
          device_type: data.device_type,
          power_watts: data.power_watts,
          hours_per_day: data.hours_per_day,
          usage_days: data.usage_days,
          energy_kwh: data.energy_kwh,
          monthly_cost: data.monthly_cost,
          co2_kg: data.co2_kg,
          green_score: data.green_score,
          impact_level: data.impact_level,
        });
        setAnalysis(insight);
      } catch {
        setAiError("unavailable");
        setAnalysis({
          available: false,
          fallback_message:
            "AI insights are temporarily unavailable, but your calculation was completed successfully.",
        });
      } finally {
        setAnalyzing(false);
      }
    } catch (err) {
      setResult(null);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setCalculating(false);
    }
  }

  async function handleSave() {
    if (!result || saving || saved) return;
    setSaving(true);
    setError("");
    try {
      await saveCalculation(result);
      setSaved(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleCompare() {
    if (!result) return;
    setCompareError("");
    setCompareLoading(true);
    try {
      const data = await compareImpact({
        device_type: result.device_type,
        power_watts: result.power_watts,
        hours_per_day: result.hours_per_day,
        usage_days: result.usage_days,
        electricity_rate: result.electricity_rate,
        compare_hours_per_day: Number(compareHours),
      });
      setCompareResult(data);
    } catch (err) {
      setCompareError(err.message || "Something went wrong. Please try again.");
    } finally {
      setCompareLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-ink">Impact calculator</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Estimates use typical wattage values. Results are educational, not a utility bill or a
        certified carbon audit.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="rounded-xl border border-line bg-card p-5 shadow-sm">
          <CalculatorForm onSubmit={handleCalculate} loading={calculating} />
        </div>

        <div className="space-y-5">
          {calculating && <LoadingSpinner label="Calculating your impact..." />}
          <ErrorMessage message={error} />

          {result && (
            <>
              <GreenScore score={result.green_score} level={result.impact_level} />
              <ImpactSummary result={result} />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || saved}
                  className="rounded-full bg-leaf px-4 py-2 text-sm font-medium text-white hover:bg-leaf-dark disabled:opacity-60"
                >
                  {saved ? "✓ Calculation saved" : saving ? "Saving…" : "Save Result"}
                </button>
                {saved && (
                  <Link to="/history" className="text-sm text-leaf underline-offset-2 hover:underline">
                    View History
                  </Link>
                )}
              </div>
              <AIInsight analysis={analysis} loading={analyzing} error={aiError} />
              <WhatIfComparison
                currentHours={result.hours_per_day}
                compareHours={compareHours}
                onCompareHoursChange={setCompareHours}
                onCompare={handleCompare}
                loading={compareLoading}
                result={compareResult}
                error={compareError}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
