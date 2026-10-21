import { site, type legal } from "@/content";
import { PageRails, SiteFooter, SiteHeader } from "./SiteChrome";
import { Container, Reveal, Rich, sansTitle, section, sectionHeading } from "./ui";

type Doc = (typeof legal)[keyof typeof legal];

/** Privacy and terms: a heading and intro, then each section as a labelled block. */
export function LegalPage({ doc }: { doc: Doc }) {
  return (
    <>
      <PageRails />
      <SiteHeader />
      <main>
        <section className={section}>
          <Container>
            <Reveal className="max-w-2xl">
              <p className="text-[14px] label text-muted">{doc.label}</p>
              <h1 className={`${sectionHeading} mt-4`}><Rich text={doc.heading} /></h1>
              <p className="lede mt-6">{doc.lede}</p>
              <p className="mt-4 text-[14px] text-muted">Effective {doc.effective}</p>
            </Reveal>
          </Container>
        </section>
        <section className={section}>
          <Container>
            <ul className="max-w-2xl divide-y divide-line border-y border-line">
              {doc.sections.map((s) => (
                <li key={s.title} className="grid gap-2 py-8 md:grid-cols-[140px_1fr] md:gap-8">
                  <p className="text-[14px] label text-muted">{s.label}</p>
                  <div>
                    <h2 className={sansTitle}>{s.title}</h2>
                    <p className="mt-2">{s.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-10">
              Questions? Email <a href={`mailto:${site.email}`} className="link">{site.email}</a>
            </p>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
