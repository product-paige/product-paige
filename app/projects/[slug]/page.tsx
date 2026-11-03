import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, site, type Project } from "@/content";
import { Faq } from "@/components/Faq";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ArrowUpRight, Button, Chip, Container, Reveal, section, sectionHeading, sideHeading } from "@/components/ui";

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
  return { title: `${p.client} · ${site.name}`, description: p.summary };
}

/**
 * A case study laid out like a studio project page: on desktop a narrow column on the left stays
 * pinned (the name and description, then the problem, approach, outcome and scope as an accordion) while large image panels
 * scroll past on the right. Then the next project to read.
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
      <SiteHeader />
      <div className="page-frame">
      <PageRails />
      <main>
        {/* No top rule: the sticky header above already draws one */}
        <section className="py-8 lg:py-12">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-12">
            {/* Pinned column */}
            <Reveal className="lg:sticky lg:top-[92px] lg:self-start">
              {/* The name and the longer description */}
              <h1 className={sideHeading}>{p.client}</h1>
              <p className="mt-3 leading-[1.5]">{p.summary}</p>

              <div className="mt-6">
                <Faq items={story} />
              </div>

              {p.liveUrl && (
                <div className="mt-6">
                  <Button href={p.liveUrl}>View the live site</Button>
                </div>
              )}
            </Reveal>

            {/* Large panels */}
            <div className="grid gap-4 lg:gap-6">
              {gallery.map((g, i) => (
                <Reveal key={g.caption} delay={i === 0 ? 120 : 0}>
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-ui bg-scrap lg:aspect-[16/11]">
                    {g.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={g.src} alt={`${p.client}: ${g.caption}`} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="size-full object-cover" />
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

        {/* Next project, and a way to get in touch */}
        <section className={section}>
          <Container className="grid gap-10 lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className={sectionHeading}>Next project</h2>
              <p className="lede mt-5 max-w-md">Or, if you’ve seen enough, tell me about your store.</p>
              <div className="mt-8">
                <Button href={site.bookingUrl} accent>Let’s talk</Button>
              </div>
            </Reveal>
            {/* The next project as text: its role as an eyebrow, the name large, and its one line */}
            <Reveal delay={120}>
              <a href={`/projects/${next.slug}`} className="group block border-t border-grid pt-6 lg:pt-8">
                <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />{next.role}</p>
                <p className="serif mt-6 flex items-center gap-4 text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.04em] transition-colors group-hover:text-accent">
                  {next.client}
                  <ArrowUpRight className="size-8 shrink-0 lg:size-10" />
                </p>
                <p className="mt-3 max-w-md">{next.excerpt}</p>
              </a>
            </Reveal>
          </Container>
        </section>
      </main>
      </div>
      <SiteFooter />
    </>
  );
}
