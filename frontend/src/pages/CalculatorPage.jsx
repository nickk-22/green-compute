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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Page Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
          Hardware & Energy Analysis
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Device Impact Calculator
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Estimate energy consumption, electricity cost, and associated carbon emissions based on typical hardware wattages. All numbers are computed deterministically.
        </p>
      </div>

      {/* Main Grid: Form on Left, Output on Right */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,23rem)_1fr] items-start">
        {/* Left: Input Form */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">
            Configure Device Usage
          </h2>
          <CalculatorForm onSubmit={handleCalculate} loading={calculating} />
        </div>

        {/* Right: Results Display or Empty Welcome */}
        <div className="space-y-6">
          {calculating && (
            <div className="rounded-2xl border border-stone-200/80 bg-white p-8 text-center shadow-sm">
              <LoadingSpinner label="Computing energy, cost & carbon metrics..." centered />
            </div>
          )}

          <ErrorMessage message={error} />

          {!calculating && !result && (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 p-8 text-center sm:p-12">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-soft text-leaf shadow-inner">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-ink">Ready to Analyze</h2>
              <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted">
                Choose a device preset on the left or enter custom wattage to view your GreenCompute Score, carbon footprint, and Gemini AI efficiency insights.
              </p>
            </div>
          )}

          {result && (
            <>
              {/* GreenCompute Score Card */}
              <GreenScore score={result.green_score} level={result.impact_level} />

              {/* Impact Metric Cards (Energy, Cost, CO2) */}
              <ImpactSummary result={result} />

              {/* Save Calculation Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200/80 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-stone-700">
                    {saved ? "Calculation saved to your record" : "Keep track of this calculation"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving || saved}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold shadow-xs transition-all ${
                      saved
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-leaf text-white hover:bg-leaf-dark active:scale-98 disabled:opacity-60"
                    }`}
                  >
                    {saved ? (
                      <>
                        <span>✓ Saved to History</span>
                      </>
                    ) : saving ? (
                      "Saving…"
                    ) : (
                      <>
                        <span>Save Calculation</span>
                      </>
                    )}
                  </button>

                  {saved && (
                    <Link
                      to="/history"
                      className="text-xs font-semibold text-leaf hover:text-leaf-dark hover:underline underline-offset-2"
                    >
                      View in History →
                    </Link>
                  )}
                </div>
              </div>

              {/* AI Insight Box */}
              <AIInsight analysis={analysis} loading={analyzing} error={aiError} />

              {/* What-If Usage Reduction Simulator */}
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
