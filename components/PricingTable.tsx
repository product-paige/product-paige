"use client";

import { models, site } from "@/content";
import { useId, useState, type ReactNode } from "react";
import { Button, Container, Eyebrow, ScribbleBullet, section, sectionHeading } from "./ui";

type Model = (typeof models.items)[number];

/**
 * Ways to work together as a table: one column per way of working
 * with its tag as a folder tab on top, and rows for what it is, the price and what's included,
 * in a full grid of fine borders. The picked option's tab is the bright blue. Clicking a tab picks that option: its tab and column turn the
 * bright blue (the featured one to start). On phones each option becomes its own stacked
 * block with the same rows.
 */
/** A row's label; the deliverables row gets an (i) whose tip says they're examples, on hover or focus. */
function RowLabel({ label }: { label: string }) {
  const tipId = useId();
  if (label !== models.deliverables.label) return <>{label}</>;
  const words = label.split(" ");
  const last = words.pop();
  const first = words.join(" ");
  // Inline, so the (i) sits right after the last word even when the label wraps
  return (
    <span className="group relative">
      {first}{" "}
      {/* The last word and the (i) kept together, centred on each other */}
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        {last}
        <button type="button" aria-label="About deliverables" aria-describedby={tipId} className="grid size-4 -translate-y-px cursor-help place-items-center rounded-full border border-current text-[9px] leading-none opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100">
          i
        </button>
      </span>
      <span id={tipId} role="tooltip" className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-60 rounded-ui bg-dark px-3 py-2.5 font-sans text-[13px] leading-snug tracking-normal normal-case text-white opacity-0 shadow-[0_8px_20px_rgb(0_0_0/0.18)] transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
        {models.deliverables.tip}
      </span>
    </span>
  );
}

export function PricingTable() {
  const rows: [string, (m: Model) => ReactNode][] = [
    [
      "What it is",
      (m) => (
        <>
          <span className="serif block text-[clamp(22px,2vw,28px)] leading-[1.1] tracking-[-0.03em]">{m.title}</span>
          <span className="mt-3 block max-w-[34ch]">{m.body}</span>
        </>
      ),
    ],
    [
      "Starting at",
      (m) => (
        // Small and quiet, in the mono: the price, then the currency and unit in grey
        <span className={`mono flex flex-wrap items-baseline gap-x-2 ${models.pricePlaceholder ? "opacity-40" : ""}`}>
          {m.price}
          <span className="text-muted">{models.currency} {m.per}</span>
        </span>
      ),
    ],
    ["Timeline", (m) => <span className="text-[15px]">{m.timeline}</span>],
    [
      models.deliverables.label,
      (m) => (
        <ul className="space-y-3">
          {m.points.map((p, i) => (
            <li key={p} className="flex items-start gap-3 text-[15px] leading-snug">
              <ScribbleBullet variant={i} className="mt-px text-accent" />
              {p}
            </li>
          ))}
        </ul>
      ),
    ],
  ];
  // The picked option: its tab and its whole column take the same grey (the site's grey paper); other tabs are paper. Starts on the featured one.
  const [picked, setPicked] = useState(Math.max(0, models.items.findIndex((m) => "featured" in m)));
  // The picked column turns the bright blue, its text white, and its grey and blue details white too
  const tint = (i: number) => (picked === i ? "border-white/20 bg-accent text-white [&_.text-accent]:text-white [&_.text-muted]:text-white/70" : "bg-paper");
  const Tab = ({ m, i }: { m: Model; i: number }) => (
    <button
      type="button"
      aria-pressed={picked === i}
      onClick={() => setPicked(i)}
      className={`mono -mb-px inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-t-ui border border-b-0 border-line px-4 pt-2.5 pb-2 font-normal transition-colors ${picked === i ? "border-accent bg-accent text-white" : "bg-paper text-ink hover:bg-sheet"}`}
    >
      <i aria-hidden className={`size-2.5 shrink-0 rounded-full ${picked === i ? "bg-white" : "bg-accent"}`} />{m.tag}
    </button>
  );

  return (
    <section id="pricing" className={section}>
      <Container>
        <div className="mb-12 lg:mb-16">
          <Eyebrow>{models.eyebrow}</Eyebrow>
          <h2 className={sectionHeading}>{models.heading}</h2>
        </div>
        <div>
        {/* Phones: each option as its own block, stacked, so all three are visible */}
        <div className="relative space-y-8 md:hidden">
          {models.items.map((m, i) => (
            <div key={m.tag}>
              <Tab m={m} i={i} />
              <div className={`divide-y divide-line border border-line transition-colors ${tint(i)}`}>
                {rows.map(([label, cell]) => (
                  <div key={label} className="px-5 py-5">
                    <p className="mono mb-3"><RowLabel label={label} /></p>
                    {cell(m)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tablet and up: the full table */}
        <div className="relative hidden md:block">
          <table className="w-full table-fixed border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-[16%]" />
                {models.items.map((m, i) => (
                  <th key={m.tag} className="pl-0 align-bottom">
                    <Tab m={m} i={i} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, cell], r) => (
                <tr key={label} className="align-top">
                  <th className={`mono border-b border-l border-line bg-paper px-5 py-5 font-normal text-ink lg:py-6 ${r === 0 ? "border-t" : ""}`}><RowLabel label={label} /></th>
                  {models.items.map((m, i) => (
                    <td key={m.tag} className={`border-r border-b border-line px-5 py-5 text-[16px] transition-colors lg:px-6 lg:py-6 first-of-type:border-l ${r === 0 ? "border-t" : ""} ${tint(i)}`}>{cell(m)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        {/* What the prices mean, beside the button */}
        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between lg:mt-10">
          <p className="max-w-lg text-[15px] text-muted">{models.note}</p>
          <Button href={site.bookingUrl} accent>Let’s talk</Button>
        </div>
      </Container>
    </section>
  );
}
