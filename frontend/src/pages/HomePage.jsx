import { Link } from "react-router-dom";

const features = [
  {
    title: "Energy",
    body: "Understand how much electricity your devices consume.",
  },
  {
    title: "Carbon",
    body: "See an estimated CO₂ impact.",
  },
  {
    title: "AI Insights",
    body: "Get personalized green-computing suggestions.",
  },
];

const reasons = [
  {
    title: "Energy efficiency",
    body: "Using less electricity for the same work reduces cost and estimated emissions.",
  },
  {
    title: "Longer device lifespan",
    body: "Careful use and repair delay replacement and the impact of manufacturing new hardware.",
  },
  {
    title: "Responsible e-waste management",
    body: "Obsolete devices should be recycled through proper channels, not household waste.",
  },
  {
    title: "Reducing unnecessary energy consumption",
    body: "Idle screens, unused apps, and always-on high-power modes add up over a month.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <p className="text-sm font-medium text-leaf">GreenCompute</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Green computing, made measurable.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            Understand the energy and environmental impact of the devices you use every day.
            Measure usage, estimate your carbon footprint, and discover simple ways to compute
            greener.
          </p>
          <Link
            to="/calculator"
            className="mt-8 inline-flex rounded-full bg-leaf px-5 py-2.5 text-sm font-medium text-white hover:bg-leaf-dark"
          >
            Calculate My Impact
          </Link>
          <ol className="mt-12 grid gap-3 text-sm sm:grid-cols-4">
            {["Device", "Energy", "Impact", "Better Choices"].map((step, index) => (
              <li
                key={step}
                className="rounded-xl border border-line bg-canvas px-4 py-3 text-center"
              >
                <span className="block text-xs text-muted">{index + 1}</span>
                <span className="font-medium text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-line bg-card p-5">
              <h2 className="font-semibold text-ink">{feature.title}</h2>
              <p className="mt-2 text-sm text-muted">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <h2 className="text-2xl font-semibold text-ink">Why Green Computing?</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Everyday electronics use electricity. Small habits—sleep mode, shorter sessions, keeping
          devices longer—reduce energy demand and e-waste.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reasons.map((item) => (
            <article key={item.title} className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
