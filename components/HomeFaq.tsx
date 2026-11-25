import { faq, site } from "@/content";
import { Faq } from "./Faq";
import { Container, Eyebrow, Reveal, section, sectionHeading } from "./ui";

/** Questions I get asked, on the homepage: the heading and a line on the left, the questions on the right. */
export function HomeFaq() {
  return (
    <section id="faq" className={section}>
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <Reveal>
          <Eyebrow>{faq.label}</Eyebrow>
          <h2 className={sectionHeading}>{faq.heading}</h2>
          <p className="lede mt-5 max-w-sm">{faq.body}</p>
        </Reveal>
        <Reveal delay={100}>
          <Faq plain items={faq.items.map((f) => ({ q: f.q, a: <p className="max-w-[65ch] leading-relaxed">{f.a}</p> }))} />
          <p className="mt-8 text-muted">Something else? Email <a href={`mailto:${site.email}`} className="link">{site.email}</a></p>
        </Reveal>
      </Container>
    </section>
  );
}
