"use client";

import { useEffect, useState } from "react";

function SquareMarker({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block w-2 h-2 bg-current shrink-0 ${className}`}
    />
  );
}

/**
 * Sticky chapter TOC with scroll-spy. Observes the `#ch-N` articles the
 * page renders, so the chapter content itself stays server-rendered —
 * only this rail needs to be a client component.
 */
export function ChapterNav({ chapters }: { chapters: string[] }) {
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const sections = chapters
      .map((_, i) => document.getElementById(`ch-${i + 1}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the section whose top is closest to the viewport top band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );
        if (visible[0]) {
          const idx = sections.indexOf(visible[0].target as HTMLElement);
          if (idx !== -1) setActiveChapter(idx);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chapters]);

  return (
    <ol className="border-t border-[#1a1a1a]/25">
      {chapters.map((c, i) => {
        const isActive = activeChapter === i;
        return (
          <li key={c} className="border-b border-[#1a1a1a]/25">
            <a
              href={`#ch-${i + 1}`}
              className={`py-3 flex items-center gap-3 transition-all duration-500 ease-out will-change-transform ${
                isActive
                  ? "opacity-100 translate-x-2"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              <SquareMarker />
              <span className="text-base leading-[1.15]">{c}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
