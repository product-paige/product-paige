import { audiences } from "@/content";
import { CuttingMat } from "./CuttingMat";
import { Container, Eyebrow, Reveal, Rich, section, sectionHeading } from "./ui";

// Each card's tilt on the mat, in turn.
const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1"];

/**
 * Who I work with: the persona cards, each just who it's for and one statement, on the
 * bright blue cutting mat (audiences in content.ts).
 */
export function WhoIWorkWith() {
  return (
    <section className={section}>
      <Container>
        <Reveal className="mb-8 lg:mb-12">
          <Eyebrow>{audiences.eyebrow}</Eyebrow>
          <h2 className={sectionHeading}><Rich text={audiences.heading} /></h2>
        </Reveal>
        {/* The cards laid out on the bright blue cutting mat */}
        <div className="relative overflow-hidden rounded-[20px] px-4 py-10 sm:px-6 lg:px-14 lg:py-16">
          <CuttingMat />
          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {audiences.items.map((a, i) => (
              <Reveal key={a.title} delay={i * 120} className="h-full">
                                {/* Tilted, with the bottom-right corner folded over (.folded). The shadow sits on the
                    unclipped wrapper; a drop-shadow filter would blur the text. */}
                <div className={`h-full shadow-[0_14px_28px_rgb(0_0_0/0.2)] transition-transform duration-300 hover:rotate-0 ${tilts[i % tilts.length]}`}>
                <div className="folded flex h-full flex-col bg-paper p-6 pb-12 lg:p-8 lg:pb-14">
                  {/* Who it's for as a mono eyebrow with a red dot, then the statement as the title
                      (the Scrapbook cards' title style) */}
                  <p className="mono flex items-center gap-3 tracking-[0.01em]"><i aria-hidden className="size-3 shrink-0 rounded-full bg-accent" />{a.title}</p>
                  <h3 className="serif mt-6 text-[clamp(22px,2vw,28px)] leading-[1.15] text-balance"><Rich text={a.body} /></h3>
                </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
