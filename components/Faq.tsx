"use client";

import { useId, useState } from "react";

/**
 * Accordion that slides each answer open and closed. Several can be open at
 * once, like the native <details> it replaces; the first starts open.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const id = useId();

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    // A ruled card: one border around the list and a rule between questions; the open one
    // takes the paper tint.
    <div className="border border-line">
      {items.map((f, i) => {
        const isOpen = open.has(i);
        const buttonId = `${id}-q${i}`;
        const panelId = `${id}-a${i}`;
        return (
          <div key={f.q} className={`border-line transition-colors duration-500 not-first:border-t ${isOpen ? "bg-sheet" : ""}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group/q flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-[18px] text-left text-base font-medium lg:px-6 lg:py-5 lg:text-lg"
              >
                {f.q}
                {/* Thin plus that turns to a cross when open. Rotated 45° the arms run diagonally and look
                    shorter, so the cross scales up a little to read the same size as the plus (a diagonal
                    looks bigger, so a touch under √2). The stroke stays 1px. */}
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  className={`size-5 shrink-0 transition-[rotate,scale] duration-500 lg:size-6 ${isOpen ? "rotate-45 scale-[1.2]" : ""}`}
                >
                  <path d="M12 4v16M4 12h16" vectorEffect="non-scaling-stroke" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p
                  className={`max-w-xl pr-16 pb-6 pl-4 text-ink/80 transition-[opacity,translate] duration-500 lg:pl-6 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
