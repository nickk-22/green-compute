import { Link } from "react-router-dom";

const features = [
  {
    title: "Deterministic Energy Models",
    body: "Measure true electricity draw (kWh) derived mathematically from active device power and daily duration.",
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    badge: "Accurate Math",
  },
  {
    title: "Carbon Footprint Estimation",
    body: "Translate raw kilowatt-hours into estimated kg CO₂ using national grid carbon-intensity factors.",
    icon: (
      <svg className="h-5 w-5 text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
    badge: "CO₂ Impact",
  },
  {
    title: "Gemini AI Strategy",
    body: "Receive structured advice from Google Gemini 2.0 Flash on sleep modes, settings, and hardware lifespan.",
    icon: (
      <svg className="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    badge: "GenAI Powered",
  },
];

const steps = [
  { number: "01", title: "Select Device", desc: "Choose your hardware or enter custom power" },
  { number: "02", title: "Set Hours", desc: "Define daily hours and calculation timeframe" },
  { number: "03", title: "Inspect Footprint", desc: "Review kWh, costs, and carbon estimations" },
  { number: "04", title: "Optimize Habits", desc: "Simulate what-if usage and apply AI tips" },
];

const reasons = [
  {
    title: "Energy Efficiency",
    body: "Optimizing active device states and sleep timers saves power without compromising daily productivity.",
    icon: "⚡",
  },
  {
    title: "Hardware Longevity",
    body: "Proper thermal care and keeping hardware for 4–5 years cuts the massive environmental cost of manufacturing.",
    icon: "🛡️",
  },
  {
    title: "Responsible E-Waste Handling",
    body: "Electronics contain rare minerals and toxic heavy metals. Recycling properly protects soil and groundwater.",
    icon: "♻️",
  },
  {
    title: "Phantom Load Prevention",
    body: "Peripherals, idle displays, and background standby modes accumulate silently on monthly electricity bills.",
    icon: "🔌",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="eco-hero-mesh border-b border-stone-200/80 bg-white/70">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-leaf-border bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf-dark shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-leaf" />
            Personal Green Computing Impact Analyzer
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl sm:leading-tight">
            Green computing, <br className="hidden sm:inline" />
            <span className="text-leaf">made measurable.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg leading-relaxed">
            Understand the electricity, financial cost, and carbon footprint behind your everyday laptops, desktops, and workstations. Make data-driven choices for sustainable tech habits.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-leaf-dark hover:shadow-md active:scale-98"
            >
              <span>Calculate My Impact</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              to="/tips"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-xs transition-all hover:bg-stone-50 active:scale-98"
            >
              <span>Explore Green Tips</span>
            </Link>
          </div>

          {/* 4-Step Process Flow */}
          <div className="mt-14 pt-8 border-t border-stone-200/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              How GreenCompute Works
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border-stone-200/80 bg-white/90 p-4 shadow-xs"
                >
                  <span className="text-xs font-bold text-leaf">{step.number}</span>
                  <h2 className="mt-1 text-sm font-bold text-ink">{step.title}</h2>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-leaf">Core Features</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Designed for Clarity & Transparency
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted">
            All calculations run on deterministic formulas. AI is used solely for strategic interpretation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="eco-card rounded-2xl p-6 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100/90 shadow-xs">
                  {feature.icon}
                </div>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-muted">
                  {feature.badge}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{feature.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Educational: Why Green Computing? */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-leaf">
              Educational Context
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Why Prioritize Green Computing?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
              Computers and data devices consume electricity continuously. Small shifts in habit—such as enabling aggressive standby modes, dimming unnecessary brightness, and keeping hardware in service—dramatically curb both e-waste and power consumption.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-stone-200/70 bg-stone-50/60 p-5 transition-colors hover:border-leaf-border hover:bg-leaf-soft/20"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted pl-7">{item.body}</p>
              </article>
            ))}
          </div>

          {/* Quick Start CTA card */}
          <div className="mt-10 rounded-2xl bg-leaf-soft/80 border border-leaf-border/80 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-leaf-dark">Ready to check your devices?</p>
              <p className="text-xs text-stone-600 mt-0.5">
                Run an instant calculation without requiring account signup or login.
              </p>
            </div>
            <Link
              to="/calculator"
              className="inline-flex items-center justify-center rounded-full bg-leaf px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-leaf-dark self-start sm:self-auto"
            >
              Launch Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
