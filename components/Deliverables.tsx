"use client";

import { offers } from "@/content";
import { useId, useState } from "react";
import { Tip } from "./Tip";
import { ScribbleBullet } from "./ui";

/** Example deliverables in an offer card, behind a small toggle that slides the list open and closed. */
export function Deliverables({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mt-10 border-t border-current/15 pt-5">
      <div className="flex items-center justify-between gap-3">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="mono inline-flex cursor-pointer items-center gap-2">
          {offers.deliverablesLabel}
          <svg aria-hidden viewBox="0 0 20 20" className={`size-4 transition-transform duration-500 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
        </button>
        <Tip text={offers.deliverablesTip} label="About example deliverables" />
      </div>
      <div id={id} inert={!open} className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <ul className={`space-y-2.5 pt-4 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
            {items.map((d, i) => (
              <li key={d} className="flex items-start gap-2.5 text-[15px] leading-snug"><ScribbleBullet variant={i} className="mt-px text-accent" />{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
