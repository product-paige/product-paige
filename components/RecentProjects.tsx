"use client";

import { projects, type Project } from "@/content";
import { useEffect, useRef, useState } from "react";
import { Cover } from "./Folder";
import { Chip, Container, Reveal, Rich, sectionHeading } from "./ui";

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
 * and its one-line description; hovering a cover brings up a phone mockup. The dots below show
 * where you are and jump to a project; they sit on the right. Each cover has a thin border, like the hero's screens.
 */
export function RecentProjects({ className = "" }: { className?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // The current project is the one whose left edge is nearest the track's.
  useEffect(() => {
    const row = track.current;
    if (!row) return;
    const onScroll = () => {
      const items = [...row.children] as HTMLElement[];
      const left = row.getBoundingClientRect().left;
      let best = 0;
      items.forEach((el, i) => {
        if (Math.abs(el.getBoundingClientRect().left - left) < Math.abs(items[best].getBoundingClientRect().left - left)) best = i;
      });
      // At the end of the row, the last dot.
      setActive(row.scrollLeft + row.clientWidth >= row.scrollWidth - 4 ? items.length - 1 : best);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => row.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const row = track.current;
    const el = row?.children[i] as HTMLElement | undefined;
    if (row && el) row.scrollTo({ left: el.offsetLeft - row.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id="projects" className={className}>
      <Container>
        <Reveal className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className={sectionHeading}><Rich text={projects.heading} /></h2>
          <p className="lede max-w-xl">{projects.body}</p>
        </Reveal>
        <ul ref={track} className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          {projects.items.map((p) => (
            <li key={p.slug} className="w-[88%] shrink-0 snap-start md:w-[calc(50%-12px)]">
              <a href={`/projects/${p.slug}`} className="group block">
                <span className="relative block overflow-hidden border border-line">
                  <Cover p={p} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]" />
                  <Chip className="absolute top-3 right-3 text-white [--color-chip:var(--color-accent)]">{p.role}</Chip>
                  <PhoneMockup p={p} />
                </span>
                <span className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
                  <span className="serif text-[clamp(20px,1.6vw,24px)] leading-none tracking-[-0.03em]">{p.client}</span>
                  <span className="max-w-[32ch] text-[15px] md:text-right">{p.excerpt}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        {/* Dots: one per project */}
        <div className="mt-8 flex justify-end gap-2.5 lg:mt-10">
          {projects.items.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Show ${p.client}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${active === i ? "w-7 bg-ink" : "w-2.5 bg-ink/25 hover:bg-ink/50"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
