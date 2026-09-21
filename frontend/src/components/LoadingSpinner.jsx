export default function LoadingSpinner({ label = "Loading…", centered = false }) {
  return (
    <div
      className={`flex items-center gap-3 text-sm font-medium text-muted ${
        centered ? "justify-center py-8" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        <span
          className="absolute h-5 w-5 animate-ping rounded-full bg-leaf/20"
          aria-hidden="true"
        />
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-stone-200 border-t-leaf"
          aria-hidden="true"
        />
      </div>
      <span className="text-xs text-stone-600 tracking-wide">{label}</span>
    </div>
  );
}
