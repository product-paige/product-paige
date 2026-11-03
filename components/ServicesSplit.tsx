import { approachPage, services } from "@/content";
import { Chip, Reveal, Rich, sectionHeading } from "./ui";

/**
 * How I can help, split in two: the heading on the left (sticky on desktop) with a full-height
 * divider on its right, and the phases on the right as rows with full-width dividers between
 * them. The dividers run edge to edge of the sheet; the content keeps Container's inset.
 * On phones the heading sits on top and the rows stack under it.
 */
export function ServicesSplit() {
  return (
    <section className="border-t border-grid lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="border-b border-grid px-4 py-8 sm:px-6 md:px-12 lg:border-r lg:border-b-0 lg:py-14 lg:pr-10 lg:pl-20">
        <Reveal className="lg:sticky lg:top-28">
          <h2 className={sectionHeading}><Rich text={services.heading} /></h2>
        </Reveal>
      </div>
      <div>
        {approachPage.phases.map((ph, i) => (
          <Reveal as="article" key={ph.title} className="grid gap-4 px-4 py-8 not-first:border-t not-first:border-grid sm:px-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 md:px-12 lg:py-10 lg:pr-20 lg:pl-10">
            <p className="serif text-[clamp(24px,2.2vw,30px)] leading-none text-accent">{String(i + 1).padStart(2, "0")}</p>
            <div>
              <h3 className="serif text-[clamp(22px,2vw,28px)] leading-[1.1] tracking-[-0.03em]">{ph.title}</h3>
              <p className="mt-3 max-w-xl">{ph.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
