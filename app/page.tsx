import {
  about, approach, services, testimonials,
} from "@/content";
import { AboutNotebook } from "@/components/AboutNotebook";
import { EditorialHero } from "@/components/EditorialHero";
import { FaqSection } from "@/components/FaqSection";
import { Phases } from "@/components/Phases";
import { PricingTable } from "@/components/PricingTable";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { WhoIWorkWith } from "@/components/WhoIWorkWith";
import {
  Container, Illo, Reveal, selectionBlue, Rich, ScribbleBullet, SectionHead, section, sectionHeading,
} from "@/components/ui";

// Hover lift shared by every card.
const lift = "transition hover:-translate-y-1";
// Testimonial card colours, in turn.
const quoteTones = ["bg-sky", "bg-butter", "bg-sage"];
/** Why founders work with me: a short list with scribble bullets, under the About copy. */
function ProofList() {
  return (
    <>
      <p className="text-base font-medium">{about.proofHeading}</p>
      <ul className="mt-3 space-y-2 text-base">
        {about.proof.map((f, i) => (
          <li key={f} className="flex items-start gap-2.5">
            <ScribbleBullet variant={i} className="mt-0.5 text-accent" />
            {f}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <div className="page-frame">
      <PageRails />

      <main id="top">
        <EditorialHero />

        {/* About: two columns. Left, the heading, one paragraph in Manrope on who I am
            and how I work, and why founders work with me. Right, the photo and tools laid
            out like a desktop (see AboutNotebook). */}
        <section id="about" className={`${section} overflow-x-clip`}>
          <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:pt-10">
              <Reveal>
                <h2 className={sectionHeading}><Rich text={about.heading} /></h2>
              </Reveal>
              <Reveal as="p" delay={60} className="mt-5 max-w-xl font-sans text-[17px] leading-snug tracking-[-0.02em] lg:mt-6 lg:text-[20px]">{about.body}</Reveal>
              <Reveal delay={100} className="mt-10 lg:mt-16">
                <ProofList />
              </Reveal>
            </div>

            {/* Laid out like a desktop: the photo, tools and a folder as files */}
            <Reveal>
              <AboutNotebook />
            </Reveal>
          </Container>
        </section>

        {/* Recent projects */}
        <RecentProjects className={section} />


        {/* Audiences (shared with /approach) */}
        <WhoIWorkWith />

        {/* Services */}
        <section id="services" className={section}>
          <Container>
            {/* The heading as a small mono label with a red dot, like Recent projects */}
            <Reveal className="mb-6">
              <h2 className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />{services.heading}</h2>
            </Reveal>
            <Phases topBorder />
          </Container>
        </section>



        {/* Ways to work together, as a table */}
        <PricingTable />

        {/* Approach: the steps side by side, each a centred sticker, title and line */}
        <section id="approach" className={section}>
          <Container>
            {/* The heading as a small mono label with a red dot, then the intro line */}
            <Reveal className="mb-10 lg:mb-14">
              <h2 className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />{approach.heading}</h2>
              <p className="lede mt-6 max-w-xl">{approach.body}</p>
            </Reveal>
            <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {/* Desktop: a line in the selection blue through the stickers' middles, from the first
                  step's centre to the last's, with a handle at each end (see SelectionHandles) */}
              <span aria-hidden className="pointer-events-none absolute top-16 right-[calc(12.5%-7.5px)] left-[calc(12.5%-7.5px)] hidden h-[1.5px] lg:block" style={{ background: selectionBlue }}>
                {["-left-1", "-right-1"].map((c) => (
                  <i key={c} className={`absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white ${c}`} style={{ border: `1.5px solid ${selectionBlue}` }} />
                ))}
              </span>
              {approach.steps.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 120} className="relative flex flex-col items-center text-center">
                  <Illo art={p.art} className="h-28 w-auto lg:h-32" />
                  <h3 className="serif mt-5 text-[clamp(20px,1.6vw,24px)] leading-[1.2]">{p.title}</h3>
                  <p className="mt-2 max-w-[32ch] text-[15px]">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {/* FAQ */}
        <FaqSection />

        {/* Blog */}
        <Scrapbook className={section} />

        {/* Testimonials: hidden until there are real quotes */}
        {testimonials.items.length > 0 && (
        <section className={section}>
          <Container>
            <SectionHead heading={testimonials.heading} />
            <div className="grid gap-3 lg:grid-cols-3">
              {testimonials.items.map((t, i) => (
                <Reveal key={t.quote} delay={i * 120}>
                  <figure className={`folded flex h-full flex-col justify-between gap-6 p-6 lg:gap-8 lg:p-7 ${quoteTones[i % quoteTones.length]} ${lift} lg:min-h-[300px]`}>
                    <blockquote className="serif text-[20px] leading-[1.25] lg:text-2xl">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <i className="size-[34px] shrink-0 rounded-full bg-white/60" aria-hidden />
                      <span>{t.name}<br /><span className="text-muted">{t.title}</span></span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
        )}

      </main>
      </div>

      <SiteFooter />
    </>
  );
}
