import { about, approachPage, audiences, services, site, testimonials } from "@/content";
import { AboutNotebook } from "@/components/AboutNotebook";
import { CuttingMat } from "@/components/CuttingMat";
import { EditorialHero } from "@/components/EditorialHero";
import { JsonLd } from "@/components/JsonLd";
import { RecentProjects } from "@/components/RecentProjects";
import { CapabilitiesShowcase } from "@/components/CapabilitiesShowcase";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { Services } from "@/components/Services";
import { HomeFaq } from "@/components/HomeFaq";
import {
  Container, Eyebrow, Reveal, Rich, SectionHead, section, sectionHeading,
} from "@/components/ui";

// Hover lift shared by every card.
const lift = "transition hover:-translate-y-1";
// Testimonial card colours, in turn.
const quoteTones = ["bg-sky", "bg-butter", "bg-sage"];
/**
 * Who I work with, under the About copy: a small mono label, then three tiles side by side, each
 * who it's for in blue and one line on it, on a soft tint.
 */
function AudienceList() {
  return (
    <>
      <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 shrink-0 rounded-full bg-accent" />{audiences.heading}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {audiences.items.map((a) => (
          <li key={a.title} className="rounded-ui bg-sheet px-4 py-3.5">
            <p className="text-[15px] leading-snug font-medium text-accent">{a.title}</p>
            <p className="mt-1 text-[14px] leading-snug text-muted">{a.body}</p>
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
            and how I work. Right, the photo and tools laid
            out like a desktop (see AboutNotebook). */}
        {/* About: the text on the left with its own padding, the blue cutting mat filling the right
            half between the inner rails, split by a full-height divider. The
            section's top rule runs the full width. */}
        <section id="about" className="overflow-x-clip border-t border-grid">
          <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-2">
            {/* Left: the heading and copy, centred against the mat */}
            <div className="flex flex-col px-4 py-12 sm:px-6 lg:justify-center lg:py-16 lg:pr-12 lg:pl-10">
              <Reveal>
                <Eyebrow>{about.eyebrow}</Eyebrow>
                <h2 className={sectionHeading}><Rich text={about.heading} /></h2>
              </Reveal>
              <Reveal delay={60} className="mt-5 max-w-2xl space-y-4">
                {about.body.map((para) => <p key={para} className="lede">{para}</p>)}
              </Reveal>
              {/* Who I work with (AudienceList) is off the page for now */}
            </div>

            {/* Laid out like a desktop on the blue cutting mat: the photo, tools and a folder as files */}
            <Reveal className="relative z-1 overflow-hidden border-t border-grid px-6 py-10 sm:px-10 md:border-x lg:flex lg:min-h-[40rem] lg:flex-col lg:border-t-0 lg:border-r lg:border-l lg:px-10 lg:py-12">
              <CuttingMat />
              <div className="relative w-full lg:flex-1">
                <AboutNotebook onMat />
              </div>
              {/* A hint that the files can be moved */}
              <p aria-hidden className="mono pointer-events-none absolute right-8 bottom-8 text-white/70 lg:right-12 lg:bottom-9">{about.dragHint}</p>
            </Reveal>
          </div>
        </section>

        {/* Recent projects */}
        <RecentProjects className={section} />

        {/* Capabilities */}
        <CapabilitiesShowcase />

        {/* Services: the three offers */}
        <Services />

        {/* Questions I get asked */}
        <HomeFaq />

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
