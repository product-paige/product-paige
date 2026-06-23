"use client";

import { useState } from "react";
import { SectionDivider } from "./components/SectionDivider";
import { TearHeading } from "./components/TearHeading";
import { PixelIcon, type PixelIconName } from "./components/PixelIcon";
import { playbookList } from "./playbooks/data";

const capabilities = [
  {
    title: "Positioning + product narrative",
    blurb:
      "Clear positioning and a story that matches the product, so the right people get it fast and the wrong people bounce early.",
  },
  {
    title: "UX + conversion design",
    blurb:
      "Cleaner flows and fewer dead ends, so people finish the job instead of getting lost.",
  },
  {
    title: "Onboarding + activation",
    blurb:
      "A first run that makes sense, so users reach value faster with less hand-holding.",
  },
  {
    title: "Growth + prioritization",
    blurb:
      "A plan for what to fix now vs later, based on impact and effort. No wishlist.",
  },
];

const services: Array<{
  name: string;
  bg: string;
  swatch: string;
  fg: string;
  icon: PixelIconName;
}> = [
  { name: "web and product design",    bg: "#cdb8e3", swatch: "#1a1a1a", fg: "#1a1a1a", icon: "browser" },
  { name: "UX and conversion",         bg: "#f7c8d4", swatch: "#1a1a1a", fg: "#1a1a1a", icon: "cursor" },
  { name: "positioning and messaging", bg: "#f3eb88", swatch: "#1a1a1a", fg: "#1a1a1a", icon: "megaphone" },
  { name: "AI content design",         bg: "#1a1a1a", swatch: "#ffffff", fg: "#ffffff", icon: "sparkleA" },
  { name: "product strategy",          bg: "#a8d4ee", swatch: "#1a1a1a", fg: "#1a1a1a", icon: "target" },
];

const selectedWork = [
  {
    client: "Raye",
    year: "2026",
    title: "Repositioning a B2B platform",
    blurb:
      "Moved from a feature list to a story buyers could repeat. Trial-to-paid lifted 38% in six weeks.",
    href: "#",
  },
  {
    client: "Northstar",
    year: "2025",
    title: "Onboarding rewrite",
    blurb:
      "Cut the first run from twelve steps to four. D1 activation climbed before the docs were finished.",
    href: "#",
  },
  {
    client: "Field & Foundry",
    year: "2025",
    title: "Pricing page rebuild",
    blurb:
      "Replaced a 4-tier matrix with a single annual offer. Trial intent doubled in a month.",
    href: "#",
  },
];

const playbooks = playbookList.map((p) => ({
  slug: p.slug,
  no: p.no,
  date: p.date,
  title: p.title,
  subtitle: p.kicker,
  body: p.body,
  chips: p.chips,
  tone: p.homeTone,
  status: p.status ?? "coming-soon",
}));

function ArrowUpRight({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
    </svg>
  );
}

function ArrowRight({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  );
}

function BtnIcons() {
  return (
    <>
      <ArrowUpRight className="icon-default" />
      <ArrowRight className="icon-hover" />
    </>
  );
}

function Placeholder({
  ratio = "4/5",
  fig,
  caption,
}: {
  ratio?: string;
  fig: string;
  caption: string;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className="placeholder w-full"
        style={{ aspectRatio: ratio }}
      />
      <figcaption className="flex items-baseline justify-between text-sm opacity-70">
        <span>{fig}</span>
        <span className="font-display text-base">{caption}</span>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const [activeCap, setActiveCap] = useState(0);

  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />
      {/* === SECTION: hero === */}
      <section
        id="hero"
        data-section="hero"
        className="p-6 md:p-10 min-h-[calc(100vh-76px)] flex mx-3 md:mx-6"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-stretch w-full">
          <div className="md:col-span-7 flex flex-col justify-end gap-12">
            <TearHeading className="font-display leading-[0.85] tracking-tightest text-6xl md:text-8xl lg:text-9xl">
              {"Product\nPaige"}
            </TearHeading>
            <div className="grid md:grid-cols-12 gap-12">
              <p className="md:col-span-7 text-xl leading-[1.3] max-w-[520px]">
                Product strategy + design for founders shipping in the age
                of AI. Turning ideas into products with real demand, built
                with clarity and habits that compound.
              </p>
              <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3">
                <p className="eyebrow opacity-60">Status</p>
                <p className="text-lg leading-[1.25] flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 bg-[#e8252d]" />
                  Available
                </p>
                <dl className="text-sm leading-[1.5] flex flex-col gap-1">
                  <div className="flex gap-3">
                    <dt className="opacity-60 w-[88px] shrink-0">Next opening</dt>
                    <dd>Q3 2026</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="opacity-60 w-[88px] shrink-0">Based</dt>
                    <dd>Canada</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <figure className="md:col-span-5 flex flex-col h-full gap-3">
            <div className="placeholder w-full flex-1 min-h-[300px]" />
            <figcaption className="flex items-baseline justify-between text-sm opacity-70">
              <span>Fig. 01</span>
              <span className="font-display text-base">Studio, Canada</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <SectionDivider />
      {/* === SECTION: services-labels === */}
      <section id="services" data-section="services-labels" className="p-12 mx-3 md:mx-6 flex flex-col gap-6">
        <span className="eyebrow opacity-60">Practice areas</span>
        <ul className="flex flex-wrap gap-3">
          {services.map((s) => (
            <li key={s.name}>
              <span className="svc-label" style={{ color: s.fg }}>
                <span
                  className="svc-label-text"
                  style={{ backgroundColor: s.bg, borderColor: s.fg }}
                >
                  {s.name}
                </span>
                <span
                  className="svc-label-tab"
                  style={{ backgroundColor: s.bg, borderColor: s.fg }}
                >
                  <PixelIcon name={s.icon} color={s.fg} size={18} />
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <SectionDivider />
      {/* === SECTION: capabilities === */}
      <section id="capabilities" data-section="capabilities" className="p-16 mx-3 md:mx-6 flex flex-col gap-6 max-h-screen">
        <span className="eyebrow opacity-60">Capabilities</span>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12">
          <div className="md:col-span-6 flex flex-col gap-10">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                What we&rsquo;ll improve
              </h2>
              <ul className="border-t border-[#1a1a1a]/25">
                {capabilities.map((c, i) => (
                  <li
                    key={c.title}
                    className="border-b border-[#1a1a1a]/25"
                  >
                    <button
                      onClick={() => setActiveCap(i)}
                      className={`w-full text-left py-6 font-display text-3xl leading-[1.1] transition-opacity ${
                        activeCap === i
                          ? "opacity-100"
                          : "opacity-30 hover:opacity-60"
                      }`}
                    >
                      {c.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="max-w-[480px] flex flex-col gap-8">
                <p className="text-lg leading-[1.5] min-h-[4em]">
                  {capabilities[activeCap].blurb}
                </p>
                <a href="#services" className="btn self-start">
                  <span className="btn-text bg-[#e8252d] text-white">
                    Explore services
                  </span>
                  <span className="btn-tab bg-[#e8252d] text-white">
                    <BtnIcons />
                  </span>
                </a>
              </div>
            </div>
            <div className="md:col-span-5 md:col-start-8 flex flex-col">
              <Placeholder
                ratio="1/1"
                fig="Fig. 04"
                caption="Recent work — Raye"
              />
            </div>
          </div>
      </section>

      <SectionDivider />
      {/* === SECTION: selected-work === */}
      <section id="work" data-section="selected-work" className="p-12 mx-3 md:mx-6 flex flex-col gap-6">
        <span className="eyebrow opacity-60">Selected work</span>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {selectedWork.map((w) => (
            <a
              key={w.title}
              href={w.href}
              className="flex flex-col gap-4 group"
            >
              <div
                className="placeholder w-full aspect-[4/3]"
                aria-label={`Image — ${w.title}`}
              />
              <div className="flex items-baseline justify-between text-sm opacity-70">
                <span>{w.client}</span>
                <span>{w.year}</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-[1.1]">
                {w.title}
              </h3>
              <p className="text-base leading-[1.55] opacity-80">
                {w.blurb}
              </p>
              <span className="text-sm font-medium border-b border-[#1a1a1a] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
                Read the case
              </span>
            </a>
          ))}
        </div>
      </section>

      <SectionDivider />
      {/* === SECTION: field-note (pull quote) === */}
      <section id="field-note" data-section="field-note" className="p-12 mx-3 md:mx-6 flex flex-col gap-6">
        <span className="eyebrow opacity-60">Field note</span>
        <blockquote className="max-w-[1100px] flex flex-col gap-12">
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em]">
            &ldquo;Vibe-coding is not a strategy. The market doesn&rsquo;t care
            how fast you shipped a thing nobody wanted.&rdquo;
          </p>
          <footer className="flex items-baseline gap-6 text-sm opacity-70">
            <span>Notes from the field</span>
          </footer>
        </blockquote>
      </section>

      <SectionDivider />
      {/* === SECTION: blog === */}
      <section id="blog" data-section="blog" className="p-12 mx-3 md:mx-6 flex flex-col gap-6">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tightest max-w-[16ch]">
          From the journal
        </h2>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {playbooks.map((p) => (
            <a
              key={p.slug}
              href={`/playbooks/${p.slug}`}
              className={`card ${p.tone} flex flex-col aspect-[6/4] !min-h-0`}
            >
              <header className="flex items-start justify-between">
                <span className="text-sm opacity-80">{p.date}</span>
                <span className="stamp opacity-90 border-current">
                  {p.status === "live" ? "Read now" : "Coming soon"}
                </span>
              </header>
              <div className="mt-auto flex flex-col gap-4">
                <h4 className="font-display text-3xl leading-[1.05]">
                  {p.title}
                </h4>
                <p className="text-base leading-[1.55] opacity-80">
                  {p.body}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <li key={c} className="pill pill-cased">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </section>

      <SectionDivider />
      {/* === SECTION: newsletter (CTA, red, chamfered, in framed container) === */}
      <div data-section="newsletter-frame" className="mx-3 md:mx-6">
      <section
        id="newsletter"
        data-section="newsletter"
        className="bg-[#1a1a1a] text-white p-12 m-6 section-chamfer relative grain-vintage flex flex-col gap-6"
      >
        <span className="eyebrow opacity-80">Newsletter</span>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="md:col-span-8 flex flex-col gap-6">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                Prompt with Paige, a newsletter
              </h2>
              <p className="text-lg leading-[1.5] max-w-[600px] opacity-90">
                Prompts, templates, and short notes on product clarity, AI
                workflows, and what actually moves work forward.
              </p>
            </div>
            <form
              className="md:col-span-4 flex flex-col gap-3 items-stretch"
              action="https://buttondown.com/api/emails/embed-subscribe/productpaige"
              method="post"
              target="_blank"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="bg-white/15 text-white placeholder:text-white/60 px-4 py-3 focus:outline-none focus:bg-white/25 border border-white/30"
              />
              <button type="submit" className="btn self-start">
                <span className="btn-text bg-[#e8252d] text-white">
                  Subscribe
                </span>
                <span className="btn-tab bg-[#e8252d] text-white">
                  <BtnIcons />
                </span>
              </button>
              <p className="text-xs opacity-70">
                One email. No spam. Unsubscribe anytime.
              </p>
            </form>
        </div>
      </section>
      </div>

    </div>
  );
}
