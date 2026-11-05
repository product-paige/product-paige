"use client";

import { models, site } from "@/content";
import { useState, type ReactNode } from "react";
import { Button, Container, Eyebrow, ScribbleBullet, section, sectionHeading } from "./ui";

type Model = (typeof models.items)[number];

/**
 * Ways to work together as a table (the alternative to WaysToWork's cards): one column per way of working
 * with its tag as a folder tab on top, and rows for what it is, the price and what's included,
 * in a full grid of fine borders. Clicking a tab picks that option: its tab and column take the
 * same grey (the featured one to start). On phones each option becomes its own stacked
 * block with the same rows.
 */
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
      "Includes",
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
  const pickedBg = "bg-scrap";
  const tint = (i: number) => (picked === i ? pickedBg : "bg-paper");
  const Tab = ({ m, i }: { m: Model; i: number }) => (
    <button
      type="button"
      aria-pressed={picked === i}
      onClick={() => setPicked(i)}
      className={`mono -mb-px inline-flex w-44 cursor-pointer whitespace-nowrap items-center gap-2.5 rounded-t-ui border border-b-0 border-line px-4 pt-2.5 pb-2 font-normal transition-colors ${picked === i ? `${pickedBg} text-ink` : "bg-paper text-ink hover:bg-sheet"}`}
    >
      <i aria-hidden className="size-2.5 rounded-full bg-accent" />{m.tag}
    </button>
  );

  return (
    <section id="pricing-table" className={section}>
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
                  <div key={label} className="px-5 py-6">
                    <p className="mono mb-3">{label}</p>
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
                  <th className={`mono border-b border-l border-line bg-paper px-5 py-7 font-normal text-ink lg:py-8 ${r === 0 ? "border-t" : ""}`}>{label}</th>
                  {models.items.map((m, i) => (
                    <td key={m.tag} className={`border-r border-b border-line px-6 py-7 text-[16px] transition-colors lg:px-8 lg:py-8 first-of-type:border-l ${r === 0 ? "border-t" : ""} ${tint(i)}`}>{cell(m)}</td>
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
