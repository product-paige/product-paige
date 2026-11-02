import type { Metadata } from "next";
import { approachPage, site } from "@/content";
import { FaqSection } from "@/components/FaqSection";
import { Phases } from "@/components/Phases";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { WhoIWorkWith } from "@/components/WhoIWorkWith";
import { Button, Container, Reveal, Rich, section, sectionHeading } from "@/components/ui";

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

        {/* The four phases */}
        <section className="border-t border-grid">
          <Container>
            <Phases caseStudies />
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
