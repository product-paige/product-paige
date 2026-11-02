import type { Metadata } from "next";
import { approachPage, projects, site } from "@/content";
import { FaqSection } from "@/components/FaqSection";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { WhoIWorkWith } from "@/components/WhoIWorkWith";
import { Button, Chip, Container, Reveal, Rich, section, sectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: `${approachPage.heading} · ${site.name}`,
  description: approachPage.lede,
};

/**
 * How the work runs: a short hero, Who I work with (shared with the homepage), the four phases as
 * numbered rows with what each can include and the case studies that show it, a call to action,
 * and the FAQs (also shared).
 */
export default function ApproachPage() {
  const project = (slug: string) => projects.items.find((p) => p.slug === slug);
  return (
    <>
      <PageRails />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-t border-grid">
          <Container className="pt-14 pb-14 lg:pt-20 lg:pb-20">
            <Reveal>
              <p className="text-[15px] font-medium text-muted lg:text-[16px]">{approachPage.eyebrow}</p>
              <h1 className="serif mt-4 text-[clamp(44px,6.6vw,90px)] leading-[1.02] tracking-[-0.04em]">{approachPage.heading}</h1>
              <p className="mt-6 max-w-2xl font-sans text-[18px] leading-snug tracking-[-0.02em] lg:mt-8 lg:text-[22px]">{approachPage.lede}</p>
            </Reveal>
          </Container>
        </section>

        <WhoIWorkWith body={approachPage.audiencesBody} />

        {/* The four phases. Dividers run out to the sheet's edges; the rows keep the usual inset. */}
        <section className="border-t border-grid">
          <Container>
            <div className="md:-mx-12 lg:-mx-20">
              {approachPage.phases.map((ph, i) => (
                <Reveal as="article" key={ph.title} className="grid gap-6 border-grid py-10 not-first:border-t md:grid-cols-[auto_1.1fr_1fr] md:gap-8 md:px-12 lg:gap-12 lg:px-20 lg:py-16">
                  <p className="serif text-[clamp(28px,2.8vw,38px)] leading-none text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <h2 className="serif text-[clamp(28px,3vw,42px)] leading-[1.05] tracking-[-0.04em]">{ph.title}</h2>
                    <p className="mt-4 max-w-lg text-muted">{ph.body}</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[14px] font-medium">Can include</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium">Case studies</p>
                      <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                        {ph.caseStudies.map((slug) => {
                          const p = project(slug);
                          return p && <a key={slug} href={`/projects/${slug}`} className="link">{p.client}</a>;
                        })}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Call to action */}
        <section className={section}>
          <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <h2 className={`${sectionHeading} max-w-3xl`}><Rich text={approachPage.cta.heading} /></h2>
            </Reveal>
            <Reveal>
              <Button href={approachPage.cta.href} accent>{approachPage.cta.button}</Button>
            </Reveal>
          </Container>
        </section>

        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
