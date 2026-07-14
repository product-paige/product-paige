"use client";

import { useState } from "react";
import { BtnIcons } from "./components/BtnIcons";
import { PixelIcon, type PixelIconName } from "./components/PixelIcon";
import { ClosingCTA } from "./components/ClosingCTA";
import { projectList } from "./projects/data";

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
    name: "Shopify ecosystem",
    blurb: "Apps, themes, and merchant-facing tools across the stack.",
    tone: "card-blue-light",
    icon: "browser",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "Tools for brands",
    blurb: "DTC stores, product pages, offers, flows, and small teams selling online.",
    tone: "card-blue-light",
    icon: "cursor",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "AI in ecommerce",
    blurb: "AI features and workflows that need to feel useful, not confusing.",
    tone: "card-blue-light",
    icon: "sparkleA",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "Make it make sense",
    blurb: "Positioning, copy, UX, and the seams that confuse merchants or customers.",
    tone: "card-blue-light",
    icon: "target",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
];

const capabilities = [
  {
    title: "Positioning + messaging",
    blurb:
      "Clarify what you sell, who it&rsquo;s for, and why it matters, so customers understand the value faster.",
  },
  {
    title: "Ecommerce UX + conversion",
    blurb:
      "Clean up the path from first impression to action: product pages, landing pages, flows, and decision points.",
  },
  {
    title: "AI content design",
    blurb:
      "Use AI to create better product content, page systems, prompts, and workflows without losing taste or clarity.",
  },
  {
    title: "Product strategy",
    blurb:
      "Decide what to fix, test, or build next based on customer friction, business goals, and what actually moves the needle.",
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

const workingStyle: Array<{
  title: string;
  body: string;
  icon: PixelIconName;
}> = [
  {
    title: "Move fast, learn early",
    body: "Get a simple version live quickly, then adjust based on what's real.",
    icon: "cursor",
  },
  {
    title: "Make it clear before making it pretty",
    body: "Nail the structure and flow first. Polish comes after.",
    icon: "target",
  },
  {
    title: "Use tools to reduce friction",
    body: "Use AI and lightweight workflows to speed up decisions, content, and execution.",
    icon: "sparkleA",
  },
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
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === HERO === */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Practice</span>
              <div className="flex flex-col gap-3">
                <h1 className="type-display-h1 max-w-[20ch]">
                  Product marketing &amp; UX design for ecommerce teams
                </h1>
                <p className="type-leading opacity-80 max-w-[640px]">
                  13 years inside Shopify and ecommerce. I help DTC brands,
                  app makers, and ecommerce SaaS teams sharpen positioning,
                  clean up the customer experience, and make products people
                  actually understand.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex btn self-start"
            >
              <span className="btn-text bg-[#0E6BFF] text-white">
                Start a project
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
            <div className="card card-cream flex flex-col gap-2 !min-h-0 w-full md:max-w-[380px]">
              <h3 className="type-card-title">
                Product-led marketer and UX designer.
              </h3>
              <p className="type-body opacity-80 leading-[1.2]">
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

      

      {/* === PRODUCT CATEGORIES === */}
      <section
        id="categories"
        data-section="product-categories"
        className="p-6 md:p-10 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Categories</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="type-display-h2 max-w-[24ch]">
              Uncomplicating products that power real work
            </h2>
            <p className="type-leading opacity-80 max-w-[560px]">
              I work inside the Shopify and ecommerce stack — apps, DTC brands,
              and the AI-assisted tools wedging their way in. When someone
              relies on your product every day to run their store,
              &ldquo;kinda clear&rdquo; isn&rsquo;t clear.
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
                <h3 className="type-card-title">{c.name}</h3>
                <p className="type-body-sm opacity-80">{c.blurb}</p>
              </div>
            </article>
          ))}
        </div>
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
              <h2 className="type-display-h2 max-w-[500px]">
                What we&rsquo;ll improve
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <ul className="border-t border-[#1a1a1a]/25 max-w-[500px]">
                {capabilities.map((c, i) => (
                  <li
                    key={c.title}
                    className="border-b border-[#1a1a1a]/25"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCap(i)}
                      className={`w-full text-left py-4 type-display-h3 transition-opacity ${
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
                className="type-body-lg max-w-[480px] min-h-[5em]"
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
          <span className="type-eyebrow">Recent work</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="type-display-h2 max-w-[24ch]">
              Recent work
            </h2>
            <p className="type-leading opacity-80 max-w-[560px]">
              A mix of product audits, UX improvements, and personal projects
              across the Shopify and ecommerce ecosystem.
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
                  <span className="folder-tab-glyph" aria-hidden="true" />
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
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-between">
                <span className="type-marker opacity-60">{project.date}</span>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <li key={t} className="type-body-xs opacity-60">
                      · {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Title group */}
              <div className="flex flex-col gap-3">
                <h3 className="type-display-h2 max-w-[14ch]">
                  {project.client}
                </h3>
                <p className="type-leading opacity-80 max-w-[440px]">
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

      

      {/* === HOW — WORKING STYLE === */}
      <section
        id="working-style"
        data-section="working-style"
        className="grid md:grid-cols-2 items-stretch section-border-b"
      >
        {/* Left: full-bleed grain/image surface */}
        <aside
          className="placeholder min-h-[320px] md:min-h-[600px] m-6 md:m-10 md:divider-indent-right relative"
          aria-label="Working style — illustrative surface"
        />
        {/* Right: eyebrow + heading + body + divider + list */}
        <div className="p-6 md:p-10 flex flex-col justify-between gap-10 md:divider-indent-left relative">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Working style</span>
            <div className="flex flex-col gap-3">
              <h2 className="type-display-h2 max-w-[20ch]">
                Move fast &amp; keep it simple
              </h2>
              <p className="type-leading opacity-80 max-w-[560px]">
                Fast prototypes and clear decisions, without making it harder
                than it needs to be.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <ol className="border-t border-[#1A191E]/20">
              {workingStyle.map((w) => (
                <li
                  key={w.title}
                  className="border-b border-[#1A191E]/20 py-5 flex items-start gap-5"
                >
                  <div className="w-14 h-14 shrink-0 bg-[#1A191E] text-white flex items-center justify-center !rounded-[4px]">
                    <PixelIcon name={w.icon} color="#ffffff" size={24} />
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <h3 className="type-card-title">{w.title}</h3>
                    <p className="type-body opacity-80 max-w-[420px]">{w.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            {/* Tools I lean on — same chip style as the practice-area row */}
            <div className="flex flex-col gap-4">
              <h3 className="type-body-sm opacity-60 uppercase tracking-[0.05em]">
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
                      <span
                        className="svc-label-tab"
                        style={{ backgroundColor: t.bg, borderColor: t.fg }}
                      >
                        <PixelIcon name={t.icon} color={t.fg} size={18} />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* === WHO — ABOUT === */}
      <section
        id="about"
        data-section="about"
        className="grid md:grid-cols-2 items-stretch section-border-b min-h-[560px]"
      >
        {/* Left column — eyebrow + h2 at top, 3-paragraph bio fills the column */}
        <div className="p-6 md:p-10 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">About</span>
            <h2 className="type-display-h1 max-w-[10ch]">
              I&rsquo;m Paige.
            </h2>
          </div>
          <div className="flex flex-col gap-5 max-w-[560px]">
            <p className="type-leading opacity-80">
              For 13 years I&rsquo;ve helped online businesses — Shopify
              apps, ecommerce SaaS, DTC brands, early teams — figure out
              how to explain what they&rsquo;ve built.
            </p>
            <p className="type-body opacity-80">
              Usually the product is good. The hard part is getting people
              to understand it fast, trust it, and know what to do next.
              That&rsquo;s what I do: the point where product, marketing,
              design, and UX meet. I combine simple, clear positioning with
              clean, modern design that has personality, looks amazing,
              tells a story, and guides users where they need to go.
            </p>
          </div>
        </div>

        {/* Right column — image placeholder. Drop the portrait image into
            /public/about-bg.jpg and swap the placeholder for a bg-image
            aside when ready. */}
        <aside
          className="placeholder relative md:divider-indent-left min-h-[400px]"
          aria-label="About — portrait placeholder"
        />
      </section>

      

      {/* === CLOSING CTA === */}
      <ClosingCTA
        title="Stop over-explaining the product"
        body="Send a link and the part you can't see clearly yet. I'll help you find the seams, the friction, and what's worth fixing first."
      />
    </div>
  );
}
