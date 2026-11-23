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
 * How I can help, split like About and Working style: the label and the statement (with one word
 * selected, as in the hero) on the left, staying in view as you scroll, a full-height divider, then
 * the four services as a grid of cells with full dividers, each a title, its line and pills.
 */
export function CapabilitiesList() {
  const rows = approachPage.phases;
  return (
    <section id="capabilities" className="border-t border-grid">
      <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Left: the label and the statement, which stay in view while the services scroll past */}
        <div className="border-grid px-4 pt-8 pb-10 sm:px-6 lg:border-r lg:py-14 lg:pr-10 lg:pl-10">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow as="h2">{services.eyebrow}</Eyebrow>
            <p className="serif mt-6 max-w-[22ch] text-[clamp(26px,2.3vw,34px)] leading-[1.14] tracking-[-0.035em] text-balance">{statement(services.statement)}</p>
          </Reveal>
        </div>
        {/* Right: the services as a grid of cells, with full dividers between the columns and rows */}
        <ul className="grid border-t border-grid sm:grid-cols-2 lg:border-t-0">
          {rows.map((ph, i) => (
            <Reveal as="li" key={ph.title} delay={(i % 2) * 120} className="border-grid px-4 py-8 not-last:border-b sm:px-6 sm:not-last:border-b-0 sm:even:border-l sm:[&:nth-child(-n+2)]:border-b lg:px-10 lg:py-12">
              <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{ph.title}</h3>
              <p className="mt-2.5 max-w-[46ch] text-[15px] leading-relaxed text-muted">{ph.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
