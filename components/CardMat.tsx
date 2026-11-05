import type { ReactNode } from "react";
import { CuttingMat } from "./CuttingMat";
import { Container, Eyebrow, Reveal, Rich, section, sectionHeading } from "./ui";

// Each card's tilt on the mat, in turn.
const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1"];

export type MatCard = { label: string; title: string; body?: string; meta?: ReactNode };

/**
 * A section of paper cards on the bright blue cutting mat: the eyebrow and heading, then each
 * card tilted with its corner folded, a mono label, a serif title and an optional line under it
 * (plus `meta` at its foot).
 * `footer` sits under the mat. Ways to work together uses it.
 */
export function CardMat({ id, eyebrow, heading, items, footer }: { id?: string; eyebrow: string; heading: string; items: MatCard[]; footer?: ReactNode }) {
  return (
    <section id={id} className={section}>
      <Container>
        <Reveal className="mb-8 lg:mb-12">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={sectionHeading}><Rich text={heading} /></h2>
        </Reveal>
        <div className="relative overflow-hidden rounded-[20px] px-4 py-10 sm:px-6 lg:px-14 lg:py-16">
          <CuttingMat />
          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {items.map((a, i) => (
              <Reveal key={a.label} delay={i * 120} className="h-full">
                {/* Tilted, with the bottom-right corner folded over (.folded). The shadow sits on the
                    unclipped wrapper; a drop-shadow filter would blur the text. */}
                <div className={`h-full shadow-[0_14px_28px_rgb(0_0_0/0.2)] transition-transform duration-300 hover:rotate-0 ${tilts[i % tilts.length]}`}>
                  <div className="folded flex h-full flex-col bg-paper p-6 pb-12 lg:p-8 lg:pb-14">
                    <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 shrink-0 rounded-full bg-accent" />{a.label}</p>
                    <h3 className="serif mt-6 text-[clamp(22px,2vw,28px)] leading-[1.15] text-balance"><Rich text={a.title} /></h3>
                    {a.body && <p className="mt-3 text-[15px] leading-[1.5] text-muted">{a.body}</p>}
                    {a.meta && <div className="mt-auto pt-8">{a.meta}</div>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {footer}
      </Container>
    </section>
  );
}
