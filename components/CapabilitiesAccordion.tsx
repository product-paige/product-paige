"use client";

import { useId, useState } from "react";
import { approachPage, services } from "@/content";
import { Chip, Eyebrow, Reveal, sectionHeading } from "./ui";

/**
 * How I can help as an accordion: the label, heading and a line on the left
 * (sticky), a full-height divider, then the four services as numbered rows in the serif with a plus.
 * Opening a row slides its line and pills open (the panel's height animates from 0 to its own, via
 * grid rows) and turns the plus into a cross; opening another closes the first.
 */
export function CapabilitiesAccordion() {
  const rows = approachPage.phases;
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <section id="capabilities" className="border-t border-grid">
      <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Left: the label and the statement */}
        <div className="border-grid px-4 pt-8 pb-10 sm:px-6 lg:border-r lg:py-14 lg:pr-10 lg:pl-10">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>{services.eyebrow}</Eyebrow>
            {/* The section heading, at the size of the other section headings, and a line under it */}
            <h2 className={sectionHeading}>{services.title}</h2>
            <p className="lede mt-5 max-w-[30ch]">{services.description}</p>
          </Reveal>
        </div>
        {/* Right: the services as numbered rows that open, with full dividers */}
        <div className="border-t border-grid lg:border-t-0">
          {rows.map((ph, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={ph.title} delay={i * 80} className={`border-grid transition-colors duration-500 ${i < rows.length - 1 ? "border-b" : ""} ${isOpen ? "bg-sheet" : ""}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`group flex w-full cursor-pointer items-center gap-6 px-4 pt-7 text-left transition-[background-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 lg:gap-12 lg:px-10 lg:pt-9 ${isOpen ? "pb-3 lg:pb-3" : "pb-7 hover:bg-sheet lg:pb-9"}`}
                  >
                    <span className="serif w-10 shrink-0 text-[clamp(22px,2.2vw,32px)] leading-none tracking-[-0.03em] tabular-nums lg:w-14">{String(i + 1).padStart(2, "0")}</span>
                    <span className="serif flex-1 text-[clamp(22px,2.2vw,32px)] leading-tight tracking-[-0.035em]">{ph.title}</span>
                    {/* A plus that turns into a cross when open */}
                    <svg aria-hidden viewBox="0 0 24 24" className={`size-8 shrink-0 transition-transform lg:size-9 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
                      <path d="M12 4v16M4 12h16" />
                    </svg>
                  </button>
                </h3>
                {/* The panel: its height animates open and closed (grid rows 0fr to 1fr), the content fading in */}
                <div id={`${id}-${i}`} role="region" aria-hidden={!isOpen} inert={!isOpen} className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className={`px-4 pb-8 transition-opacity duration-500 sm:px-6 lg:pr-10 lg:pb-10 lg:pl-[calc(2.5rem+3.5rem+3rem)] ${isOpen ? "opacity-100" : "opacity-0"}`}>
                      <p className="max-w-[52ch] text-[16px] leading-relaxed text-muted">{ph.body}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {ph.includes.map((c) => <li key={c}><Chip className="text-white [--color-chip:var(--color-accent)]">{c}</Chip></li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
