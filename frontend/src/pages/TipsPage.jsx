import { useEffect, useMemo, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import TipCard from "../components/TipCard.jsx";
import { getTips } from "../services/api.js";

const FILTERS = ["All", "Energy", "Device Lifespan", "E-Waste", "Responsible Computing"];

export default function TipsPage() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let active = true;
    getTips()
      .then((data) => {
        if (active) setTips(data.tips || []);
      })
      .catch((err) => {
        if (active) setError(err.message || "Something went wrong. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(() => {
    if (category === "All") return tips;
    return tips.filter((tip) => tip.category === category);
  }, [tips, category]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Page Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
          Actionable Guidelines
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Green Computing Tips & Habits
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Practical strategies to curtail phantom energy draw, prolong device service life, and minimize harmful electronic waste.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter tips by category">
        {FILTERS.map((item) => {
          const isSelected = category === item;
          const count = item === "All" ? tips.length : tips.filter((t) => t.category === item).length;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                isSelected
                  ? "border-leaf bg-leaf text-white shadow-xs"
                  : "border-stone-200 bg-white text-muted hover:border-stone-300 hover:bg-stone-50"
              }`}
              aria-pressed={isSelected}
            >
              <span>{item}</span>
              {tips.length > 0 && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="mt-8">
        {loading && (
          <div className="rounded-2xl border border-stone-200/80 bg-white p-12 text-center shadow-sm">
            <LoadingSpinner label="Loading green computing guidelines..." centered />
          </div>
        )}

        <ErrorMessage message={error} />

        {!loading && !error && visible.length === 0 && (
          <EmptyState
            title="No Tips Found In This Category"
            description="Try selecting another category or view 'All' tips."
            action={
              <button
                type="button"
                onClick={() => setCategory("All")}
                className="rounded-full bg-leaf px-4 py-2 text-xs font-semibold text-white"
              >
                Reset Filter to All
              </button>
            }
          />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {visible.map((tip) => (
            <TipCard key={tip.id || tip.title} tip={tip} />
          ))}
        </div>
      </div>
    </div>
  );
}
