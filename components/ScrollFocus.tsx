"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Marks whichever of its direct children is crossing the middle of the screen with
 * data-active, so they can light up one at a time as you scroll (styled by the children).
 * The first child starts active. Without JS, nothing is marked and the children style as active.
 */
export function ScrollFocus({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const items = [...root.children] as HTMLElement[];
    const activate = (el: HTMLElement) => items.forEach((x) => x.toggleAttribute("data-active", x === el));
    root.setAttribute("data-focus", "");
    activate(items[0]);
    // A thin band across the middle of the screen: the child in it is the active one.
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && activate(e.target as HTMLElement)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
