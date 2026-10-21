import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Reveal } from "./Reveal";

export { Reveal };

// Every section: the same padding top and bottom (32px phones, 80px desktop), so sections sit
// 64px / 160px apart, with a full-width grid line on the boundary.
export const section = "border-t border-grid py-8 lg:py-20";

// Type scale. Serif: 72px hero headline, 56px section headings (sectionHeading and sideHeading
// are the same size; sideHeading is the name for headings in a side column), 28px card and
// list titles, 20px facts and prices. Sans: 18px intros (.lede), 16px body, 14px small labels.
export const sectionHeading = "serif text-[clamp(32px,4.1vw,56px)] leading-[1]";
export const sideHeading = sectionHeading;
export const cardTitle = "serif text-[clamp(22px,2vw,28px)] leading-[1.1]";
// Titles in the open lists (How I can help rows, the process steps).
export const listTitle = cardTitle;
// Manrope medium: small card headings that sit with body text (blog cards, project folders).
export const sansTitle = "font-sans text-[17px] font-medium leading-snug tracking-[-0.01em] lg:text-[18px]";

/**
 * Renders "*word*" as <em>word</em>, keeps hyphenated words like "fast-growing" on one line,
 * and turns "\n" into a line break (for two-line headings without a full stop).
 */
export function Rich({ text }: { text: string }) {
  const keepTogether = (part: string) =>
    part.split(/(\S+-\S+)/g).map((piece, j) =>
      piece.includes("-") && !/\s/.test(piece) ? <span key={j} className="whitespace-nowrap">{piece}</span> : piece,
    );
  const line = (l: string) =>
    l.split(/(\*[^*]+\*)/g).map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? <em key={i}>{keepTogether(part.slice(1, -1))}</em> : <Fragment key={i}>{keepTogether(part)}</Fragment>,
    );
  return (
    <>
      {text.split("\n").map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line(l)}
        </Fragment>
      ))}
    </>
  );
}

export function Container({ className = "", tight = false, children }: { className?: string; tight?: boolean; children: ReactNode }) {
  // From md up the outer edge sits 12px in from the window, exactly on the page rails, and the
  // content sits a further gap inside the inner rails (24px + 24px md, 40px + 40px lg; see .page-rails).
  // `tight` (the header) sits just 16px inside the inner rails instead.
  const pad = tight ? "md:px-10 lg:px-14" : "md:px-12 lg:px-20";
  return <div className={`mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:w-[calc(100%-24px)] ${pad} ${className}`}>{children}</div>;
}

/**
 * The site's one button: a label chip and an arrow tab. A link when given `href`,
 * otherwise a <button> (e.g. a form submit). `light` for dark sections.
 */
export function Button({
  href,
  light = false,
  arrow = "up-right",
  type = "button",
  disabled,
  children,
}: {
  href?: string;
  light?: boolean;
  /** "down" for links that scroll further down the page. */
  arrow?: "up-right" | "down";
  type?: "button" | "submit";
  disabled?: boolean;
  children: ReactNode;
}) {
  const className = `group btn ${light ? "btn-light" : ""}`;
  const inner = (
    <>
      <span className="btn-text">{children}</span>
      <span className="btn-tab">{arrow === "down" ? <ArrowDown className="size-5" /> : <ArrowUpRight turn className="size-5" />}</span>
    </>
  );
  return href ? (
    <a href={href} className={className}>{inner}</a>
  ) : (
    <button type={type} disabled={disabled} className={className}>{inner}</button>
  );
}

/**
 * Thin up-right arrow. Nudges up and right when its parent `group` is hovered,
 * or with `turn`, swings round to point right (as in buttons).
 */
export function ArrowUpRight({ className = "", turn = false }: { className?: string; turn?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 transition-transform duration-200 ${turn ? "group-hover:rotate-45" : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"} ${className}`}
    >
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

/** Thin checkmark, a touch larger and lighter than the arrows. */
export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-5 shrink-0 ${className}`}
    >
      <path d="M3 8.5l3.25 3.25L13 5" />
    </svg>
  );
}

/** Thin down arrow. Nudges down when its parent `group` is hovered. */
export function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 transition-transform duration-200 group-hover:translate-y-0.5 ${className}`}
    >
      <path d="M8 3v10M3.5 8.5L8 13l4.5-4.5" />
    </svg>
  );
}

export function Chip({
  dot,
  className = "",
  style,
  children,
}: {
  dot?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span className={`chip bg-chip ${className}`} style={style}>
      {dot && <i aria-hidden className="size-2 rounded-full" style={{ background: dot }} />}
      {children}
    </span>
  );
}

/** Section title: wide heading, with an optional short note underneath. */
export function SectionHead({ heading, body }: { heading: string; body?: string }) {
  return (
    <Reveal className="mb-8 lg:mb-16">
      <h2 className={`${sectionHeading} lg:max-w-4xl`}>
        <Rich text={heading} />
      </h2>
      {body && <p className="lede mt-5 max-w-xl">{body}</p>}
    </Reveal>
  );
}
