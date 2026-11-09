import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, site, type Project } from "@/content";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Button, Chip, Container, Reveal, sectionHeading, sideHeading } from "@/components/ui";

type Params = { slug: string };

// Panels shown until a project has its own screenshots.
const placeholderGallery: NonNullable<Project["gallery"]> = [{ caption: "Homepage" }, { caption: "Product page" }, { caption: "Mobile" }];

export function generateStaticParams(): Params[] {
  return projects.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.items.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.client} · ${site.logo}`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.client, description: p.summary, ...(p.image && { images: [p.image] }) },
  };
}

/**
 * A case study laid out like a studio project page: on desktop a narrow column on the left stays
 * pinned (the name and description, then the problem, approach, outcome and scope as an accordion) while large image panels
 * scroll past on the right. Then a full-width link to the next project.
 */
export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.items.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects.items[index];
  const nextIndex = (index + 1) % projects.items.length;
  const next = projects.items[nextIndex];
  const facts = [...p.highlights, ...p.specs];
  const story = [
    { q: "Problem", a: p.problem },
    { q: "Approach", a: p.approach },
    { q: "Outcome", a: p.outcome },
    {
      q: "Scope",
      // The key facts in a small two-column grid, then what the work covered as pills
      a: (
        <>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[13px] text-muted">{f.label}</dt>
                <dd className="mt-0.5 text-[14px] leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.capabilities.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
          </ul>
        </>
      ),
    },
  ];
  const gallery = p.gallery ?? placeholderGallery;

  return (
    <>
      <JsonLd data={{ "@type": "CreativeWork", name: p.client, description: p.summary, genre: p.role, creator: { "@type": "Person", name: site.name, url: site.url }, url: `${site.url}/projects/${p.slug}`, keywords: p.capabilities.join(", "), ...(p.image && { image: `${site.url}${p.image}` }) }} />
      <SiteHeader />
      <div className="page-frame">
      <PageRails />
      <main>
        {/* No top rule: the sticky header above already draws one */}
        <section className="py-8 lg:py-12">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-12">
            {/* Pinned column */}
            <Reveal className="lg:sticky lg:top-[92px] lg:self-start">
              {/* The role as a pill in the ground's blue, then the name and the longer description */}
              <Chip className="text-white [--color-chip:var(--color-accent)]">{p.role}</Chip>
              <h1 className={`${sideHeading} mt-4`}>{p.client}</h1>
              <p className="mt-3 leading-[1.5]">{p.summary}</p>


              <div className="mt-6">
                <Faq items={story} />
              </div>

              {/* Under the dropdowns: start a project (opens the contact drawer) and the live site */}
              <div className="mt-16 flex flex-wrap gap-3">
                <Button href={site.bookingUrl}>{projects.cta.label}</Button>
                {p.liveUrl && <Button href={p.liveUrl}>View the live site</Button>}
              </div>
            </Reveal>

            {/* Large panels */}
            <div className="grid gap-4 lg:gap-6">
              {gallery.map((g, i) => (
                <Reveal key={g.caption} delay={i === 0 ? 120 : 0}>
                  {/* A photo shows at its own shape, uncropped; an empty panel keeps the wide placeholder shape */}
                  <figure className={`relative overflow-hidden rounded-ui bg-scrap ${g.src ? "" : "aspect-[4/3] lg:aspect-[16/11]"}`}>
                    {g.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={g.src} alt={`${p.client}: ${g.caption}`} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="block h-auto w-full" />
                    ) : (
                      <span className="grid size-full place-items-center serif text-[28px] text-muted">{g.caption}</span>
                    )}
                    {g.src && (
                      <figcaption className="absolute bottom-3 left-3">
                        <Chip className="bg-paper">{g.caption}</Chip>
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Next project: one full-width row linking on, the name large with an arrow at the far right */}
        <section className="border-t border-grid">
          <a href={`/projects/${next.slug}`} className="group block transition-colors hover:bg-sheet">
            <Container className="flex items-center justify-between gap-8 py-10 lg:py-14">
              <div>
                <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />{projects.nextLabel}</p>
                <p className={`${sectionHeading} mt-6 transition-colors group-hover:text-accent`}>{next.client}</p>
              </div>
              <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="size-10 shrink-0 text-muted transition duration-300 group-hover:translate-x-1 group-hover:text-accent lg:size-12">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </Container>
          </a>
        </section>
      </main>
      </div>
      <SiteFooter />
    </>
  );
}
