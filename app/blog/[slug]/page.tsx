import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blog, samplePostBody, site, type PostBlock } from "@/content";
import { PostToc } from "@/components/PostToc";
import { ScrapCard } from "@/components/Scrapbook";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Button, Container, Reveal, ScribbleBullet, section, sectionHeading } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blog.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = blog.posts.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title} · ${site.name}`, description: p.excerpt };
}

// A section heading's anchor, from its text ("What to do next" → "what-to-do-next").
const headingId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** One block of a post's body, in the reading column. */
function Block({ b, i }: { b: PostBlock; i: number }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return <h2 id={headingId(b.text)} className="serif scroll-mt-24 pt-4 text-[clamp(24px,2.4vw,34px)] leading-[1.1] tracking-[-0.04em]">{b.text}</h2>;
    case "quote":
      return (
        <blockquote className="serif border-l-2 border-accent py-1 pl-6 text-[clamp(22px,2vw,28px)] leading-[1.25] tracking-[-0.03em]">
          {b.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="space-y-2.5">
          {b.items.map((item, j) => (
            <li key={item} className="flex items-start gap-2.5">
              <ScribbleBullet variant={i + j} className="mt-1 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="py-2">
          {b.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.src} alt={b.caption} loading="lazy" decoding="async" className="w-full border border-line" />
          ) : (
            <span className="grid aspect-[16/10] place-items-center border border-line bg-scrap text-muted">Image</span>
          )}
          <figcaption className="mt-3 text-[14px] text-muted">{b.caption}</figcaption>
        </figure>
      );
  }
}

/**
 * A blog post: a two-column hero (the tag, date and read time as a mono eyebrow, the title and
 * standfirst on the left, the cover on the right), then the body with its contents pinned in a
 * column on the left, split off by a full-height divider. Under it, a way to get in touch and
 * the other posts as Scrapbook cards.
 */
export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = blog.posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const body = p.body ?? samplePostBody;
  const more = blog.posts.filter((x) => x.slug !== slug).slice(0, 3);
  const toc = body.flatMap((b) => (b.type === "h2" ? [{ id: headingId(b.text), text: b.text }] : []));

  return (
    <>
      <SiteHeader />
      <div className="page-frame">
      <PageRails />
      <main>
        <article>
          {/* No top rule: the sticky header above already draws one */}
          <header className={`${section} border-t-0`}>
            <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <a href="/#blog" className="link">{blog.backLabel}</a>
                <p className="mono mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 lg:mt-10">
                  <i aria-hidden className="size-3 rounded-full bg-accent" />
                  {p.tag}
                  <span aria-hidden className="text-muted">/</span>
                  <time className="text-muted">{p.date}</time>
                  <span aria-hidden className="text-muted">/</span>
                  <span className="text-muted">{p.readTime}</span>
                </p>
                <h1 className={`${sectionHeading} mt-6`}>{p.title}</h1>
                <p className="lede mt-5 max-w-2xl">{p.excerpt}</p>
              </Reveal>
              <Reveal delay={120}>
                <span className="photo-grain block border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" decoding="async" className="aspect-[4/3] w-full object-cover" />
                </span>
              </Reveal>
            </Container>
          </header>

          {/* Contents on the left, the body on the right, with a full-height divider between */}
          <section className="border-t border-grid lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
            <div className="border-b border-grid px-4 py-8 sm:px-6 md:px-12 lg:border-r lg:border-b-0 lg:py-14 lg:pr-10 lg:pl-20">
              <div className="lg:sticky lg:top-28">
                <PostToc label={blog.tocLabel} items={toc} />
              </div>
            </div>
            <div className="px-4 py-8 sm:px-6 md:px-12 lg:py-14 lg:pr-20 lg:pl-16">
              <div className="max-w-[680px] space-y-6 text-[17px] leading-[1.65] lg:text-[18px]">
                {body.map((b, i) => <Block key={i} b={b} i={i} />)}
              </div>
            </div>
          </section>
        </article>

        {/* Get in touch */}
        <section className={section}>
          <Container>
            <Reveal className="mx-auto flex max-w-[680px] flex-col items-start gap-5 border border-line bg-sheet p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
              <div>
                <h2 className="serif text-[clamp(22px,2vw,28px)] leading-[1.1]">{blog.cta.heading}</h2>
                <p className="mt-2">{blog.cta.body}</p>
              </div>
              <Button href={site.bookingUrl} accent>{blog.cta.label}</Button>
            </Reveal>
          </Container>
        </section>

        {/* The other posts */}
        {more.length > 0 && (
          <section className={section}>
            <Container>
              <Reveal className="mb-8 lg:mb-12">
                <h2 className={sectionHeading}>{blog.moreHeading}</h2>
              </Reveal>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {more.map((m, i) => (
                  <Reveal key={m.slug} delay={i * 120}>
                    <ScrapCard p={m} />
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
