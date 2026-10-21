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
    <div className="border-b border-line">
      {items.map((f, i) => {
        const isOpen = open.has(i);
        const buttonId = `${id}-q${i}`;
        const panelId = `${id}-a${i}`;
        return (
          <div key={f.q} className="border-t border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-[18px] text-left text-base lg:py-5 lg:text-lg"
              >
                {f.q}
                {/* Thin plus, same stroke as the arrows; turns into a cross when open. */}
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  className={`size-6 shrink-0 transition-transform duration-500 lg:size-7 ${isOpen ? "rotate-45" : ""}`}
                >
                  <path d="M12 3v18M3 12h18" />
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
                  className={`max-w-xl pr-12 pb-5 text-ink/80 transition-[opacity,translate] duration-500 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
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
