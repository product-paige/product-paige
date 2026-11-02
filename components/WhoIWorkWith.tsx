import { audiences } from "@/content";
import { Container, Reveal, SectionHead, section } from "./ui";

/**
 * Who I work with: the persona cards, each just a title and a statement. Shared by the homepage and /approach, so editing the copy in
 * content.ts (audiences) changes both. `body` overrides the intro line; `link` shows the link to
 * the services below (homepage only).
 */
export function WhoIWorkWith({ body = audiences.body, link = false }: { body?: string; link?: boolean }) {
  return (
    <section className={section}>
      <Container>
        <SectionHead heading={audiences.heading} body={body} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {audiences.items.map((a, i) => (
            <Reveal key={a.title} delay={i * 120} className="h-full">
              {/* Just the title and one statement */}
              <div className="flex h-full flex-col border border-line p-6 lg:p-8">
                <h3 className="serif text-[clamp(24px,2.2vw,30px)] leading-[1.1] tracking-[-0.03em]">{a.title}</h3>
                <p className="mt-3 text-[17px] leading-snug lg:text-[18px]">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {link && (
          <Reveal className="mt-8 flex justify-center lg:mt-12">
            <a href="#services" className="link">How I can help</a>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
