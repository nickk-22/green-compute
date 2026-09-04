export default function InputField({
  id,
  label,
  hint,
  unit,
  error,
  tooltip,
  ...inputProps
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {unit && <span className="text-xs text-muted">{unit}</span>}
      </div>
      <input
        id={id}
        className="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm shadow-sm"
        {...inputProps}
      />
      {hint && <p className="text-xs text-muted">{hint}</p>}
      {tooltip && (
        <p className="text-xs text-muted" id={`${id}-help`}>
          {tooltip}
        </p>
      )}
      {error && (
        <p className="text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
