export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-rose-200/80 bg-rose-50/70 p-4 text-sm text-rose-900 shadow-sm"
      role="alert"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex-1 pt-0.5">
        <p className="font-semibold text-rose-950">Notice</p>
        <p className="mt-0.5 text-xs text-rose-800 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
