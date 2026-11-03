"use client";

import { approachPage, services } from "@/content";
import { useId, useState } from "react";
import { Chip, Reveal, Rich, sectionHeading } from "./ui";

/**
 * How I can help, split 50/50: the heading on the left (sticky on desktop) with a full-height
 * divider on its right, and the phases on the right as an accordion, with full-width dividers
 * between them. Each row shows its number and title; opening it slides out the line and what
 * it can include. One open at a time, the first to start (same behaviour as the FAQ).
 * The dividers run edge to edge of the sheet; the content keeps Container's inset.
 * On phones the heading sits on top and the rows stack under it.
 */
export function ServicesSplit() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section id="services" className="border-t border-grid lg:grid lg:grid-cols-2">
      <div className="border-b border-grid px-4 py-8 sm:px-6 md:px-12 lg:border-r lg:border-b-0 lg:py-14 lg:pr-10 lg:pl-20">
        <Reveal className="lg:sticky lg:top-28">
          <h2 className={sectionHeading}><Rich text={services.heading} /></h2>
        </Reveal>
      </div>
      <div>
        {approachPage.phases.map((ph, i) => {
          const isOpen = open === i;
          const buttonId = `${id}-s${i}`;
          const panelId = `${id}-p${i}`;
          return (
            <article key={ph.title} className="not-first:border-t not-first:border-grid">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen((prev) => (prev === i ? null : i))}
                  className="flex w-full cursor-pointer items-center gap-5 px-4 py-6 text-left sm:px-6 md:gap-8 md:px-12 lg:py-8 lg:pr-20 lg:pl-10"
                >
                  <span className="serif w-12 shrink-0 text-[clamp(26px,2.6vw,38px)] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="serif flex-1 text-[clamp(26px,2.6vw,38px)] leading-[1.08] tracking-[-0.03em]">{ph.title}</span>
                  {/* The FAQ's thin plus, rotating into a cross when open */}
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    strokeLinecap="round"
                    className={`size-5 shrink-0 transition-[rotate] duration-500 lg:size-6 ${isOpen ? "rotate-45" : ""}`}
                  >
                    <path d="M12 4v16M4 12h16" vectorEffect="non-scaling-stroke" />
                  </svg>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  {/* Lined up under the title: the row inset, the number's 48px and the gap */}
                  <div
                    className={`pr-4 pb-8 pl-[84px] transition-[opacity,translate] duration-500 sm:pr-6 sm:pl-[92px] md:pr-12 md:pl-[128px] lg:pr-20 lg:pb-10 lg:pl-[120px] ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                  >
                    <p className="max-w-xl">{ph.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
