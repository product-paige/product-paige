import { audiences } from "@/content";
import { CuttingMat } from "./CuttingMat";
import { Container, Reveal, Rich, sansTitle, section, sectionHeading } from "./ui";

// Each card's tilt on the mat, in turn.
const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1"];

/**
 * Who I work with: the persona cards, each just a title and a statement, on the bright blue
 * cutting mat. Shared by the homepage and /approach, so editing the copy in
 * content.ts (audiences) changes both. `body` overrides the intro line; `link` shows the link to
 * the services below (homepage only).
 */
export function WhoIWorkWith({ body = audiences.body, link = false }: { body?: string; link?: boolean }) {
  return (
    <section className={section}>
      <Container>
        {/* The heading on the left, the intro line on the right, level with it */}
        <Reveal className="mb-8 grid gap-4 lg:mb-12 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className={sectionHeading}><Rich text={audiences.heading} /></h2>
          <p className="lede max-w-xl lg:justify-self-end">{body}</p>
        </Reveal>
        {/* The cards laid out on the bright blue cutting mat */}
        <div className="relative overflow-hidden rounded-[20px] px-4 py-10 sm:px-6 lg:px-14 lg:py-16">
          <CuttingMat />
          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {audiences.items.map((a, i) => (
              <Reveal key={a.title} delay={i * 120} className="h-full">
                {/* The title, the statement, then a few lines on how I'd help */}
                {/* Tilted, with the bottom-right corner folded over (.folded). The shadow sits on the
                    wrapper as a drop-shadow, since the fold's clip-path would cut a box-shadow off. */}
                <div className={`h-full drop-shadow-[0_14px_22px_rgb(0_0_0/0.2)] transition-transform duration-300 hover:rotate-0 ${tilts[i % tilts.length]}`}>
                <div className="folded flex h-full flex-col bg-paper p-6 pb-12 lg:p-8 lg:pb-14">
                  {/* Same title style as the Scrapbook cards */}
                  <h3 className={sansTitle}>{a.title}</h3>
                  <p className="mt-3 text-[17px] font-medium leading-snug lg:text-[18px]">{a.body}</p>
                  <p className="mt-3 text-[15px]">{a.detail}</p>
                </div>
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
