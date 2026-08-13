import { notFound } from "next/navigation";
import { BlogCard } from "../../components/BlogCard";
import { blogPosts, blogList, type BlogBlock } from "../data";

/** Kebab-case a heading string for use as a scroll anchor id. */
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  const related = blogList.filter((p) => p.slug !== slug).slice(0, 3);
  const dateFormatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Pull h2 blocks out for the sticky table of contents. Each becomes
  // an anchor link in the yellow TOC card on the left.
  const toc = post.body
    .filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: slugify(b.text), text: b.text }));

  const postUrl = `https://productpaige.com/blog/${slug}`;
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#post`,
    headline: post.title,
    description: post.kicker,
    articleSection: post.category,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-US",
    mainEntityOfPage: postUrl,
    author: { "@id": "https://productpaige.com/#paige" },
    publisher: { "@id": "https://productpaige.com/#paige" },
    image: [`https://productpaige.com/og-image.webp`],
  };

  return (
    <div className="theme contents">
      {/* Per-post structured data — helps Google surface title, author, and
          publish date in rich results. Points at the site-wide Person schema
          in app/layout.tsx via `@id`. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* === HERO === chamfered plaque, same shape as project hero.
          Meta row (date / category) floated to the right. Breadcrumb
          back-link sits inline above the h1. */}
      <section
        id="post-hero"
        data-section="post-hero"
        className="grain-paper px-6 md:px-10 py-16 mx-6 md:mx-10 mt-6 md:mt-10 section-chamfer relative overflow-hidden"
        style={{ backgroundColor: "#FAF9F2", color: "#1a1a1a" }}
      >
        {/* Title + kicker on the left, meta pinned to the top-right,
            all top-aligned so the meta row sits on the h1's first
            baseline instead of centered against the whole block. */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
          <div className="flex flex-col gap-3 min-w-0 flex-1">
            <h1 className="text-display font-display text-ink max-w-[20ch]">
              {post.title}
            </h1>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[56ch]">
              {post.kicker}
            </p>
          </div>
          <div className="flex items-baseline gap-x-2 text-base leading-[1.4] opacity-80 whitespace-nowrap shrink-0">
            <span>{dateFormatted}</span>
            <span aria-hidden="true" className="opacity-40">/</span>
            <span>{post.category}</span>
          </div>
        </div>
      </section>

      {/* === BODY === Plain-text TOC in the left column; rich block
          rendering in the right column (p / h2 with anchor / h3 / image
          placeholder). If a post has no h2 blocks, the TOC falls back
          to an author card so the column doesn't sit empty. */}
      <section
        data-section="post-body"
        className="p-6 md:px-10 md:pt-16 md:pb-16 section-border-b"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-24">
          <aside className="md:col-span-4 md:sticky md:top-24 md:self-start flex flex-col gap-4">
            {toc.length > 0 ? (
              <nav
                aria-label="On this page"
                className="section-chamfer flex flex-col bg-[#f3eb88] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_10px_24px_rgba(0,0,0,0.10)]"
                style={{ ["--section-chamfer-size" as string]: "24px" }}
              >
                <p className="text-lg leading-[1.3] text-ink mb-3">
                  On this page
                </p>
                <ol className="flex flex-col gap-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-base leading-[1.15] text-ink hover:opacity-70 transition-opacity"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
                {/* Back to /blog — inside the TOC card, pinned to the
                    bottom of the flex column. mt-auto keeps it there
                    if the card ever stretches to a shared height;
                    pt-6 guarantees the 24px gap above regardless. */}
                <a
                  href="/blog"
                  className="mt-auto pt-6 self-start text-sm leading-[1.3] text-ink underline underline-offset-4 decoration-1 opacity-70 hover:opacity-100 transition-opacity"
                >
                  Back to blog
                </a>
              </nav>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="type-eyebrow">Author</span>
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-display leading-[1.1] text-ink">
                    Paige Eaton
                  </p>
                  <p className="text-sm leading-[1.4] opacity-60">Product Paige</p>
                </div>
              </div>
            )}
          </aside>
          <article className="md:col-span-8 flex flex-col gap-6 max-w-[680px]">
            {post.body.map((block, i) => {
              if (block.type === "p") {
                return (
                  <p key={i} className="text-lg leading-[1.4] opacity-90">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "h2") {
                const id = slugify(block.text);
                return (
                  <h2
                    key={i}
                    id={id}
                    className="text-3xl md:text-4xl font-display leading-[1.15] tracking-[-1px] text-ink mt-6 -mb-3 scroll-mt-24"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3
                    key={i}
                    className="text-xl md:text-2xl font-display leading-[1.2] text-ink mt-4 -mb-3"
                  >
                    {block.text}
                  </h3>
                );
              }
              // image placeholder — grey block + optional caption.
              return (
                <figure key={i} className="flex flex-col gap-3 my-4">
                  <div
                    role="img"
                    aria-label={block.alt ?? "Image placeholder"}
                    className="w-full aspect-[16/9] bg-[#DBE6EB] flex items-center justify-center"
                  >
                    <span className="text-sm opacity-50 uppercase tracking-[0.14em] font-mono">
                      Image
                    </span>
                  </div>
                  {block.caption ? (
                    <figcaption className="text-base leading-[1.4] opacity-60">
                      {block.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </article>
        </div>
      </section>

      {/* === RELATED === always 3 columns; if there are fewer than
          three related posts, the empty columns are left blank so the
          grid rhythm holds. */}
      {related.length > 0 ? (
        <section
          data-section="post-related"
          className="p-6 md:px-10 md:py-10 flex flex-col gap-10 section-border-b"
        >
          <h2 className="text-section font-display text-ink max-w-[24ch]">Keep going</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
            {related.map((r) => (
              <BlogCard key={r.slug} post={r} />
            ))}
          </div>
        </section>
      ) : null}

    </div>
  );
}
