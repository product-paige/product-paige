"use client";

import { useId, useState } from "react";

/**
 * Accordion that slides each answer open and closed. One answer at a time: opening a
 * question closes the one before it. The first starts open.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  function toggle(i: number) {
    setOpen((prev) => (prev === i ? null : i));
  }

  return (
    // Each question is its own bordered card, with a small gap between them; the open one
    // takes the paper tint.
    <div className="space-y-2 lg:space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        const buttonId = `${id}-q${i}`;
        const panelId = `${id}-a${i}`;
        return (
          <div key={f.q} className={`border border-line transition-colors duration-500 ${isOpen ? "bg-sheet" : ""}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group/q flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left text-base font-medium lg:px-5 lg:py-4 lg:text-lg"
              >
                {f.q}
                {/* Thin plus that rotates 45° into a cross when open: the same lines
                    at the same size, just rotated. The stroke stays 1px. */}
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  className={`size-5 shrink-0 transition-[rotate] duration-500 lg:size-6 ${isOpen ? "rotate-45" : ""}`}
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
                  className={`max-w-xl pr-12 pb-5 pl-4 transition-[opacity,translate] duration-500 lg:pl-5 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
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
