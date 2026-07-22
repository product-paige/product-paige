"use client";

import { useState } from "react";
import { BtnIcons } from "./components/BtnIcons";
import { PixelIcon, type PixelIconName } from "./components/PixelIcon";
import { ClosingCTA } from "./components/ClosingCTA";
import { TearText } from "./components/TearText";
import { PostMeta } from "./components/PostMeta";
import { IconCard } from "./components/IconCard";
import { BlogCard } from "./components/BlogCard";
import { projectList } from "./projects/data";
import { blogList } from "./blog/data";

const services: Array<{
  name: string;
  bg: string;
  fg: string;
  icon: PixelIconName;
}> = [
  { name: "ecommerce UX",              bg: "#D6D7D9", fg: "#1A191E", icon: "browser" },
  { name: "conversion design",         bg: "#D6D7D9", fg: "#1A191E", icon: "cursor" },
  { name: "positioning + messaging",   bg: "#D6D7D9", fg: "#1A191E", icon: "megaphone" },
  { name: "AI content design",         bg: "#D6D7D9", fg: "#1A191E", icon: "sparkleA" },
  { name: "product strategy",          bg: "#D6D7D9", fg: "#1A191E", icon: "target" },
];

const productCategories: Array<{
  name: string;
  blurb: string;
  tone: string;
  icon: PixelIconName;
  iconBg: string;
  iconFg: string;
}> = [
  {
    name: "Start rough, learn early",
    blurb: "Something real in front of people beats polished guesses.",
    tone: "card-blue-light",
    icon: "cursor",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "Clear before pretty",
    blurb: "Structure and words first. The visual comes once it makes sense.",
    tone: "card-blue-light",
    icon: "target",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "Use good tools",
    blurb: "Good tools quiet the busywork. That leaves room for the hard part.",
    tone: "card-blue-light",
    icon: "sparkleA",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "Say less, mean more",
    blurb: "Fewer words. Sharper story. Lands in one read.",
    tone: "card-blue-light",
    icon: "megaphone",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
];

const capabilities = [
  {
    title: "Positioning + messaging",
    blurb:
      "The sentence that names what you sell, who it&rsquo;s for, and why it matters.",
  },
  {
    title: "UX + conversion",
    blurb:
      "The path from first look to action. Product pages, landing pages, decision points.",
  },
  {
    title: "AI content design",
    blurb:
      "AI-assisted content and workflows that keep taste and clarity intact.",
  },
  {
    title: "Product strategy",
    blurb:
      "What to build, test, or refine next, grounded in what customers actually do.",
  },
];

const tools: Array<{
  name: string;
  bg: string;
  fg: string;
  icon: PixelIconName;
}> = [
  { name: "Figma",   bg: "#D6D7D9", fg: "#1A191E", icon: "cursor" },
  { name: "Claude",  bg: "#D6D7D9", fg: "#1A191E", icon: "sparkleA" },
  { name: "Cursor",  bg: "#D6D7D9", fg: "#1A191E", icon: "sparkleA" },
  { name: "Lovable", bg: "#D6D7D9", fg: "#1A191E", icon: "sparkleA" },
  { name: "Paper",   bg: "#D6D7D9", fg: "#1A191E", icon: "door" },
  { name: "Shopify", bg: "#D6D7D9", fg: "#1A191E", icon: "browser" },
  { name: "Notion",  bg: "#D6D7D9", fg: "#1A191E", icon: "door" },
];

/** Map each project to a folder-tab entry. Pulls real case-study data from /projects/data. */
const recentWork: Array<{
  no: string;
  client: string;
  blurb: string;
  date: string;
  tags: string[];
  bg: string;
  fg: string;
  href: string;
  comingSoon: boolean;
}> = projectList.map((p, i) => ({
  no: `Project ${String(i + 1).padStart(2, "0")}`,
  client: p.client,
  blurb: p.kicker,
  date: `${p.year}`,
  tags: p.role.split(/[+&]/).map((t) => t.trim()),
  bg: p.coverBg,
  fg:
    p.coverBg === "#f3eb88" ||
    p.coverBg === "#DBE6EB" ||
    p.coverBg === "#cdb8e3" ||
    p.coverBg === "#f7c8d4"
      ? "#1a1a1a"
      : "#ffffff",
  href: `/projects/${p.slug}`,
  comingSoon: p.comingSoon ?? false,
}));

export default function Home() {
  const [activeCap, setActiveCap] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const project = recentWork[activeProject];

  return (
    <div className="theme contents">

      {/* === HERO === */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[520px] md:min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Open to new projects</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-display font-display text-ink max-w-[20ch]">
                  <TearText>{"Product marketing\n& UX design for\necommerce teams"}</TearText>
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[640px]">
                  I help DTC brands, app makers, and ecommerce SaaS teams
                  sharpen positioning, clean up the customer experience, and
                  make products people actually understand.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex btn self-start"
            >
              <span className="btn-text bg-[#0E6BFF] text-white">
                Let's talk
              </span>
              <span className="btn-tab bg-[#0E6BFF] text-white">
                <BtnIcons />
              </span>
            </a>
          </div>
          <aside
            className="relative min-w-0 p-6 flex items-end justify-end divider-indent-left bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            <div className="card card-sm card-cream flex flex-col gap-2 !min-h-0 w-full md:max-w-[380px]">
              <h3 className="text-xl font-display leading-[1.1] text-ink">
                Hi, I&rsquo;m Paige
              </h3>
              <p className="text-base leading-[1.2] opacity-80">
                13 years building in the Shopify and ecommerce ecosystem.
              </p>
            </div>
          </aside>
        </div>
      </section>

      

      {/* === PRACTICE AREAS (chips) === */}
      <section
        id="practice-areas"
        data-section="practice-areas"
        className="p-6 md:p-10 section-border-b"
      >
        <ul className="flex flex-wrap gap-3">
          {services.map((s) => (
            <li key={s.name}>
              <span className="svc-label svc-label-lg" style={{ color: s.fg }}>
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

      

      {/* === CAPABILITIES === */}
      <section
        id="services"
        data-section="capabilities"
        className="p-6 md:p-10 flex flex-col gap-6 section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-stretch">
          <div className="relative h-full order-2 md:order-1">
            <div
              className="placeholder w-full h-full min-h-[480px]"
              aria-label="Capabilities — image placeholder"
            />
          </div>
          <div className="flex flex-col justify-between gap-10 order-1 md:order-2 relative md:divider-indent-left">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Capabilities</span>
              <h2 className="text-section font-display text-ink max-w-[500px]">
                What we&rsquo;ll improve
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <ul className="border-t border-[#1a1a1a]/25 max-w-[500px]">
                {capabilities.map((c, i) => (
                  <li
                    key={c.title}
                    className="border-b border-[#1a1a1a]/25"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCap(i)}
                      className={`w-full text-left py-4 text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-ink transition-opacity ${
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
              <p
                key={activeCap}
                className="text-lg leading-[1.4] opacity-80 max-w-[480px] min-h-[4em]"
                dangerouslySetInnerHTML={{
                  __html: capabilities[activeCap].blurb,
                }}
              />
              <a href="/services" className="inline-flex btn self-start">
                <span className="btn-text bg-[#0E6BFF] text-white">
                  Explore services
                </span>
                <span className="btn-tab bg-[#0E6BFF] text-white">
                  <BtnIcons />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      

      {/* === RECENT WORK (folder tabs) === */}
      <section
        id="work"
        data-section="recent-work"
        className="p-6 md:p-10 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Recent work</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-section font-display text-ink max-w-[24ch]">
              Projects in flight
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              A mix of product audits, UX work, and personal projects. All in
              the Shopify and ecommerce world.
            </p>
          </div>
        </div>

        {/* Tab strip + panel — full section width. Active tab sits flush on
            top of the panel as one continuous folder shape. Each tab + the
            panel uses its own project bg color (lavender / sky / yellow) so
            you can read which project is active at a glance. On mobile the
            tab strip scrolls horizontally with the scrollbar hidden. */}
        <div className="flex flex-col w-full">
          {/* Tab strip — arrow-key navigable. snap-proximity (not mandatory)
              so a partial scroll doesn't jerk to a fixed position. */}
          <div
            role="tablist"
            aria-label="Recent projects"
            className="flex items-end overflow-x-auto scrollbar-hide snap-x snap-proximity"
            onKeyDown={(e) => {
              // Arrow keys, Home + End for tablist navigation (WAI-ARIA
              // authoring practices). Focus follows selection.
              const n = recentWork.length;
              let next = activeProject;
              if (e.key === "ArrowRight") next = (activeProject + 1) % n;
              else if (e.key === "ArrowLeft") next = (activeProject - 1 + n) % n;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = n - 1;
              else return;
              e.preventDefault();
              setActiveProject(next);
              // Focus the newly-active tab so subsequent Tab moves to the panel.
              const btn = document.getElementById(`project-tab-${next}`);
              btn?.focus();
            }}
          >
            {recentWork.map((w, i) => {
              const isActive = activeProject === i;
              return (
                <button
                  key={w.client}
                  id={`project-tab-${i}`}
                  type="button"
                  role="tab"
                  onClick={() => setActiveProject(i)}
                  aria-selected={isActive}
                  aria-controls="project-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`folder-tab grain-paper shrink-0 snap-start ${isActive ? "is-active" : ""}`}
                  style={{
                    backgroundColor: w.bg,
                    color: w.fg,
                    /* Inactive tabs slip behind in reading order; later tabs
                       sit further back so the cascade reads left → right. */
                    zIndex: isActive ? 20 : recentWork.length - i,
                  }}
                >
                  <span className="whitespace-nowrap">{w.client}</span>
                </button>
              );
            })}
          </div>

          {/* Active project panel — stacks on mobile (image first for visual
              hook), splits 40/60 on md+. Padding scales: 24px mobile → 48px
              desktop so mobile gets more content room. */}
          <div
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${activeProject}`}
            key={project.client}
            className="folder-panel grain-paper grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 md:gap-12 p-6 md:p-12 items-stretch"
            style={{ backgroundColor: project.bg, color: project.fg }}
          >
            {/* Text column — meta strip up top, big client + kicker in the
                middle, prominent CTA at the bottom. Order flipped on mobile
                so the landscape image reads first (visual hook) before the
                copy + CTA. */}
            <div className="flex flex-col gap-6 md:gap-8 justify-between min-h-0 md:min-h-[520px] order-2 md:order-1">
              {/* Meta strip: client + role tags on the left, year on the right */}
              <PostMeta items={[project.client, ...project.tags]} right={project.date} />

              {/* Title group */}
              <div className="flex flex-col gap-3">
                <h3 className="text-section font-display text-ink max-w-[14ch]">
                  {project.client}
                </h3>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[440px]">
                  {project.blurb}
                </p>
              </div>

              {/* Prominent CTA — hidden for coming-soon projects,
                  replaced with a static badge. */}
              {project.comingSoon ? (
                <span className="svc-label self-start text-ink">
                  <span
                    className="svc-label-text"
                    style={{
                      backgroundColor: "#D6D7D9",
                      borderColor: "#1A191E",
                    }}
                  >
                    Coming soon
                  </span>
                </span>
              ) : (
                <a
                  href={project.href}
                  className="inline-flex btn self-start"
                  aria-label={`View the ${project.client} case study`}
                >
                  <span className="btn-text bg-[#1A191E] text-white">
                    View project
                  </span>
                  <span className="btn-tab bg-[#1A191E] text-white">
                    <BtnIcons />
                  </span>
                </a>
              )}
            </div>

            {/* Image column — landscape, clickable when shipped. For
                coming-soon projects it's a plain div so nothing links
                through. On mobile it sits ABOVE the text (order-1). */}
            {project.comingSoon ? (
              <div
                className="relative block order-1 md:order-2"
                aria-hidden="true"
              >
                <div className="placeholder w-full aspect-[3/2]" />
              </div>
            ) : (
              <a
                href={project.href}
                aria-label={`Open ${project.client}`}
                className="relative block group order-1 md:order-2"
                tabIndex={-1}
              >
                <div
                  className="placeholder w-full aspect-[3/2] transition-opacity group-hover:opacity-90"
                  aria-hidden="true"
                />
                <span className="sr-only">Open {project.client}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      

      {/* === CATEGORIES — working-style copy + product-category cards + tools === */}
      <section
        id="categories"
        data-section="categories"
        className="p-6 md:p-10 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">How I work</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-section font-display text-ink max-w-[20ch]">
              Move fast, keep it simple
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Fast prototypes and clear decisions, without making it harder
              than it needs to be.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {productCategories.map((c) => (
            <IconCard
              key={c.name}
              name={c.name}
              blurb={c.blurb}
              icon={c.icon}
              tone={c.tone}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg leading-[1.4] opacity-80">
            Some of the tools I lean on:
          </p>
          <ul className="flex flex-wrap gap-3">
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
        </div>
      </section>



      {/* === WHO — ABOUT === */}
      <section
        id="about"
        data-section="about"
        className="grid md:grid-cols-2 items-stretch section-border-b min-h-[440px] md:min-h-[560px]"
      >
        {/* Left column — bg image fills column, poster frame layered on top. */}
        <aside
          className="relative min-h-[400px] bg-cover bg-center order-2 md:order-1 p-6 md:p-16"
          style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          aria-label="About — portrait"
        >
          {/* Poster frame — gray headshot placeholder with yellow border overlay */}
          <div className="relative w-full h-full min-h-[360px] bg-[#8a8a8a] overflow-hidden">
            {/* Yellow poster border */}
            <div className="pointer-events-none absolute inset-0 border-[6px] border-[#F3EB88] rounded-[20px]" />

            {/* Top-left title chip */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#F3EB88] rounded-lg px-4 py-2 md:px-5 md:py-2.5">
              <span className="font-sans font-bold text-lg md:text-2xl tracking-tight text-ink leading-none">
                PAIGE &rsquo;26
              </span>
            </div>

            {/* Placeholder middle text */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
              <p className="text-4xl md:text-5xl font-display text-[#F3EB88] text-center leading-none tracking-[-1px]">
                Notes
                <br />
                from
                <br />
                the field
              </p>
            </div>

            {/* Bottom-left date chip */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-[#F3EB88] rounded-lg px-4 py-2 md:px-5 md:py-2.5">
              <span className="font-sans font-bold text-xs md:text-base tracking-[0.15em] text-ink leading-none">
                AVAILABLE &middot; Q3 &rarr; Q4
              </span>
            </div>
          </div>
        </aside>

        {/* Right column — eyebrow + h2 at top, bio at bottom, filling the column height */}
        <div className="p-6 md:p-10 flex flex-col gap-10 justify-between order-1 md:order-2 md:divider-indent-left">
          <div className="flex flex-col gap-10">
            <span className="type-eyebrow">About</span>
            <h2 className="text-section font-display text-ink max-w-[18ch]">
              Half product marketer, half UX designer
            </h2>
          </div>
          <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
            For 13 years I&rsquo;ve worked with ecommerce teams. Shopify
            apps. DTC brands. Early-stage SaaS. Usually the product is good.
            The hard part is getting people to understand it fast, trust it,
            and know what to do next. That&rsquo;s the work I do. Positioning,
            UX, and the space where they meet.
          </p>
        </div>
      </section>

      

      {/* === BLOG — latest posts row === */}
      <section
        id="blog"
        data-section="blog"
        className="p-6 md:p-10 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Notes</span>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <h2 className="text-section font-display text-ink max-w-[20ch]">
              Short reads on clarity, positioning, and UX
            </h2>
            <a href="/blog" className="inline-flex btn shrink-0">
              <span className="btn-text bg-[#1A191E] text-white">
                Read all notes
              </span>
              <span className="btn-tab bg-[#1A191E] text-white">
                <BtnIcons />
              </span>
            </a>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {blogList.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* === CLOSING CTA === */}
      <ClosingCTA
        title="Let's talk shop"
        body="Open for projects. Always up for trading notes on ecommerce, product, or the craft."
        ctaLabel="Say hi"
      />
    </div>
  );
}
