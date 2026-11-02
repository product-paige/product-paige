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
 * A hand-drawn bullet: a quick pen circle that doesn't quite close, overshooting into a second
 * loop, with a little scribbled fill. Three shapes (`variant`), so a list of them doesn't look
 * stamped.
 */
const scribbles = [
  { ring: "M12.6 4.2c-4.3-.6-8.1 2.3-8.4 6.2-.3 3.7 2.8 6.9 6.9 7 4.2.1 7.4-2.8 7.4-6.6 0-3.4-2.6-6-6.3-6.4-2.6-.2-4.8.9-5.9 2.6", fill: "M8.4 9.6l5.6-2.2M7.8 12.4l7.4-3.1M9 14.6l5.8-2.6" },
  { ring: "M11 4.6c-3.9.3-6.9 3.2-6.6 6.9.3 3.5 3.5 6 7.3 5.7 3.9-.3 6.6-3.3 6.3-6.8-.3-3.2-3.1-5.6-6.6-5.4-2.1.1-3.9 1.2-4.8 2.8", fill: "M8.6 10.8l6.4-3M8.2 13.6l7.2-3.4M10.4 15.4l4.2-2" },
  { ring: "M13.4 4.8c-4.6-1.1-8.9 1.6-9.3 5.6-.4 3.8 2.6 7 6.9 7.2 4.4.2 7.6-2.6 7.6-6.4.1-3.6-2.9-6.3-6.8-6.4-2.4 0-4.4 1.1-5.4 2.9", fill: "M8 10.4l6.2-2.6M8.6 13.2l6.6-2.9M9.8 15.2l4.6-2.1" },
];
export function ScribbleBullet({ variant = 0, className = "" }: { variant?: number; className?: string }) {
  const { ring, fill } = scribbles[variant % scribbles.length];
  return (
    <svg aria-hidden viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={`size-[18px] shrink-0 overflow-visible ${className}`}>
      <path d={ring} strokeWidth={1.8} />
      <path d={fill} strokeWidth={1.3} opacity={0.7} />
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
