import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { Art } from "@/content";
import { Reveal } from "./Reveal";

export { Reveal };

// Every section: the same padding top and bottom (32px phones, 80px desktop), so sections sit
// 64px / 160px apart, with a full-width grid line on the boundary.
export const section = "border-t border-grid py-8 lg:py-20";

// Type scale. Serif: the hero headline sized to its grid (about 106px), 56px section headings
// (About and the FAQ included), 38px headings in a side column (the case study title), 28px card and list titles, 20px facts and prices. Sans: 18px intros (.lede), 16px body, 14px small labels.
export const sectionHeading = "serif text-[clamp(32px,4.4vw,56px)] leading-[1] tracking-[-0.04em] text-balance";
// Headings in a side column beside longer content (the case study title): a step down.
export const sideHeading = "serif text-[clamp(28px,2.8vw,38px)] leading-[1.1] text-balance";
export const cardTitle = "serif text-[clamp(22px,2vw,28px)] leading-[1.1]";
// Titles in the open lists (How I can help rows, the process steps).
export const listTitle = cardTitle;
// Manrope medium: small card headings that sit with body text (blog cards, project folders).
export const sansTitle = "font-sans text-[17px] font-medium leading-snug tracking-[-0.03em] lg:text-[20px]";

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
  // Fills the page sheet; from md up the content sits a gap inside the inner rails
  // (24px + 24px md, 40px + 40px lg; see .page-rails).
  // `tight` (the header) sits just 16px inside the inner rails instead, and from xl (where the
  // menu shows) right on them, so the rails frame the menu and button.
  const pad = tight ? "md:px-10 lg:px-14 xl:px-10" : "md:px-12 lg:px-20";
  return <div className={`w-full px-4 sm:px-6 ${pad} ${className}`}>{children}</div>;
}

/**
 * The site's one button: a label chip and an arrow tab. A link when given `href`,
 * otherwise a <button> (e.g. a form submit). `light` for dark sections.
 */
export function Button({
  href,
  light = false,
  accent = false,
  arrow = "up-right",
  type = "button",
  disabled,
  children,
}: {
  href?: string;
  light?: boolean;
  /** The main call to action, in the accent red. */
  accent?: boolean;
  /** "down" for links that scroll further down the page. */
  arrow?: "up-right" | "down";
  type?: "button" | "submit";
  disabled?: boolean;
  children: ReactNode;
}) {
  const className = `group btn ${light ? "btn-light" : ""} ${accent ? "btn-accent" : ""}`;
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

/**
 * A hand-drawn tick: a scribbly pen stroke with a little loop or hook to start, an overshoot at
 * the end, and a fainter second pass slightly off the first, as if gone over twice. Three shapes
 * (`variant`), so a list of them doesn't look stamped.
 */
const scribbles = [
  "M2.2 11.2c1.3-1.4 2.9-.5 3.7.9.9 1.5 1.5 3.3 2.3 4.8.3.6 1 .6 1.3 0C11.9 11 16 5.6 22.4 2",
  "M4.1 9.6c-1.3.6-1 2.2.3 2.1 1.4-.1 2.2 2.5 3.1 4.7.3.8 1 .8 1.4 0 2.3-4.9 6.1-9.8 13.1-13.8",
  "M2.4 13.1c2-1.5 3.6.3 4.8 3.6.3.8 1.1.9 1.5.1 2.4-5.5 6.5-10.2 13-14-1 .1-1.9.6-2.8 1.3",
];
export function ScribbleCheck({ variant = 0, className = "" }: { variant?: number; className?: string }) {
  const d = scribbles[variant % scribbles.length];
  return (
    <svg aria-hidden viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={`h-[18px] w-[22px] shrink-0 overflow-visible ${className}`}>
      <path d={d} strokeWidth={2.1} />
      <path d={d} strokeWidth={1.2} opacity={0.5} transform="translate(0.9 0.7) rotate(-2 12 10)" />
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
  icon,
  className = "",
  style,
  children,
}: {
  dot?: string;
  /** A small line icon before the label, in place of a dot. */
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span className={`chip bg-chip ${className}`} style={style}>
      {dot && <i aria-hidden className="size-2 rounded-full" style={{ background: dot }} />}
      {icon}
      {children}
    </span>
  );
}

/** A collage illustration (see `art` in content.ts): decorative, so no alt text. Size it with className. */
export function Illo({ art, className = "" }: { art: Art; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={art.src} alt="" width={art.width} height={art.height} loading="lazy" decoding="async" className={`object-contain select-none ${className}`} />
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
