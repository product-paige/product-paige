"use client";

import { approachPage, services } from "@/content";
import { useId, useState } from "react";
import { Chip, Eyebrow, Reveal, sectionHeading } from "./ui";
import { Mockup } from "./WorkingStyle";

// A thin line icon for each service, in turn: a browser window (design), a speech bubble
// (positioning and messaging), a cursor (UX and conversion), a megaphone (content and campaigns)
const icon = (d: string) => (
  <svg viewBox="0 0 32 32" className="size-6 lg:size-7" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const icons = [
  icon("M4 7h24v18H4zM4 11h24M7 9h.01M9.5 9h.01M12 9h.01"),
  icon("M5 6h22v15H13l-6 5v-5H5zM10 12h12M10 16h8"),
  icon("M9 5l14 9-6 1.5 4 7-3 1.5-4-7-5 4z"),
  icon("M5 13v6h4l10 6V7L9 13H5zM23 12a5 5 0 0 1 0 8M9 19l2 7h3l-2-7"),
];

/**
 * Capabilities laid out like How I work, mirrored: the eyebrow, heading, line and the four services on
 * the left as an accordion, a picture for each on the right. Opening a service slides its line and pills
 * open and shows its picture; opening another closes the first.
 */
export function CapabilitiesShowcase() {
  const rows = approachPage.phases;
  // One service open at a time (the first to begin with); the picture shows the open one, or stays on the last
  const [open, setOpen] = useState<number | null>(0);
  const [shown, setShown] = useState(0);
  const id = useId();
  const active = open ?? shown;

  return (
    <section id="capabilities" className="border-t border-grid">
      <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-2">
        <div className="flex flex-col">
          <Reveal className="px-4 pt-12 pb-10 sm:px-6 lg:pt-16 lg:pr-16 lg:pb-12 lg:pl-10">
            <Eyebrow>{services.eyebrow}</Eyebrow>
            <h2 className={sectionHeading}>{services.title}</h2>
            <p className="lede mt-5 max-w-xl">{services.description}</p>
          </Reveal>
          <ul className="divide-y divide-grid border-t border-grid lg:mt-auto">
            {rows.map((ph, i) => {
              const on = open === i;
              return (
                <Reveal as="li" key={ph.title} delay={i * 80} className={`transition-colors duration-500 ${on ? "bg-sheet" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`${id}-${i}`}
                      onClick={() => { setOpen(on ? null : i); setShown(i); }}
                      className={`flex w-full cursor-pointer items-center gap-3 px-4 text-left transition-colors duration-500 sm:px-6 lg:gap-4 lg:pr-10 lg:pl-10 ${on ? "pt-6 pb-3" : "py-6"}`}
                    >
                      {/* The service's line icon: the open one blue, the others a quiet grey */}
                      <span aria-hidden className={`grid w-9 shrink-0 place-items-start transition-colors duration-500 lg:w-10 ${on ? "text-accent" : "text-ink/50"}`}>
                        {icons[i % icons.length]}
                      </span>
                      <span className="serif flex-1 text-[clamp(22px,2vw,28px)] leading-tight tracking-[-0.035em]">{ph.title}</span>
                      {/* A plus that turns into a cross when open */}
                      <svg aria-hidden viewBox="0 0 24 24" className={`size-6 shrink-0 lg:size-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
                        <path d="M12 4v16M4 12h16" />
                      </svg>
                    </button>
                  </h3>
                  {/* The line and pills slide open under the service (grid rows 0fr to 1fr) */}
                  <div id={`${id}-${i}`} role="region" inert={!on} className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className={`px-4 pb-6 sm:px-6 lg:pr-10 lg:pl-[calc(2.5rem+2.5rem+1rem)] transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}>
                        <p className="max-w-md text-[15px] leading-[1.5] text-muted">{ph.body}</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {ph.includes.map((c) => <li key={c}><Chip className="text-white [--color-chip:var(--color-accent)]">{c}</Chip></li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <Reveal className="@container relative z-1 aspect-square overflow-hidden border-t border-grid bg-sky md:border-x lg:aspect-auto lg:min-h-[36rem] lg:border-t-0 lg:border-l lg:border-r">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={services.background} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
          {services.images.map((image, i) => (
            <div key={image.src} aria-hidden={i !== active} className={`absolute inset-0 grid place-items-center transition-[opacity,scale] duration-[1200ms] ease-in-out ${i === active ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`}>
              <Mockup image={image} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
