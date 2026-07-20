"use client";

import { useState } from "react";
import { BtnIcons } from "./components/BtnIcons";
import { PixelIcon, type PixelIconName } from "./components/PixelIcon";
import { ClosingCTA } from "./components/ClosingCTA";
import { TearText } from "./components/TearText";
import { PostMeta } from "./components/PostMeta";
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
  { name: "AI content design",         bg: "#1A191E", fg: "#ffffff", icon: "sparkleA" },
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
  { name: "Claude",  bg: "#1A191E", fg: "#ffffff", icon: "sparkleA" },
  { name: "Cursor",  bg: "#1A191E", fg: "#ffffff", icon: "sparkleA" },
  { name: "Lovable", bg: "#1A191E", fg: "#ffffff", icon: "sparkleA" },
  { name: "v0",      bg: "#1A191E", fg: "#ffffff", icon: "sparkleA" },
  { name: "Shopify", bg: "#D6D7D9", fg: "#1A191E", icon: "browser" },
  { name: "Notion",  bg: "#D6D7D9", fg: "#1A191E", icon: "door" },
  { name: "Linear",  bg: "#D6D7D9", fg: "#1A191E", icon: "target" },
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
        className="min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Available for projects</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] text-ink max-w-[20ch]">
                  <TearText>{"Product marketing\nand UX design\nfor ecommerce"}</TearText>
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[640px]">
                  I&rsquo;m Paige. For 13 years I&rsquo;ve worked with
                  ecommerce teams. Shopify apps. DTC brands. Early-stage SaaS.
                  I help them make products people can use and explain.
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
                Paige Eaton.
              </h3>
              <p className="text-base leading-[1.2] opacity-80">
                Product marketer and UX designer. Canada, remote.
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
              <span className="type-eyebrow">Practice</span>
              <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[500px]">
                The work I do
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
              <a href="#categories" className="inline-flex btn self-start">
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
          <span className="type-eyebrow">Portfolio</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[24ch]">
              Selected work
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
              {/* Meta strip: year on the left, role tags on the right */}
              <PostMeta items={project.tags} right={project.date} />

              {/* Title group */}
              <div className="flex flex-col gap-3">
                <h3 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[14ch]">
                  {project.client}
                </h3>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[440px]">
                  {project.blurb}
                </p>
              </div>

              {/* Prominent CTA (real button, not just a text link) */}
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
            </div>

            {/* Image column — landscape, whole area is clickable so touch
                users don't have to hit the small CTA button. On mobile this
                sits ABOVE the text (order-1) as the primary visual anchor. */}
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
            <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[20ch]">
              Move fast, keep it simple
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Small prototypes. Clear decisions. Nothing heavier than it needs
              to be.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {productCategories.map((c) => (
            <article
              key={c.name}
              className={`card ${c.tone} flex flex-col justify-between aspect-square !min-h-0`}
            >
              <div
                className="w-14 h-14 flex items-center justify-center shrink-0 !rounded-[4px]"
                style={{ backgroundColor: c.iconBg, color: c.iconFg }}
              >
                <PixelIcon name={c.icon} color={c.iconFg} size={24} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl">{c.name}</h3>
                <p className="text-base leading-[1.4] opacity-80">{c.blurb}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm leading-[1.4] opacity-60 uppercase tracking-[0.05em]">
            Tools I lean on
          </h3>
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
        className="grid md:grid-cols-2 items-stretch section-border-b min-h-[560px]"
      >
        {/* Left column — portrait image fills the full space (bg-cover). */}
        <aside
          className="relative min-h-[400px] bg-cover bg-center order-2 md:order-1"
          style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          aria-label="About — portrait"
        />

        {/* Right column — eyebrow + h2 at top, bio at bottom, filling the column height */}
        <div className="p-6 md:p-10 flex flex-col gap-10 justify-between order-1 md:order-2 md:divider-indent-left">
          <div className="flex flex-col gap-10">
            <span className="type-eyebrow">About me</span>
            <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[10ch]">
              I&rsquo;m Paige.
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
            <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[20ch]">
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
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card grid-bg flex flex-col justify-between gap-8 !min-h-0 aspect-[16/9] group"
              >
                <PostMeta
                  items={[post.category, post.readingTime]}
                  right={new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="text-base opacity-80 line-clamp-3">
                    {post.kicker}
                  </p>
                </div>
              </a>
          ))}
        </div>
      </section>

      {/* === CLOSING CTA === */}
      <ClosingCTA
        eyebrow="Get in touch"
        title="Let's talk shop"
        body="Open for projects. Always up for trading notes on ecommerce, product, or the craft."
        ctaLabel="Say hi"
      />
    </div>
  );
}
