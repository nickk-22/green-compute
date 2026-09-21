export default function ResultCard({ label, value, hint, icon, accentColor = "leaf" }) {
  return (
    <article className="eco-card relative flex flex-col justify-between overflow-hidden rounded-xl p-4 transition-all">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            {label}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100/80 text-stone-700">
            {icon}
          </div>
        </div>
        <p className="mt-3 text-2xl font-bold tracking-tight text-ink">{value}</p>
      </div>
      {hint && <p className="mt-2 text-[11px] leading-relaxed text-muted">{hint}</p>}
    </article>
  );
}
