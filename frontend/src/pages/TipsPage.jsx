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
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-ink">Green Computing Tips</h1>
      <p className="mt-2 text-sm text-muted">
        Practical habits that reduce energy use, extend device life, and handle e-waste
        responsibly.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter tips by category">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              category === item
                ? "border-leaf bg-leaf-soft text-leaf-dark"
                : "border-line bg-card text-muted"
            }`}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {loading && <LoadingSpinner label="Loading tips..." />}
        <ErrorMessage message={error} />
        {!loading && !error && visible.length === 0 && (
          <EmptyState title="No tips in this category." description="Try another filter." />
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((tip) => (
            <TipCard key={tip.id || tip.title} tip={tip} />
          ))}
        </div>
      </div>
    </div>
  );
}
