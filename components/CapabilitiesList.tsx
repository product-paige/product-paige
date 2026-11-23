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
 * How I can help, split like About and Working style: the label on the left (sticky), a full-height divider, then a statement (with one word selected, as in the hero) and the
 * four services in two columns, each a title, its line and what it can include as pills.
 */
export function CapabilitiesList() {
  const rows = approachPage.phases;
  return (
    <section id="capabilities" className="border-t border-grid">
      <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
        {/* Left: the label, which stays in view while the services scroll past */}
        <div className="border-grid px-4 pt-8 pb-6 sm:px-6 lg:border-r lg:py-14 lg:pr-8 lg:pl-10">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow as="h2">{services.eyebrow}</Eyebrow>
          </Reveal>
        </div>
        {/* Right: the statement, then the services as a grid of cells with full dividers that run to
            the section's edges (under the statement, between the columns and between the rows) */}
        <div>
          <Reveal className="px-4 pb-10 sm:px-6 lg:pt-14 lg:pr-10 lg:pb-12 lg:pl-12">
            <p className="serif max-w-[30ch] text-[clamp(26px,2.6vw,38px)] leading-[1.12] tracking-[-0.035em] text-balance">{statement(services.statement)}</p>
          </Reveal>
          <ul className="grid border-t border-grid sm:grid-cols-2">
            {rows.map((ph, i) => (
              <Reveal as="li" key={ph.title} delay={(i % 2) * 120} className="border-grid px-4 py-6 not-last:border-b sm:px-6 sm:not-last:border-b-0 sm:even:border-l sm:[&:nth-child(-n+2)]:border-b lg:px-10 lg:py-7">
                <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{ph.title}</h3>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted">{ph.body}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
