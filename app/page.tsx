import { about, approachPage, audiences, services, site, testimonials } from "@/content";
import { AboutNotebook } from "@/components/AboutNotebook";
import { CuttingMat } from "@/components/CuttingMat";
import { EditorialHero } from "@/components/EditorialHero";
import { JsonLd } from "@/components/JsonLd";
import { Phases } from "@/components/Phases";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { WorkingStyle } from "@/components/WorkingStyle";
import { PricingTable } from "@/components/PricingTable";
import {
  Container, Eyebrow, Reveal, Rich, SectionHead, section, sectionHeading,
} from "@/components/ui";

// Hover lift shared by every card.
const lift = "transition hover:-translate-y-1";
// Testimonial card colours, in turn.
const quoteTones = ["bg-sky", "bg-butter", "bg-sage"];
/**
 * Who I work with, under the About copy: a small mono label, then a ruled list like a spec
 * sheet, who it's for on the left and one line on the right.
 */
function AudienceList() {
  return (
    <>
      <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 shrink-0 rounded-full bg-accent" />{audiences.heading}</p>
      <dl className="mt-4 max-w-xl border-b border-line leading-snug">
        {audiences.items.map((a) => (
          <div key={a.title} className="grid gap-0.5 border-t border-line py-2.5 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-[15px] font-medium text-accent">{a.title}</dt>
            <dd className="text-[15px] text-muted">{a.body}</dd>
          </div>
        ))}
      </dl>
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
            and how I work. Right, the photo and tools laid
            out like a desktop (see AboutNotebook). */}
        {/* About: the text on the left with its own padding, the blue cutting mat filling the right
            half between the inner rails, split by a full-height divider (as in Working style). The
            section's top rule runs the full width. */}
        <section id="about" className="overflow-x-clip border-t border-grid">
          <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-2">
            {/* Left: the heading and copy at the top, Who I work with pushed to the bottom */}
            <div className="flex flex-col px-4 py-12 sm:px-6 lg:py-16 lg:pr-16 lg:pl-10">
              <Reveal>
                <h2 className={sectionHeading}><Rich text={about.heading} /></h2>
              </Reveal>
              <Reveal as="p" delay={60} className="lede mt-5 max-w-xl">{about.body}</Reveal>
              <Reveal delay={100} className="mt-14 lg:mt-auto lg:pt-16">
                <AudienceList />
              </Reveal>
            </div>

            {/* Laid out like a desktop on the blue cutting mat: the photo, tools and a folder as files */}
            <Reveal className="relative z-1 overflow-hidden border-t border-grid px-6 py-10 sm:px-10 md:border-x lg:border-t-0 lg:border-r lg:border-l lg:px-12 lg:py-14">
              <CuttingMat />
              <div className="relative mx-auto max-w-xl">
                <AboutNotebook onMat />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Recent projects */}
        <RecentProjects className={section} />

        {/* Services */}
        <section id="services" className={section}>
          <Container>
            <Reveal className="mb-8 lg:mb-12">
              <Eyebrow>{services.eyebrow}</Eyebrow>
              <h2 className={sectionHeading}>{services.heading}</h2>
            </Reveal>
            <Phases topBorder />
          </Container>
        </section>



        {/* Working style: a picture per principle on the left, the principles on the right */}
        <WorkingStyle />

        {/* My process (approach in content.ts) is off the page for now */}


        {/* Ways to work together: the starting points and prices as a tabbed table, beside the button to get
            in touch */}
        <PricingTable />

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
