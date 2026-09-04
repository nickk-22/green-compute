export default function GreenScore({ score, level }) {
  const tone =
    level === "Low" ? "text-leaf" : level === "High" ? "text-amber-800" : "text-stone-700";

  return (
    <div className="rounded-2xl border border-line bg-card px-6 py-8 text-center shadow-sm">
      <p className="text-sm text-muted">Your Green Computing Impact</p>
      <p className="mt-4 text-5xl" aria-hidden="true">
        🌱
      </p>
      <p className={`mt-2 text-4xl font-semibold ${tone}`}>
        {score} <span className="text-lg font-normal text-muted">/ 100</span>
      </p>
      <p className="mt-1 text-sm font-medium text-ink">GreenCompute Score</p>
      <p className="mt-3 text-xs text-muted">
        An educational indicator for this project, not an official environmental standard.
      </p>
    </div>
  );
}
