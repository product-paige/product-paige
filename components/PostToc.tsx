"use client";

import { useEffect, useState } from "react";

/**
 * A post's contents: its section headings as links, pinned beside the body on desktop. The
 * heading you're reading (the last one to pass the top third of the screen) is marked in red.
 */
export function PostToc({ label, items }: { label: string; items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight / 3;
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={label}>
      <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />{label}</p>
      <ol className="mt-6 space-y-3">
        {items.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={`block text-[15px] leading-snug transition-colors hover:text-accent ${active === h.id ? "text-accent" : "text-muted"}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
