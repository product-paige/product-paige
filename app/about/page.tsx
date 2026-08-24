import type { Metadata } from "next";
import { BtnIcons } from "../components/BtnIcons";
import { ClosingCTA } from "../components/ClosingCTA";
import type { PixelIconName } from "../components/PixelIcon";
import { Chip } from "../components/Chip";

export const metadata: Metadata = {
  title: "About",
  description:
    "13 years inside the Shopify and ecommerce ecosystem. Half product marketer, half UX designer. Independent practice based in Canada.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: "About · Product Paige",
    description:
      "13 years across Shopify, ecommerce, and product-led SaaS — plus two brands built from scratch.",
    url: "/about",
  },
};

const services: Array<{ name: string; icon: PixelIconName }> = [
  { name: "ecommerce UX",            icon: "browser" },
  { name: "conversion design",       icon: "cursor" },
  { name: "positioning + messaging", icon: "megaphone" },
  { name: "AI content design",       icon: "sparkleA" },
  { name: "product strategy",        icon: "target" },
];

const tools: string[] = [
  "Figma",
  "Framer",
  "Claude",
  "Cursor",
  "Lovable",
  "Paper",
  "Shopify",
  "Notion",
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
            className="relative min-h-[420px] p-6 md:p-16 flex items-center justify-center order-2 md:order-1 section-border-b"
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
                {/* Portrait slot — swap this div for an <img> once the
                    photo exists. Uses .placeholder so an empty slot reads
                    as pending rather than broken. */}
                <div className="placeholder w-full flex-1">
                  <span className="placeholder-label">Portrait</span>
                </div>
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

      {/* === PRACTICE AREAS (chips) === same visual pattern as the old
          homepage strip — a run of service chips that gives readers a
          quick shape of what I work on. */}
      <section
        id="practice-areas"
        data-section="practice-areas"
        className="p-6 md:p-10 section-border-b"
      >
        <ul className="flex flex-wrap gap-3">
          {services.map((s) => (
            <li key={s.name}>
              <Chip size="lg" icon={s.icon}>
                {s.name}
              </Chip>
            </li>
          ))}
        </ul>
      </section>

      {/* === LONGER BIO === Left column: h2 on top with tools floated to
          the bottom of the column. Right column: story copy. Vertical
          divider between the two matches the Capabilities pattern. */}
      <section
        data-section="bio"
        className="flex flex-col section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          <div className="flex flex-col gap-10 p-6 md:p-10 md:min-h-[420px]">
            <h2 className="text-section font-display text-ink max-w-[22ch]">
              How I got here
            </h2>
          </div>
          <div className="divider-indent-left flex flex-col gap-4 text-lg leading-[1.4] opacity-80 max-w-[560px] p-6 md:p-10">
            <p>
              My background spans product-led SaaS and ecommerce. On the
              SaaS side, I&rsquo;ve worked across both funded and
              bootstrapped companies, mainly in PLG. On the ecommerce side,
              I&rsquo;ve launched two brands from scratch — bootstrapped, one
              with a cofounder — handling everything from product
              development and manufacturer sourcing to brand and
              go-to-market, both to the point of running independently.
            </p>
            <p>
              One of my favorite things to work on: special projects —
              scrappy growth experiments, often AI-coded mini tools or apps
              for demand gen and top-of-funnel — built fast, tested fast, and
              killed fast if they don&rsquo;t work.
            </p>
            <p>
              That range is also how I work: fast learner, semi-technical,
              fluent with AI tools, which lets me move quickly across
              strategy, UX, and brand without needing a big team around me.
              I&rsquo;m good at taking something complicated and making it
              simple, clear, and good-looking — the product story, the user
              journey, the visual execution.
            </p>
            <p>
              I&rsquo;m also a perfectionist and a fixer — I care, sometimes
              to a fault, about getting the last details right, and if
              something looks broken or messy, I want to jump in
              immediately, even when that&rsquo;s not the right first move.
            </p>
            <p>
              I take the work seriously — not myself. Good work, good times.
              Easy to work with, hard to rattle — I&rsquo;ll probably make
              you laugh at some point in the process.
            </p>
          </div>
        </div>
      </section>

      {/* === TOOLS === its own section now rather than tucked into the bio
          column. No icons on these chips — deliberately lighter weight than
          the practice-area chips up top, since the kit matters less than
          the work. */}
      <section
        id="tools"
        data-section="tools"
        className="p-6 md:p-10 flex flex-col gap-6 section-border-b"
      >
        <h2 className="text-sm uppercase tracking-[0.14em] font-mono opacity-60">
          Tools I lean on
        </h2>
        <ul className="flex flex-wrap gap-2">
          {tools.map((name) => (
            <li key={name}>
              <Chip>{name}</Chip>
            </li>
          ))}
        </ul>
      </section>

      <ClosingCTA
        title="Want to work together?"
        body="Two-week sprints, one deliverable at a time, a written scope before anything starts. Tell me what you're shipping."
      />
    </div>
  );
}
