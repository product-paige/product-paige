"use client";

import { models, site } from "@/content";
import { useState, type ReactNode } from "react";
import { Button, Container, ScribbleBullet, section, sectionHeading } from "./ui";

type Model = (typeof models.items)[number];

/**
 * Ways to work together as a table, like the Who I work with table: one column per way of working
 * with its tag as a folder tab on top, and rows for what it is, the price and what's included,
 * in a full grid of fine borders. Clicking a tab picks that option: its tab and column take the
 * same pale red tint (the featured one to start). On phones each option becomes its own stacked
 * block with the same rows.
 */
export function PricingTable() {
  const rows: [string, (m: Model) => ReactNode][] = [
    [
      "What it is",
      (m) => (
        <>
          <span className="serif block text-[clamp(20px,1.6vw,24px)] leading-[1.15] tracking-[-0.03em]">{m.title}</span>
          <span className="mt-2 block">{m.body}</span>
        </>
      ),
    ],
    [
      "Starting at",
      (m) => (
        <span className="flex items-baseline gap-1.5">
          <span className={`serif text-[28px] leading-none ${models.pricePlaceholder ? "opacity-40" : ""}`}>{m.price}</span>
          <span className="text-muted">{models.currency} {m.per}</span>
        </span>
      ),
    ],
    [
      "Includes",
      (m) => (
        <ul className="space-y-2">
          {m.points.map((p, i) => (
            <li key={p} className="flex items-start gap-2.5 text-[15px]">
              <ScribbleBullet variant={i} className="mt-0.5 text-accent" />
              {p}
            </li>
          ))}
        </ul>
      ),
    ],
  ];
  // The picked option: its tab and its whole column take the same pale red tint. Starts on the featured one.
  const [picked, setPicked] = useState(Math.max(0, models.items.findIndex((m) => m.featured)));
  const pickedBg = "bg-[color-mix(in_srgb,var(--color-accent)_7%,var(--color-paper))]";
  const tint = (i: number) => (picked === i ? pickedBg : "");
  const Tab = ({ m, i }: { m: Model; i: number }) => (
    <button
      type="button"
      aria-pressed={picked === i}
      onClick={() => setPicked(i)}
      className={`mono -mb-px inline-flex cursor-pointer items-center gap-2.5 rounded-t-ui border border-b-0 border-line px-4 pt-2.5 pb-2 text-[13px] font-normal transition-colors ${picked === i ? pickedBg : "bg-sheet hover:bg-paper"}`}
    >
      <i aria-hidden className="size-2.5 rounded-full bg-accent" />{m.tag}
    </button>
  );

  return (
    <section id="pricing" className={section}>
      <Container>
        <h2 className={sectionHeading}>{models.heading}</h2>

        {/* Phones: each option as its own block, stacked, so all three are visible */}
        <div className="mt-8 space-y-8 md:hidden">
          {models.items.map((m, i) => (
            <div key={m.tag}>
              <Tab m={m} i={i} />
              <div className={`divide-y divide-line border border-line transition-colors ${tint(i)}`}>
                {rows.map(([label, cell]) => (
                  <div key={label} className="px-5 py-4">
                    <p className="mono mb-2 text-[12px] text-muted">{label}</p>
                    {cell(m)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tablet and up: the full table */}
        <div className="mt-8 hidden md:block lg:mt-10">
          <table className="w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-[14%]" />
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
                  <th className={`mono border-b border-l border-line px-4 py-5 text-[12px] font-normal text-muted ${r === 0 ? "border-t" : ""}`}>{label}</th>
                  {models.items.map((m, i) => (
                    <td key={m.tag} className={`border-r border-b border-line px-5 py-5 text-[16px] transition-colors first-of-type:border-l ${r === 0 ? "border-t" : ""} ${tint(i)}`}>{cell(m)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-center lg:mt-10">
          <Button href={site.bookingUrl} accent>Start a project</Button>
        </div>
      </Container>
    </section>
  );
}
