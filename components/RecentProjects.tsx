"use client";

import { projects, type Project } from "@/content";
import { useEffect, useRef, useState } from "react";
import { Cover } from "./Cover";
import { Chip, Container, Eyebrow, Reveal } from "./ui";

/**
 * A phone showing the project as a small storefront, drawn in HTML from its own name, line and
 * cover. It rises over the cover on hover. Placeholder until each project has a real UX screenshot.
 */
function PhoneMockup({ p }: { p: Project }) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/20 opacity-0 transition duration-500 group-hover:opacity-100">
      <span className="flex aspect-[9/17] h-[86%] translate-y-6 flex-col overflow-hidden rounded-[22px] border-[5px] border-[#1a1a1a] bg-paper shadow-[0_20px_50px_rgb(0_0_0/0.35)] transition duration-500 group-hover:translate-y-0">
        {/* Status bar and the store's header */}
        <span className="flex items-center justify-between px-3 pt-2 text-[8px] font-medium"><span>9:41</span><span>●●●</span></span>
        <span className="flex items-center justify-between border-b border-line px-3 py-2">
          <span className="text-[10px] leading-none">☰</span>
          <span className="serif truncate px-2 text-[11px] leading-none">{p.client}</span>
          <span className="text-[10px] leading-none">⌕</span>
        </span>
        {/* Hero: the cover, then the line and a button */}
        <Cover p={p} className="aspect-[4/5] w-full" />
        <span className="px-3 pt-2.5">
          <span className="serif block text-[11px] leading-tight">{p.excerpt}</span>
          <span className="mono mt-2 inline-block bg-ink px-2.5 py-1 text-[7px] text-white">Shop now</span>
        </span>
        {/* Product tiles */}
        <span className="mt-2.5 grid grid-cols-2 gap-1.5 px-3">
          {[0, 1].map((n) => <i key={n} className="block aspect-square bg-scrap" />)}
        </span>
      </span>
    </span>
  );
}

/**
 * Recent projects as a carousel in one row: big covers, two in view on desktop and one on phones,
 * snapping as you swipe or scroll sideways. Each has its role in a red pill (top right), the name in the serif
 * and its one-line description; hovering a cover brings up a phone mockup. Previous and next
 * buttons sit on the right of the heading. Each cover has a thin border, like the hero's screens.
 */
export function RecentProjects({ className = "" }: { className?: string }) {
  const track = useRef<HTMLUListElement>(null);
  // Whether the row is scrolled to its start or end, to switch the arrows off there.
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const row = track.current;
    if (!row) return;
    const onScroll = () =>
      setEdge({ start: row.scrollLeft <= 4, end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 4 });
    onScroll();
    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      row.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Move the row by one card (its width plus the gap); scroll snapping lines it up.
  const step = (dir: 1 | -1) => {
    const row = track.current;
    const [a, b] = row ? ([...row.children] as HTMLElement[]) : [];
    if (row && a) row.scrollBy({ left: dir * (b ? b.offsetLeft - a.offsetLeft : a.offsetWidth), behavior: "smooth" });
  };

  return (
    <section id="projects" className={className}>
      <Container>
        {/* A list section: the mono label is the heading; previous and next on the right */}
        <Reveal className="mb-6 flex items-center justify-between gap-4">
          <Eyebrow as="h2" className="mb-0">{projects.eyebrow}</Eyebrow>
          <div className="-my-4 -mr-2 flex">
            {([["Previous project", -1], ["Next project", 1]] as const).map(([label, dir]) => {
              const off = dir < 0 ? edge.start : edge.end;
              return (
                <button key={label} type="button" aria-label={label} disabled={off} onClick={() => step(dir)} className="grid size-12 cursor-pointer place-items-center transition-colors hover:text-accent disabled:cursor-default disabled:opacity-30 disabled:hover:text-ink">
                  <svg viewBox="0 0 20 20" className={`size-8 ${dir < 0 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                </button>
              );
            })}
          </div>
        </Reveal>
        {/* Bottom padding: the row scrolls sideways, which clips anything below its edge (descenders) */}
        <ul ref={track} className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          {projects.items.map((p) => (
            <li key={p.slug} className="w-[88%] shrink-0 snap-start md:w-[calc(50%-12px)]">
              <a href={`/projects/${p.slug}`} className="group block">
                <span className="relative block overflow-hidden border border-line">
                  <Cover p={p} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]" />
                  <Chip className="absolute top-3 right-3 text-white [--color-chip:var(--color-accent)]">{p.role}</Chip>
                  <PhoneMockup p={p} />
                </span>
                <span className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                  <span className="serif text-[clamp(20px,1.6vw,24px)] leading-[1.2] tracking-[-0.03em]">{p.client}</span>
                  <span className="max-w-[32ch] text-[15px] md:text-right">{p.excerpt}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
