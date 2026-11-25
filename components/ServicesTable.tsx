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
    label: "You get",
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
 * price, time, what it is and what you get, in a grid of fine borders, with the row labels in the mono
 * and the buttons along the bottom. On phones each offer becomes its own block.
 */
export function ServicesTable() {
  const [picked, setPicked] = useState(1);
  const tint = (i: number) => (picked === i ? "bg-accent text-white [&_.text-accent]:text-white [&_.text-muted]:text-white/75" : "bg-paper");
  const Tab = ({ o, i }: { o: Offer; i: number }) => (
    <button
      type="button"
      aria-pressed={picked === i}
      onClick={() => setPicked(i)}
      className={`serif text-[clamp(20px,1.6vw,24px)] tracking-[-0.03em] relative z-1 -mb-px cursor-pointer rounded-t-[10px] border border-b-0 px-5 pt-3 pb-2.5 leading-none transition-colors ${picked === i ? "border-accent bg-accent text-white" : "border-line bg-paper hover:text-accent"}`}
    >
      {o.name}
    </button>
  );
  const ButtonFor = ({ o, i }: { o: Offer; i: number }) => (
    <Button href={site.bookingUrl} interest={o.interest} accent={picked !== i} light={picked === i}>{o.button}</Button>
  );

  return (
    <section id="services" className={section}>
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{offers.eyebrow}</Eyebrow>
          <h2 className={sectionHeading}>{offers.offersHeading}</h2>
        </Reveal>

        {/* Phones: each offer as its own block */}
        <div className="mt-10 space-y-8 md:hidden">
          {offers.items.map((o, i) => (
            <div key={o.name} className="flex flex-col">
              <span className="self-start"><Tab o={o} i={i} /></span>
              <div className={`divide-y divide-line rounded-[10px] rounded-tl-none border border-line transition-colors ${tint(i)}`}>
                {rows.map((r) => (
                  <div key={r.label} className="px-5 py-4">
                    <p className="mono mb-2 text-muted">{r.label}</p>
                    {r.cell(o)}
                  </div>
                ))}
                <div className="px-5 py-5"><ButtonFor o={o} i={i} /></div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: the table, a label column and one column per offer */}
        <Reveal className="mt-14 hidden md:block">
          <div className="grid grid-cols-[11.5rem_repeat(3,minmax(0,1fr))]">
            {/* The tabs, over their columns */}
            <span />
            {offers.items.map((o, i) => <span key={o.name} className="flex items-end"><Tab o={o} i={i} /></span>)}
          </div>
          <div className="grid grid-cols-[11.5rem_repeat(3,minmax(0,1fr))] overflow-hidden rounded-[10px] border border-line">
            {rows.map((r) => (
              <div key={r.label} className="contents">
                <p className="mono border-b border-line px-5 py-5 text-muted lg:px-6">{r.label}</p>
                {offers.items.map((o, i) => (
                  <div key={o.name} className={`border-b border-l border-line px-5 py-5 transition-colors lg:px-6 ${tint(i)}`}>{r.cell(o)}</div>
                ))}
              </div>
            ))}
            {/* The buttons along the bottom */}
            <span />
            {offers.items.map((o, i) => (
              <div key={o.name} className={`border-l border-line px-5 py-6 transition-colors lg:px-6 ${tint(i)}`}><ButtonFor o={o} i={i} /></div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
