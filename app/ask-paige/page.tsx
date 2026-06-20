"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SectionRail } from "../components/SectionRail";
import { SectionDivider } from "../components/SectionDivider";
import { BtnIcons } from "../components/BtnIcons";

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
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === SECTION: hero === */}
      <section
        id="hero"
        data-section="hero"
        className="p-6 md:p-10 min-h-[calc(100vh-76px)] flex mx-3 md:mx-6"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-stretch w-full">
          <div className="md:col-span-8 flex flex-col justify-end">
            <p className="eyebrow opacity-60 mb-6">
              A single-session format
            </p>
            <h1 className="font-display leading-[0.9] tracking-tightest text-5xl md:text-7xl lg:text-8xl">
              Ask Paige
            </h1>
            <p className="font-display text-xl md:text-2xl leading-[1.2] mt-8 max-w-[640px]">
              Want help getting unstuck?
            </p>
            <p className="text-lg leading-[1.5] max-w-[560px] mt-8">
              Send what you&rsquo;re working on. A product, onboarding flow,
              homepage, positioning, or the half-finished idea you can&rsquo;t
              see clearly yet. You&rsquo;ll get honest, product-minded feedback
              fast, without the consulting theatre.
            </p>
            <div className="mt-12 flex items-center gap-6 flex-wrap">
              <a
                href="mailto:hello@productpaige.com?subject=Ask%20Paige%20%E2%80%94%20session%20booking"
                className="inline-flex btn"
              >
                <span className="btn-text bg-[#e8252d] text-white">
                  Book a session
                </span>
                <span className="btn-tab bg-[#e8252d] text-white">
                  <BtnIcons />
                </span>
              </a>
              <span className="font-display text-xl">
                $250 USD
                <span className="text-sm opacity-60 ml-2">· one session</span>
              </span>
            </div>
          </div>
          <figure className="md:col-span-4 flex flex-col h-full">
            <div className="placeholder w-full flex-1 min-h-[300px] flex items-end p-6">
              <p className="font-display text-xl text-[#1a1a1a]">
                One conversation. <br />
                The version of your product you&rsquo;ve been avoiding.
              </p>
            </div>
            <figcaption className="flex items-baseline justify-between mt-3 text-sm opacity-70">
              <span>Fig. 07</span>
              <span className="font-display text-base">Office hours</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <SectionDivider />
      {/* === SECTION: use-cases === */}
      <section id="use-cases" data-section="use-cases" className="px-6 md:px-10 py-16 mx-3 md:mx-6">
        <div className="pt-6 mb-6 flex items-baseline justify-between">
          <span className="eyebrow opacity-60">What we can cover</span>
          <span className="eyebrow opacity-60">Six common buckets</span>
        </div>
        <p className="font-display text-2xl md:text-3xl leading-[1.2] max-w-[640px] mb-12">
          Most sessions land in one of these buckets:
        </p>
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
            {useCases.map((u, i) => (
              <article key={u.t} className={`card ${u.tone} flex flex-col h-full`}>
                <p className="eyebrow opacity-70 mb-4">
                  No. {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl leading-[1.15] mb-4 border-b border-current/30 pb-3">
                  {u.t}
                </h3>
                <p className="text-base leading-[1.55] opacity-90">{u.d}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <SectionDivider />
      {/* === SECTION: how-it-works (chamfered, in framed container) === */}
      <div data-section="how-it-works-frame" className="mx-3 md:mx-6">
        <section data-section="how-it-works" className="bg-[#1a1a1a] text-white px-8 md:px-14 lg:px-16 py-16 m-6 section-chamfer relative">
          <SectionRail>
            One session · Async + live · No giant decks
          </SectionRail>
          <div className="mb-12 flex items-baseline justify-between lg:pl-12">
            <span className="eyebrow opacity-80">How it works</span>
            <span className="eyebrow opacity-80">One focused session</span>
          </div>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 lg:pl-12">
              <div className="md:col-span-5">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-6">
                  One focused session. Clear feedback. No fake frameworks.
                </h2>
              </div>
              <ul className="md:col-span-7 grid gap-y-4">
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

      <SectionDivider />
      {/* === SECTION: fit-check === */}
      <section data-section="fit-check" className="px-6 md:px-10 py-16 mx-3 md:mx-6">
        <div className="pt-6 mb-12 flex items-baseline justify-between">
          <span className="eyebrow opacity-60">Fit check</span>
          <span className="eyebrow opacity-60">Boundaries, early</span>
        </div>
        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-7">
              <p className="font-display text-2xl md:text-3xl leading-[1.3] mb-8 max-w-[640px]">
                <span className="opacity-60">Great fit for:</span> founders,
                solo builders, small product teams, teams moving fast and
                needing clarity.
              </p>
              <p className="font-display text-2xl md:text-3xl leading-[1.3] mb-8 max-w-[640px]">
                <span className="opacity-60">Probably not a fit for:</span>{" "}
                enterprise procurement, long strategy engagements,
                &ldquo;tell us everything wrong with our business,&rdquo;
                pixel-perfect visual design reviews.
              </p>
              <p className="text-base opacity-70">
                Saying it out loud saves both of us a week.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider />
      {/* === SECTION: final-cta (red, chamfered, in framed container) === */}
      <div data-section="final-cta-frame" className="mx-3 md:mx-6">
        <section
          id="contact"
          data-section="final-cta"
          className="bg-[#e8252d] text-white px-8 md:px-14 lg:px-16 py-16 m-6 section-chamfer relative"
        >
          <SectionRail>
            Bring the messy version · Book a session · MMXXVI
          </SectionRail>
          <div className="mb-12 flex items-baseline justify-between lg:pl-12">
            <span className="eyebrow opacity-80">Bring the messy version</span>
            <span className="eyebrow opacity-80">Ask Paige</span>
          </div>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end lg:pl-12">
              <div className="md:col-span-8">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-6">
                  Bring the messy version.
                </h2>
                <p className="text-lg leading-[1.55] max-w-[560px] mb-3">
                  The confusing onboarding. The feature-heavy product. The
                  homepage that almost works. The AI workflow held together with
                  prompts and hope.
                </p>
                <p className="text-lg leading-[1.55] max-w-[560px] opacity-90">
                  That&rsquo;s usually where the interesting work starts.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <a
                  href="mailto:hello@productpaige.com?subject=Ask%20Paige%20%E2%80%94%20session%20booking"
                  className="inline-flex btn"
                >
                  <span className="btn-text bg-white text-[#e8252d]">
                    Book Ask Paige
                  </span>
                  <span className="btn-tab bg-white text-[#e8252d]">
                    <BtnIcons />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
