import type { Metadata } from "next";
import { BtnIcons } from "../components/BtnIcons";

export const metadata: Metadata = {
  title: "About",
  description:
    "13 years inside the Shopify and ecommerce ecosystem. Half product marketer, half UX designer. Independent practice based in Canada.",
  alternates: { canonical: "/about" },
};

const tools: Array<{ name: string; bg: string; fg: string }> = [
  { name: "Figma", bg: "#3D3A45", fg: "#FBFAF6" },
  { name: "Framer", bg: "#3D3A45", fg: "#FBFAF6" },
  { name: "Claude", bg: "#3D3A45", fg: "#FBFAF6" },
  { name: "Cursor", bg: "#3D3A45", fg: "#FBFAF6" },
  { name: "Lovable", bg: "#3D3A45", fg: "#FBFAF6" },
  { name: "Paper", bg: "#3D3A45", fg: "#FBFAF6" },
  { name: "Shopify", bg: "#3D3A45", fg: "#FBFAF6" },
  { name: "Notion", bg: "#3D3A45", fg: "#FBFAF6" },
];

const timeline: Array<{ year: string; title: string; body: string }> = [
  {
    year: "2013",
    title: "First Shopify build",
    body: "Started building on Shopify when merchants were still asking whether it could handle real stores. Learned the platform inside-out from the theme side.",
  },
  {
    year: "2016",
    title: "Product marketing shift",
    body: "Moved from build to positioning. Realized the hardest part of ecommerce isn't the store — it's getting people to understand why the product exists.",
  },
  {
    year: "2020",
    title: "Ecommerce SaaS + DTC",
    body: "Started splitting time between app-makers building on Shopify and DTC brands selling on it. Onboarding, PDPs, positioning across both.",
  },
  {
    year: "2024",
    title: "AI + content design",
    body: "Started designing AI-assisted content systems for teams shipping at scale. Prompt libraries, page templates, editorial guardrails.",
  },
  {
    year: "2026",
    title: "Independent practice",
    body: "Full-time independent. Two-week sprints, written scopes, no consulting theatre.",
  },
];

const values: Array<{ title: string; body: string }> = [
  {
    title: "Written before pretty",
    body: "The words come first. If the message doesn't land as plain text, no amount of design can save it.",
  },
  {
    title: "Ship real artifacts",
    body: "Every engagement produces something a team can use the day it's delivered. No deck-thick proposals.",
  },
  {
    title: "Merchant-first thinking",
    body: "13 years of watching merchants use ecommerce tools means I default to their POV, not the platform's.",
  },
  {
    title: "One-sentence tests",
    body: "If a product can't be explained in eight seconds, positioning has more work to do than design does.",
  },
];

export default function AboutPage() {
  return (
    <div className="theme contents">
      {/* === HERO === Introducing Paige with a portrait card on the left,
          headline + bio on the right. Matches the homepage hero layout so
          the page feels part of the same design system. */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[520px] md:min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <aside
            className="relative min-h-[420px] p-6 md:p-16 flex items-center justify-center order-2 md:order-1"
            style={{ backgroundColor: "#DDDAD5" }}
            aria-label="Portrait"
          >
            <div className="relative w-full max-w-[380px] -rotate-[2deg]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tape.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rotate-[2deg] w-[140px] z-10"
              />
              <div className="relative w-full aspect-square bg-white grain-paper p-3 md:p-4 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_14px_28px_rgba(26,26,26,0.22)]">
                <div
                  className="w-full flex-1 bg-[#DBE6EB]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0 order-1 md:order-2 md:divider-indent-left">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">About</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-display font-display text-ink max-w-[18ch]">
                  Half product marketer, half UX designer
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
                  I&rsquo;m Paige. I&rsquo;ve spent 13 years inside the Shopify
                  and ecommerce ecosystem — building apps, positioning DTC
                  brands, and cleaning up the space where product and story
                  meet.
                </p>
              </div>
            </div>
            <a href="/contact" className="inline-flex btn self-start">
              <span className="btn-text bg-[#0E6BFF] text-white">
                Let&rsquo;s talk
              </span>
              <span className="btn-tab bg-[#0E6BFF] text-white">
                <BtnIcons />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* === LONGER BIO === */}
      <section
        data-section="bio"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">The longer version</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-section font-display text-ink max-w-[22ch]">
              How I got here
            </h2>
            <div className="flex flex-col gap-4 text-lg leading-[1.4] opacity-80 max-w-[560px]">
              <p>
                I started on the build side — Liquid themes, custom sections,
                Shopify apps back when merchants weren&rsquo;t sure the
                platform could handle real volume. Turns out most of the
                interesting problems weren&rsquo;t technical.
              </p>
              <p>
                The gap between a good product and a product people
                understand is usually shorter than teams think. It&rsquo;s
                one paragraph on a homepage, one clarified onboarding step,
                one PDP that stops burying the answer. That gap is where I
                do my best work.
              </p>
              <p>
                Now I run an independent practice. Two-week sprints, one
                deliverable at a time, and a written scope before anything
                starts. Based in Canada, remote by default.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === TIMELINE === */}
      <section
        data-section="timeline"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Timeline</span>
          <h2 className="text-section font-display text-ink max-w-[22ch]">
            13 years, five turning points
          </h2>
        </div>
        <ol className="grid md:grid-cols-2 gap-4 items-stretch">
          {timeline.map((t) => (
            <li
              key={t.year}
              className="flex flex-col gap-2 p-6 border border-[#1A191E]/60"
            >
              <span className="font-display text-3xl leading-none text-ink/40">
                {t.year}
              </span>
              <h3 className="text-xl font-display leading-[1.1] text-ink mt-1">
                {t.title}
              </h3>
              <p className="text-base leading-[1.4] opacity-80 max-w-[480px]">
                {t.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* === VALUES === */}
      <section
        data-section="values"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">How I work</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-section font-display text-ink max-w-[22ch]">
              What I bring to every project
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              The through-line across everything I make. If a project
              can&rsquo;t hit these, I&rsquo;m probably not the right person
              to run it.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 items-stretch">
          {values.map((v) => (
            <article
              key={v.title}
              className="card grain-paper bg-[#FAF9F2] flex flex-col gap-3 !min-h-0 !p-8"
            >
              <h3 className="text-xl font-display leading-[1.1] text-ink">
                {v.title}
              </h3>
              <p className="text-base leading-[1.4] opacity-80 max-w-[480px]">
                {v.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* === TOOLS === */}
      <section
        data-section="tools"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-8"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Toolkit</span>
          <h2 className="text-section font-display text-ink max-w-[22ch]">
            Tools I lean on
          </h2>
        </div>
        <ul className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <li key={t.name}>
              <span className="svc-label" style={{ color: t.fg }}>
                <span
                  className="svc-label-text"
                  style={{ backgroundColor: t.bg, borderColor: t.fg }}
                >
                  {t.name}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
