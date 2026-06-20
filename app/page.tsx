"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SectionRail } from "./components/SectionRail";
import { SectionDivider } from "./components/SectionDivider";
import { TearHeading } from "./components/TearHeading";
import { PixelIcon, type PixelIconName } from "./components/PixelIcon";
import { playbookList } from "./playbooks/data";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = setTimeout(() => setShown(true), delay);
            obs.disconnect();
            return () => clearTimeout(t);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

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

const projects = [
  {
    n: "001",
    name: "Real demand framework",
    year: "2026",
    role: "Strategy / research",
    subtitle:
      "A simple way to stress-test a product before building the wrong thing beautifully.",
    blurb:
      "A practical framework for finding real demand early, before the build turns into a hobby.",
    href: "#",
  },
  {
    n: "002",
    name: "Operate like a founder",
    year: "2025",
    role: "Manual / field guide",
    blurb:
      "An eight-part field guide to building real software in the AI era — from prototype to operating cadence.",
    href: "#",
  },
  {
    n: "003",
    name: "The product compass",
    year: "2025",
    role: "Frameworks / editorial",
    blurb:
      "An ongoing reference of frameworks, manuals, and insights for technical founders. Updated monthly.",
    href: "#",
  },
  {
    n: "004",
    name: "Founder sessions",
    year: "2024",
    role: "Coaching / practice",
    blurb:
      "Weekly working sessions with technical founders. Closed cohort, application-only.",
    href: "#",
  },
];

const playbookChips: Record<string, string[]> = {
  "ai-predictions": ["trends", "products", "judgment"],
  "operate-like-a-founder": ["systems", "focus", "cadence"],
  "the-product-compass": ["narrative", "UX", "priorities"],
};

const playbookBodies: Record<string, string> = {
  "ai-predictions":
    "A running set of notes on what’s changing, what’s noise, and what still matters.",
  "operate-like-a-founder":
    "Weekly habits that keep momentum without chaos. Clear decisions, fewer rabbit holes.",
  "the-product-compass":
    "A living reference for messaging, UX decisions, and what to do next.",
};

const playbooks = playbookList.map((p) => ({
  slug: p.slug,
  no: p.no,
  title: p.title,
  subtitle: p.kicker,
  body: playbookBodies[p.slug] ?? "",
  chips: playbookChips[p.slug] ?? [],
  tone: p.homeTone,
  status: p.status ?? "coming-soon",
}));

const stats = [
  { value: "50+", label: "Founders coached" },
  { value: "30+", label: "Products shipped" },
  { value: "12+", label: "Frameworks published" },
  { value: "4+", label: "Years strategy" },
];

const cardTones = ["card-navy", "card-burgundy", "card-teal"] as const;

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
  const [featured, ...rest] = projects;
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
      <section id="capabilities" data-section="capabilities" className="p-12 mx-3 md:mx-6 flex flex-col gap-6 max-h-screen">
        <span className="eyebrow opacity-60">Capabilities</span>
        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-6 flex flex-col gap-6">
              <h2 className="font-display text-2xl md:text-3xl leading-[1.1]">
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
                      className={`w-full text-left py-3 font-display text-2xl leading-[1.15] transition-opacity ${
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
              <div className="max-w-[480px] flex flex-col gap-6">
                <p className="text-base leading-[1.4] min-h-[4em]">
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
                ratio="4/5"
                fig="Fig. 04"
                caption="Recent work — Raye"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider />
      {/* === SECTION: selected-work === */}
      <section id="work" data-section="selected-work" className="p-12 mx-3 md:mx-6 flex flex-col gap-12">
        <span className="eyebrow">Selected work</span>

        {/* Featured project */}
        <Reveal>
        <article className="grid md:grid-cols-12 gap-6 md:gap-12">
          <div className="md:col-span-7">
            <div className="paint-window">
              <div className="paint-titlebar">
                <span className="paint-title-icon">P</span>
                <span className="paint-title-text">
                  real-demand-framework.bmp — Paint
                </span>
                <div className="paint-controls">
                  <button type="button" className="paint-control" aria-label="Minimize">_</button>
                  <button type="button" className="paint-control" aria-label="Maximize">▢</button>
                  <button type="button" className="paint-control" aria-label="Close">×</button>
                </div>
              </div>
              <div className="paint-menubar">
                <span><u>F</u>ile</span>
                <span><u>E</u>dit</span>
                <span><u>V</u>iew</span>
                <span><u>I</u>mage</span>
                <span><u>O</u>ptions</span>
                <span><u>H</u>elp</span>
              </div>
              <div className="paint-body">
                <div className="paint-tools" aria-hidden="true">
                  <button type="button" className="paint-tool active" title="Pencil">✎</button>
                  <button type="button" className="paint-tool" title="Brush">🖌</button>
                  <button type="button" className="paint-tool" title="Eraser">▭</button>
                  <button type="button" className="paint-tool" title="Fill">⬛</button>
                  <button type="button" className="paint-tool" title="Eyedropper">/</button>
                  <button type="button" className="paint-tool" title="Magnifier">⌖</button>
                  <button type="button" className="paint-tool" title="Text">A</button>
                  <button type="button" className="paint-tool" title="Line">╲</button>
                  <button type="button" className="paint-tool" title="Curve">∿</button>
                  <button type="button" className="paint-tool" title="Rect">▭</button>
                  <button type="button" className="paint-tool" title="Polygon">◇</button>
                  <button type="button" className="paint-tool" title="Ellipse">○</button>
                </div>
                <div className="paint-canvas">
                  <div className="paint-mockup">
                    <div className="paint-mockup-header">
                      <span>Demand check · v0.4</span>
                      <span>Stage 03 / 04</span>
                    </div>
                    <h4 className="paint-mockup-h">{featured.name}</h4>
                    <ul className="paint-mockup-steps">
                      <li className="paint-mockup-step done">
                        <span className="paint-mockup-step-num">01</span>
                        <span className="paint-mockup-step-label">Audience hypothesis</span>
                        <span className="paint-mockup-step-state">Done</span>
                      </li>
                      <li className="paint-mockup-step done">
                        <span className="paint-mockup-step-num">02</span>
                        <span className="paint-mockup-step-label">Pain mapping</span>
                        <span className="paint-mockup-step-state">Done</span>
                      </li>
                      <li className="paint-mockup-step active">
                        <span className="paint-mockup-step-num">03</span>
                        <span className="paint-mockup-step-label">Willingness to pay</span>
                        <span className="paint-mockup-step-state">Active</span>
                      </li>
                      <li className="paint-mockup-step">
                        <span className="paint-mockup-step-num">04</span>
                        <span className="paint-mockup-step-label">Launch loop</span>
                        <span className="paint-mockup-step-state">Queued</span>
                      </li>
                    </ul>
                    <div className="paint-mockup-bar" aria-hidden="true">
                      <div className="paint-mockup-bar-fill" style={{ width: "72%" }} />
                    </div>
                    <div className="paint-mockup-footer">
                      <span>72% complete</span>
                      <span>Fig. 02 · No. {featured.n}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="paint-colors" aria-hidden="true">
                {[
                  "#000000", "#7a7a7a", "#7d0000", "#7d7d00", "#007d00", "#007d7d", "#00007d", "#7d007d",
                  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#cdb8e3", "#ff00ff",
                ].map((c, i) => (
                  <span key={i} className="paint-color" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end gap-6">
            <p className="eyebrow opacity-60">
              Featured · No. {featured.n}
            </p>
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
              {featured.name}
            </h3>
            {featured.subtitle && (
              <p className="font-display text-xl leading-[1.3] opacity-80 max-w-[460px]">
                {featured.subtitle}
              </p>
            )}
            <p className="text-sm opacity-70">
              {featured.year} · {featured.role}
            </p>
            <p className="text-base leading-[1.6] max-w-[420px]">
              {featured.blurb}
            </p>
            <a
              href={featured.href}
              className="self-start border-b border-[#1a1a1a] pb-0.5 hover:opacity-60"
            >
              Read the case
            </a>
          </div>
        </article>
        </Reveal>

      </section>

      <SectionDivider />
      {/* === SECTION: blog === */}
      <section id="blog" data-section="blog" className="p-12 mx-3 md:mx-6 flex flex-col gap-12">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tightest max-w-[16ch]">
          From the journal
        </h2>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {playbooks.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className="h-full">
              <a
                href={`/playbooks/${p.slug}`}
                className={`card ${p.tone} flex flex-col gap-4 aspect-[6/4] !min-h-0`}
              >
                <header className="flex items-start justify-between">
                  <span className="text-sm opacity-80">No. {p.no}</span>
                  <span className="stamp opacity-90 border-current">
                    {p.status === "live" ? "Read now" : "Coming soon"}
                  </span>
                </header>
                <h4 className="font-display text-3xl leading-[1.05]">
                  {p.title}
                </h4>
                <p className="text-sm leading-[1.55] opacity-80">
                  {p.body}
                </p>
                <ul className="flex flex-wrap gap-2 mt-auto">
                  {p.chips.map((c) => (
                    <li key={c} className="pill pill-cased">
                      {c}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />
      {/* === SECTION: field-note (pull quote) === */}
      <section id="field-note" data-section="field-note" className="p-12 mx-3 md:mx-6 flex flex-col gap-12">
        <span className="eyebrow opacity-60">Field note</span>
        <Reveal>
          <blockquote className="max-w-[1100px] flex flex-col gap-12">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em]">
              &ldquo;Vibe-coding is not a strategy. The market doesn&rsquo;t care
              how fast you shipped a thing nobody wanted.&rdquo;
            </p>
            <footer className="flex items-baseline gap-6 text-sm opacity-70">
              <span>Notes from the field</span>
            </footer>
          </blockquote>
        </Reveal>
      </section>

      <SectionDivider />
      {/* === SECTION: systems (dark blue, chamfered, in framed container) === */}
      <div data-section="systems-frame" className="mx-3 md:mx-6">
      <section id="systems" data-section="systems" className="bg-[#e8252d] text-white p-12 m-6 section-chamfer relative flex flex-col gap-12">
        <span className="eyebrow opacity-80">Systems</span>
        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-5 flex flex-col gap-6">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                Systems for founders building in the AI&nbsp;era
              </h2>
              <p className="text-lg leading-[1.4] opacity-90 max-w-[420px]">
                A small set of operating habits that keeps the product sharp
                while the tools change weekly.
              </p>
            </div>
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-12 gap-y-12">
              {[
                {
                  t: "Frameworks",
                  d: "Demand checks, positioning, pricing, and the decisions that keep the product coherent.",
                },
                {
                  t: "Workshops",
                  d: "Focused sessions on one problem: messaging, onboarding, IA, pricing page, activation.",
                },
                {
                  t: "Founder sessions",
                  d: "Weekly working time with clear outputs. Less talking about it, more shipping.",
                },
                {
                  t: "Product Audit",
                  d: "A clarity review that turns “we should…” into a prioritized plan. Fix now, improve next, park.",
                },
              ].map((it) => (
                <div key={it.t} className="flex flex-col gap-4">
                  <h3 className="font-display text-2xl leading-[1.15] border-b border-white/30 pb-3">
                    {it.t}
                  </h3>
                  <p className="text-base leading-[1.55] opacity-80">{it.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
      </div>

      <SectionDivider />
      {/* === SECTION: about (essay) === */}
      <section id="about" data-section="about" className="p-12 mx-3 md:mx-6 flex flex-col gap-12">
        <span className="eyebrow">On the practice</span>
        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-2 md:col-start-1 flex flex-col gap-2">
              <p className="font-display text-xl leading-[1.2]">
                Paige Harris
              </p>
              <p className="text-sm opacity-60">≈ 3 min</p>
            </div>

            <div className="md:col-span-6 flex flex-col gap-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                On the practice
              </h2>
              <div className="flex flex-col gap-6">
                <p className="drop-cap text-lg leading-[1.65]">
                  Building is cheap now. Judgment is not. Most teams don&rsquo;t
                  need more output, they need clearer direction.
                </p>
                <p className="text-lg leading-[1.65]">
                  The work is usually a mix of positioning, UX, and prioritization.
                  Plus a bit of &ldquo;let&rsquo;s stop making this harder than it
                  needs to be.&rdquo;
                </p>
                <p className="text-lg leading-[1.65]">
                  Modern tools make iteration fast. The point is to use that speed
                  to get to clarity, not ship more chaos.
                </p>
              </div>
            </div>

            <aside className="md:col-span-3 md:col-start-10">
              <Placeholder
                ratio="4/5"
                fig="Fig. 06"
                caption="Paige, in studio"
              />
            </aside>
          </div>
        </Reveal>
      </section>

      <SectionDivider />
      {/* === SECTION: newsletter (CTA, red, chamfered, in framed container) === */}
      <div data-section="newsletter-frame" className="mx-3 md:mx-6">
      <section
        id="newsletter"
        data-section="newsletter"
        className="bg-[#1a1a1a] text-white p-12 m-6 section-chamfer relative grain-vintage flex flex-col gap-12"
      >
        <span className="eyebrow">Newsletter</span>
        <Reveal>
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
        </Reveal>
      </section>
      </div>

    </div>
  );
}
