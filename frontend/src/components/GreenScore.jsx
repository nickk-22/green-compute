export default function GreenScore({ score, level }) {
  const numericScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));

  // Determine styling based on score and impact level
  const isEfficient = numericScore >= 70;
  const isModerate = numericScore >= 45 && numericScore < 70;

  const strokeColor = isEfficient
    ? "#2f6f4e"
    : isModerate
    ? "#d97706"
    : "#e11d48";

  const badgeBg = isEfficient
    ? "bg-leaf-soft text-leaf-dark border-leaf-border"
    : isModerate
    ? "bg-amber-50 text-amber-900 border-amber-200"
    : "bg-rose-50 text-rose-900 border-rose-200";

  // SVG Circle calculation
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (numericScore / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: strokeColor }}
      />

      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Environmental Performance
          </span>
          <h2 className="text-lg font-bold tracking-tight text-ink">GreenCompute Score</h2>
          <p className="max-w-xs text-xs text-muted">
            Educational score rating energy intensity and daily usage pattern.
          </p>

          <div className="pt-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${badgeBg}`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: strokeColor }}
              />
              {level} Impact Tier
            </span>
          </div>
        </div>

        {/* Circular Progress Meter */}
        <div className="relative mt-4 flex items-center justify-center sm:mt-0 sm:shrink-0">
          <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 120 120">
            {/* Background track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="#f0eeeb"
              strokeWidth="10"
              className="transition-all"
            />
            {/* Progress arc */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Centered Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold tracking-tight text-ink">
              {numericScore}
            </span>
            <span className="text-[11px] font-semibold text-muted">/ 100</span>
          </div>
        </div>
      </div>

      {/* Benchmark gradient bar */}
      <div className="mt-5 border-t border-stone-100 pt-4">
        <div className="flex items-center justify-between text-[11px] font-medium text-muted">
          <span>0 (High Impact)</span>
          <span>45 (Moderate)</span>
          <span>70+ (Eco-friendly)</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${numericScore}%`,
              backgroundColor: strokeColor,
            }}
          />
        </div>
      </div>
    </div>
  );
}
