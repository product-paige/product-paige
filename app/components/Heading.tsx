import type { ReactNode } from "react";

const H1_CLASS =
  "text-display font-display text-ink";
const H2_CLASS =
  "text-section font-display text-ink";
const H3_CLASS =
  "text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-ink";
const CARD_TITLE_CLASS =
  "text-xl font-display leading-[1.1] text-ink";

type HeadingProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/** Display h1 — page heros. */
export function H1({ children, className = "", style }: HeadingProps) {
  return (
    <h1 className={`${H1_CLASS} ${className}`.trim()} style={style}>
      {children}
    </h1>
  );
}

/** Display h2 — section headings. */
export function H2({ children, className = "", style }: HeadingProps) {
  return (
    <h2 className={`${H2_CLASS} ${className}`.trim()} style={style}>
      {children}
    </h2>
  );
}

/** Display h3 — sub-section headings. */
export function H3({ children, className = "", style }: HeadingProps) {
  return (
    <h3 className={`${H3_CLASS} ${className}`.trim()} style={style}>
      {children}
    </h3>
  );
}

/** Card-scale display heading — smaller than H3, still display font. */
export function CardTitle({ children, className = "", style }: HeadingProps) {
  return (
    <h3 className={`${CARD_TITLE_CLASS} ${className}`.trim()} style={style}>
      {children}
    </h3>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /**
   * Render mode. "grid" = title left, lead right (used on most homepage
   * sections). "stacked" = title above lead in a column.
   */
  layout?: "grid" | "stacked";
  titleMaxW?: string;
  leadMaxW?: string;
  className?: string;
};

/**
 * The eyebrow + h2 + optional-lead pattern used on every homepage section.
 * Consolidates the ~10 near-identical blocks that previously composed this
 * inline.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  layout = "stacked",
  titleMaxW,
  leadMaxW,
  className = "",
}: SectionHeaderProps) {
  const titleEl = (
    <H2 style={titleMaxW ? { maxWidth: titleMaxW } : undefined}>{title}</H2>
  );
  const leadEl = lead ? (
    <p
      className="text-lg leading-[1.4] opacity-80"
      style={leadMaxW ? { maxWidth: leadMaxW } : undefined}
    >
      {lead}
    </p>
  ) : null;

  if (layout === "grid" && leadEl) {
    return (
      <div className={`flex flex-col gap-6 ${className}`.trim()}>
        {eyebrow ? <span className="type-eyebrow">{eyebrow}</span> : null}
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          {titleEl}
          {leadEl}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`.trim()}>
      {eyebrow ? <span className="type-eyebrow">{eyebrow}</span> : null}
      <div className="flex flex-col gap-3">
        {titleEl}
        {leadEl}
      </div>
    </div>
  );
}
