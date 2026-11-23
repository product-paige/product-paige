import { approachPage, services } from "@/content";
import { Chip, Container, Eyebrow, Reveal } from "./ui";

/**
 * A second take on How I can help, to compare: the label on the left, a statement on the right,
 * then the four phases under it in two columns, each a short title and its line, split by fine rules,
 * with what it can include as pills underneath.
 */
export function CapabilitiesList({ className = "" }: { className?: string }) {
  const rows = approachPage.phases;
  return (
    <section id="capabilities-list" className={className}>
      <Container>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
          <Reveal>
            <Eyebrow as="h2">{services.eyebrow}</Eyebrow>
          </Reveal>
          <div>
            <Reveal>
              <p className="serif max-w-[30ch] text-[clamp(26px,2.6vw,38px)] leading-[1.12] tracking-[-0.035em] text-balance">{services.statement}</p>
            </Reveal>
            <ul className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:mt-14">
              {rows.map((ph, i) => (
                <Reveal as="li" key={ph.title} delay={(i % 2) * 120} className={`border-grid py-7 ${i < rows.length - 2 ? "sm:border-b" : ""} ${i < rows.length - 1 ? "border-b" : ""} sm:[&:nth-last-child(2)]:border-b-0`}>
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{ph.title}</h3>
                  <p className="mt-2.5 max-w-[46ch] text-[15px] leading-relaxed text-muted">{ph.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
                  </ul>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
