"use client";

import { Fragment, useEffect, useState } from "react";

/**
 * Top menu, with a rule between items and after the last, running the full height of the header.
 * Every item has 20px either side, so the gap between each label and the rules beside it (and
 * the left rail) is the same. An accent underline sweeps in under the item
 * whose section is currently in the middle of the screen, and under any item on hover, when its
 * cell also fills with the paper tint between its rules. It sits below the label, so
 * labels never shift.
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
    <nav aria-label="Sections" className="hidden self-stretch xl:flex">
      {items.map((n, i) => {
        const isActive = active === n.href;
        return (
          <Fragment key={n.href}>
          {i > 0 && <span aria-hidden className="w-px bg-grid" />}
          <a
            // Rooted, so the menu also works from the project pages.
            href={`/${n.href}`}
            aria-current={isActive ? "location" : undefined}
            className="group flex items-center px-5 text-[16px] font-medium transition-colors duration-300 hover:bg-sheet"
          >
            <span className="relative">
              <i
                aria-hidden
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 group-hover:scale-x-100 ${isActive ? "scale-x-100" : "scale-x-0"}`}
              />
              {n.label}
            </span>
          </a>
          </Fragment>
        );
      })}
      <span aria-hidden className="w-px bg-grid" />
    </nav>
  );
}
