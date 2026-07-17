"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BtnIcons } from "../components/BtnIcons";
import { ClosingCTA } from "../components/ClosingCTA";

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

const useCases = [
  {
    t: "Product feedback",
    d: "Something feels off, but it’s hard to name. Great place to start.",
    tone: "card-cream",
  },
  {
    t: "UX review",
    d: "Onboarding, navigation, friction, and the drop-off moments that quietly cost users.",
    tone: "card-blue-light",
  },
  {
    t: "Homepage critique",
    d: "Messaging, structure, and whether a stranger gets it in three seconds.",
    tone: "card-blue-bright",
  },
  {
    t: "AI-built products",
    d: "Vibe-coded or AI-assisted. What’s real, what’s noise, and what needs product thinking.",
    tone: "card-red",
  },
  {
    t: "Product clarity",
    d: "What it does, who it’s for, and where the story is getting muddy.",
    tone: "card-cream",
  },
  {
    t: "SaaS and product-led tools",
    d: "Especially software people actually pay for and rely on.",
    tone: "card-blue-light",
  },
] as const;

const youGet = [
  "Async review before the call (links, screens, whatever you have)",
  "Live session to go deep on what’s actually getting in the way",
  "A short prioritized list of what to fix now vs later",
  "Optional follow-up notes or a Loom if helpful",
];

export default function AskPaigePage() {
  return (
    <div className="theme contents">

      {/* === HERO === matches homepage hero layout */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Ask Paige</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] text-[#1A191E] max-w-[20ch]">
                  Want help getting unstuck?
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
                  Send what you&rsquo;re working on — a product, onboarding flow,
                  homepage, positioning, or the half-finished idea you can&rsquo;t
                  see clearly yet. Honest, product-minded feedback fast, without
                  the consulting theatre.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="mailto:hello@productpaige.com?subject=Ask%20Paige%20%E2%80%94%20session%20booking"
                className="inline-flex btn"
              >
                <span className="btn-text bg-[#0E6BFF] text-white">
                  Book a session
                </span>
                <span className="btn-tab bg-[#0E6BFF] text-white">
                  <BtnIcons />
                </span>
              </a>
              <span className="text-xl font-display leading-[1.1] text-[#1A191E] flex items-baseline gap-2">
                $250 USD
                <span className="text-sm leading-[1.4] opacity-60">· one session</span>
              </span>
            </div>
          </div>
          <aside
            className="relative min-w-0 p-6 flex items-end justify-end divider-indent-left bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            <div className="card card-sm card-cream flex flex-col gap-2 !min-h-0 w-full md:max-w-[380px]">
              <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">
                One conversation.
              </h3>
              <p className="text-base leading-[1.2] opacity-80">
                The version of your product you&rsquo;ve been avoiding.
              </p>
            </div>
          </aside>
        </div>
      </section>

      
      {/* === SECTION: use-cases === */}
      <section id="use-cases" data-section="use-cases" className="p-6 md:p-10 mx-3 md:mx-6 flex flex-col gap-12 section-border-b">
        <p className="font-display text-2xl md:text-3xl leading-[1.2] max-w-[640px]">
          Most sessions land in one of these buckets:
        </p>
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
            {useCases.map((u, i) => (
              <article key={u.t} className={`card ${u.tone} flex flex-col gap-4 h-full`}>
                <h3 className="font-display text-2xl leading-[1.15] border-b border-current/30 pb-3">
                  {u.t}
                </h3>
                <p className="text-base leading-[1.55] opacity-90">{u.d}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      
      {/* === SECTION: how-it-works (chamfered, in framed container) === */}
      <div data-section="how-it-works-frame" className="mx-3 md:mx-6">
        <section data-section="how-it-works" className="bg-[#1a1a1a] text-white p-6 md:p-10 m-4 md:m-6 section-chamfer relative flex flex-col gap-12">
          <Reveal>
            <div className="grid md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-5">
                <h2 className="font-display text-5xl leading-[1.1]">
                  One focused session. Clear feedback. No fake frameworks.
                </h2>
              </div>
              <ul className="md:col-span-7 flex flex-col gap-4">
                {youGet.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 border-b border-white/20 pb-4"
                  >
                    <span className="font-display text-xl opacity-50 w-8 shrink-0">
                      .{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-[1.4]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      </div>

      
      {/* === SECTION: fit-check === split into two columns */}
      <section
        data-section="fit-check"
        className="p-6 md:p-10 section-border-b flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Fit check</span>
          <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-[#1A191E] max-w-[20ch]">
            Saving us both a week.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">Great fit for</h3>
            <p className="text-base leading-[1.4] opacity-80 max-w-[420px]">
              Founders, solo builders, small product teams, teams moving
              fast and needing clarity.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">Probably not a fit for</h3>
            <p className="text-base leading-[1.4] opacity-80 max-w-[420px]">
              Enterprise procurement, long strategy engagements, &ldquo;tell
              us everything wrong with our business,&rdquo; pixel-perfect
              visual design reviews.
            </p>
          </div>
        </div>
        <p className="text-sm leading-[1.4] opacity-60">
          Saying it out loud saves both of us a week.
        </p>
      </section>

      <ClosingCTA
        title="Bring the messy version."
        body="The confusing onboarding, the feature-heavy product, the homepage that almost works, the AI workflow held together with prompts and hope. That's usually where the interesting work starts."
        ctaLabel="Book Ask Paige"
        ctaHref="mailto:hello@productpaige.com?subject=Ask%20Paige%20%E2%80%94%20session%20booking"
      />
    </div>
  );
}
