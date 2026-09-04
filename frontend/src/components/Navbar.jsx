import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useApiHealth } from "../hooks/useApiHealth.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/calculator", label: "Calculator" },
  { to: "/history", label: "History" },
  { to: "/tips", label: "Tips" },
];

function linkClass({ isActive }) {
  return `rounded-md px-3 py-2 text-sm ${
    isActive ? "bg-leaf-soft text-leaf-dark" : "text-muted hover:text-ink"
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const health = useApiHealth();

  return (
    <header className="border-b border-line bg-card/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-lg font-semibold tracking-tight text-ink">
          GreenCompute
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {import.meta.env.DEV && (
            <span
              className={`text-xs ${health === "ok" ? "text-leaf" : "text-muted"}`}
              title="Backend health (development only)"
            >
              API {health === "ok" ? "online" : health === "down" ? "offline" : "…"}
            </span>
          )}
          <Link
            to="/calculator"
            className="rounded-full bg-leaf px-4 py-2 text-sm font-medium text-white hover:bg-leaf-dark"
          >
            Calculate Impact
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md border border-line px-3 py-2 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-4 py-3 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
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
            <Link
              to="/calculator"
              className="mt-2 rounded-full bg-leaf px-4 py-2 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Calculate Impact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
