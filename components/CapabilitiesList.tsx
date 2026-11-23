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
 * How I can help, split like About and Working style: the label and a link to the prices on the
 * left, a full-height divider, then a statement (with one word selected, as in the hero) and the
 * four services in two columns, each a title, its line and what it can include as pills.
 */
export function CapabilitiesList() {
  const rows = approachPage.phases;
  return (
    <section id="capabilities" className="border-t border-grid">
      <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
        {/* Left: the label, and the way on to the prices */}
        <div className="border-grid px-4 pt-8 pb-6 sm:px-6 lg:border-r lg:py-14 lg:pr-8 lg:pl-10">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow as="h2">{services.eyebrow}</Eyebrow>
            <a href={services.pricesLink.href} className="mono mt-5 hidden items-center gap-2 text-accent transition-colors hover:text-ink lg:inline-flex">
              {services.pricesLink.label}
              <svg aria-hidden viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
            </a>
          </Reveal>
        </div>
        {/* Right: the statement and the services */}
        <div className="px-4 pb-8 sm:px-6 lg:py-14 lg:pr-10 lg:pl-12">
          <Reveal>
            <p className="serif max-w-[30ch] text-[clamp(26px,2.6vw,38px)] leading-[1.12] tracking-[-0.035em] text-balance">{statement(services.statement)}</p>
          </Reveal>
          <ul className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:mt-14">
            {rows.map((ph, i) => (
              <Reveal as="li" key={ph.title} delay={(i % 2) * 120} className={`border-grid py-7 ${i < rows.length - 2 ? "sm:border-b" : ""} ${i < rows.length - 1 ? "border-b" : ""} sm:[&:nth-last-child(2)]:border-b-0`}>
                <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{ph.title}</h3>
                <p className="mt-2.5 max-w-[46ch] text-[15px] leading-relaxed text-muted">{ph.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
                </ul>
              </Reveal>
            ))}
          </ul>
          {/* On phones and tablets the prices link sits under the list */}
          <a href={services.pricesLink.href} className="mono mt-8 inline-flex items-center gap-2 text-accent lg:hidden">
            {services.pricesLink.label}
            <svg aria-hidden viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
