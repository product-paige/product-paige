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
  { name: "ecommerce UX",              bg: "#D7DBD9", fg: "#1A191E", icon: "browser" },
  { name: "conversion design",         bg: "#D7DBD9", fg: "#1A191E", icon: "cursor" },
  { name: "positioning + messaging",   bg: "#D7DBD9", fg: "#1A191E", icon: "megaphone" },
  { name: "AI content design",         bg: "#D7DBD9", fg: "#1A191E", icon: "sparkleA" },
  { name: "product strategy",          bg: "#D7DBD9", fg: "#1A191E", icon: "target" },
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
    tone: "",
    icon: "cursor",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "Clear before pretty",
    blurb: "Structure and words first. The visual comes once it makes sense.",
    tone: "",
    icon: "target",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "Use good tools",
    blurb: "Good tools quiet the busywork. That leaves room for the hard part.",
    tone: "",
    icon: "sparkleA",
    iconBg: "#1A191E",
    iconFg: "#ffffff",
  },
  {
    name: "Say less, mean more",
    blurb: "Fewer words. Sharper story. Lands in one read.",
    tone: "",
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
  { name: "Figma",   bg: "#D7DBD9", fg: "#1A191E", icon: "cursor" },
  { name: "Framer",  bg: "#D7DBD9", fg: "#1A191E", icon: "cursor" },
  { name: "Claude",  bg: "#D7DBD9", fg: "#1A191E", icon: "sparkleA" },
  { name: "Cursor",  bg: "#D7DBD9", fg: "#1A191E", icon: "sparkleA" },
  { name: "Lovable", bg: "#D7DBD9", fg: "#1A191E", icon: "sparkleA" },
  { name: "Paper",   bg: "#D7DBD9", fg: "#1A191E", icon: "door" },
  { name: "Shopify", bg: "#D7DBD9", fg: "#1A191E", icon: "browser" },
  { name: "Notion",  bg: "#D7DBD9", fg: "#1A191E", icon: "door" },
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
  coverImage?: string;
}> = projectList.map((p, i) => ({
  no: `Project ${String(i + 1).padStart(2, "0")}`,
  client: p.client,
  blurb: p.kicker,
  date: `${p.year}`,
  tags: p.role.split(/[+&]/).map((t) => t.trim()),
  bg: "#FAF7D0",
  fg: "#1a1a1a",
  href: `/projects/${p.slug}`,
  comingSoon: p.comingSoon ?? false,
  coverImage:
    p.slug === "backspace-body" ? "/backspace-body-cover.jpg" : undefined,
}));

type HeroCard = {
  title: string;
  image?: string;
  variant?: "default" | "shopify" | "polaroid";
  price?: string;
};

const heroFloatingCards: Array<{
  card: HeroCard;
  position: React.CSSProperties;
  rotate: string;
  widthClass: string;
}> = [
  {
    // Top area, pushed further right.
    card: {
      title: "Rinse Body Wash",
      variant: "shopify",
      price: "$24",
    },
    position: { top: "4%", right: "8%" },
    rotate: "3deg",
    widthClass: "w-52",
  },
  {
    // Bottom-left, mostly visible.
    card: {
      title: "Backspace Body",
      image: "/backspace-body-cover.jpg",
      variant: "polaroid",
    },
    position: { bottom: "4%", left: "4%" },
    rotate: "-4deg",
    widthClass: "w-48",
  },
  {
    // Up + right; larger + placeholder image for a stronger left-side
    // counterweight to the Paige card at bottom-right.
    card: { title: "Organic Moderne", image: "" },
    position: { top: "14%", left: "-4%" },
    rotate: "-6deg",
    widthClass: "w-56",
  },
  {
    // Sits above the yellow "Hi I'm Paige" card — bumped up + inward
    // so its title clears the yellow card instead of hiding behind it.
    card: { title: "Onboarding is a promise" },
    position: { bottom: "26%", right: "6%" },
    rotate: "5deg",
    widthClass: "w-44",
  },
];

function HeroFloatingCard({
  card,
  position,
  rotate,
  widthClass,
}: {
  card: HeroCard;
  position: React.CSSProperties;
  rotate: string;
  widthClass: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`absolute ${widthClass} rounded-lg bg-white overflow-hidden transition-transform duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_10px_24px_rgba(0,0,0,0.18)]`}
      style={{
        ...position,
        transform: hovered
          ? `rotate(${rotate}) scale(0.92)`
          : `rotate(${rotate})`,
        pointerEvents: "auto",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      {card.variant === "polaroid" ? (
        <div className="relative bg-white pt-2.5 px-2.5 pb-10">
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.image}
              alt=""
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="w-full aspect-square bg-[#D7DBD9]" />
          )}
          <div className="absolute left-2.5 right-2.5 bottom-0 h-10 flex items-center">
            <p className="font-display italic text-sm text-ink leading-none">
              {card.title}
            </p>
          </div>
        </div>
      ) : card.variant === "shopify" ? (
        <>
          <div className="w-full aspect-square bg-[#D7DBD9]" />
          <div className="p-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-0.5 text-[10px] leading-none text-[#1A191E]">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
              <span className="ml-1 opacity-60 text-[10px]">(128)</span>
            </div>
            <p className="text-sm text-ink line-clamp-1 font-medium">
              {card.title}
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-ink">{card.price}</span>
              <button
                type="button"
                className="text-[10px] leading-none uppercase tracking-widest bg-[#1A191E] text-white px-2.5 py-1.5 rounded"
                tabIndex={-1}
              >
                Add
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.image}
              alt=""
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div className="w-full aspect-video bg-[#D7DBD9]" />
          )}
          <div className="p-3">
            <p className="text-sm text-ink line-clamp-1">{card.title}</p>
          </div>
        </>
      )}
    </div>
  );
}

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
            className="relative min-w-0 p-6 flex items-end justify-end divider-indent-left bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            {/* Floating cards — layered over the bg image, clipped to the
                column via overflow-hidden. Desktop only. */}
            <div
              className="absolute inset-0 hidden lg:block"
              style={{ pointerEvents: "none" }}
              aria-hidden="true"
            >
              {heroFloatingCards.map((c) => (
                <HeroFloatingCard key={c.card.title} {...c} />
              ))}
            </div>
            <div className="relative card card-sm card-cream flex flex-col gap-2 !min-h-0 w-full md:max-w-[360px]">
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
        className="p-6 md:px-10 md:py-16 flex flex-col gap-6 section-border-b"
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
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
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
            className="folder-panel grain-paper grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 md:gap-12 p-6 md:p-12 items-stretch md:h-[640px]"
            style={{ backgroundColor: project.bg, color: project.fg }}
          >
            {/* Text column — meta strip up top, big client + kicker in the
                middle, prominent CTA at the bottom. Order flipped on mobile
                so the landscape image reads first (visual hook) before the
                copy + CTA. */}
            <div className="flex flex-col gap-6 md:gap-8 justify-between min-h-0 md:min-h-[380px] order-2 md:order-1">
              {/* Meta pills moved down to the polaroid caption row (right side). */}

              {/* Title group — headline is the kicker's lede (before the em-dash);
                  the remaining sentence becomes the supporting paragraph. */}
              {(() => {
                const [headline, ...rest] = project.blurb.split(" — ");
                const body = rest.join(" — ");
                return (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-section font-display text-ink max-w-[18ch]">
                      {headline}
                    </h3>
                    {body ? (
                      <p className="text-lg leading-[1.4] opacity-80 max-w-[440px]">
                        {body}
                      </p>
                    ) : null}
                  </div>
                );
              })()}

              {/* Prominent CTA — hidden for coming-soon projects,
                  replaced with a static badge. */}
              {project.comingSoon ? (
                <span className="svc-label self-start text-ink">
                  <span
                    className="svc-label-text"
                    style={{
                      backgroundColor: "#D7DBD9",
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
            {(() => {
              const PaperCard = (
                <>
                  {/* Tape — overhangs the top-center of the paper card */}
                  <div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 -rotate-[3deg] w-[110px] h-10 z-10"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(190,180,165,0.85) 0%, rgba(170,160,145,0.85) 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.28)",
                      clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0 100%)",
                    }}
                    aria-hidden="true"
                  />
                  {/* White paper card with grain + 2d/3d chrome */}
                  <div className="relative w-full h-full bg-white grain-paper flex flex-col p-3 md:p-4 pb-10 md:pb-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_14px_28px_rgba(26,26,26,0.22)]">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt=""
                        className="w-full flex-1 object-cover min-h-0"
                      />
                    ) : (
                      <div
                        className="w-full flex-1 bg-[#D7DBD9]"
                        aria-hidden="true"
                      />
                    )}
                    {/* Handwritten-style caption strip — flex-centered in the
                        thick bottom margin. `.grain-paper > *` forces
                        position:relative on children, so we set position
                        inline to win the cascade. */}
                    <div
                      className="left-3 md:left-4 right-3 md:right-4 bottom-0 h-10 md:h-14 flex items-center justify-between gap-3"
                      style={{ position: "absolute" }}
                    >
                      <p className="font-display text-lg md:text-xl text-ink italic leading-none">
                        {project.client}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 justify-end">
                        {project.tags.map((tag, i) => (
                          <span
                            key={`${tag}-${i}`}
                            className="svc-label text-ink"
                          >
                            <span
                              className="svc-label-text"
                              style={{
                                backgroundColor: "#D7DBD9",
                                borderColor: "#1A191E",
                              }}
                            >
                              {tag}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );

              return project.comingSoon ? (
                <div
                  className="relative block h-full min-h-[280px] order-1 md:order-2"
                  aria-hidden="true"
                >
                  {PaperCard}
                </div>
              ) : (
                <a
                  href={project.href}
                  aria-label={`Open ${project.client}`}
                  className="relative block h-full min-h-[280px] order-1 md:order-2"
                  tabIndex={-1}
                >
                  {PaperCard}
                  <span className="sr-only">Open {project.client}</span>
                </a>
              );
            })()}
          </div>
        </div>
      </section>

      

      {/* === CATEGORIES — working-style copy + product-category cards + tools === */}
      <section
        id="categories"
        data-section="categories"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
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
              className="bg-[#D7DBD9] shadow-[inset_0_0_0_1px_#1A191E]"
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
        {/* Left column — bg image fills column, taped paper card on top. */}
        <aside
          className="relative min-h-[500px] bg-cover bg-center order-2 md:order-1 p-6 md:p-16 flex items-start justify-center pt-16 md:pt-24"
          style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          aria-label="About — portrait"
        >
          {/* Taped square paper card — square, grain paper, subtle chrome, with
              a masking-tape strip at the top center that overhangs the card. */}
          <div className="relative w-full max-w-[380px] -rotate-[2deg]">
            {/* Masking tape — overhangs the card top-center */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 -rotate-[3deg] w-[130px] h-12 z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(190,180,165,0.85) 0%, rgba(170,160,145,0.85) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.28)",
                clipPath:
                  "polygon(4% 0, 96% 0, 100% 100%, 0 100%)",
              }}
              aria-hidden="true"
            />

            {/* Paper card — square, textured, subtle 2d/3d chrome */}
            <div className="relative aspect-square bg-white grain-paper flex flex-col p-4 md:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_14px_28px_rgba(26,26,26,0.22)]">
              {/* Photo area — sage placeholder for headshot */}
              <div className="w-full flex-1 bg-[#D7DBD9] overflow-hidden" />
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
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
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
