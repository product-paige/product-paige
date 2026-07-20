"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BtnIcons } from "../components/BtnIcons";
import { ClosingCTA } from "../components/ClosingCTA";
import { type PixelIconName } from "../components/PixelIcon";
import { IconCard } from "../components/IconCard";

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

const useCases: Array<{
  name: string;
  blurb: string;
  icon: PixelIconName;
}> = [
  {
    name: "Product feedback",
    blurb: "Something feels off but hard to name. Great place to start.",
    icon: "cursor",
  },
  {
    name: "UX review",
    blurb: "Onboarding, navigation, the drop-off moments quietly costing users.",
    icon: "target",
  },
  {
    name: "Homepage critique",
    blurb: "Messaging, structure, whether a stranger gets it in three seconds.",
    icon: "browser",
  },
  {
    name: "AI-built products",
    blurb: "Vibe-coded or AI-assisted. What&rsquo;s real, what&rsquo;s noise, what needs product thinking.",
    icon: "sparkleA",
  },
  {
    name: "Product clarity",
    blurb: "What it does, who it&rsquo;s for, where the story is getting muddy.",
    icon: "megaphone",
  },
  {
    name: "SaaS + product-led tools",
    blurb: "Especially software people actually pay for and rely on.",
    icon: "door",
  },
];

const youGet = [
  "An async look at everything you send ahead of the call.",
  "A live session, focused on what matters most.",
  "A short list. What to shape now, what can wait.",
  "Optional follow-up notes or a Loom if it helps.",
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
                <h1 className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] text-ink max-w-[20ch]">
                  One focused hour on what you&rsquo;re building
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
                  Send what you&rsquo;re building. A product, an onboarding
                  flow, a homepage, positioning, or the half-formed idea. You
                  get honest, product-minded feedback in a single session.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="/contact?topic=ask-paige"
                className="inline-flex btn"
              >
                <span className="btn-text bg-[#0E6BFF] text-white">
                  Book a session
                </span>
                <span className="btn-tab bg-[#0E6BFF] text-white">
                  <BtnIcons />
                </span>
              </a>
              <span className="text-xl font-display leading-[1.1] text-ink flex items-baseline gap-2">
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
              <h3 className="text-xl font-display leading-[1.1] text-ink">
                One focused hour
              </h3>
              <p className="text-base leading-[1.2] opacity-80">
                Bring the product, the questions, the half-thoughts.
              </p>
            </div>
          </aside>
        </div>
      </section>

      
      {/* === SECTION: use-cases === */}
      <section id="use-cases" data-section="use-cases" className="p-6 md:p-10 flex flex-col gap-10 section-border-b">
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Use cases</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[20ch]">
              Common places sessions start
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Most sessions land in one of these. Not sure which fits? Send
              what you&rsquo;re working on and we&rsquo;ll figure it out.
            </p>
          </div>
        </div>
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {useCases.map((u) => (
              <IconCard
                key={u.name}
                name={u.name}
                blurb={u.blurb}
                icon={u.icon}
              />
            ))}
          </div>
        </Reveal>
      </section>

      
      {/* === SECTION: how-it-works === standard section pattern */}
      <section
        id="how-it-works"
        data-section="how-it-works"
        className="p-6 md:p-10 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">How it works</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[20ch]">
              A single hour. Direct feedback. Nothing invented
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Async prep, a live conversation, a prioritized list of what
              to shape next. That&rsquo;s the whole shape of it.
            </p>
          </div>
        </div>
        <Reveal>
          <ol className="grid md:grid-cols-2 gap-6 md:gap-10">
            {youGet.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-t border-[#1A191E]/20 pt-4"
              >
                <span className="font-mono text-[11px] leading-[1.2] tracking-[0.1em] uppercase opacity-60 w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-[1.4] opacity-80">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      
      {/* === SECTION: fit-check === split into two columns */}
      <section
        data-section="fit-check"
        className="p-6 md:p-10 section-border-b flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Fit check</span>
          <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[20ch]">
            A quick fit check
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Great fit for</h3>
            <p className="text-base leading-[1.4] opacity-80 max-w-[420px]">
              Founders, solo builders, small product teams, teams moving
              fast and needing clarity.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Probably not a fit for</h3>
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
        title="Ready when you are."
        body="Send whatever's on your mind. I'll come back with what stands out and where to shape it next."
        ctaLabel="Book Ask Paige"
        ctaHref="/contact?topic=ask-paige"
      />
    </div>
  );
}
