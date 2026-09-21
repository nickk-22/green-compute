function CategoryBadgeIcon({ category }) {
  switch (category) {
    case "Energy":
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case "Device Lifespan":
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      );
    case "E-Waste":
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      );
    default:
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
        </svg>
      );
  }
}

export default function TipCard({ tip }) {
  return (
    <article className="eco-card flex flex-col justify-between rounded-2xl p-5 transition-all">
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf-border bg-leaf-soft px-2.5 py-0.5 text-[11px] font-semibold text-leaf-dark">
            <CategoryBadgeIcon category={tip.category} />
            <span>{tip.category}</span>
          </span>
          <span className="text-[10px] text-stone-400 font-medium">Habit</span>
        </div>

        <h3 className="mt-3.5 text-sm font-bold text-ink leading-snug">{tip.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted">{tip.description}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
        <span>Daily Green Habit</span>
        <span className="text-leaf font-semibold">Easy Implementation</span>
      </div>
    </article>
  );
}
