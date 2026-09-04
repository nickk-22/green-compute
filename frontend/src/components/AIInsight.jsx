export default function AIInsight({ analysis, loading, error }) {
  if (loading) {
    return (
      <section className="rounded-xl border border-line bg-card p-5 shadow-sm">
        <p className="text-sm font-medium text-ink">AI Green Insight</p>
        <p className="mt-3 text-sm text-muted">Generating your personalized insight...</p>
      </section>
    );
  }

  if (error || analysis?.available === false) {
    return (
      <section className="rounded-xl border border-line bg-card p-5 shadow-sm">
        <p className="text-sm font-medium text-ink">AI Green Insight</p>
        <p className="mt-3 text-sm text-muted">
          {analysis?.fallback_message ||
            "AI insights are temporarily unavailable, but your calculation was completed successfully."}
        </p>
        <p className="mt-2 text-xs text-muted">AI-generated educational insight</p>
      </section>
    );
  }

  if (!analysis) return null;

  return (
    <section className="rounded-xl border border-line bg-card p-5 shadow-sm" aria-labelledby="ai-heading">
      <h2 id="ai-heading" className="text-sm font-medium text-ink">
        AI Green Insight
      </h2>
      <p className="mt-3 text-sm text-ink">{analysis.summary}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">Why?</p>
      <p className="mt-1 text-sm text-muted">{analysis.impact_explanation}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
        Ways to compute greener
      </p>
      <ul className="mt-2 space-y-2 text-sm text-ink">
        {(analysis.recommendations || []).map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="text-leaf">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
        What if you reduce your daily usage?
      </p>
      <p className="mt-1 text-sm text-muted">{analysis.improvement_message}</p>
      <p className="mt-4 text-xs text-muted">AI-generated educational insight</p>
    </section>
  );
}
