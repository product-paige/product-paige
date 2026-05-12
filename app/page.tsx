"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
    title: "Positioning & product narrative",
    blurb:
      "Clear positioning and a story that matches the product, so the right users get it fast — and the wrong ones bounce before they cost you a quarter.",
  },
  {
    title: "UX & conversion design",
    blurb:
      "Friction-free flows that turn first-time visitors into trusting users. Measured, iterated, and owned end-to-end — not handed off in a Figma file.",
  },
  {
    title: "Onboarding & activation",
    blurb:
      "First-thirty-days journeys that get users to real value before doubt sets in. Activation as a craft, not a vanity metric on a dashboard.",
  },
  {
    title: "Growth & prioritization",
    blurb:
      "A prioritization system tied to outcomes, not opinions. Build the next thing because it compounds — not because someone shouted in standup.",
  },
];

const services = [
  { name: "Product strategy", bg: "#ebe3cd", swatch: "#1a1a1a", fg: "#1a1a1a" },
  { name: "Founder coaching", bg: "#c4d4e0", swatch: "#1a1a1a", fg: "#1a1a1a" },
  { name: "Operating frameworks", bg: "#4a78a8", swatch: "#ffffff", fg: "#ffffff" },
  { name: "Demand research", bg: "#c43d31", swatch: "#ffffff", fg: "#ffffff" },
  { name: "Product reviews", bg: "#c4d4e0", swatch: "#1a1a1a", fg: "#1a1a1a" },
  { name: "Workshops", bg: "#ebe3cd", swatch: "#1a1a1a", fg: "#1a1a1a" },
];

const projects = [
  {
    n: "001",
    name: "Real demand framework",
    year: "2026",
    role: "Strategy / research",
    blurb:
      "A method for separating wishful thinking from products people actually pay for. Used by 30+ founders to scope first launches.",
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
      <figcaption className="flex items-baseline justify-between mt-3 text-[14px] opacity-70">
        <span>{fig}</span>
        <span className="font-display text-[16px]">{caption}</span>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const [featured, ...rest] = projects;
  const [activeCap, setActiveCap] = useState(0);

  return (
    <div className="text-[#1a1a1a]">
      {/* — Masthead bar — */}
      <div className="bg-[#4a78a8] text-white px-6 md:px-10 h-7 flex items-center">
        <div className="w-full flex items-center justify-between gap-6 text-[12px] leading-none">
          <span>Vol. 01 · Issue no. 1</span>
          <span className="hidden md:inline opacity-80">
            Product strategy · For founders · In the age of AI
          </span>
          <span>MMXXVI · Folio 001</span>
        </div>
      </div>

      {/* — Top Navigation — */}
      <header className="px-6 md:px-10 h-12 border-b border-[#1a1a1a]/25 flex items-center">
        <nav className="w-full flex items-center justify-between gap-6">
          <a href="/" className="font-display text-[24px] leading-none">
            Product Paige
          </a>
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <a href="#work" className="hover:opacity-60 transition-opacity">
                Projects
              </a>
            </li>
            <li>
              <a href="#services" className="hover:opacity-60 transition-opacity">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:opacity-60 transition-opacity">
                About
              </a>
            </li>
            <li>
              <a
                href="https://productpaige.com/playbooks"
                className="hover:opacity-60 transition-opacity"
              >
                Playbooks
              </a>
            </li>
          </ul>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/ask-paige"
              className="hover:opacity-60 transition-opacity"
            >
              Ask Paige
            </a>
            <a href="mailto:hello@productpaige.com" className="inline-flex btn">
              <span className="btn-text bg-[#1a1a1a] text-white">
                Get in touch
              </span>
              <span className="btn-tab bg-[#1a1a1a] text-white">
                <BtnIcons />
              </span>
            </a>
          </div>
        </nav>
      </header>

      {/* === SECTION: hero === */}
      <section
        id="hero"
        data-section="hero"
        className="p-6 md:p-10 min-h-[calc(100vh-76px)] flex"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-stretch w-full">
          <div className="md:col-span-7 flex flex-col justify-end">
            <p className="eyebrow opacity-60 mb-6">
              The cover · An independent practice
            </p>
            <h1 className="font-display leading-[1.05] text-[clamp(34px,4.4vw,72px)]">
              Product strategy for founders shipping in the age of AI
            </h1>
            <div className="grid md:grid-cols-12 gap-12 mt-12">
              <p className="md:col-span-7 text-[20px] leading-[1.25] max-w-[460px]">
                I&rsquo;m Paige &mdash; a product strategist working alongside
                technical founders to turn ideas into products that solve real
                demand. Working with clarity, intention, and the operating
                habits to compound over the long arc.
              </p>
              <div className="md:col-span-4 md:col-start-9">
                <p className="eyebrow opacity-60 mb-3">Status</p>
                <p className="text-[18px] leading-[1.25]">
                  <span className="inline-block w-2.5 h-2.5 bg-[#c43d31] mr-2 align-middle" />
                  Available — Q3 2026
                </p>
              </div>
            </div>
          </div>
          <figure className="md:col-span-5 flex flex-col h-full">
            <div className="placeholder w-full flex-1 min-h-[300px]" />
            <figcaption className="flex items-baseline justify-between mt-3 text-[14px] opacity-70">
              <span>Fig. 01</span>
              <span className="font-display text-[16px]">Studio, Brooklyn</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* === SECTION: services-labels === */}
      <section id="services" data-section="services-labels" className="px-6 md:px-10 pb-12">
        <div className="rule border-t pt-6 mb-6 flex items-baseline justify-between">
          <span className="eyebrow opacity-60">Practice areas</span>
          <span className="eyebrow opacity-60">Six disciplines</span>
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
                  <span
                    className="svc-label-swatch"
                    style={{ backgroundColor: s.swatch }}
                  />
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* === SECTION: selected-work === */}
      <section id="work" data-section="selected-work" className="px-6 md:px-10 pb-16 md:pb-[84px]">
        <div className="rule border-t pt-6 mb-12 flex items-baseline justify-between">
          <span className="eyebrow">Selected work</span>
          <span className="eyebrow opacity-60">2024 — 2026</span>
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
            <p className="eyebrow opacity-60 mb-6">
              Featured · No. {featured.n}
            </p>
            <h3 className="font-display text-[clamp(28px,3.4vw,48px)] leading-[1.05] mb-6">
              {featured.name}
            </h3>
            <p className="text-[14px] mb-6 opacity-70">
              {featured.year} · {featured.role}
            </p>
            <p className="text-[16px] leading-[1.6] max-w-[420px] mb-12">
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

        {/* Folio Index — colored chamfered cards */}
        <div className="rule border-t pt-6 mb-12 flex items-baseline justify-between">
          <span className="eyebrow opacity-60">Folio index</span>
          <span className="eyebrow opacity-60">{rest.length} entries</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal delay={0}>
          {/* Card 1 — Red, form-style metadata */}
          <a
            href={rest[0].href}
            className="card card-red"
            style={{ marginTop: 0 }}
          >
            <header className="flex items-start justify-between mb-6">
              <span className="text-[14px] opacity-80">
                Department 02 · {rest[0].role}
              </span>
              <div className="flex gap-1.5">
                <span className="punch" />
                <span className="punch" />
                <span className="punch" />
              </div>
            </header>
            <div className="placeholder-card" />
            <h4 className="font-display text-[clamp(28px,2.6vw,40px)] leading-[1.05] mb-6">
              *{rest[0].name}
            </h4>
            <p className="text-[20px] leading-[1.25] opacity-90 mb-12">
              {rest[0].blurb}
            </p>
            <dl className="text-[14px] space-y-2 opacity-90 mt-auto">
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>No.</dt>
                <dd>{rest[0].n}</dd>
              </div>
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>Year</dt>
                <dd>{rest[0].year}</dd>
              </div>
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>Format</dt>
                <dd>Eight chapters</dd>
              </div>
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>Reading</dt>
                <dd>≈ 90 min</dd>
              </div>
            </dl>
          </a>
          </Reveal>

          <Reveal delay={120}>
          {/* Card 2 — Bright blue, track-listing */}
          <a
            href={rest[1].href}
            className="card card-blue-bright"
            style={{ marginTop: "3rem" }}
          >
            <header className="flex items-start justify-between mb-6">
              <span className="text-[14px] opacity-80">
                Department 03 · {rest[1].role}
              </span>
              <span className="text-[14px] opacity-80">No. {rest[1].n}</span>
            </header>
            <div className="placeholder-card" />
            <h4 className="font-display text-[clamp(28px,2.6vw,40px)] leading-[1.05] mb-6">
              *{rest[1].name}
            </h4>
            <p className="text-[20px] leading-[1.25] opacity-90 mb-12">
              {rest[1].blurb}
            </p>
            <ol className="text-[14px] space-y-2 opacity-90 mt-auto">
              <li className="flex justify-between border-b border-current/30 pb-1.5">
                <span>.01 — Frameworks</span>
                <span>●</span>
              </li>
              <li className="flex justify-between border-b border-current/30 pb-1.5">
                <span>.02 — Manuals</span>
                <span>●</span>
              </li>
              <li className="flex justify-between border-b border-current/30 pb-1.5 opacity-70">
                <span>.03 — Field notes</span>
                <span>○</span>
              </li>
            </ol>
          </a>
          </Reveal>

          <Reveal delay={240}>
          {/* Card 3 — Baby blue, data rows */}
          <a
            href={rest[2].href}
            className="card card-blue-light"
            style={{ marginTop: "1rem" }}
          >
            <header className="flex items-start justify-between mb-6">
              <span className="text-[14px] opacity-80">
                Department 04 · {rest[2].role}
              </span>
              <span className="text-[14px] opacity-80">Cohort {rest[2].year}</span>
            </header>
            <div className="placeholder-card" />
            <h4 className="font-display text-[clamp(28px,2.6vw,40px)] leading-[1.05] mb-6">
              *{rest[2].name}
            </h4>
            <p className="text-[20px] leading-[1.25] opacity-90 mb-12">
              {rest[2].blurb}
            </p>
            <dl className="text-[14px] space-y-2 opacity-90 mt-auto">
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>Members</dt>
                <dd>●●●●●●</dd>
              </div>
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>Cadence</dt>
                <dd>Weekly · 6 mo.</dd>
              </div>
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>Status</dt>
                <dd>Apply by Q3</dd>
              </div>
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>Format</dt>
                <dd>Closed cohort</dd>
              </div>
              <div className="flex justify-between border-b border-current/30 pb-1.5">
                <dt>Cost</dt>
                <dd>By application</dd>
              </div>
            </dl>
          </a>
          </Reveal>
        </div>
      </section>

      {/* === SECTION: capabilities === */}
      <section id="capabilities" data-section="capabilities" className="px-6 md:px-10 pb-16 md:pb-[84px]">
        <div className="rule border-t pt-6 mb-12 flex items-baseline justify-between">
          <span className="eyebrow opacity-60">Capabilities</span>
          <span className="eyebrow opacity-60">04 areas</span>
        </div>
        <Reveal>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12">
          <div className="md:col-span-6 flex flex-col">
            <h2 className="font-display text-[clamp(28px,3.4vw,48px)] leading-[1.1] mb-12">
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
                    className={`w-full text-left py-5 font-display text-[36px] leading-[1.1] transition-opacity ${
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
              <p className="text-[18px] leading-[1.25] mb-12 min-h-[5em]">
                {capabilities[activeCap].blurb}
              </p>
              <a href="#services" className="btn self-start">
                <span className="btn-text bg-[#c43d31] text-white">
                  Explore services
                </span>
                <span className="btn-tab bg-[#c43d31] text-white">
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

      {/* === SECTION: field-note (pull quote) === */}
      <section id="field-note" data-section="field-note" className="px-6 md:px-10 pb-16 md:pb-[84px]">
        <div className="rule border-t pt-6 mb-12 flex items-baseline justify-between">
          <span className="eyebrow opacity-60">Field note</span>
          <span className="eyebrow opacity-60">No. 12</span>
        </div>
        <Reveal>
        <blockquote className="max-w-[1100px]">
          <p className="font-display text-[clamp(28px,3.6vw,52px)] leading-[1.1] tracking-[-0.02em]">
            &ldquo;Vibe-coding is not a strategy. The market doesn&rsquo;t care
            how fast you shipped a thing nobody wanted.&rdquo;
          </p>
          <footer className="mt-12 flex items-baseline gap-6 text-[14px] opacity-70">
            <span>On the gap between prototype &amp; product</span>
            <span>The compass · 2026</span>
          </footer>
        </blockquote>
        </Reveal>
      </section>

      {/* === SECTION: practice (dark, chamfered) === */}
      <section id="practice" data-section="practice" className="bg-[#4a78a8] text-white px-6 md:px-10 py-16 md:py-[84px] mx-3 md:mx-6 section-chamfer relative">
        {/* Vertical rail text */}
        <div className="hidden lg:flex items-center absolute left-3 inset-y-0">
          <span className="rail-text opacity-70">
            On the practice · Four engagements · MMXXVI
          </span>
        </div>
        <div className="border-t border-white/30 pt-6 mb-12 flex items-baseline justify-between lg:pl-12">
          <span className="eyebrow opacity-80">On the practice</span>
          <span className="eyebrow opacity-80">Four engagements</span>
        </div>
        <Reveal>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 lg:pl-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(28px,3.4vw,48px)] leading-[1.1] mb-6 md:mb-0">
              Strategy &amp; operating systems for founders building in the
              AI&nbsp;era
            </h2>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-12 gap-y-12">
            {[
              {
                t: "Strategy",
                d: "Sharpen the bet. Pressure-test the product thesis, positioning, and where real demand actually lives — before you spend another quarter shipping.",
              },
              {
                t: "Coaching",
                d: "Weekly working sessions for founders who want a sharper thinking partner. Not another deck reviewer or generic exec coach.",
              },
              {
                t: "Frameworks",
                d: "Operating frameworks distilled from working with technical founders — demand research, prioritization, launch loops, retention systems.",
              },
              {
                t: "Workshops",
                d: "In-depth sessions with founding teams. Half-day or multi-day formats focused on one specific, costly question.",
              },
            ].map((it) => (
              <div key={it.t}>
                <h3 className="font-display text-[26px] leading-[1.15] mb-4 border-b border-white/30 pb-3">
                  {it.t}
                </h3>
                <p className="text-[16px] leading-[1.55] opacity-80">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* === SECTION: about (essay) === */}
      <section id="about" data-section="about" className="px-6 md:px-10 py-16 md:py-[84px]">
        <div className="rule border-t pt-6 mb-12 flex items-baseline justify-between">
          <span className="eyebrow">On the practice</span>
          <span className="eyebrow opacity-60">An essay · 2026</span>
        </div>

        <Reveal>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12">
          <div className="md:col-span-2 md:col-start-1">
            <p className="eyebrow opacity-60 mb-3">By</p>
            <p className="font-display text-[20px] leading-[1.2]">
              Paige Harris
            </p>
            <p className="text-[14px] opacity-60 mt-2">
              Brooklyn · NYC
            </p>
            <div className="mt-12 hidden md:block">
              <p className="eyebrow opacity-60 mb-3">Reading</p>
              <p className="text-[14px] opacity-70">≈ 4 min</p>
            </div>
          </div>

          <div className="md:col-span-6">
            <h2 className="font-display text-[clamp(28px,3.2vw,48px)] leading-[1.05] mb-12">
              On the gap between prototype &amp; product
            </h2>
            <p className="drop-cap text-[18px] leading-[1.65] mb-6">
              Since 2021, I&rsquo;ve worked with technical founders building
              products in the AI era. The pattern repeats: a working prototype
              in a weekend, then six months of slow death because nothing
              compounds. The gap isn&rsquo;t in the code. It&rsquo;s in the
              questions you asked before you started writing it.
            </p>
            <p className="text-[18px] leading-[1.65] mb-6">
              My practice sits in that gap &mdash; between the rush of vibe
              coding and the slow, expensive work of building a real product.
              I help founders sharpen their thesis, find real demand, and put
              operating systems in place that hold up after the initial fire.
            </p>
            <p className="text-[18px] leading-[1.65]">
              I write about it at{" "}
              <a
                href="https://productpaige.com/compass"
                className="border-b border-[#1a1a1a]/60 hover:opacity-60"
              >
                The&nbsp;compass
              </a>
              .
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

      {/* === SECTION: contact (CTA, red, chamfered) === */}
      <section
        id="contact"
        data-section="contact"
        className="bg-[#c43d31] text-white px-6 md:px-10 py-16 md:py-[84px] mx-3 md:mx-6 section-chamfer relative"
      >
        {/* Vertical rail text */}
        <div className="hidden lg:flex items-center absolute left-3 inset-y-0">
          <span className="rail-text opacity-70">
            Correspondence · Get in touch · Brooklyn NYC
          </span>
        </div>
        <div className="border-t border-white/30 pt-6 mb-12 flex items-baseline justify-between lg:pl-12">
          <span className="eyebrow">Correspondence</span>
          <span className="stamp opacity-90">No. 05 · Folio 001</span>
        </div>
        <Reveal>
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end lg:pl-12">
          <h2 className="md:col-span-8 font-display text-[clamp(28px,3.6vw,56px)] leading-[1.05]">
            Let&rsquo;s talk. From early thesis to launch, I help founders cut
            through noise and build products that compound
          </h2>
          <div className="md:col-span-4">
            <p className="text-[16px] opacity-70 leading-[1.55] mb-12 max-w-[360px]">
              Not into calls? Send a note. The best engagements start with a
              specific, expensive question.
            </p>
            <div className="flex flex-col gap-3 items-start">
              <a href="mailto:hello@productpaige.com" className="btn">
                <span className="btn-text bg-white text-[#1a1a1a]">
                  hello@productpaige.com
                </span>
                <span className="btn-tab bg-white text-[#1a1a1a]">
                  <BtnIcons />
                </span>
              </a>
              <a href="#" className="btn">
                <span className="btn-text bg-white/15 text-white">
                  Book a call
                </span>
                <span className="btn-tab bg-white/15 text-white">
                  <BtnIcons />
                </span>
              </a>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* === SECTION: footer (colophon) === */}
      <footer data-section="footer" className="px-6 md:px-10 py-12 md:py-16">
        <div className="border-t border-[#1a1a1a]/25 pt-6">
          <div className="grid md:grid-cols-12 gap-6 mb-12">
            <div className="md:col-span-4">
              <p className="eyebrow opacity-60 mb-3">Colophon</p>
              <p className="text-[15px] leading-[1.55] opacity-80 max-w-[320px]">
                Set in Funnel Sans &amp; Tiempos Text. An independent practice
                in product strategy, published from Brooklyn since 2021.
              </p>
            </div>
            <div className="md:col-span-3 md:col-start-6">
              <p className="eyebrow opacity-60 mb-3">Sections</p>
              <ul className="space-y-1">
                <li>
                  <a href="#work" className="hover:opacity-60">
                    Selected work
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:opacity-60">
                    On the practice
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:opacity-60">
                    Correspondence
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <p className="eyebrow opacity-60 mb-3">Elsewhere</p>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://productpaige.com/compass"
                    className="hover:opacity-60"
                  >
                    The compass
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/productpaige"
                    className="hover:opacity-60"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/productpaige"
                    className="hover:opacity-60"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1a1a1a]/25 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[14px] opacity-70">
            <p>© MMXXVI · Product Paige</p>
            <p className="hidden md:block">
              Vol. 01 · Issue no. 1 · Folio 001
            </p>
            <p>Page 001 / 001</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
