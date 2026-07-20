import type { ReactNode } from "react";
import { PixelIcon, type PixelIconName } from "./PixelIcon";

type IconCardProps = {
  /** Card title. Renders in the body-font h3 at text-xl. */
  name: string;
  /** Short description below the title. Rendered as HTML so &rsquo; etc.
   *  work. Keep to ~120 chars for the card to feel balanced. */
  blurb: string;
  /** PixelIcon name shown in the ink icon box at the top-left. */
  icon: PixelIconName;
  /** Optional link target. When set, the card renders as an <a> with hover
   *  affordance. When omitted, renders as a plain <article> (no hover). */
  href?: string;
  /** Optional foreground element in the bottom-right (e.g. a "Coming soon"
   *  chip). Sits below the title/blurb column, aligned right. Not used
   *  yet, but here for future variants. */
  trailing?: ReactNode;
  /** Tone class — defaults to card-blue-light. */
  tone?: string;
  /** Additional class names for one-off overrides. Rare. */
  className?: string;
};

/**
 * The standard icon card used across homepage Categories, Ask Paige use
 * cases, services Overview, and project Problem/Approach/Outcome. Fills
 * the grid column width with an aspect-[4/3] proportion. Icon box top-left,
 * title + blurb bottom.
 *
 * Aspect + max-h keep cards from stretching tall on wide viewports; the
 * inner flex handles vertical distribution the same way whether the grid
 * gives 3, 4, or 6 columns.
 */
export function IconCard({
  name,
  blurb,
  icon,
  href,
  trailing,
  tone = "card-blue-light",
  className = "",
}: IconCardProps) {
  const shared = `card ${tone} flex flex-col justify-between aspect-[4/3] !min-h-0 max-h-[280px] ${className}`.trim();

  const body = (
    <>
      <div className="w-14 h-14 flex items-center justify-center shrink-0 !rounded-[4px] bg-[#1A191E] text-white">
        <PixelIcon name={icon} color="#ffffff" size={24} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl">{name}</h3>
        <p
          className="text-base leading-[1.4] opacity-80"
          dangerouslySetInnerHTML={{ __html: blurb }}
        />
        {trailing ? <div className="mt-2">{trailing}</div> : null}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${shared} group`}>
        {body}
      </a>
    );
  }
  return <article className={shared}>{body}</article>;
}
