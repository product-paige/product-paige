import { approach } from "@/content";
import { Container, Eyebrow, Reveal, section, sectionHeading } from "./ui";

/**
 * How I work: the heading and a line on building with Claude, the four steps as numbered columns
 * split by fine rules, then the three principles in a row underneath.
 */
export function HowIWork() {
  return (
    <section id="how-i-work" className={section}>
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <h2 className={sectionHeading}>{approach.heading}</h2>
          <p className="lede mt-5 max-w-xl">{approach.body}</p>
        </Reveal>
        {/* The four steps */}
        <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {approach.steps.map((st, i) => (
            <Reveal as="li" key={st.title} delay={i * 100} className="border-b border-line py-7 sm:pr-8 lg:border-b-0 lg:pr-10 lg:not-first:border-l lg:not-first:pl-8">
              <p className="serif text-[clamp(28px,2.8vw,38px)] leading-none text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="serif mt-5 text-[24px] leading-[1.15] tracking-[-0.03em]">{st.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{st.body}</p>
            </Reveal>
          ))}
        </ol>
        {/* The principles */}
        <div className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-3 lg:mt-12">
          {approach.principles.map((pr) => (
            <Reveal key={pr.title}>
              <p className="mono">{pr.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed">{pr.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
