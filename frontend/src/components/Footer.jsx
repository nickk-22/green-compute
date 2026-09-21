import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white/60">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-leaf text-white shadow-xs">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-tight text-ink">
                Green<span className="text-leaf">Compute</span>
              </span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-muted">
              Personal Green Computing Impact Analyzer — an educational initiative exploring everyday electronic power consumption, lifecycle efficiency, and carbon mindfulness.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink">Navigation</p>
            <ul className="mt-3 space-y-2 text-xs text-muted">
              <li>
                <Link to="/" className="hover:text-leaf transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-leaf transition-colors">Impact Calculator</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-leaf transition-colors">Usage History</Link>
              </li>
              <li>
                <Link to="/tips" className="hover:text-leaf transition-colors">Green Computing Tips</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink">Project Info</p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Designed as an educational tool. CO₂ calculations represent grid-mix estimates, not verified utility footprints.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-stone-200/80 pt-6 text-xs text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} GreenCompute. Open source educational project.</p>
          <p className="flex items-center gap-1.5 text-stone-400">
            <span>Powered by</span>
            <span className="font-semibold text-stone-600">FastAPI</span>
            <span>·</span>
            <span className="font-semibold text-stone-600">React</span>
            <span>·</span>
            <span className="font-semibold text-stone-600">Gemini</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
