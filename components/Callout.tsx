import type { ReactNode } from "react";
import { Asterisk } from "./EditorialHero";
import { SelectionHandles, selectionBlue } from "./ui";

/**
 * A callout drawn selected, like the hero's "design": a pale blue box with the blue selection border
 * and corner handles, the blue asterisk, and a mono label in front of the text. Capped in width.
 */
export function Callout({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <p className={`relative flex max-w-md items-start gap-3 px-4 py-3 text-[15px] leading-relaxed ${className}`} style={{ background: `color-mix(in srgb, ${selectionBlue} 8%, transparent)` }}>
      <SelectionHandles className="inset-0" />
      <Asterisk className="live-star mt-1 size-4 shrink-0 text-accent" />
      <span><span className="mono mr-2 text-accent">{label}</span>{children}</span>
    </p>
  );
}
