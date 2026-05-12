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

function BtnIcons() {
  return (
    <>
      <svg
        className="icon-default"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 7H11M11 7L7 3M11 7L7 11"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <svg
        className="icon-hover"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 3L11 11M11 11V4M11 11H4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </>
  );
}

const useCases = [
  {
    t: "Product feedback",
    d: "“Something feels off and we can’t quite name it.” That’s usually where I’m most useful.",
    tone: "card-cream",
  },
  {
    t: "UX reviews",
    d: "Onboarding, friction, navigation, the moment people drop out. The small stuff that quietly costs you users.",
    tone: "card-blue-light",
  },
  {
    t: "Homepage critiques",
    d: "Messaging, structure, the thing the page is supposed to do. Whether a stranger gets it in three seconds.",
    tone: "card-blue-bright",
  },
  {
    t: "AI & vibe-coded products",
    d: "Workflows, usability, and the product thinking behind a thing built fast. What’s real, what’s noise.",
    tone: "card-red",
  },
  {
    t: "Product clarity",
    d: "What it does. Who it’s for. Where it’s muddy. The questions you keep dodging in standup.",
    tone: "card-cream",
  },
  {
    t: "Shopify & SaaS",
    d: "Especially product-led tools and the kind of software real businesses pay for and rely on.",
    tone: "card-blue-light",
  },
] as const;

const youGet = [
  "Async review before the call",
  "Live product feedback session",
  "UX + positioning critique",
  "Prioritization, not a wishlist",
  "Optional follow-up notes or Loom",
];

const forYou = [
  "Founders",
  "Solo builders",
  "Product teams",
  "Shopify apps",
  "AI-assisted products",
  "Ecommerce software",
  "Teams moving fast and needing clarity",
];

const notForYou = [
  "Enterprise procurement processes",
  "Three-month strategy engagements",
  "“Tell us everything wrong with our business”",
  "Pixel-perfect visual design reviews",
];

export default function AskPaigePage() {
  return (
    <main className="min-h-screen bg-[#f5f0df]">
      {/* — Folio header bar — */}
      <div className="h-[28px] border-b border-[#1a1a1a]/15 flex items-center px-6 md:px-10 text-[11px] tracking-[0.18em] uppercase opacity-60">
        <span>Vol. 01 · Issue no. 1</span>
        <span className="mx-auto hidden md:inline">
          Ask Paige · Product feedback · A one-session format
        </span>
        <span>MMXXVI · Folio 002</span>
      </div>

      {/* — Top Navigation — */}
      <header className="px-6 md:px-10 h-12 border-b border-[#1a1a1a]/25 flex items-center">
        <nav className="w-full flex items-center justify-between gap-6">
          <a href="/" className="font-display text-[24px] leading-none">
            Product Paige
          </a>
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <a href="/#work" className="hover:opacity-60 transition-opacity">
                Projects
              </a>
            </li>
            <li>
              <a href="/#services" className="hover:opacity-60 transition-opacity">
                Services
              </a>
            </li>
            <li>
              <a href="/#about" className="hover:opacity-60 transition-opacity">
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
              className="hover:opacity-60 transition-opacity underline underline-offset-4 decoration-[#1a1a1a]/40"
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
        className="p-6 md:p-10 min-h-[calc(100vh-76px)] flex"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-stretch w-full">
          <div className="md:col-span-8 flex flex-col justify-end">
            <p className="eyebrow opacity-60 mb-6">
              Department 05 · A single-session format
            </p>
            <h1 className="font-display leading-[1.05] text-[clamp(40px,5.4vw,84px)]">
              Ask Paige
            </h1>
            <p className="font-display text-[clamp(22px,2vw,28px)] leading-[1.2] mt-8 max-w-[640px]">
              Need another product brain in the room?
            </p>
            <div className="grid md:grid-cols-12 gap-12 mt-10">
              <p className="md:col-span-7 text-[18px] leading-[1.5] max-w-[520px]">
                Send me your product, onboarding flow, homepage, positioning,
                or that half-finished idea you can&rsquo;t quite see clearly
                yet. I&rsquo;ll give you honest, product-minded feedback &mdash;
                quickly, and without the consulting theatre.
              </p>
              <p className="md:col-span-5 text-[16px] leading-[1.55] opacity-70 max-w-[420px]">
                Built for founders, small teams, Shopify apps, AI products,
                and people building in public.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-6 flex-wrap">
              <a
                href="mailto:hello@productpaige.com?subject=Ask%20Paige%20%E2%80%94%20session%20booking"
                className="inline-flex btn"
              >
                <span className="btn-text bg-[#1a1a1a] text-white">
                  Book a session
                </span>
                <span className="btn-tab bg-[#1a1a1a] text-white">
                  <BtnIcons />
                </span>
              </a>
              <span className="font-display text-[20px]">
                $250 USD
                <span className="text-[14px] opacity-60 ml-2">
                  · one session, flat
                </span>
              </span>
            </div>
          </div>
          <figure className="md:col-span-4 flex flex-col h-full">
            <div className="placeholder w-full flex-1 min-h-[300px] flex items-end p-6">
              <p className="font-display text-[20px] text-[#1a1a1a]">
                One conversation. <br />
                The version of your product you&rsquo;ve been avoiding.
              </p>
            </div>
            <figcaption className="flex items-baseline justify-between mt-3 text-[14px] opacity-70">
              <span>Fig. 07</span>
              <span className="font-display text-[16px]">Office hours</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* === SECTION: use-cases === */}
      <section id="use-cases" className="px-6 md:px-10 py-16 md:py-[84px]">
        <div className="rule border-t pt-6 mb-12 flex items-baseline justify-between">
          <span className="eyebrow">What people bring me</span>
          <span className="eyebrow opacity-60">Six common shapes</span>
        </div>
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {useCases.map((u) => (
              <article key={u.t} className={`card ${u.tone}`}>
                <p className="eyebrow opacity-70 mb-4">No. {u.t}</p>
                <h3 className="font-display text-[26px] leading-[1.15] mb-4 border-b border-current/30 pb-3">
                  {u.t}
                </h3>
                <p className="text-[16px] leading-[1.55] opacity-90">{u.d}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* === SECTION: what-you-get (chamfered) === */}
      <section className="bg-[#1a2840] text-white px-6 md:px-10 py-16 md:py-[84px] mx-3 md:mx-6 section-chamfer relative">
        <div className="hidden lg:flex items-center absolute left-3 inset-y-0">
          <span className="rail-text opacity-70">
            One session · Async + live · No giant decks
          </span>
        </div>
        <div className="border-t border-white/30 pt-6 mb-12 flex items-baseline justify-between lg:pl-12">
          <span className="eyebrow opacity-80">What you get</span>
          <span className="eyebrow opacity-80">A single, focused session</span>
        </div>
        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 lg:pl-12">
            <div className="md:col-span-5">
              <h2 className="font-display text-[clamp(28px,3.4vw,48px)] leading-[1.1] mb-6">
                One focused session. Honest feedback. No fake frameworks.
              </h2>
              <p className="text-[16px] leading-[1.6] opacity-80 max-w-[420px]">
                I look at the product before we meet, then we go deep on
                what&rsquo;s actually getting in the way. You leave with a
                shortlist of things to change, in priority order.
              </p>
            </div>
            <ul className="md:col-span-7 grid sm:grid-cols-2 gap-x-12 gap-y-6">
              {youGet.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-white/20 pb-4"
                >
                  <span className="font-display text-[20px] opacity-50 w-8">
                    .{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[17px] leading-[1.35]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* === SECTION: fit (two columns) === */}
      <section className="px-6 md:px-10 py-16 md:py-[84px]">
        <div className="rule border-t pt-6 mb-12 flex items-baseline justify-between">
          <span className="eyebrow">Fit check</span>
          <span className="eyebrow opacity-60">Boundaries, early</span>
        </div>
        <Reveal>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Who this is for */}
            <article className="card card-cream">
              <p className="eyebrow opacity-70 mb-4">Who this is for</p>
              <h3 className="font-display text-[26px] leading-[1.15] mb-6 border-b border-[#1a1a1a]/25 pb-3">
                A good fit
              </h3>
              <ul className="space-y-2">
                {forYou.map((f) => (
                  <li
                    key={f}
                    className="text-[16px] leading-[1.45] flex items-baseline gap-3"
                  >
                    <span className="inline-block w-2 h-2 bg-[#1a1a1a] mt-1" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>

            {/* Not a fit */}
            <article className="card card-blue-light">
              <p className="eyebrow opacity-70 mb-4">Not a fit for</p>
              <h3 className="font-display text-[26px] leading-[1.15] mb-6 border-b border-[#1a1a1a]/25 pb-3">
                Probably skip this
              </h3>
              <ul className="space-y-2">
                {notForYou.map((f) => (
                  <li
                    key={f}
                    className="text-[16px] leading-[1.45] flex items-baseline gap-3"
                  >
                    <span className="inline-block w-2 h-[2px] bg-[#1a1a1a] mt-2" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-[14px] opacity-70 mt-6">
                Saying it out loud saves both of us a week.
              </p>
            </article>
          </div>
        </Reveal>
      </section>

      {/* === SECTION: final-cta === */}
      <section
        id="contact"
        className="bg-[#c43d31] text-white px-6 md:px-10 py-16 md:py-[84px] mx-3 md:mx-6 section-chamfer relative"
      >
        <div className="hidden lg:flex items-center absolute left-3 inset-y-0">
          <span className="rail-text opacity-70">
            Correspondence · Book a session · Brooklyn NYC
          </span>
        </div>
        <div className="border-t border-white/30 pt-6 mb-12 flex items-baseline justify-between lg:pl-12">
          <span className="eyebrow">Correspondence</span>
          <span className="stamp opacity-90">No. 05 · Ask Paige</span>
        </div>
        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end lg:pl-12">
            <div className="md:col-span-8">
              <h2 className="font-display text-[clamp(28px,3.6vw,56px)] leading-[1.05] mb-6">
                Bring me the messy version.
              </h2>
              <p className="text-[18px] leading-[1.55] max-w-[560px] mb-3">
                The confusing onboarding. The feature-heavy product. The
                homepage that isn&rsquo;t landing. The AI workflow that almost
                works.
              </p>
              <p className="text-[18px] leading-[1.55] max-w-[560px] opacity-90">
                That&rsquo;s usually where the interesting work starts.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <a
                href="mailto:hello@productpaige.com?subject=Ask%20Paige%20%E2%80%94%20session%20booking"
                className="inline-flex btn"
              >
                <span className="btn-text bg-white text-[#c43d31]">
                  Book Ask Paige
                </span>
                <span className="btn-tab bg-white text-[#c43d31]">
                  <BtnIcons />
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* — Footer — */}
      <footer className="px-6 md:px-10 py-10 flex items-baseline justify-between text-[13px] opacity-70">
        <span>© MMXXVI · Product Paige · Brooklyn</span>
        <a href="/" className="hover:opacity-60">
          ← Back to the cover
        </a>
      </footer>
    </main>
  );
}
