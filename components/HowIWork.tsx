import { approach } from "@/content";
import { Container, Eyebrow, Reveal, section, sectionHeading } from "./ui";

/**
 * How I work: the heading with a line on building with Claude beside it, the four steps as cut-out
 * cards with folded corners.
 */
export function HowIWork() {
  return (
    <section id="how-i-work" className={section}>
      <Container>
        {/* The heading on the left, the line on building with Claude to its right */}
        <Reveal className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{approach.eyebrow}</Eyebrow>
            <h2 className={sectionHeading}>{approach.heading}</h2>
          </div>
          <p className="lede max-w-xl lg:pb-2">{approach.body}</p>
        </Reveal>
        {/* The four steps as cut-out cards, each with a folded corner */}
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {approach.steps.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 100} className="folded flex flex-col bg-scrap p-6 pb-8 lg:p-7 lg:pb-10">
              <p className="serif text-[clamp(28px,2.8vw,38px)] leading-none text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="serif mt-8 text-[24px] leading-[1.15] tracking-[-0.03em]">{st.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{st.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
