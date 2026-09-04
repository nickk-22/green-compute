export default function ResultCard({ label, value, hint, icon }) {
  return (
    <article className="rounded-xl border border-line bg-card p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {icon} {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </article>
  );
}
