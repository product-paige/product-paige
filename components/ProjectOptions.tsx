"use client";

import { projects } from "@/content";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight, Container, Reveal, Rich, sectionHeading } from "./ui";

// Three layouts for Recent projects, shown one after another so Paige can pick one.
// Delete the two that aren't chosen (and their CSS under "Recent projects" in globals.css).

type Project = (typeof projects.items)[number];

/** Small mono label above each option, so they can be compared on the page. */
function OptionLabel({ children }: { children: string }) {
  return <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.08em] text-accent">{children}</p>;
}

function Head({ option }: { option: string }) {
  return (
    <Reveal className="mb-10 grid gap-5 lg:mb-16 lg:grid-cols-2 lg:items-end lg:gap-16">
      <div>
        <OptionLabel>{option}</OptionLabel>
        <h2 className={sectionHeading}><Rich text={projects.heading} /></h2>
      </div>
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

/** A manila folder: a tab with the client's name, then the body in the project's colour. */
function Folder({ p, i, compact = false }: { p: Project; i: number; compact?: boolean }) {
  return (
    <a href={p.href} className="folder group block" style={{ "--tone": p.tone, "--tab": `${8 + (i % 4) * 18}%` } as CSSProperties}>
      <span className="folder-tab font-mono text-[12px] uppercase tracking-[0.08em]">
        {String(i + 1).padStart(2, "0")} · {p.client}
      </span>
      <div className={`folder-body grid gap-6 p-5 lg:p-8 ${compact ? "" : "md:grid-cols-[1fr_1.15fr] md:gap-10"}`}>
        <div className="flex flex-col">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink/60">{p.role} · {p.year}</p>
          <h3 className="serif mt-3 text-[clamp(24px,2.4vw,34px)] leading-[1.08]">{p.title}</h3>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px]">
            <span className="link">View project</span>
            <ArrowUpRight />
          </span>
        </div>
        <Cover p={p} className={`w-full rounded-[3px] ${compact ? "aspect-[4/3]" : "aspect-[4/3] md:aspect-auto md:h-full md:min-h-[300px]"}`} />
      </div>
    </a>
  );
}

/**
 * Option A: folders stick one after another and pile up. Each one shrinks back and
 * dims a little as the next slides over it.
 */
export function FolderStack({ className = "" }: { className?: string }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = [...(list.current?.children ?? [])] as HTMLElement[];
    if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      items.forEach((el, i) => {
        const next = items[i + 1];
        const folder = el.firstElementChild as HTMLElement;
        if (!next) return;
        const a = el.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        // 0 while the next folder is below, 1 once it fully covers this one.
        const cover = Math.min(Math.max((a.bottom - b.top) / a.height, 0), 1);
        folder.style.transform = `scale(${1 - cover * 0.06})`;
        folder.style.filter = `brightness(${1 - cover * 0.12})`;
      });
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
      <Container>
        <Head option="Option A · Folder stack" />
        <ol ref={list} className="grid gap-8 lg:gap-12">
          {projects.items.map((p, i) => (
            <li key={p.href} className="sticky" style={{ top: `calc(96px + ${i * 26}px)` }}>
              <div className="origin-top transition-[filter] duration-150">
                <Folder p={p} i={i} />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/**
 * Option B: the section pins while you scroll, and the folders slide sideways past,
 * like flicking through a filing drawer. On phones it's a swipeable row instead.
 */
export function FilingDrawer({ className = "" }: { className?: string }) {
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
            <Head option="Option B · Filing drawer" />
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
                  <Folder p={p} i={i} compact />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

/**
 * Option C: sheets taped down at slight angles. Each one drops in tilted and
 * settles as it scrolls into view (CSS scroll-driven animation; static where unsupported).
 */
export function TapedPile({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <Container>
        <Head option="Option C · Taped pile" />
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:gap-x-16">
          {projects.items.map((p, i) => (
            <a
              key={p.href}
              href={p.href}
              className={`taped group block ${i % 2 ? "md:mt-24" : ""}`}
              style={{ "--r": `${i % 2 ? 1.5 : -1.5}deg`, "--r0": `${i % 2 ? 7 : -7}deg` } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/tape.webp" alt="" aria-hidden className="taped-tape" />
              <Cover p={p} className="aspect-[4/3] w-full" />
              <div className="pt-5">
                <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">{p.client} · {p.role} · {p.year}</p>
                <h3 className="serif mt-2 text-[clamp(22px,2.2vw,30px)] leading-[1.1]">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
