import { models, site } from "@/content";
import type { ReactNode } from "react";
import { Button, Container, ScribbleBullet, sectionHeading } from "./ui";

type Model = (typeof models.items)[number];

/**
 * Ways to work together as a table, like the Who I work with table: one column per way of working
 * with its tag as a folder tab on top, and rows for what it is, the price and what's included,
 * in a full grid of fine borders. The featured column is tinted. Temporary, to compare with the cards.
 */
export function PricingTable() {
  const rows: [string, (m: Model) => ReactNode][] = [
    [
      "What it is",
      (m) => (
        <>
          <span className="serif block text-[clamp(22px,2vw,28px)] leading-[1.15] tracking-[-0.03em]">{m.title}</span>
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
  const tint = (m: Model) => (m.featured ? "bg-sheet" : "");

  return (
    <section className="border-t border-grid py-8 lg:py-14">
      <Container>
        <p className="mono mb-6 inline-block rounded-full bg-ink px-3 py-1.5 text-[12px] text-white">Option · Pricing as a table</p>
        <h2 className={sectionHeading}>{models.heading}</h2>
        <div className="mt-8 overflow-x-auto lg:mt-10">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-[14%]" />
                {models.items.map((m) => (
                  <th key={m.tag} className="pl-0 align-bottom">
                    <span className={`mono -mb-px inline-flex items-center gap-2.5 rounded-t-ui border border-b-0 border-line px-4 pt-2.5 pb-2 text-[13px] font-normal ${m.featured ? "bg-ink text-white" : "bg-sheet"}`}>
                      <i aria-hidden className="size-2.5 rounded-full bg-accent" />{m.tag}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, cell], r) => (
                <tr key={label} className="align-top">
                  <th className={`mono border-b border-l border-line px-4 py-5 text-[12px] font-normal text-muted ${r === 0 ? "border-t" : ""}`}>{label}</th>
                  {models.items.map((m) => (
                    <td key={m.tag} className={`border-r border-b border-line px-5 py-5 text-[16px] first-of-type:border-l ${r === 0 ? "border-t" : ""} ${tint(m)}`}>{cell(m)}</td>
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
