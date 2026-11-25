"use client";

import { offers, site } from "@/content";
import { useState, type ReactNode } from "react";
import { Button, Container, Eyebrow, Reveal, ScribbleBullet, section, sectionHeading } from "./ui";

type Offer = (typeof offers.items)[number];

// The rows, top to bottom: a mono label on the left, then each offer's cell
const rows: { label: string; cell: (o: Offer) => ReactNode }[] = [
  { label: "Price", cell: (o) => <span className="mono">{o.price}</span> },
  { label: "Est. timeline", cell: (o) => <span className="mono">{o.time}</span> },
  { label: "What it is", cell: (o) => <p className="copy">{o.body}</p> },
  {
    label: "Example deliverables",
    cell: (o) => (
      <ul className="space-y-1.5">
        {o.points.map((pt, j) => <li key={pt} className="copy flex items-start gap-3"><ScribbleBullet variant={j} className="mt-px text-accent" />{pt}</li>)}
      </ul>
    ),
  },
];

/**
 * Services (#services): the offers side by side as a table. Each offer's name is a folder tab on top of its column;
 * clicking a tab picks that offer and turns its column the bright blue (Project to start). Rows for
 * price, timeline, what it is and example deliverables, split by fine row lines only, with the row labels in the mono.
 * One button to get in touch sits beside the heading. On phones each offer becomes its own block.
 */
export function ServicesTable() {
  const [picked, setPicked] = useState(1);
  const tint = (i: number) => (picked === i ? "bg-accent text-white [&_.text-accent]:text-white [&_.text-muted]:text-white/75" : "bg-sheet");
  // A folder tab: the name on a block with a top and left edge, then an angled cut on the right (an SVG,
  // so its edge line follows the slant). It overlaps the table's top line by a pixel so they join.
  const Tab = ({ o, i }: { o: Offer; i: number }) => {
    const on = picked === i;
    return (
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setPicked(i)}
        className={`group/tab relative z-1 -mb-px flex cursor-pointer items-stretch transition-colors ${on ? "text-white" : "hover:text-accent"}`}
      >
        <span className={`serif border-t border-l px-5 pt-3 pb-2.5 text-[clamp(18px,1.4vw,21px)] leading-none tracking-[-0.03em] transition-colors ${on ? "border-accent bg-accent" : "border-line bg-sheet"}`}>{o.name}</span>
        <svg aria-hidden viewBox="0 0 20 40" preserveAspectRatio="none" className={`w-5 shrink-0 self-stretch transition-colors ${on ? "fill-accent stroke-accent" : "fill-sheet stroke-line"}`}>
          <path d="M0 0H2L20 40H0Z" stroke="none" />
          <path d="M0 0.5H2L20 40" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </button>
    );
  };

  return (
    <section id="services" className={section}>
      <Container>
        {/* The heading, with the one button to get in touch on the right */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow>{offers.eyebrow}</Eyebrow>
            <h2 className={sectionHeading}>{offers.offersHeading}</h2>
          </div>
          <Button href={site.bookingUrl} accent>{offers.button}</Button>
        </Reveal>

        {/* Phones: each offer as its own block */}
        <div className="mt-10 space-y-8 md:hidden">
          {offers.items.map((o, i) => (
            <div key={o.name} className="flex flex-col">
              <span className="self-start"><Tab o={o} i={i} /></span>
              <div className={`divide-y divide-line border border-line transition-colors ${tint(i)}`}>
                {rows.map((r) => (
                  <div key={r.label} className="px-5 py-4">
                    <p className="mono mb-2 text-muted">{r.label}</p>
                    {r.cell(o)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: the table, a label column and one column per offer */}
        <Reveal className="mt-14 hidden md:block">
          <div className="grid grid-cols-[11.5rem_repeat(3,minmax(0,1fr))] border-x border-transparent">
            {/* The tabs, over their columns */}
            <span />
            {offers.items.map((o, i) => <span key={o.name} className="flex items-end"><Tab o={o} i={i} /></span>)}
          </div>
          <div className="grid grid-cols-[11.5rem_repeat(3,minmax(0,1fr))] overflow-hidden border border-line bg-sheet">
            {rows.map((r, k) => {
              // A line under every row but the last, which sits on the table's own border
              const under = k < rows.length - 1 ? "border-b" : "";
              return (
                <div key={r.label} className="contents">
                  <p className={`mono border-line px-5 py-5 text-muted lg:px-6 ${under}`}>{r.label}</p>
                  {offers.items.map((o, i) => (
                    <div key={o.name} className={`border-line px-5 py-5 transition-colors lg:px-6 ${under} ${tint(i)}`}>{r.cell(o)}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
