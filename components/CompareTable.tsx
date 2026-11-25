"use client";

import { offers } from "@/content";
import { useState } from "react";

/**
 * The offers side by side, styled like the old Ways to work together table: each offer's name as a
 * folder tab on top, rows for price, timeline, best for and what you get in a full grid of fine
 * borders, the row labels in the mono. Clicking a tab picks that offer: its tab and column turn the
 * bright blue (Project to start). On phones each offer becomes its own stacked block.
 */
export function CompareTable() {
  const [picked, setPicked] = useState(offers.featured);
  const tint = (i: number) => (picked === i ? "border-white/20 bg-accent text-white" : "bg-paper");
  const Tab = ({ name, i }: { name: string; i: number }) => (
    <button
      type="button"
      aria-pressed={picked === i}
      onClick={() => setPicked(i)}
      className={`group/tab mono -mb-px inline-flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-t-ui border border-b-0 border-line px-4 pt-2.5 pb-2 font-normal transition-colors ${picked === i ? "border-accent bg-accent text-white" : "bg-paper text-ink hover:border-accent hover:bg-accent hover:text-white"}`}
    >
      <i aria-hidden className={`size-2.5 shrink-0 rounded-full ${picked === i ? "bg-white" : "bg-accent group-hover/tab:bg-white"}`} />{name}
    </button>
  );

  return (
    <div>
      {/* Phones: each offer as its own block, stacked */}
      <div className="space-y-8 md:hidden">
        {offers.items.map((o, i) => (
          <div key={o.name}>
            <Tab name={o.name} i={i} />
            <div className={`divide-y divide-line border border-line transition-colors ${tint(i)}`}>
              {offers.table.map(([label, ...cells]) => (
                <div key={label} className="px-5 py-4">
                  <p className="mono mb-2">{label}</p>
                  <p className="text-[15px]">{cells[i]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and up: the full table */}
      <table className="hidden w-full table-fixed border-separate border-spacing-0 text-left md:table">
        <thead>
          <tr>
            <th className="w-[16%]" />
            {offers.items.map((o, i) => (
              <th key={o.name} className="pl-0 align-bottom font-normal"><Tab name={o.name} i={i} /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {offers.table.map(([label, ...cells], r) => (
            <tr key={label} className="align-top">
              <th scope="row" className={`mono border-b border-l border-line bg-paper px-5 py-5 font-normal text-ink lg:py-6 ${r === 0 ? "border-t" : ""}`}>{label}</th>
              {cells.map((c, i) => (
                <td key={i} className={`border-r border-b border-line px-5 py-5 text-[16px] transition-colors lg:px-6 lg:py-6 first-of-type:border-l ${r === 0 ? "border-t" : ""} ${tint(i)}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
