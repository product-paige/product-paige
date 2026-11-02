import { audiences } from "@/content";
import { CuttingMat } from "./CuttingMat";
import { Container, Reveal, Rich, section, sectionHeading } from "./ui";

// Each card's tilt on the mat, in turn.
const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1"];

/** Line icons for the three audiences: a seedling (starting out), a bag with a rising line
 * (already selling), and a puzzle piece (building for Shopify). */
function AudienceIcon({ i }: { i: number }) {
  const paths = [
    "M12 20v-7M12 13c0-3 2.5-5.5 6-5.5 0 3.5-2.5 5.5-6 5.5ZM12 15c0-2.5-2-4.5-5-4.5 0 2.5 2 4.5 5 4.5ZM7 20h10",
    "M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8ZM9 8V6.5a3 3 0 0 1 6 0V8M8.5 16l2.5-2.5 2 2 2.5-3",
    "M9 4h4v2.2a1.8 1.8 0 1 0 3.6 0V4H20v5.5h-2.2a1.8 1.8 0 1 0 0 3.6H20V20h-5.5v-2.2a1.8 1.8 0 1 0-3.6 0V20H5v-6.5h2.2a1.8 1.8 0 1 0 0-3.6H5V4h4Z",
  ];
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[i % paths.length]} />
    </svg>
  );
}

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
                {/* An icon, the title, the statement, then a few lines on how I'd help */}
                {/* Tilted, with the bottom-right corner folded over (.folded). The shadow sits on the
                    wrapper as a drop-shadow, since the fold's clip-path would cut a box-shadow off. */}
                <div className={`h-full drop-shadow-[0_14px_22px_rgb(0_0_0/0.2)] transition-transform duration-300 hover:rotate-0 ${tilts[i % tilts.length]}`}>
                <div className="folded flex h-full flex-col bg-paper p-6 pb-12 lg:p-8 lg:pb-14">
                  <span aria-hidden className="grid size-11 place-items-center rounded-ui border border-line bg-sheet text-accent">
                    <AudienceIcon i={i} />
                  </span>
                  <h3 className="serif mt-6 text-[clamp(24px,2.2vw,30px)] leading-[1.1] tracking-[-0.03em]">{a.title}</h3>
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
