"use client";

import { useId } from "react";

/**
 * A small (i) that shows `text` in a dark bubble on hover or focus. `light` draws the (i) for a
 * coloured background.
 */
export function Tip({ text, label = "More detail" }: { text: string; label?: string }) {
  const id = useId();
  return (
    <span className="group relative inline-flex align-middle">
      <button type="button" aria-label={label} aria-describedby={id} className="grid size-4 -translate-y-px cursor-help place-items-center rounded-full border-[1.5px] border-current font-sans text-[10px] leading-none font-bold opacity-90 transition-opacity hover:opacity-100 focus-visible:opacity-100">
        i
      </button>
      <span id={id} role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-ui bg-dark px-3 py-2.5 font-sans text-[13px] leading-snug tracking-normal normal-case text-white opacity-0 shadow-[0_8px_20px_rgb(0_0_0/0.18)] transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
        {text}
      </span>
    </span>
  );
}
