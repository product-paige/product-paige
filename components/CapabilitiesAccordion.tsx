import { approachPage, services } from "@/content";
import { Chip, Eyebrow, Reveal, SelectionHandles, selectionBlue } from "./ui";

/** The statement, with any {word} drawn selected, as in the hero headline (a static box, no drag). */
function statement(text: string) {
  return text.split(/(\{[^}]+\})/g).map((part, i) =>
    part.startsWith("{") ? (
      <span key={i} className="relative inline-block">
        {part.slice(1, -1)}
        <span aria-hidden className="pointer-events-none absolute -inset-x-[0.14em] -top-[0.02em] -bottom-[0.1em]" style={{ background: `color-mix(in srgb, ${selectionBlue} 12%, transparent)` }} />
        <SelectionHandles className="-inset-x-[0.14em] -top-[0.02em] -bottom-[0.1em]" />
      </span>
    ) : (
      part
    ),
  );
}

/**
 * How I can help as an accordion, to compare with the grid: the label and statement on the left
 * (sticky), a full-height divider, then the four services as numbered rows with a plus. Opening a
 * row (it's a native <details>, so it works with the keyboard and without JavaScript) shows its
 * line and what it can include, and the plus turns into a cross.
 */
export function CapabilitiesAccordion() {
  const rows = approachPage.phases;
  return (
    <section id="capabilities-accordion" className="border-t border-grid">
      <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Left: the label and the statement */}
        <div className="border-grid px-4 pt-8 pb-10 sm:px-6 lg:border-r lg:py-14 lg:pr-10 lg:pl-10">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow as="h2">{services.eyebrow}</Eyebrow>
            <p className="serif mt-6 max-w-[22ch] text-[clamp(26px,2.3vw,34px)] leading-[1.14] tracking-[-0.035em] text-balance">{statement(services.statement)}</p>
          </Reveal>
        </div>
        {/* Right: the services as numbered rows that open, with full dividers */}
        <div className="border-t border-grid lg:border-t-0">
          {rows.map((ph, i) => (
            <Reveal key={ph.title} delay={i * 80}>
              <details className={`group border-grid ${i < rows.length - 1 ? "border-b" : ""}`}>
                <summary className="flex cursor-pointer list-none items-center gap-6 px-4 py-7 transition-colors hover:bg-sheet/60 sm:px-6 lg:gap-12 lg:px-10 lg:py-9 [&::-webkit-details-marker]:hidden">
                  <span className="w-10 shrink-0 text-[clamp(22px,2.2vw,32px)] leading-none tracking-[-0.03em] tabular-nums lg:w-14">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-[clamp(22px,2.2vw,32px)] leading-tight tracking-[-0.03em]">{ph.title}</span>
                  {/* A plus that turns into a cross when open */}
                  <svg aria-hidden viewBox="0 0 24 24" className="size-6 shrink-0 transition-transform duration-300 group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                {/* Lined up with the title, under the number */}
                <div className="px-4 pb-8 sm:px-6 lg:pr-10 lg:pb-10 lg:pl-[calc(2.5rem+3.5rem+3rem)]">
                  <p className="max-w-[52ch] text-[16px] leading-relaxed text-muted">{ph.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
                  </ul>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
