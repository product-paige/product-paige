import {
  about, approach, contact, services, site, testimonials,
} from "@/content";
import { AboutNotebook } from "@/components/AboutNotebook";
import { ContactForm } from "@/components/ContactForm";
import { EditorialHero } from "@/components/EditorialHero";
import { FaqSection } from "@/components/FaqSection";
import { Phases } from "@/components/Phases";
import { ServicesSplit } from "@/components/ServicesSplit";
import { PricingTable } from "@/components/PricingTable";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { WhoIWorkWith } from "@/components/WhoIWorkWith";
import {
  Container, Illo, Reveal, Rich, ScribbleBullet, SectionHead, sansTitle, section, sectionHeading,
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
            <Reveal className="mb-8 lg:mb-12">
              <h2 className={sectionHeading}><Rich text={services.heading} /></h2>
            </Reveal>
            <Phases topBorder />
          </Container>
        </section>

        {/* Services, option B: heading left, rows right, full dividers */}
        <ServicesSplit />


        {/* Ways to work together, as a table */}
        <PricingTable />

        {/* Approach: the steps side by side, each a centred sticker, title and line */}
        <section id="approach" className={section}>
          <Container>
            <Reveal className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-16">
              <h2 className={sectionHeading}><Rich text={approach.heading} /></h2>
              <p className="lede max-w-xl">{approach.body}</p>
            </Reveal>
            <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {approach.steps.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 120} className="flex flex-col items-center text-center">
                  <Illo art={p.art} className="h-28 w-auto lg:h-32" />
                  <h3 className={`${sansTitle} mt-5`}>{p.title}</h3>
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

      {/* Contact and footer share one dark sheet. */}
      <SiteFooter>
        <section id="contact" className={`rails on-dark relative bg-dark text-white ${section}`}>
          <i aria-hidden className="rails-inner" />
          <Container className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className={`${sectionHeading} mb-5`}><Rich text={contact.heading} /></h2>
              <p className="lede max-w-md text-white">{contact.body}</p>
            </Reveal>
            <Reveal delay={120}>
              <ContactForm endpoint={site.formEndpoint} email={site.email} deadlines={contact.deadlines} interests={contact.interests} messageLabel={contact.messageLabel} messagePlaceholder={contact.messagePlaceholder} success={contact.success} />
            </Reveal>
          </Container>
        </section>
      </SiteFooter>
    </>
  );
}
