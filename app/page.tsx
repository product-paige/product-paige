import { about, approachPage, audiences, services, site, testimonials, workingStyle } from "@/content";
import { AboutNotebook } from "@/components/AboutNotebook";
import { CuttingMat } from "@/components/CuttingMat";
import { Asterisk, EditorialHero } from "@/components/EditorialHero";
import { JsonLd } from "@/components/JsonLd";
import { Phases } from "@/components/Phases";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
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
      <dl className="mt-5 max-w-xl border-b border-line">
        {audiences.items.map((a) => (
          <div key={a.title} className="grid gap-1 border-t border-line py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-[15px] font-medium">{a.title}</dt>
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
        <section id="about" className={`${section} overflow-x-clip`}>
          <Container className="grid items-start gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            {/* Left: the heading and copy at the top, Who I work with pushed to the bottom, level
                with the foot of the mat */}
            <div className="flex flex-col lg:pt-10">
              <Reveal>
                <h2 className={sectionHeading}><Rich text={about.heading} /></h2>
              </Reveal>
              <Reveal as="p" delay={60} className="mt-5 max-w-xl font-sans text-[17px] leading-snug tracking-[-0.02em] lg:mt-6 lg:text-[20px]">{about.body}</Reveal>
              <Reveal delay={100} className="mt-14 lg:mt-auto lg:pt-16">
                <AudienceList />
              </Reveal>
            </div>

            {/* Laid out like a desktop on the blue cutting mat: the photo, tools and a folder as files */}
            <Reveal className="relative overflow-hidden rounded-[20px] p-6 sm:p-8 lg:p-10">
              <CuttingMat />
              <div className="relative">
                <AboutNotebook onMat />
              </div>
            </Reveal>
          </Container>
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



        {/* Working style: a picture on the left; the eyebrow, heading, intro and three principles on
            the right, the principles pushed to the bottom so they line up with the picture's foot */}
        <section id="working-style" className={section}>
          <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* The clouds photo filling the square, with a storefront in a browser window floating on it */}
            <Reveal className="relative grid aspect-square place-items-center overflow-hidden bg-sky">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={workingStyle.image.background} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
              <div aria-hidden className="relative w-[80%] overflow-hidden rounded-[10px] bg-white shadow-[0_24px_60px_rgb(26_26_26/0.28)]">
                {/* The window's top bar: three dots and the address */}
                <div className="flex items-center gap-3 border-b border-line bg-sheet px-3 py-2">
                  <span className="flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} className="size-2.5 rounded-full" style={{ background: c }} />)}</span>
                  <span className="mx-auto w-1/2 truncate rounded-full bg-white px-3 py-0.5 text-center text-[11px] text-muted">{workingStyle.image.url}</span>
                  <span className="w-[42px]" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={workingStyle.image.mockup} alt="" width={workingStyle.image.mockupWidth} height={workingStyle.image.mockupHeight} loading="lazy" decoding="async" className="block w-full" />
              </div>
            </Reveal>
            <div className="flex flex-col">
              <Reveal>
                <Eyebrow>{workingStyle.eyebrow}</Eyebrow>
                <h2 className={sectionHeading}>{workingStyle.heading}</h2>
                <p className="lede mt-5 max-w-xl">{workingStyle.body}</p>
              </Reveal>
              <ul className="mt-10 divide-y divide-line border-y border-line lg:mt-auto">
                {workingStyle.items.map((it, i) => (
                  <Reveal as="li" key={it.title} delay={i * 80} className="flex items-start gap-5 py-5">
                    <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-ui bg-accent text-white">
                      <Asterisk className="size-8" weight={2} />
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
