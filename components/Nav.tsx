"use client";

import { useEffect, useState } from "react";

/**
 * Top menu. A small dot, in each item's own colour, marks the section currently
 * in the middle of the screen. It hangs just left of the label, so labels never shift.
 */
export function Nav({ items }: { items: { label: string; href: string; dot: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => el !== null);

    // A thin band across the middle of the screen: the section crossing it is active.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));

    // Above the first menu section (in the hero), nothing is active.
    const onScroll = () => {
      const first = sections[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="Sections" className="hidden gap-8 lg:flex">
      {items.map((n) => {
        const isActive = active === n.href;
        return (
          <a
            key={n.href}
            href={n.href}
            aria-current={isActive ? "location" : undefined}
            className="relative text-[15px] font-medium transition hover:text-muted"
          >
            <i
              aria-hidden
              className={`absolute top-1/2 -left-3.5 -mt-1 size-2 rounded-full transition duration-500 ${isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
              style={{ background: n.dot }}
            />
            {n.label}
          </a>
        );
      })}
    </nav>
  );
}
