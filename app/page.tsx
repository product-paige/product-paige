import { about, approachPage, services, site, testimonials, workingStyle } from "@/content";
import { AboutNotebook } from "@/components/AboutNotebook";
import { Asterisk } from "@/components/EditorialHero";
import { EditorialHero } from "@/components/EditorialHero";
import { JsonLd } from "@/components/JsonLd";
import { Phases } from "@/components/Phases";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { WhoIWorkWith } from "@/components/WhoIWorkWith";
import {
  Container, Illo, Reveal, Rich, ScribbleBullet, SectionHead, section, sectionHeading,
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
      {/* Who this is, for search engines and AI assistants: Paige, and the services she offers */}
      <JsonLd
        data={{
          "@type": "ProfessionalService",
          name: site.logo,
          url: site.url,
          description: site.metaDescription,
          email: site.email,
          areaServed: "Worldwide",
          address: { "@type": "PostalAddress", addressLocality: "Kitchener", addressRegion: "ON", addressCountry: "CA" },
          founder: { "@type": "Person", name: site.name, jobTitle: site.role, image: `${site.url}${site.photo}` },
          knowsAbout: ["Shopify", "Product marketing", "Ecommerce design", "Shopify theme development", "Conversion rate optimization", "Copywriting"],
          hasOfferCatalog: { "@type": "OfferCatalog", name: services.heading, itemListElement: approachPage.phases.map((ph) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: ph.title, description: ph.body } })) },
        }}
      />
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
              <h2 className={sectionHeading}>{services.heading}</h2>
            </Reveal>
            <Phases topBorder />
          </Container>
        </section>



        {/* Working style: a picture on the left; the heading, intro and three principles on the right,
            the principles pushed to the bottom so they line up with the picture's foot */}
        <section id="working-style" className={section}>
          <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="grid aspect-square place-items-center bg-sky p-10 lg:p-16">
              <Illo art={workingStyle.art} className="max-h-full w-3/4" />
            </Reveal>
            <div className="flex flex-col">
              <Reveal>
                <h2 className={sectionHeading}>{workingStyle.heading}</h2>
                <p className="lede mt-5 max-w-xl">{workingStyle.body}</p>
              </Reveal>
              <ul className="mt-10 divide-y divide-line border-y border-line lg:mt-auto">
                {workingStyle.items.map((it, i) => (
                  <Reveal as="li" key={it.title} delay={i * 80} className="flex items-start gap-5 py-5">
                    <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-ui bg-dark text-paper">
                      <Asterisk className="size-5" />
                    </span>
                    <div>
                      <h3 className="serif text-[24px] leading-[1.15] tracking-[-0.02em]">{it.title}</h3>
                      <p className="mt-1 max-w-md text-[15px] leading-[1.5] text-muted">{it.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Ways to work together (components/PricingTable) is off the page for now */}

        {/* My process (approach in content.ts) is off the page for now */}

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
