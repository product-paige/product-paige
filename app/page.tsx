import {
  about, approach, contact, models, services, site, testimonials,
} from "@/content";
import { AboutNotebook } from "@/components/AboutNotebook";
import { ContactForm } from "@/components/ContactForm";
import { CuttingMat } from "@/components/CuttingMat";
import { EditorialHero } from "@/components/EditorialHero";
import { FaqSection } from "@/components/FaqSection";
import { Phases } from "@/components/Phases";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { WhoIWorkWith } from "@/components/WhoIWorkWith";
import {
  Button, Container, Reveal, Rich, ScribbleBullet, SectionHead, cardTitle, section, sectionHeading,
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
      <PageRails />
      <SiteHeader />

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
        <WhoIWorkWith link />

        {/* Services */}
        <section id="services" className={section}>
          <Container>
            <Reveal className="mb-8 lg:mb-12">
              <h2 className={sectionHeading}><Rich text={services.heading} /></h2>
            </Reveal>
            <Phases topBorder />
          </Container>
        </section>

        {/* Engagement models */}
        <section id="pricing" className={section}>
          <Container>
            <SectionHead heading={models.heading} />
            <div className="grid gap-3 lg:grid-cols-3">
              {models.items.map((m, i) => (
                <Reveal key={m.tag} delay={i * 120}>
                  {/* Hover lives on this inner layer so it doesn't fight the reveal's transition. */}
                  <div
                    className={`flex h-full flex-col gap-5 border p-6 ${lift} lg:p-8 ${m.featured ? "border-dark bg-dark text-white" : "border-line bg-surface"}`}
                  >
                    {/* The tag as a mono eyebrow with a red dot */}
                    <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />{m.tag}</p>
                    <h3 className={cardTitle}>{m.title}</h3>
                    <p>{m.body}</p>
                    <div className="mt-auto pt-8 lg:pt-12">
                      <p className={`text-sm label ${m.featured ? "text-white/60" : "text-muted"}`}>Starting at</p>
                      <p className="mt-1 flex items-baseline gap-1.5">
                        <span className={`serif text-[28px] leading-none ${models.pricePlaceholder ? "opacity-40" : ""}`}>{m.price}</span>
                        <span className={m.featured ? "text-white/60" : "text-muted"}>{models.currency} {m.per}</span>
                      </p>
                    </div>
                    <ul className={`divide-y border-t ${m.featured ? "divide-line-dark border-line-dark" : "divide-line border-line"}`}>
                      {m.points.map((p) => <li key={p} className="py-2.5">{p}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8 flex justify-center lg:mt-12">
              <Button href={site.bookingUrl} accent>Start a project</Button>
            </Reveal>
          </Container>
        </section>

        {/* Approach: the steps as cards on the blue cutting mat */}
        <section id="approach" className={section}>
          <Container>
            <SectionHead heading={approach.heading} body={approach.body} />
            <div className="relative overflow-hidden rounded-[20px] px-4 py-10 sm:px-6 lg:px-14 lg:py-16">
              <CuttingMat />
              <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {approach.steps.map((p, i) => (
                  <Reveal as="li" key={p.title} delay={i * 120} className="h-full">
                    <div className="h-full bg-paper p-6 shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_30px_rgb(0_0_0/0.18)] lg:p-7">
                      <p className="mono flex items-center gap-3 text-[12px]"><i aria-hidden className="size-2.5 rounded-full bg-accent" />Step {String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-5 font-sans text-[20px] font-semibold leading-tight tracking-[-0.03em]">{p.title}</h3>
                      <p className="mt-2 text-[15px]">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
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

        {/* Contact and footer share one dark block. */}
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
      </main>

      <SiteFooter />
    </>
  );
}
