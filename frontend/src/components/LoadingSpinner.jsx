export default function LoadingSpinner({ label = "Loading…" }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted" role="status" aria-live="polite">
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-line border-t-leaf"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
