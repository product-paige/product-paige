import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blog, livePosts, samplePostBody, site, type PostBlock } from "@/content";
import { JsonLd } from "@/components/JsonLd";
import { PostToc } from "@/components/PostToc";
import { ScrapCard } from "@/components/Scrapbook";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Container, Reveal, Rich, ScribbleBullet, section, sectionHeading } from "@/components/ui";

type Params = { slug: string };

// Only the posts that are out get a page; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return livePosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = livePosts.find((x) => x.slug === slug);
  if (!p) return {};
  const description = p.standfirst ?? p.excerpt;
  return {
    title: `${p.title} · ${site.logo}`,
    description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description, publishedTime: new Date(p.date).toISOString(), authors: [site.name], images: [p.image] },
  };
}

// A section heading's anchor, from its text ("What to do next" → "what-to-do-next").
const headingId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** One block of a post's body, in the reading column. */
function Block({ b, i }: { b: PostBlock; i: number }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return <h2 id={headingId(b.text)} className="serif scroll-mt-24 pt-4 text-[clamp(22px,2.2vw,31px)] leading-[1.1] tracking-[-0.04em]">{b.text}</h2>;
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
 * column on the left, split off by a full-height divider. Under it, the other posts as
 * Scrapbook cards.
 */
export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = livePosts.find((x) => x.slug === slug);
  if (!p) notFound();
  const body = p.body ?? samplePostBody;
  const more = livePosts.filter((x) => x.slug !== slug).slice(0, 3);
  const toc = body.flatMap((b) => (b.type === "h2" ? [{ id: headingId(b.text), text: b.text }] : []));

  return (
    <>
      <JsonLd data={{ "@type": "BlogPosting", headline: p.title, description: p.standfirst ?? p.excerpt, image: `${site.url}${p.image}`, datePublished: new Date(p.date).toISOString(), author: { "@type": "Person", name: site.name, url: site.url }, mainEntityOfPage: `${site.url}/blog/${p.slug}`, articleSection: p.tag }} />
      <SiteHeader />
      <div className="page-frame">
      <PageRails />
      <main>
        <article>
          {/* Hero: the text on the left with its own padding, the cover filling the right edge to
              edge, split by a full-height divider. No top rule: the sticky header draws one. */}
          <header className="lg:grid lg:grid-cols-2">
            {/* Editorial column: the topic, a big title and the standfirst, centred, with the credits
                along the bottom in cells split by fine rules */}
            <Reveal className="flex flex-col lg:min-h-full">
              <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 md:px-12 lg:py-16 lg:pr-16 lg:pl-20">
                <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />{p.tag}</p>
                <h1 className="serif mt-6 text-[clamp(36px,4.6vw,70px)] leading-[0.98] tracking-[-0.045em] text-balance"><Rich text={p.title} /></h1>
                <p className="lede mt-6 max-w-lg">{p.standfirst ?? p.excerpt}</p>
              </div>
              <dl className="grid grid-cols-3 border-t border-grid">
                {[
                  [blog.meta.published, <time key="d">{p.date}</time>],
                  [blog.meta.readTime, p.readTime],
                  [blog.meta.author, site.name],
                ].map(([label, value], i) => (
                  <div key={String(label)} className={`py-5 pr-4 ${i === 0 ? "pl-4 sm:pl-6 md:pl-12 lg:pl-20" : "border-l border-grid pl-4 lg:pl-6"}`}>
                    <dt className="mono">{label}</dt>
                    <dd className="mt-2 text-[15px]">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            {/* The cover, with the full-height divider on its left: landscape on phones, filling the
                hero's height beside the text on desktop */}
            <span className="photo-grain relative block border-t border-grid lg:border-t-0 lg:border-l">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" decoding="async" className="aspect-[4/3] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:size-full" />
            </span>
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
