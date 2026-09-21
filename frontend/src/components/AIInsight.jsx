export default function AIInsight({ analysis, loading, error }) {
  // Loading skeleton state
  if (loading) {
    return (
      <section
        className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm"
        aria-label="Generating AI insight"
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-leaf-soft text-leaf">
              <svg className="h-4 w-4 animate-spin text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Generating AI Green Analysis…</p>
              <p className="text-[11px] text-muted">Consulting Gemini for tailored efficiency habits</p>
            </div>
          </div>
          <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Analyzing
          </span>
        </div>

        {/* Shimmer skeleton lines */}
        <div className="mt-5 space-y-3.5">
          <div className="h-4 w-3/4 rounded-md animate-shimmer" />
          <div className="h-3 w-full rounded-md animate-shimmer" />
          <div className="h-3 w-5/6 rounded-md animate-shimmer" />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="h-12 rounded-lg animate-shimmer" />
            <div className="h-12 rounded-lg animate-shimmer" />
          </div>
        </div>
      </section>
    );
  }

  // Error or fallback unavailable state
  if (error || analysis?.available === false) {
    return (
      <section className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-ink">AI Insights Offline</h2>
            <p className="text-[11px] text-muted">Your numerical calculation is 100% authoritative</p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {analysis?.fallback_message ||
            "Gemini AI interpretation is temporarily unavailable, but all energy, cost, and carbon metrics above were computed successfully."}
        </p>
        <p className="mt-2 text-[10px] text-stone-400">
          Tip: Set GEMINI_API_KEY in the backend to enable automated AI recommendations.
        </p>
      </section>
    );
  }

  if (!analysis) return null;

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-leaf-border/80 bg-white p-6 shadow-sm transition-all"
      aria-labelledby="ai-heading"
    >
      {/* Top Banner with Gemini AI Badge */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-leaf to-emerald-600 text-white shadow-xs">
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
          <div>
            <h2 id="ai-heading" className="text-sm font-bold tracking-tight text-ink">
              Gemini AI Green Insight
            </h2>
            <p className="text-[11px] text-muted">Personalized interpretation & efficiency strategy</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full border border-leaf-border bg-leaf-soft px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-leaf-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
          AI Analysis
        </span>
      </div>

      {/* Summary Highlight Box */}
      <div className="mt-4 rounded-xl border border-leaf-border/50 bg-leaf-soft/40 p-4">
        <p className="text-sm font-medium leading-relaxed text-stone-800">
          {analysis.summary}
        </p>
      </div>

      {/* Why This Happens */}
      {analysis.impact_explanation && (
        <div className="mt-5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
            <svg className="h-3.5 w-3.5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span>Underlying Factors</span>
          </div>
          <p className="text-xs leading-relaxed text-stone-600 pl-5">
            {analysis.impact_explanation}
          </p>
        </div>
      )}

      {/* Recommended Green Habits */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
            <svg className="h-3.5 w-3.5 text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Actionable Green Habits</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-1">
            {analysis.recommendations.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-stone-200/80 bg-stone-50/50 p-3 transition-colors hover:border-leaf-border hover:bg-leaf-soft/20"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf font-bold text-xs mt-0.5">
                  ✓
                </div>
                <p className="text-xs leading-relaxed text-stone-800 font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What-If Usage Reduction Impact */}
      {analysis.improvement_message && (
        <div className="mt-5 rounded-xl border border-amber-200/70 bg-amber-50/40 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
            <svg className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
            <span>Usage Reduction Projection</span>
          </div>
          <p className="mt-1 text-xs text-amber-950 leading-relaxed pl-5">
            {analysis.improvement_message}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-[10px] text-stone-400">
        <span>Powered by Google Gemini 2.0 Flash</span>
        <span>Educational impact interpretation</span>
      </div>
    </section>
  );
}
