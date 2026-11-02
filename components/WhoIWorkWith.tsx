import { audiences } from "@/content";
import { CuttingMat } from "./CuttingMat";
import { Container, Reveal, ScribbleBullet, SectionHead, cardTitle, section } from "./ui";

/**
 * Who I work with: the persona cards, on the bright blue cutting mat. Shared by the homepage and /approach, so editing the copy in
 * content.ts (audiences) changes both. `body` overrides the intro line; `link` shows the link to
 * the services below (homepage only).
 */
export function WhoIWorkWith({ body = audiences.body, link = false }: { body?: string; link?: boolean }) {
  return (
    <section className={section}>
      <Container>
        <SectionHead heading={audiences.heading} body={body} />
        {/* The cards laid out on the bright blue cutting mat */}
        <div className="relative overflow-hidden rounded-[20px] px-4 py-10 sm:px-6 lg:px-14 lg:py-16">
          <CuttingMat />
          <div className="relative grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {audiences.items.map((a, i) => (
              <Reveal key={a.title} delay={i * 120}>
                <div className={`${a.tone} folded flex h-full flex-col px-6 pt-10 pb-12 transition hover:-translate-y-1 lg:px-8 lg:pt-14 lg:pb-14`}>
                  <h3 className={cardTitle}>{a.title}</h3>
                  <p className="mt-2">{a.body}</p>
                  {/* The list follows straight on from the text; the card's bottom padding leaves room for the fold. */}
                  <ul className="mt-6 space-y-3 lg:mt-8 lg:space-y-3.5">
                    {a.points.map((p, pi) => (
                      <li key={p} className="flex items-start gap-3 text-[15px]">
                        <ScribbleBullet variant={pi} className="mt-0.5 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
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
