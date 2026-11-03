"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The sticky header, which slides up out of view as you scroll down the page and slides back
 * as soon as you scroll up. Always shown near the top, and while it has keyboard focus.
 */
export function SlideHeader({ className = "", children }: { className?: string; children: ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Ignore tiny moves, so a resting trackpad doesn't flicker it
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onFocus={() => setHidden(false)}
      className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${hidden ? "-translate-y-full" : "translate-y-0"} ${className}`}
    >
      {children}
    </header>
  );
}
