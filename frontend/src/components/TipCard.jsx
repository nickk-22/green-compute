export default function TipCard({ tip }) {
  return (
    <article className="rounded-xl border border-line bg-card p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-leaf">{tip.category}</p>
      <h3 className="mt-2 text-base font-semibold text-ink">{tip.title}</h3>
      <p className="mt-2 text-sm text-muted">{tip.description}</p>
    </article>
  );
}
