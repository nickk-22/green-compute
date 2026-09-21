export default function InputField({
  id,
  label,
  hint,
  unit,
  error,
  tooltip,
  className = "",
  ...inputProps
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </label>
        {unit && (
          <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-muted">
            {unit}
          </span>
        )}
      </div>
      <div className="relative rounded-lg shadow-sm">
        <input
          id={id}
          className={`w-full rounded-lg border bg-card px-3.5 py-2.5 text-sm font-medium text-ink placeholder:text-stone-400 transition-all duration-150 focus:outline-none ${
            error
              ? "border-red-300 ring-1 ring-red-400/30 focus:border-red-500 focus:ring-red-400"
              : "border-stone-200 hover:border-stone-300 focus:border-leaf focus:ring-2 focus:ring-leaf/20"
          } ${className}`}
          {...inputProps}
        />
      </div>
      {hint && <p className="text-xs text-muted/90">{hint}</p>}
      {tooltip && (
        <p className="text-xs text-muted" id={`${id}-help`}>
          {tooltip}
        </p>
      )}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600" role="alert">
          <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
