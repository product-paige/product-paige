"use client";

import { offers } from "@/content";
import { useState, type ReactNode } from "react";
import { Tip } from "./Tip";
import { ScribbleBullet } from "./ui";

/** A cell: plain text, or a list with the scribble bullets. */
function Cell({ value }: { value: string | string[] }): ReactNode {
  if (typeof value === "string") return value;
  return (
    <ul className="space-y-2.5">
      {value.map((v, i) => (
        <li key={v} className="flex items-start gap-2.5 text-[15px] leading-snug"><ScribbleBullet variant={i} className="mt-px text-accent" />{v}</li>
      ))}
    </ul>
  );
}

/** A row label, with its tip when it has one. */
function Label({ text }: { text: string }) {
  const tip = offers.tableTips[text];
  if (!tip) return <>{text}</>;
  // The last word and the (i) kept together, so the (i) sits right after it even when the label wraps
  const words = text.split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")}{" "}
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">{last}<Tip text={tip} label={`About ${text.toLowerCase()}`} /></span>
    </>
  );
}

/**
 * The offers side by side, styled like the old Ways to work together table: each offer's name as a
 * folder tab on top, rows for price, timeline, best for, what you get and example deliverables in a full grid of fine
 * borders, the row labels in the mono. Clicking a tab picks that offer: its tab and column turn the
 * bright blue (Project to start). On phones each offer becomes its own stacked block. It starts closed,
 * under a "Compare services" link that slides it open.
 */
export function CompareTable() {
  const [picked, setPicked] = useState(offers.featured);
  // Closed to start; the "Compare services" link opens it
  const [open, setOpen] = useState(false);
  // The picked column turns the bright blue, with its bullets white
  const tint = (i: number) => (picked === i ? "border-white/20 bg-accent text-white [&_.text-accent]:text-white" : "bg-paper");
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
      {/* The link that opens and closes the table */}
      <div className="flex justify-center">
        <button type="button" aria-expanded={open} aria-controls="compare-table" onClick={() => setOpen(!open)} className="link inline-flex cursor-pointer items-center gap-2">
          {offers.compareLabel}
          <svg aria-hidden viewBox="0 0 20 20" className={`size-4 transition-transform duration-500 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
        </button>
      </div>
      {/* The table, sliding open and closed (grid rows 0fr to 1fr) */}
      <div id="compare-table" inert={!open} className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
      <div className="overflow-hidden">
      <div className={`pt-10 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
      {/* Phones: each offer as its own block, stacked */}
      <div className="space-y-8 md:hidden">
        {offers.items.map((o, i) => (
          <div key={o.name}>
            <Tab name={o.name} i={i} />
            <div className={`divide-y divide-line border border-line transition-colors ${tint(i)}`}>
              {offers.table.map(([label, ...cells]) => (
                <div key={label} className="px-5 py-4">
                  <p className="mono mb-2"><Label text={label as string} /></p>
                  <div className="text-[15px]"><Cell value={cells[i]} /></div>
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
              <th scope="row" className={`mono border-b border-l border-line bg-paper px-5 py-5 font-normal text-ink lg:py-6 ${r === 0 ? "border-t" : ""}`}><Label text={label as string} /></th>
              {cells.map((c, i) => (
                <td key={i} className={`border-r border-b border-line px-5 py-5 text-[16px] transition-colors lg:px-6 lg:py-6 first-of-type:border-l ${r === 0 ? "border-t" : ""} ${tint(i)}`}><Cell value={c} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      </div>
    </div>
  );
}
