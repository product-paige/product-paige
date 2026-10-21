"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll effect for the approach timeline. Drop it inside the <ol>: a dark
 * line grows down the grey track as you scroll, and each step stays dimmed
 * (data-pending) until the line reaches its dot. Without JS the track stays
 * grey and every dot shows in full; with reduced motion the line is drawn in full.
 */
export function TimelineProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fill = ref.current;
    const list = fill?.parentElement;
    if (!fill || !list) return;
    const steps = [...list.querySelectorAll<HTMLElement>(":scope > li")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transform = "none";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = list.getBoundingClientRect();
      // The line's tip follows a point 60% of the way down the screen.
      const tip = window.innerHeight * 0.6 - box.top;
      const length = fill.offsetHeight;
      fill.style.transform = `scaleY(${Math.min(Math.max(tip / length, 0), 1)})`;
      for (const step of steps) {
        const dot = step.querySelector<HTMLElement>("[data-dot]");
        const dotY = dot ? dot.getBoundingClientRect().top + dot.offsetHeight / 2 - box.top : 0;
        step.toggleAttribute("data-pending", tip < dotY);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="absolute top-2 bottom-2 left-[9px] w-px origin-top bg-ink"
      style={{ transform: "scaleY(0)" }}
    />
  );
}
