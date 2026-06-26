"use client";

import { SectionDivider } from "../../components/SectionDivider";
import { TearHeading } from "../../components/TearHeading";
import { BtnIcons } from "../../components/BtnIcons";

const skills = [
  "Product strategy",
  "UX + conversion",
  "Positioning",
  "AI content design",
  "Brand systems",
];

const works = [
  {
    no: "project 01",
    date: "Mar 19, 2026",
    title: "Meridian Health",
    blurb:
      "When therapists spend less time clicking, they have more time for patients.",
    tags: ["Healthcare", "Workflow design"],
    tone: "card-blue-bright",
  },
  {
    no: "project 02",
    date: "Mar 2, 2026",
    title: "StyleBook",
    blurb:
      "From 'I hate this system' to 'can we show it to other salons?'",
    tags: ["SaaS", "Transformation"],
    tone: "card-cream",
  },
  {
    no: "project 03",
    date: "Jan 2, 2025",
    title: "Homestead",
    blurb:
      "Helping first-time home buyers actually understand what they're looking at.",
    tags: ["Proptech", "0 → 1"],
    tone: "card-pink",
  },
  {
    no: "project 04",
    date: "Sept 14, 2024",
    title: "NorthLight",
    blurb:
      "Getting seven stakeholders to agree on what they're actually building.",
    tags: ["Strategy", "Enterprise"],
    tone: "card-blue-light",
  },
];

export default function PortfolioLayout() {
  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === HERO === */}
      <section
        data-section="portfolio-hero"
        className="p-6 md:p-10 mx-3 md:mx-6 min-h-[calc(100vh-76px)] flex"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end w-full">
          <div className="md:col-span-8 flex flex-col gap-10">
            <div className="flex items-baseline gap-4 flex-wrap">
              <span
                className="font-mono text-xs opacity-50 tabular-nums"
                suppressHydrationWarning
              >
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-display text-xl opacity-60">
                my name is
              </span>
              <TearHeading className="font-display leading-[0.85] tracking-tightest text-6xl md:text-8xl lg:text-9xl">
                {"Paige"}
              </TearHeading>
            </div>
            <div className="flex flex-col gap-1 text-base">
              <p>Currently at Product Paige</p>
              <p className="opacity-60">Previously at Slate &amp; Mantle</p>
              <p>Available for thoughtful projects</p>
            </div>
          </div>
          <aside className="md:col-span-4 flex flex-col gap-4">
            <div
              className="placeholder w-full aspect-square"
              aria-label="Portrait — Paige"
            />
            <div className="flex items-baseline justify-between text-sm opacity-70">
              <span>Product designer</span>
              <span>Canada · Remote</span>
            </div>
          </aside>
        </div>
      </section>

      <SectionDivider />

      {/* === BIG DECLARATIVE LINE === */}
      <section
        data-section="portfolio-statement"
        className="p-12 mx-3 md:mx-6"
      >
        <h2 className="font-display leading-[1.05] tracking-tightest text-4xl md:text-6xl lg:text-7xl max-w-[20ch]">
          I design{" "}
          <span className="inline-block align-middle w-12 h-12 bg-[#cdb8e3] mx-2" />{" "}
          outstanding digital products{" "}
          <span className="inline-block align-middle w-12 h-12 bg-[#0E6BFF] mx-2" />
          .
        </h2>
      </section>

      <SectionDivider />

      {/* === ABOUT (loose, illustrated) === */}
      <section
        data-section="portfolio-about"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-12"
      >
        <div className="flex items-baseline justify-between">
        </div>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12">
          <aside className="md:col-span-3 flex flex-col gap-3">
            <div
              className="placeholder w-full aspect-[3/4]"
              aria-label="My workspace"
            />
            <span className="text-sm opacity-70">my workspace</span>
          </aside>
          <div className="md:col-span-8 md:col-start-5 flex flex-col gap-8">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.25]">
              I&rsquo;m Paige{" "}
              <span className="inline-block align-middle w-8 h-8 bg-[#f3eb88]" />{" "}
              a product designer in Canada who gets excited{" "}
              <span className="inline-block align-middle w-8 h-8 bg-[#DBE6EB]" />{" "}
              about making complicated things simple{" "}
              <span className="inline-block align-middle w-8 h-8 bg-[#f7c8d4]" />
              .
            </p>
            <ul className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <li
                  key={s}
                  className="font-display text-base px-4 py-2 border border-[#1a1a1a]/30"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* === FEATURED WORKS === */}
      <section
        data-section="portfolio-works"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-12"
      >
        <div className="flex items-baseline justify-between">
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tightest max-w-[24ch]">
          A showcase of what happens when curiosity drives the process.
        </h2>
        <div className="flex flex-col gap-16">
          {works.map((w, i) => (
            <article
              key={w.title}
              className={`grid md:grid-cols-12 gap-6 md:gap-12 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="md:col-span-7">
                <div
                  className={`card ${w.tone} aspect-[16/10] !min-h-0 flex items-center justify-center`}
                >
                  <span className="font-display text-xl opacity-50">
                    {w.title} — preview
                  </span>
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm opacity-70">{w.date}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-[1.05]">
                  {w.title}
                </h3>
                <p className="text-base leading-[1.55] opacity-80">
                  {w.blurb}
                </p>
                <ul className="flex flex-wrap gap-2 text-sm opacity-70">
                  {w.tags.map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="self-start border-b border-[#1a1a1a] pb-0.5 hover:opacity-60"
                >
                  View project
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* === BIG END CTA === */}
      <section
        data-section="portfolio-cta"
        className="p-12 mx-3 md:mx-6 flex flex-col gap-10 items-start"
      >
        <h2 className="font-display leading-[0.95] tracking-tightest text-5xl md:text-7xl lg:text-8xl max-w-[14ch]">
          Have something messy?
        </h2>
        <a
          href="/contact"
          className="inline-flex btn"
        >
          <span className="btn-text bg-[#0E6BFF] text-white">
            Contact me
          </span>
          <span className="btn-tab bg-[#0E6BFF] text-white">
            <BtnIcons />
          </span>
        </a>
      </section>
    </div>
  );
}
