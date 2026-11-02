import { faq } from "@/content";
import { Faq } from "./Faq";
import { Container, Reveal, Rich, section, sectionHeading } from "./ui";

/** The FAQs. Shared by the homepage and /approach, so editing faq in content.ts changes both. */
export function FaqSection() {
  return (
    <section id="faq" className={section}>
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className={sectionHeading}><Rich text={faq.heading} /></h2>
          <p className="lede mt-5 max-w-lg">{faq.body}</p>
        </Reveal>
        <Reveal>
          <Faq items={faq.items} />
        </Reveal>
      </Container>
    </section>
  );
}
