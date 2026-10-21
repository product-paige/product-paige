import type { Metadata } from "next";
import { projects, site } from "@/content";
import { Folder } from "@/components/Folder";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Container, Reveal, Rich, section, sectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: `${projects.pageHeading} · ${site.name}`,
  description: projects.pageBody,
};

/** All projects as folders, two to a row, each opening its case study. */
export default function ProjectsPage() {
  return (
    <>
      <PageRails />
      <SiteHeader />
      <main>
        <section className={section}>
          <Container>
            <Reveal className="mb-10 grid gap-5 lg:mb-16 lg:grid-cols-2 lg:items-end lg:gap-16">
              <h1 className={sectionHeading}><Rich text={projects.pageHeading} /></h1>
              <p className="lede max-w-xl">{projects.pageBody}</p>
            </Reveal>
            <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-x-12 lg:gap-y-14">
              {projects.items.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 120}>
                  <Folder p={p} i={i} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
