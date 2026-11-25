"use client";

import { projects, type Project } from "@/content";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Cover } from "./Cover";
import { Chip, Container, Eyebrow, Reveal } from "./ui";

// A colour block behind each project's browser window, in turn: warm paper, off-black, the blue
const grounds = [
  { tile: "bg-[#e9e3d6]", frame: "border-ink/10 bg-paper" },
  { tile: "bg-dark", frame: "border-white/15 bg-[#2a2a28]" },
  { tile: "bg-accent", frame: "border-white/20 bg-paper" },
];

/** A small browser window holding the project's cover (or its name on a paper page, until it has one). It lifts on hover. */
function BrowserWindow({ p, frame }: { p: Project; frame: string }) {
  return (
    <span className={`block w-[74%] overflow-hidden rounded-[6px] border shadow-[0_18px_40px_rgb(0_0_0/0.18)] transition-transform duration-500 group-hover:-translate-y-1.5 ${frame}`}>
      <span className="flex gap-1 px-2.5 py-2">
        {[0, 1, 2].map((n) => <i key={n} className="size-1.5 rounded-full bg-current opacity-25" />)}
      </span>
      {p.image ? (
        <Cover p={p} className="aspect-[16/10] w-full" />
      ) : (
        <span className="grid aspect-[16/10] w-full place-items-center bg-paper text-ink">
          <span className="serif text-[clamp(20px,2vw,28px)] tracking-[-0.03em]">{p.client}</span>
        </span>
      )}
    </span>
  );
}

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

/** A project card's wrapper: a link to its case study, or (coming soon) a plain block with no hover. */
function Card({ p, children }: { p: Project; children: ReactNode }) {
  if (p.comingSoon) return <div className="block">{children}</div>;
  return <a href={`/projects/${p.slug}`} className="group block">{children}</a>;
}

/**
 * Recent projects as a carousel in one row: big covers, two in view on desktop and one on phones,
 * snapping as you swipe or scroll sideways. Each is a colour block with the project in a browser window
 * (on hover, a phone showing it as a small storefront rises over it), a Coming soon label top right on unfinished ones, then the name large with a round arrow and
 * its one-line description. Previous and next buttons sit on the right of the heading.
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
        <Reveal className="mb-8 flex items-center justify-between gap-4 lg:mb-10">
          <Eyebrow as="h2">{projects.eyebrow}</Eyebrow>
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
        <ul ref={track} className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto md:gap-10 scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          {projects.items.map((p, i) => (
            <li key={p.slug} className="w-[88%] shrink-0 snap-start md:w-[calc(50%-20px)]">
              <Card p={p}>
                <span className={`relative grid aspect-[4/3] place-items-center overflow-hidden ${grounds[i % grounds.length].tile}`}>
                  <BrowserWindow p={p} frame={grounds[i % grounds.length].frame} />
                  {p.comingSoon ? <Chip className="absolute top-3 right-3 bg-paper text-ink">{projects.comingSoonLabel}</Chip> : <PhoneMockup p={p} />}
                </span>
                <span className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-1">
                  {/* The name, larger, with a round arrow on projects that have a page */}
                  <span className="flex items-center gap-3">
                    <span className="serif text-[clamp(26px,2.4vw,34px)] leading-[1.1] tracking-[-0.03em]">{p.client}</span>
                    {!p.comingSoon && (
                      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
                      </span>
                    )}
                  </span>
                  <span className="max-w-[24ch] text-[15px] leading-snug text-balance md:text-right">{p.excerpt}</span>
                </span>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
