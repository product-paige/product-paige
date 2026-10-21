import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, site } from "@/content";
import { Cover, Folder } from "@/components/Folder";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Button, Chip, Container, Reveal, sansTitle, section, sectionHeading } from "@/components/ui";

type Params = { slug: string };

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
 * A short case study: the project at a glance (name, tagline, summary, what it involved,
 * cover and key facts), then the problem, approach and outcome as three loose-leaf pages,
 * and the next project to read.
 */
export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.items.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects.items[index];
  const next = projects.items[(index + 1) % projects.items.length];
  const nextIndex = (index + 1) % projects.items.length;
  const facts = [...p.highlights, ...p.specs];
  const story = [
    { title: "Problem", body: p.problem },
    { title: "Approach", body: p.approach },
    { title: "Outcome", body: p.outcome },
  ];

  return (
    <>
      <PageRails />
      <SiteHeader />
      <main>
        {/* At a glance: text on the left; on desktop the cover fills the right column, from the
            divider out to the page rail and top to bottom. Phones stack the cover under the text. */}
        <section className="border-t border-grid">
          <Container className="grid lg:grid-cols-2 lg:pr-0">
            <Reveal className="py-8 lg:py-20 lg:pr-16">
              <a href="/#projects" className="link text-[15px]">All projects</a>
              <div className="mt-8 lg:mt-12">
                <Chip>{p.role}</Chip>
              </div>
              <h1 className={`${sectionHeading} mt-5`}>{p.client}</h1>
              <p className="serif mt-4 text-[22px] leading-[1.2] text-ink/80 lg:text-[26px]">{p.tagline}</p>
              <p className="mt-6 max-w-xl">{p.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="What it involved">
                {p.capabilities.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
              </ul>
              {p.liveUrl && (
                <div className="mt-8">
                  <Button href={p.liveUrl}>View the live site</Button>
                </div>
              )}
            </Reveal>
            <div className="relative mb-8 aspect-[4/3] bg-scrap lg:mb-0 lg:aspect-auto lg:border-l lg:border-grid">
              <Cover p={p} className="absolute inset-0 size-full" />
            </div>
          </Container>
        </section>

        {/* Key facts, in the same style as the About facts */}
        <section className={section}>
          <Container>
            <Reveal className="grid border-t border-line sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-line py-5 pr-4">
                  <p className="mb-1 text-[13px] label text-muted">{f.label}</p>
                  <p className="serif text-[18px] leading-snug lg:text-[20px]">{f.value}</p>
                </div>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* The short case study */}
        <section className={section}>
          <Container>
            <div className="grid gap-5 md:grid-cols-3 lg:gap-8">
              {story.map((s, i) => (
                <Reveal key={s.title} delay={i * 120}>
                  <div className="scrap loose-leaf folded">
                    <h2 className={sansTitle}>{s.title}</h2>
                    <p className="mt-3 text-ink/80">{s.body}</p>
                  </div>
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
                <Button href={site.bookingUrl}>Book an intro call</Button>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:max-w-[520px]">
              <Folder p={next} i={nextIndex} />
            </Reveal>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
