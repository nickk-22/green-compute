export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white/80 px-6 py-12 text-center shadow-xs">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-soft text-leaf shadow-inner">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
      <p className="text-base font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-muted">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
