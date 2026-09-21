import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useApiHealth } from "../hooks/useApiHealth.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/calculator", label: "Calculator" },
  { to: "/history", label: "History" },
  { to: "/tips", label: "Tips & Habits" },
];

function linkClass({ isActive }) {
  return `relative px-3.5 py-1.5 text-sm font-medium transition-all duration-150 rounded-full ${
    isActive
      ? "bg-leaf-soft text-leaf-dark font-semibold shadow-xs"
      : "text-muted hover:text-ink hover:bg-stone-100/70"
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const health = useApiHealth();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md transition-all">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-leaf"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5 transition-transform active:scale-95">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf text-white shadow-xs transition-transform group-hover:scale-105">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-ink">
              Green<span className="text-leaf">Compute</span>
            </span>
            <span className="hidden sm:inline-block ml-1.5 rounded bg-leaf-soft px-1.5 py-0.2 text-[10px] font-semibold uppercase tracking-wider text-leaf-dark">
              Beta
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-1 rounded-full border border-stone-200/80 bg-stone-50/70 p-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action & Health indicator */}
        <div className="hidden items-center gap-3.5 md:flex">
          <div
            className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50/80 px-2.5 py-1 text-xs font-medium"
            title={`Backend status: ${health}`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  health === "ok"
                    ? "animate-ping bg-emerald-400"
                    : health === "down"
                    ? "bg-rose-400"
                    : "bg-amber-400"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  health === "ok"
                    ? "bg-emerald-500"
                    : health === "down"
                    ? "bg-rose-500"
                    : "bg-amber-500"
                }`}
              />
            </span>
            <span className="text-[11px] text-muted">
              {health === "ok" ? "System active" : health === "down" ? "Offline" : "Checking…"}
            </span>
          </div>

          <Link
            to="/calculator"
            className="inline-flex items-center gap-1.5 rounded-full bg-leaf px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-leaf-dark hover:shadow-sm active:scale-98"
          >
            <span>Analyze Device</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation menu</span>
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav id="mobile-nav" className="border-t border-stone-200 bg-white px-4 py-3 shadow-lg md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-muted">
                Status: {health === "ok" ? "Online" : health === "down" ? "Offline" : "Connecting..."}
              </span>
              <Link
                to="/calculator"
                className="rounded-full bg-leaf px-4 py-1.5 text-center text-xs font-semibold text-white shadow-xs"
                onClick={() => setOpen(false)}
              >
                Analyze Device
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
