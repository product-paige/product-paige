"use client";

import { projects } from "@/content";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight, Chip, Container, Reveal, Rich, sectionHeading } from "./ui";

type Project = (typeof projects.items)[number];

function Head() {
  return (
    <Reveal className="mb-12 grid gap-5 lg:mb-16 lg:grid-cols-2 lg:items-end lg:gap-16">
      <h2 className={sectionHeading}><Rich text={projects.heading} /></h2>
      <p className="lede max-w-xl">{projects.body}</p>
    </Reveal>
  );
}

/** The cover, or a plain sheet with the client's name while there's no image yet. */
function Cover({ p, className = "" }: { p: Project; className?: string }) {
  return p.image ? (
    <span className={`photo-grain block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
    </span>
  ) : (
    <div className={`grid place-items-center bg-white/55 ${className}`}>
      <span className="serif text-[clamp(28px,3vw,44px)] text-ink/35">{p.client}</span>
    </div>
  );
}

/** A manila folder: a tab on the left, then the body in the project's colour. */
function Folder({ p, i }: { p: Project; i: number }) {
  return (
    <a href={p.href} className="folder group flex flex-col" style={{ "--tone": p.tone } as CSSProperties}>
      <span className="folder-tab self-start font-mono text-[12px] uppercase tracking-[0.08em]">
        Project {String(i + 1).padStart(2, "0")}
      </span>
      <div className="folder-body grid gap-5 p-5 lg:p-6">
        {/* Cover first, with the role pill over its top-left corner. */}
        <div className="relative">
          <Cover p={p} className="aspect-[4/3] w-full rounded-[3px] lg:aspect-[16/9]" />
          <Chip className="absolute top-3 left-3 bg-white/85">{p.role}</Chip>
        </div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="serif text-[clamp(22px,2vw,28px)] leading-[1.1]">{p.client}</h3>
            {/* The buttons' arrow tab; it turns when the folder is hovered. */}
            <span className="btn shrink-0" aria-hidden>
              <span className="btn-tab h-10"><ArrowUpRight turn /></span>
            </span>
          </div>
          <p className="mt-2 max-w-[42ch] text-ink/70">{p.excerpt}</p>
        </div>
      </div>
    </a>
  );
}

/**
 * Recent projects as a filing drawer: the section pins while you scroll, and the folders
 * slide sideways past; they can also be dragged with the mouse. On phones it's a
 * swipeable row instead.
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

    // Mouse drag. Pinned (desktop), the row's position follows the page scroll one to
    // one, so dragging scrolls the page; otherwise it scrolls the row itself. Touch
    // keeps its native swipe. A drag of more than a few pixels doesn't open the link.
    let drag: { x: number; scrollY: number; scrollLeft: number; moved: boolean } | null = null;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, scrollY: window.scrollY, scrollLeft: row.scrollLeft, moved: false };
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) < 5) return;
      if (!drag.moved) {
        drag.moved = true;
        try { row.setPointerCapture(e.pointerId); } catch {}
        row.dataset.dragging = "";
      }
      if (desktop.matches) window.scrollTo({ top: drag.scrollY - dx, behavior: "instant" });
      else row.scrollLeft = drag.scrollLeft - dx;
    };
    const onUp = () => {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      delete row.dataset.dragging;
      // Swallow the click that ends a drag, so it doesn't follow the folder's link.
      if (moved) row.addEventListener("click", (e) => e.preventDefault(), { capture: true, once: true });
    };
    const noNativeDrag = (e: DragEvent) => e.preventDefault();

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    row.addEventListener("pointerdown", onDown);
    row.addEventListener("pointermove", onMove);
    row.addEventListener("pointerup", onUp);
    row.addEventListener("pointercancel", onUp);
    row.addEventListener("dragstart", noNativeDrag);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      row.removeEventListener("pointerdown", onDown);
      row.removeEventListener("pointermove", onMove);
      row.removeEventListener("pointerup", onUp);
      row.removeEventListener("pointercancel", onUp);
      row.removeEventListener("dragstart", noNativeDrag);
    };
  }, []);

  return (
    <section className={className}>
      <div ref={outer} className="relative">
        <div className="lg:sticky lg:top-[68px] lg:flex lg:h-[calc(100svh-68px)] lg:flex-col lg:overflow-x-clip lg:pt-20">
          <Container>
            <Head />
            <div
              ref={track}
              className="-mx-4 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 select-none data-dragging:cursor-grabbing data-dragging:snap-none sm:-mx-6 sm:px-6 lg:mx-0 lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {projects.items.map((p, i) => (
                <div
                  key={p.href}
                  className="w-[82%] shrink-0 snap-start sm:w-[60%] lg:w-[min(500px,38vw)]"
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
