"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SectionRail } from "../components/SectionRail";
import { SectionDivider } from "../components/SectionDivider";
import { TearHeading } from "../components/TearHeading";
import { PixelIcon, type PixelIconName } from "../components/PixelIcon";
import { playbookList } from "../playbooks/data";

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
    title: "Positioning and product narrative",
    blurb:
      "Clear positioning and a story that matches the product, so the right people get it fast and the wrong people bounce early.",
  },
  {
    title: "UX and conversion design",
    blurb:
      "Simpler flows, fewer dead ends, cleaner pages. Less confusion, more completion.",
  },
  {
    title: "Onboarding and activation",
    blurb:
      "A first run that makes sense. Faster time-to-value, fewer “wait, what do I do” moments.",
  },
  {
    title: "Growth and prioritization",
    blurb:
      "What to fix now vs later, based on impact and effort. A plan you can actually ship.",
  },
];

const services: Array<{
  name: string;
  bg: string;
  swatch: string;
  fg: string;
  icon: PixelIconName;
}> = [
  { name: "Product strategy",         bg: "#ffffff", swatch: "#0d0d10", fg: "#0d0d10", icon: "target" },
  { name: "AI content design",        bg: "#ff7dae", swatch: "#1a1a1a", fg: "#1a1a1a", icon: "sparkleA" },
  { name: "AI web design",            bg: "#2a5bff", swatch: "#ffffff", fg: "#ffffff", icon: "browser" },
  { name: "UX decisions",             bg: "#0E6BFF", swatch: "#ffffff", fg: "#ffffff", icon: "cursor" },
  { name: "Positioning and narrative", bg: "#0fa3a3", swatch: "#ffffff", fg: "#ffffff", icon: "megaphone" },
  { name: "Onboarding and activation", bg: "#ff7dae", swatch: "#1a1a1a", fg: "#1a1a1a", icon: "door" },
  { name: "Growth and prioritization", bg: "#2a5bff", swatch: "#ffffff", fg: "#ffffff", icon: "arrowUp" },
  { name: "Systems and ops",          bg: "#c37bff", swatch: "#0d0d10", fg: "#0d0d10", icon: "gear" },
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
      "A practical framework for turning ideas into something people actually want, before weeks disappear into the build.",
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
  "ai-predictions": ["forecasts", "AI products", "moats"],
  "operate-like-a-founder": ["thesis", "focus", "systems"],
  "the-product-compass": ["narrative", "UX", "priorities"],
};

const playbookBodies: Record<string, string> = {
  "ai-predictions":
    "Four chapters on what will actually matter in AI products over the next 18 months, and what to ignore.",
  "operate-like-a-founder":
    "Weekly habits for clarity, momentum, and fewer “what are we even doing” moments.",
  "the-product-compass":
    "One place to keep the product coherent as it evolves. No more scattered decisions.",
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
    <figure>
      <div
        className="placeholder w-full"
        style={{ aspectRatio: ratio }}
      />
      <figcaption className="flex items-baseline justify-between mt-3 text-sm opacity-70">
        <span>{fig}</span>
        <span className="font-display text-base">{caption}</span>
      </figcaption>
    </figure>
  );
}

export default function HomeV3() {
  const [featured, ...rest] = projects;
  const [activeCap, setActiveCap] = useState(0);

  return (
    <div className="theme-v3 contents">
      {/* === SECTION: hero === */}
      <section
        id="hero"
        data-section="hero"
        className="bg-[#ff7dae] text-[#0d0d10] p-6 md:p-10 min-h-[calc(100vh-76px)] flex mx-3 md:mx-6"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-stretch w-full">
          <div className="md:col-span-7 flex flex-col justify-end">
            <TearHeading className="font-display leading-[0.85] tracking-tightest text-6xl md:text-8xl lg:text-9xl">
              {"Product\nPaige"}
            </TearHeading>
            <div className="grid md:grid-cols-12 gap-12 mt-12">
              <p className="md:col-span-7 text-xl leading-[1.3] max-w-[520px]">
                Product strategy for founders shipping in the age of AI.
                Turning ideas into products with real demand, built with
                clarity, intention, and operating habits that compound.
              </p>
              <div className="md:col-span-4 md:col-start-9">
                <p className="text-lg leading-[1.25] mb-1">
                  <span className="inline-block w-2.5 h-2.5 bg-[#0d0d10] mr-2 align-middle" />
                  Available
                </p>
                <p className="text-sm opacity-80">Q3 2026</p>
              </div>
            </div>
          </div>
          <aside className="md:col-span-5 flex flex-col h-full items-center md:items-end justify-end">
            <div className="win95-dialog" role="dialog" aria-label="Studio popup">
              <div className="win95-titlebar">
                <span className="win95-title">Hello.exe</span>
                <button type="button" className="win95-close" aria-label="Close">
                  ×
                </button>
              </div>
              <div className="win95-body">
                <span className="win95-icon" aria-hidden="true">🌸</span>
                <span className="win95-message">
                  Want to make something good?
                </span>
              </div>
              <div className="win95-actions">
                <button type="button" className="win95-button">
                  Let&rsquo;s go
                </button>
                <button type="button" className="win95-button">
                  Later
                </button>
              </div>
            </div>
            <p className="mt-4 text-xs opacity-70 self-center md:self-end">
              Fig. 01 · Studio, Canada
            </p>
          </aside>
        </div>
      </section>

      <SectionDivider />
      {/* === SECTION: services-labels === */}
      <section id="services" data-section="services-labels" className="px-6 md:px-10 py-16 mx-3 md:mx-6">
        <div className="pt-6 mb-6 flex items-baseline justify-between">
        </div>
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
      {/* === SECTION: selected-work === */}
      <section id="work" data-section="selected-work" className="px-6 md:px-10 py-16 mx-3 md:mx-6">
        <div className="pt-6 mb-12 flex items-baseline justify-between">
        </div>

        {/* Featured project */}
        <Reveal>
        <article className="grid md:grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-7">
            <Placeholder
              ratio="16/10"
              fig={`Fig. 02 · No. ${featured.n}`}
              caption={featured.name}
            />
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <h3 className="font-display text-5xl leading-[1.05] mb-4">
              {featured.name}
            </h3>
            {featured.subtitle && (
              <p className="font-display text-xl leading-[1.3] opacity-80 mb-6 max-w-[460px]">
                {featured.subtitle}
              </p>
            )}
            <p className="text-sm mb-6 opacity-70">
              {featured.year} · {featured.role}
            </p>
            <p className="text-base leading-[1.6] max-w-[420px] mb-12">
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
      {/* === SECTION: playbooks === */}
      <section id="playbooks" data-section="playbooks" className="px-6 md:px-10 py-16 mx-3 md:mx-6">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {playbooks.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className="h-full">
              <a
                href={`/playbooks/${p.slug}`}
                className={`card card-bound ${p.tone} flex flex-col aspect-[4/5] !min-h-0`}
              >
                <span className="card-binding" aria-hidden="true" />
                <header className="flex items-start justify-between mb-6">
                  <span className="text-sm opacity-80">No. {p.no}</span>
                  <span className="stamp opacity-90 border-current">
                    {p.status === "live" ? "Read now" : "Coming soon"}
                  </span>
                </header>
                <h4 className="font-display text-4xl md:text-5xl leading-[1.05] mb-4 tracking-tightest">
                  {p.title}
                </h4>
                <p className="text-sm leading-[1.55] opacity-80 mb-6">
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
      {/* === SECTION: capabilities === */}
      <section id="capabilities" data-section="capabilities" className="px-6 md:px-10 py-16 mx-3 md:mx-6">
        <div className="pt-6 mb-12 flex items-baseline justify-between">
        </div>
        <Reveal>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12">
          <div className="md:col-span-6 flex flex-col">
            <h2 className="font-display text-5xl leading-[1.1] mb-12">
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
                    className={`w-full text-left py-5 font-display text-5xl leading-[1.1] transition-opacity ${
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
            <div className="mt-12 max-w-[480px] flex flex-col">
              <p className="text-lg leading-[1.25] mb-12 min-h-[5em]">
                {capabilities[activeCap].blurb}
              </p>
              <a href="#services" className="btn self-start">
                <span className="btn-text bg-[#E63946] text-white">
                  Explore services
                </span>
                <span className="btn-tab bg-[#E63946] text-white">
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
      {/* === SECTION: field-note (pull quote) === */}
      <section id="field-note" data-section="field-note" className="px-6 md:px-10 py-16 mx-3 md:mx-6">
        <div className="pt-6 mb-12 flex items-baseline justify-between">
        </div>
        <Reveal>
        <blockquote className="max-w-[1100px]">
          <p className="font-display text-5xl leading-[1.1] tracking-[-0.02em]">
            &ldquo;Vibe-coding is not a strategy. The market doesn&rsquo;t care
            how fast you shipped a thing nobody wanted.&rdquo;
          </p>
          <footer className="mt-12 flex items-baseline gap-6 text-sm opacity-70">
            <span>Notes from the field</span>
          </footer>
        </blockquote>
        </Reveal>
      </section>

      <SectionDivider />
      {/* === SECTION: systems (dark blue, chamfered, in framed container) === */}
      <div data-section="systems-frame" className="mx-3 md:mx-6">
      <section id="systems" data-section="systems" className="bg-[#2a5bff] text-white px-8 md:px-14 lg:px-16 py-16 m-6 section-chamfer relative">
        <SectionRail>
          Systems · Four engagements · MMXXVI
        </SectionRail>
        <div className="mb-12 flex items-baseline justify-between lg:pl-12">
        </div>
        <Reveal>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 lg:pl-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-5xl leading-[1.1] mb-6">
              Systems for founders building in the AI&nbsp;era
            </h2>
            <p className="text-lg leading-[1.4] opacity-90 max-w-[420px]">
              A small set of operating habits that keep the product sharp
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
                d: "Focused sessions on one problem. Messaging, onboarding, IA, pricing page, or activation.",
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
              <div key={it.t}>
                <h3 className="font-display text-2xl leading-[1.15] mb-4 border-b border-white/30 pb-3">
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
      <section id="about" data-section="about" className="px-6 md:px-10 py-16 mx-3 md:mx-6">
        <div className="pt-6 mb-12 flex items-baseline justify-between">
        </div>
        <Reveal>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12">
          <div className="md:col-span-2 md:col-start-1">
            <p className="font-display text-xl leading-[1.2]">
              Paige Eaton
            </p>
            <p className="text-sm opacity-60 mt-2">Canada</p>
            <div className="mt-12 hidden md:block">
              <p className="text-sm opacity-70">≈ 3 min</p>
            </div>
          </div>

          <div className="md:col-span-6">
            <h2 className="font-display text-5xl leading-[1.05] mb-12">
              On the practice
            </h2>
            <p className="drop-cap text-lg leading-[1.65] mb-6">
              Building is cheap now. Judgment is not. Most teams don&rsquo;t
              need more output, they need clearer direction.
            </p>
            <p className="text-lg leading-[1.65] mb-6">
              The work is usually a mix of positioning, UX, and prioritization,
              plus a little bit of &ldquo;let&rsquo;s stop making this harder
              than it needs to be.&rdquo;
            </p>
            <p className="text-lg leading-[1.65]">
              Modern tools make iteration fast. The point is to use that speed
              to get to clarity, not to ship more chaos.
            </p>
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
        className="bg-[#E63946] text-white px-8 md:px-14 lg:px-16 py-16 m-6 section-chamfer relative"
      >
        <SectionRail>
          Prompt from Paige · Notes · MMXXVI
        </SectionRail>
        <div className="mb-12 flex items-baseline justify-between lg:pl-12">
          <span className="stamp opacity-90">No. 05 · Folio 001</span>
        </div>
        <Reveal>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end lg:pl-12">
          <div className="md:col-span-8">
            <h2 className="font-display text-5xl leading-[1.05] mb-6">
              Want the notes?
            </h2>
            <p className="text-lg leading-[1.5] max-w-[560px] opacity-90">
              Short thoughts on product clarity, UX, AI workflows, and the
              decisions that actually move things forward.
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
              placeholder="you@example.com"
              className="bg-white/15 text-white placeholder:text-white/60 px-4 py-3 focus:outline-none focus:bg-white/25 border border-white/30"
            />
            <button type="submit" className="btn self-start">
              <span className="btn-text bg-white text-[#0E6BFF]">
                Subscribe
              </span>
              <span className="btn-tab bg-white text-[#0E6BFF]">
                <BtnIcons />
              </span>
            </button>
            <p className="text-xs opacity-70 mt-1">
              One short note a week. Unsubscribe anytime.
            </p>
          </form>
        </div>
        </Reveal>
      </section>
      </div>

    </div>
  );
}
