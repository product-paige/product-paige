"use client";

import { useEffect, useState } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { BtnIcons } from "../../components/BtnIcons";

const rotatingTaglines = [
  "Accelerating positioning",
  "Accelerating onboarding",
  "Accelerating activation",
  "Accelerating launch",
  "Accelerating pricing",
];

const credentials = [
  "Founder-led",
  "Independent practice",
  "Two-week sprints",
  "Available Q3 2026",
];

const features = [
  {
    n: "01",
    title: "Model the messy reality",
    body: "Start with the actual situation — recordings, the spreadsheet, the abandoned doc. We name what the team is really fighting before designing anything.",
  },
  {
    n: "02",
    title: "Decisions at scale",
    body: "A short list of decisions you make once and stop relitigating. Pricing shape, refund posture, who owns the homepage. Written down. Removed from standup.",
  },
  {
    n: "03",
    title: "Leverage your craft",
    body: "Your team's instincts are the moat. We encode them as defaults inside the product so they compound every week instead of resetting every release.",
  },
  {
    n: "04",
    title: "Built for the way you actually ship",
    body: "Two-week sprints. Real artifacts — pages, prompts, prototypes — in front of customers before the deck gets finished.",
  },
];

const capabilities = [
  {
    title: "Demand discovery",
    body: "Pressure-test the product against real buyer intent. Customer calls, willingness-to-pay, the early signal that decides what to build next.",
    placeholderTone: "card-blue-light",
  },
  {
    title: "Positioning + messaging",
    body: "Sharp positioning and copy that lands the product in eight seconds. Homepage rewrites, launch decks, and a voice you can hand off.",
    placeholderTone: "card-cream",
  },
  {
    title: "Product design",
    body: "End-to-end design for the surface your customers actually touch. Marketing site, onboarding, the core loop.",
    placeholderTone: "card-pink",
  },
  {
    title: "AI content design",
    body: "Conversations, prompts, and UI for the AI features inside your product. Tone, fallbacks, and the rules that keep it on-brand.",
    placeholderTone: "card-blue-bright",
  },
];

const caseStudies = [
  {
    n: "01",
    title: "Partner repositioning",
    body: "Moved a B2B platform from a feature list to a category-defining story. Sales cycles shortened by 22 days; trial-to-paid lifted 38%.",
  },
  {
    n: "02",
    title: "Onboarding rewrite",
    body: "Replaced a twelve-step onboarding with four. D1 activation climbed before the team finished updating the documentation.",
  },
  {
    n: "03",
    title: "Pricing rebuild",
    body: "Replaced a four-tier feature matrix with a single annual offer and a clear villain. Trial intent doubled in a month.",
  },
  {
    n: "04",
    title: "AI feature design",
    body: "Defined the voice, fallbacks, and review surface for an AI-assisted workflow used by 8,000 contractors. Adoption stuck past the first week.",
  },
];

const partners = [
  "Raye",
  "Northstar",
  "Field & Foundry",
  "Almanac",
  "Helio",
  "Lever",
];

const roles = [
  {
    title: "Senior product strategist",
    type: "Engagement",
    location: "Remote · 8 — 10 weeks",
  },
  {
    title: "Brand & messaging designer",
    type: "Engagement",
    location: "Remote · 4 — 6 weeks",
  },
  {
    title: "AI product partner",
    type: "Retainer",
    location: "Remote · ongoing",
  },
];

export default function SaasLayout() {
  // Rotate the hero tagline every 2.4s
  const [taglineIdx, setTaglineIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTaglineIdx((i) => (i + 1) % rotatingTaglines.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === HERO === */}
      <section
        data-section="saas-hero"
        className="p-6 md:p-10 mx-3 md:mx-6 min-h-[calc(100vh-76px)] flex"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end w-full">
          <div className="md:col-span-8 flex flex-col gap-10">
            <h1 className="font-display leading-[0.95] tracking-tightest text-5xl md:text-7xl lg:text-8xl max-w-[16ch]">
              Decisions in weeks, not quarters.
            </h1>
            <div className="flex items-baseline gap-3 font-mono text-sm md:text-base tabular-nums">
              <span className="opacity-50">{">>>"}</span>
              <span
                key={taglineIdx}
                className="border-b border-[#1a1a1a] transition-opacity duration-200"
              >
                {rotatingTaglines[taglineIdx]}
              </span>
            </div>
            <p className="text-lg leading-[1.5] max-w-[640px]">
              Product strategy + design for founders shipping in the age of
              AI. Distill messy context into clear decisions, then ship the
              artifact that proves it.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="mailto:hello@productpaige.com?subject=Start%20a%20project"
                className="inline-flex btn"
              >
                <span className="btn-text bg-[#0E6BFF] text-white">
                  Start a project
                </span>
                <span className="btn-tab bg-[#0E6BFF] text-white">
                  <BtnIcons />
                </span>
              </a>
              <a
                href="/ask-paige"
                className="inline-flex btn"
              >
                <span className="btn-text bg-[#1a1a1a] text-white">
                  About the practice
                </span>
                <span className="btn-tab bg-[#1a1a1a] text-white">
                  <BtnIcons />
                </span>
              </a>
            </div>
          </div>
          <aside className="md:col-span-4 flex flex-col gap-4 self-end">
            <div className="border-t border-[#1a1a1a]/25">
              {credentials.map((c) => (
                <div
                  key={c}
                  className="flex items-baseline justify-between gap-4 py-3 border-b border-[#1a1a1a]/25"
                >
                  <span className="text-base">{c}</span>
                  <span className="font-mono text-xs opacity-50">YES</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <SectionDivider />

      {/* === BIG STAT + TRUST ROW === */}
      <section
        data-section="saas-stat"
        className="p-12 mx-3 md:mx-6 grid md:grid-cols-12 gap-6 md:gap-12 items-center"
      >
        <div className="md:col-span-5 flex flex-col gap-3">
          <span className="font-display tracking-tightest leading-[0.85] text-7xl md:text-8xl lg:text-9xl">
            3×
          </span>
          <p className="text-base opacity-70">
            Average compression of the time-to-decision across recent
            engagements.
          </p>
        </div>
        <ul className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
          <li className="flex flex-col gap-1 border-l-2 border-[#1a1a1a] pl-3">
            <span className="font-mono text-xs opacity-60 tracking-[0.15em]">
              SCOPE
            </span>
            <span className="font-display text-lg leading-tight">
              Strategy
            </span>
          </li>
          <li className="flex flex-col gap-1 border-l-2 border-[#1a1a1a] pl-3">
            <span className="font-mono text-xs opacity-60 tracking-[0.15em]">
              SCOPE
            </span>
            <span className="font-display text-lg leading-tight">
              Design
            </span>
          </li>
          <li className="flex flex-col gap-1 border-l-2 border-[#1a1a1a] pl-3">
            <span className="font-mono text-xs opacity-60 tracking-[0.15em]">
              SCOPE
            </span>
            <span className="font-display text-lg leading-tight">
              Messaging
            </span>
          </li>
          <li className="flex flex-col gap-1 border-l-2 border-[#1a1a1a] pl-3">
            <span className="font-mono text-xs opacity-60 tracking-[0.15em]">
              SCOPE
            </span>
            <span className="font-display text-lg leading-tight">
              AI content
            </span>
          </li>
        </ul>
      </section>

      <SectionDivider />

      {/* === 4 NUMBERED FEATURE BLOCKS === */}
      <section
        data-section="saas-features"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-12"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {features.map((f) => (
            <article
              key={f.n}
              className="flex flex-col gap-4 p-6 border border-[#1a1a1a]/20"
            >
              <span className="font-mono text-xs opacity-60 tracking-[0.15em]">
                {f.n}
              </span>
              <h3 className="font-display text-2xl md:text-3xl leading-[1.1]">
                {f.title}
              </h3>
              <p className="text-base leading-[1.6]">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* === CAPABILITY ROWS (alternating left/right with mock placeholder) === */}
      <section
        data-section="saas-capabilities"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-20"
      >
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs opacity-50">
            04 capabilities
          </span>
        </div>
        {capabilities.map((c, i) => (
          <div
            key={c.title}
            className={`grid md:grid-cols-12 gap-6 md:gap-12 items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="md:col-span-6">
              <div
                className={`card ${c.placeholderTone} aspect-[4/3] !min-h-0 flex items-center justify-center`}
              >
                <span className="font-mono text-xs opacity-50 tracking-[0.15em]">
                  001 / {c.title.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-5">
              <span className="font-mono text-xs opacity-60 tracking-[0.15em]">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.1]">
                {c.title}
              </h3>
              <p className="text-base leading-[1.6]">{c.body}</p>
              <a
                href="/ask-paige"
                className="self-start border-b border-[#1a1a1a] pb-0.5 hover:opacity-60"
              >
                About the practice
              </a>
            </div>
          </div>
        ))}
      </section>

      <SectionDivider />

      {/* === CASE STUDIES — numbered === */}
      <section
        data-section="saas-cases"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-12"
      >
        <ol className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {caseStudies.map((c) => (
            <li key={c.n} className="flex flex-col gap-3">
              <span className="font-display text-5xl md:text-6xl leading-[0.9] tracking-tightest opacity-30">
                {c.n}
              </span>
              <h3 className="font-display text-2xl leading-[1.15]">
                {c.title}
              </h3>
              <p className="text-base leading-[1.6] max-w-[480px]">
                {c.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <SectionDivider />

      {/* === PARTNERS / LOGO WALL === */}
      <section
        data-section="saas-partners"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-8"
      >
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
          {partners.map((p) => (
            <li
              key={p}
              className="flex items-center justify-center h-20 border border-[#1a1a1a]/20 font-display text-xl"
            >
              {p}
            </li>
          ))}
        </ul>
      </section>

      <SectionDivider />

      {/* === ENGAGEMENTS / "WE'RE OPEN" === */}
      <section
        data-section="saas-roles"
        className="p-12 mx-3 md:mx-6 grid md:grid-cols-12 gap-6 md:gap-12"
      >
        <div className="md:col-span-5 flex flex-col gap-6">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
            Three engagement shapes — pick what fits the work.
          </h2>
          <a
            href="mailto:hello@productpaige.com?subject=Engagement"
            className="inline-flex btn self-start"
          >
            <span className="btn-text bg-[#1a1a1a] text-white">
              See all engagements
            </span>
            <span className="btn-tab bg-[#1a1a1a] text-white">
              <BtnIcons />
            </span>
          </a>
        </div>
        <ul className="md:col-span-7 flex flex-col gap-3">
          {roles.map((r) => (
            <li
              key={r.title}
              className="grid grid-cols-12 gap-4 items-baseline py-4 border-b border-[#1a1a1a]/25"
            >
              <h3 className="col-span-12 md:col-span-6 font-display text-xl leading-tight">
                {r.title}
              </h3>
              <span className="col-span-6 md:col-span-3 text-sm opacity-70">
                {r.type}
              </span>
              <span className="col-span-6 md:col-span-2 text-sm opacity-70">
                {r.location}
              </span>
              <a
                href="mailto:hello@productpaige.com"
                className="col-span-12 md:col-span-1 text-sm border-b border-[#1a1a1a] pb-0.5 self-start hover:opacity-60"
              >
                Inquire
              </a>
            </li>
          ))}
        </ul>
      </section>

      <SectionDivider />

      {/* === FINAL CTA === */}
      <div data-section="saas-cta-frame" className="mx-3 md:mx-6">
        <section
          data-section="saas-cta"
          className="bg-[#1a1a1a] text-white p-10 m-6 section-chamfer relative grain-vintage flex flex-col gap-10 items-start"
        >
          <h2 className="font-display leading-[0.95] tracking-tightest text-4xl md:text-6xl lg:text-7xl max-w-[18ch]">
            Accelerating clear decisions.
          </h2>
          <a
            href="mailto:hello@productpaige.com?subject=Request"
            className="inline-flex btn"
          >
            <span className="btn-text bg-[#0E6BFF] text-white">
              Request a project
            </span>
            <span className="btn-tab bg-[#0E6BFF] text-white">
              <BtnIcons />
            </span>
          </a>
          <p className="font-mono text-xs opacity-70 tracking-[0.15em]">
            Status: // request accepted
          </p>
        </section>
      </div>
    </div>
  );
}
