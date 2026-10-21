"use client";

import { useEffect, useState } from "react";

/**
 * Top menu. An accent underline sweeps in under the item whose section is currently
 * in the middle of the screen. It sits below the label, so labels never shift.
 */
export function Nav({ items }: { items: { label: string; href: string }[] }) {
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
            className="relative text-[15px] font-normal transition hover:text-muted"
          >
            <i
              aria-hidden
              className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0"}`}
            />
            {n.label}
          </a>
        );
      })}
    </nav>
  );
}
