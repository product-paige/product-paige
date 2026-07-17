import { Fragment, type ReactNode } from "react";

/**
 * Reusable meta strip for blog posts + project cards.
 *
 * - Pass `items` for a single row of dot-separated meta.
 * - Pass `right` to push a value (typically the date) to the far right
 *   via `justify-between` — used on the homepage blog cards.
 * - `size` picks the type scale: 'sm' (text-sm, used on nested surfaces
 *   like related-post lists) or 'base' (default, 16px).
 */
type PostMetaProps = {
  items: ReactNode[];
  right?: ReactNode;
  size?: "sm" | "base";
  className?: string;
};

export function PostMeta({
  items,
  right,
  size = "base",
  className = "",
}: PostMetaProps) {
  const sizeClass = size === "sm" ? "text-sm" : "text-base";
  const left = (
    <div className="flex flex-wrap items-center gap-1.5">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 ? <span className="dot-sep" aria-hidden="true" /> : null}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );

  if (right !== undefined) {
    return (
      <div
        className={`flex items-center justify-between gap-2 ${sizeClass} opacity-60 ${className}`}
      >
        {left}
        <span>{right}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${sizeClass} opacity-60 ${className}`}
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 ? <span className="dot-sep" aria-hidden="true" /> : null}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
