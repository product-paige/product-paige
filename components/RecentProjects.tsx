"use client";

import { projects } from "@/content";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight, Container, Reveal, Rich, sectionHeading } from "./ui";

type Project = (typeof projects.items)[number];

function Head() {
  return (
    <Reveal className="mb-10 grid gap-5 lg:mb-16 lg:grid-cols-2 lg:items-end lg:gap-16">
      <h2 className={sectionHeading}><Rich text={projects.heading} /></h2>
      <p className="lede max-w-xl">{projects.body}</p>
    </Reveal>
  );
}

/** The cover, or a plain sheet with the client's name while there's no image yet. */
function Cover({ p, className = "" }: { p: Project; className?: string }) {
  return p.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={p.image} alt="" loading="lazy" decoding="async" className={`object-cover ${className}`} />
  ) : (
    <div className={`grid place-items-center bg-white/55 ${className}`}>
      <span className="serif text-[clamp(28px,3vw,44px)] text-ink/35">{p.client}</span>
    </div>
  );
}

/** A manila folder: a tab on the right, then the body in the project's colour. */
function Folder({ p, i }: { p: Project; i: number }) {
  return (
    <a href={p.href} className="folder group flex flex-col" style={{ "--tone": p.tone } as CSSProperties}>
      <span className="folder-tab self-end font-mono text-[12px] uppercase tracking-[0.08em]">
        Project {String(i + 1).padStart(2, "0")}
      </span>
      <div className="folder-body grid gap-6 p-5 lg:p-8">
        <div className="flex flex-col">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink/60">{p.role} · {p.year}</p>
          <h3 className="serif mt-3 text-[clamp(26px,2.6vw,38px)] leading-[1.05]">{p.client}</h3>
          <p className="mt-2 max-w-[42ch] text-ink/70">{p.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px]">
            <span className="link">View project</span>
            <ArrowUpRight />
          </span>
        </div>
        <Cover p={p} className="aspect-[4/3] w-full rounded-[3px]" />
      </div>
    </a>
  );
}

/**
 * Recent projects as a filing drawer: the section pins while you scroll, and the folders
 * slide sideways past. On phones it's a swipeable row instead.
 */
export function RecentProjects({ className = "" }: { className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = outer.current;
    const row = track.current;
    if (!wrap || !row) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches) {
        row.style.transform = "";
        wrap.style.height = "";
        return;
      }
      const distance = row.scrollWidth - row.clientWidth;
      // The pinned stretch lasts as long as the sideways travel.
      wrap.style.height = `${window.innerHeight + distance}px`;
      const progress = Math.min(Math.max(-wrap.getBoundingClientRect().top / distance, 0), 1);
      row.style.transform = `translateX(${-progress * distance}px)`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={className}>
      <div ref={outer} className="relative">
        <div className="lg:sticky lg:top-[68px] lg:flex lg:h-[calc(100svh-68px)] lg:flex-col lg:justify-center lg:overflow-hidden">
          <Container>
            <Head />
            <div
              ref={track}
              className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {projects.items.map((p, i) => (
                <div
                  key={p.href}
                  className="w-[82%] shrink-0 snap-start sm:w-[60%] lg:w-[min(560px,42vw)]"
                  style={{ rotate: `${i % 2 ? 1 : -1}deg` }}
                >
                  <Folder p={p} i={i} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
