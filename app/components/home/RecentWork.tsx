"use client";

import { useState } from "react";
import { BtnIcons } from "../BtnIcons";
import { projectList } from "../../projects/data";
import { Chip } from "../Chip";

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
  bg: "#FAF9F2",
  fg: "#1a1a1a",
  href: `/projects/${p.slug}`,
  comingSoon: p.comingSoon ?? false,
  coverImage: p.coverImage,
}));

/** Recent work — folder-tab selector with a detail panel per project. */
export function RecentWork() {
  const [activeProject, setActiveProject] = useState(0);
  const project = recentWork[activeProject];

  return (
    <>
      {/* === RECENT WORK (folder tabs) === */}
      <section
        id="work"
        data-section="recent-work"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
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
            top of the panel as one continuous folder shape. */}
        <div className="flex flex-col w-full">
          {/* Tab strip — arrow-key navigable. */}
          <div
            role="tablist"
            aria-label="Recent projects"
            className="flex items-end overflow-x-auto scrollbar-hide snap-x snap-proximity"
            onKeyDown={(e) => {
              const n = recentWork.length;
              let next = activeProject;
              if (e.key === "ArrowRight") next = (activeProject + 1) % n;
              else if (e.key === "ArrowLeft") next = (activeProject - 1 + n) % n;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = n - 1;
              else return;
              e.preventDefault();
              setActiveProject(next);
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
                    zIndex: isActive ? 20 : recentWork.length - i,
                  }}
                >
                  <span className="whitespace-nowrap">{w.client}</span>
                </button>
              );
            })}
          </div>

          {/* Active project panel */}
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
            <div className="flex flex-col gap-6 md:gap-8 justify-end min-h-0 md:min-h-[380px] order-2 md:order-1">
              {/* Meta pills moved down to the polaroid caption row (right side). */}

              {/* Title group — headline is the kicker's lede (before the em-dash);
                  the remaining sentence becomes the supporting paragraph. */}
              {(() => {
                const [headline, ...rest] = project.blurb.split(" — ");
                const body = rest.join(" — ");
                return (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-3xl md:text-4xl font-display text-ink leading-[1.05] tracking-[-1px] max-w-[18ch]">
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
                      backgroundColor: "#DBE6EB",
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/tape.svg"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -rotate-[3deg] w-[140px] z-10"
                  />
                  {/* White paper card with grain + 2d/3d chrome. Shrinks on
                      hover, matching the hero yellow sticky note. */}
                  <div className="relative w-full h-full bg-white grain-paper flex flex-col p-3 md:p-4 pb-10 md:pb-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_14px_28px_rgba(26,26,26,0.22)] transition-transform duration-500 group-hover:scale-[0.96]">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt=""
                        className="w-full flex-1 object-cover min-h-0"
                      />
                    ) : (
                      <div className="placeholder w-full flex-1">
                        <span className="placeholder-label">
                          {project.client}
                        </span>
                      </div>
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
                          <Chip key={`${tag}-${i}`}>{tag}</Chip>
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
                  className="group relative block h-full min-h-[280px] order-1 md:order-2"
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
    </>
  );
}
