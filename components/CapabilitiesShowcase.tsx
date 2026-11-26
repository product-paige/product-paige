"use client";

import { approachPage, services, type Shot } from "@/content";
import { useId, useState } from "react";
import { Chip, Eyebrow, Reveal } from "./ui";

// A pixel icon for each service, drawn on a 16×16 grid in the title's colour: solid pixels for the
// outline, lighter ones for the fill. In turn: a browser window (web and UX design), a speech bubble
// (storytelling), a cursor (conversion), a megaphone (content and campaigns).
const pixel = (solid: string, fill: string) => (
  <svg viewBox="0 0 16 16" className="size-8" shapeRendering="crispEdges" fill="currentColor"><path d={fill} opacity="0.3" /><path d={solid} /></svg>
);
const icons = [
  pixel("M1 2h14v1h-14zM1 3h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM7 3h1v1h-1zM15 3h1v1h-1zM1 4h14v1h-14zM1 5h1v1h-1zM14 5h1v1h-1zM1 6h1v1h-1zM14 6h1v1h-1zM1 7h1v1h-1zM14 7h1v1h-1zM1 8h1v1h-1zM14 8h1v1h-1zM1 9h1v1h-1zM14 9h1v1h-1zM1 10h1v1h-1zM14 10h1v1h-1zM1 11h1v1h-1zM14 11h1v1h-1zM1 12h1v1h-1zM14 12h1v1h-1zM1 13h14v1h-14z", "M3 6h10v1h-10zM3 7h10v1h-10zM3 9h4v1h-4zM9 9h4v1h-4zM3 10h4v1h-4zM9 10h4v1h-4zM3 11h4v1h-4zM9 11h4v1h-4z"),
  pixel("M2 2h12v1h-12zM1 3h1v1h-1zM14 3h1v1h-1zM1 4h1v1h-1zM14 4h1v1h-1zM1 5h1v1h-1zM14 5h1v1h-1zM1 6h1v1h-1zM14 6h1v1h-1zM1 7h1v1h-1zM14 7h1v1h-1zM1 8h1v1h-1zM14 8h1v1h-1zM1 9h1v1h-1zM14 9h1v1h-1zM2 10h4v1h-4zM7 10h7v1h-7zM5 11h1v1h-1zM7 11h1v1h-1zM5 12h2v1h-2zM5 13h1v1h-1z", "M3 4h10v1h-10zM3 6h9v1h-9zM3 8h6v1h-6z"),
  pixel("M3 1h1v1h-1zM3 2h2v1h-2zM3 3h1v1h-1zM5 3h1v1h-1zM3 4h1v1h-1zM6 4h1v1h-1zM3 5h1v1h-1zM7 5h1v1h-1zM3 6h1v1h-1zM8 6h1v1h-1zM3 7h1v1h-1zM9 7h1v1h-1zM3 8h1v1h-1zM10 8h1v1h-1zM3 9h1v1h-1zM11 9h1v1h-1zM3 10h1v1h-1zM8 10h4v1h-4zM3 11h1v1h-1zM5 11h2v1h-2zM9 11h1v1h-1zM3 12h2v1h-2zM7 12h1v1h-1zM10 12h1v1h-1zM3 13h1v1h-1zM7 13h1v1h-1zM10 13h1v1h-1zM8 14h2v1h-2z", "M4 3h1v1h-1zM4 4h2v1h-2zM4 5h3v1h-3zM4 6h4v1h-4zM4 7h5v1h-5zM4 8h6v1h-6zM4 9h7v1h-7zM4 10h4v1h-4zM4 11h1v1h-1zM7 11h2v1h-2zM8 12h2v1h-2zM8 13h2v1h-2z"),
  pixel("M11 2h1v1h-1zM9 3h2v1h-2zM12 3h1v1h-1zM14 3h1v1h-1zM7 4h2v1h-2zM12 4h1v1h-1zM15 4h1v1h-1zM1 5h5v1h-5zM12 5h1v1h-1zM1 6h1v1h-1zM12 6h1v1h-1zM14 6h2v1h-2zM1 7h1v1h-1zM12 7h1v1h-1zM1 8h5v1h-5zM12 8h1v1h-1zM7 9h2v1h-2zM12 9h1v1h-1zM15 9h1v1h-1zM9 10h2v1h-2zM12 10h1v1h-1zM14 10h1v1h-1zM3 11h2v1h-2zM11 11h1v1h-1zM3 12h1v1h-1zM5 12h1v1h-1zM3 13h1v1h-1zM5 13h1v1h-1zM3 14h3v1h-3z", "M11 3h1v1h-1zM9 4h3v1h-3zM6 5h6v1h-6zM2 6h10v1h-10zM2 7h10v1h-10zM6 8h6v1h-6zM9 9h3v1h-3zM11 10h1v1h-1zM4 12h1v1h-1zM4 13h1v1h-1z"),
];

const shadow = "shadow-[0_24px_60px_rgb(26_26_26/0.28)]";

/**
 * One service's picture, sized in cqw of the picture panel: a homepage in a browser window (UX design),
 * a banner with its headline before and after (Messaging), a product card with numbered notes
 * (Conversion), or a launch email (Campaigns).
 */
function Mockup({ image }: { image: Shot }) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = (className = "block w-full") => <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" className={className} />;

  if (image.frame === "browser") {
    return (
      <div className={`w-[80%] overflow-hidden rounded-screen bg-white ${shadow}`}>
        {/* The window's top bar: three dots and the address */}
        <div className="flex items-center gap-3 border-b border-line bg-sheet px-3 py-2">
          <span className="flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} className="size-2.5 rounded-full" style={{ background: c }} />)}</span>
          <span className="mx-auto w-1/2 truncate rounded-full bg-white px-3 py-0.5 text-center text-[11px] text-muted">{image.url}</span>
          <span className="w-[42px]" />
        </div>
        {img()}
      </div>
    );
  }

  if (image.frame === "copy") {
    return (
      <div className={`flex w-[58%] flex-col overflow-hidden rounded-screen bg-white ${shadow}`}>
        {img("block aspect-[16/9] w-full object-cover")}
        <div className="flex flex-col gap-[2.4cqw] p-[3.4cqw]">
          <div>
            <p className="mono text-[1.7cqw] text-ink/50">Before</p>
            <p className="mt-[0.8cqw] text-[2.4cqw] leading-[1.35] text-ink/50 line-through decoration-ink/30">{image.before}</p>
          </div>
          <div className="border-t border-line pt-[2.4cqw]">
            <p className="mono text-[1.7cqw] text-accent">After</p>
            <p className="serif mt-[0.8cqw] text-[4.4cqw] leading-[1.05] tracking-[-0.03em]">{image.after}</p>
          </div>
        </div>
      </div>
    );
  }

  if (image.frame === "notes") {
    return (
      <div className="relative h-full w-full">
        {/* The product card, to the left, with a numbered pin on the edge beside each thing to fix */}
        <div className="absolute top-1/2 left-[9%] z-1 w-[44%] -translate-y-1/2">
          <div className={`overflow-hidden rounded-screen ${shadow}`}>{img()}</div>
          {image.notes?.map((n, i) => (
            <span key={n.text} className="absolute grid size-[4.2cqw] -translate-1/2 place-items-center rounded-full bg-accent text-[2cqw] font-medium text-white ring-[0.5cqw] ring-white" style={{ left: `${n.x}%`, top: `${n.y}%` }}>{i + 1}</span>
          ))}
        </div>
        {/* The notes, on a sheet overlapping it on the right */}
        <ol className={`absolute top-1/2 right-[6%] z-2 flex w-[44%] -translate-y-[30%] flex-col gap-[2cqw] rounded-screen bg-white p-[3cqw] ${shadow}`}>
          <li className="mono text-[1.7cqw] text-ink/50">UX review</li>
          {image.notes?.map((n, i) => (
            <li key={n.text} className="flex gap-[1.6cqw] text-[2.2cqw] leading-[1.35]">
              <span className="grid size-[3.4cqw] shrink-0 place-items-center rounded-full bg-accent text-[1.7cqw] font-medium text-white">{i + 1}</span>
              {n.text}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (image.frame === "email") {
    return (
      <div className={`flex w-[54%] flex-col overflow-hidden rounded-screen bg-white ${shadow}`}>
        {/* The inbox header: who it's from and the subject */}
        <div className="flex flex-col gap-[0.6cqw] border-b border-line px-[3cqw] py-[2.4cqw]">
          <p className="flex items-center gap-[1.2cqw] text-[2cqw] text-ink/60">
            <i className="size-[2.6cqw] rounded-full bg-accent" />{image.from}
          </p>
          <p className="text-[2.6cqw] font-medium">{image.subject}</p>
        </div>
        {img("block aspect-[4/3] w-full object-cover")}
        <div className="flex justify-center p-[2.6cqw]">
          <span className="mono rounded-full bg-ink px-[3cqw] py-[1.2cqw] text-[1.7cqw] text-white">{image.button}</span>
        </div>
      </div>
    );
  }

  return <div className={`w-[52%] overflow-hidden rounded-screen ${shadow}`}>{img()}</div>;
}

/**
 * Capabilities: the eyebrow and the four services as an accordion on the left, a picture
 * for each service on the right. Opening a service slides its line and pills
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
      {/* A set height on desktop, tall enough for any open service, so the picture stays the same size as rows open and close */}
      <div className="md:mx-6 lg:mx-10 lg:grid lg:min-h-[39rem] lg:grid-cols-2">
        <div className="flex flex-col">
          {/* A list section: the mono label is the heading, as on Recent projects */}
          <Reveal className="px-4 pt-12 pb-8 sm:px-6 lg:pt-12 lg:pr-16 lg:pb-8 lg:pl-10">
            <Eyebrow as="h2">{services.title}</Eyebrow>
          </Reveal>
          <ul className="divide-y divide-grid border-t border-grid lg:mt-auto">
            {rows.map((ph, i) => {
              const on = open === i;
              return (
                <Reveal as="li" key={ph.title} delay={i * 80} className={`transition-colors duration-500 ${on ? "bg-accent text-white" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`${id}-${i}`}
                      onClick={() => { setOpen(on ? null : i); setShown(i); }}
                      className={`flex w-full cursor-pointer items-center gap-3 px-4 text-left transition-colors duration-500 sm:px-6 lg:gap-4 lg:pr-10 lg:pl-10 ${on ? "pt-6 pb-3" : "py-6"}`}
                    >
                      {/* The service's line icon, in the title's colour: ink when closed, white in the blue open row */}
                      <span aria-hidden className="shrink-0">
                        {icons[i % icons.length]}
                      </span>
                      <span className="serif flex-1 text-[clamp(22px,2vw,28px)] leading-tight tracking-[-0.03em]">{ph.title}</span>
                      {/* A plus that turns into a cross when open */}
                      <svg aria-hidden viewBox="0 0 24 24" className={`size-6 shrink-0 lg:size-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
                        <path d="M12 4v16M4 12h16" />
                      </svg>
                    </button>
                  </h3>
                  {/* The line and pills slide open under the service (grid rows 0fr to 1fr) */}
                  <div id={`${id}-${i}`} role="region" inert={!on} className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className={`px-4 pb-6 sm:px-6 lg:pr-10 lg:pl-[calc(2.5rem+2rem+1rem)] transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}>
                        <p className="copy max-w-xl text-white/80">{ph.body}</p>
                        {/* One row of pills: any that don’t fit on it wrap below and are cut off */}
                        <ul className="mt-3 flex h-[30px] flex-wrap gap-2 overflow-hidden">
                          {ph.includes.map((c) => <li key={c}><Chip className="text-white [--color-chip:rgb(255_255_255/0.16)]">{c}</Chip></li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <Reveal className="@container relative z-1 aspect-square overflow-hidden border-t border-grid bg-sheet md:border-x lg:aspect-auto lg:min-h-[36rem] lg:border-t-0 lg:border-l lg:border-r">
          {/* Behind the pictures: a fine square grid, like the ground at the page's edges */}
          <div aria-hidden className="absolute inset-0 bg-sheet bg-[size:24px_24px] bg-[position:-1px_-1px] [background-image:linear-gradient(var(--color-grid)_1px,transparent_1px),linear-gradient(90deg,var(--color-grid)_1px,transparent_1px)] opacity-60" />
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
