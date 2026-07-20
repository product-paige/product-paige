import { notFound } from "next/navigation";
import { ClosingCTA } from "../../components/ClosingCTA";
import { PostMeta } from "../../components/PostMeta";
import { BlogCard } from "../../components/BlogCard";
import { blogPosts, blogList } from "../data";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  const related = blogList.filter((p) => p.slug !== slug).slice(0, 2);
  const dateFormatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

      {/* === HERO === */}
      <section
        id="post-hero"
        data-section="post-hero"
        className="p-6 md:p-10 section-border-b"
      >
        <div className="flex flex-col gap-6 max-w-[820px]">
          <PostMeta items={["Blog", post.category, post.readingTime, dateFormatted]} />
          <h1 className="text-display font-display text-ink max-w-[18ch]">{post.title}</h1>
          <p className="text-lg leading-[1.4] opacity-80">{post.kicker}</p>
        </div>
      </section>

      {/* === COVER === */}
      <section data-section="post-cover" className="p-6 md:p-10 section-border-b">
        <div
          className="placeholder w-full aspect-[16/9]"
          aria-label={`Cover — ${post.title}`}
        />
      </section>

      {/* === BODY === */}
      <section data-section="post-body" className="p-6 md:p-10 section-border-b">
        <div className="grid md:grid-cols-12 gap-6 md:gap-16">
          <aside className="md:col-span-3 flex flex-col gap-3">
            <span className="type-eyebrow">Author</span>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-display leading-[1.1] text-ink">Paige Eaton</p>
              <p className="text-sm leading-[1.4] opacity-60">Product Paige</p>
            </div>
          </aside>
          <article className="md:col-span-9 flex flex-col gap-6 max-w-[680px]">
            {post.body.map((para, i) => (
              <p key={i} className="text-lg leading-[1.4] opacity-90">
                {para}
              </p>
            ))}
          </article>
        </div>
      </section>

      {/* === RELATED === */}
      {related.length > 0 ? (
        <section
          data-section="post-related"
          className="p-6 md:p-10 flex flex-col gap-10 section-border-b"
        >
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">More reading</span>
            <h2 className="text-section font-display text-ink max-w-[24ch]">Keep going</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-stretch">
            {related.map((r) => (
              <BlogCard key={r.slug} post={r} />
            ))}
          </div>
        </section>
      ) : null}

      <ClosingCTA
        title="Bring the messy version."
        body="A link, a screenshot, the half-finished idea. I'll help you find the seams and what's worth fixing first."
      />
    </div>
  );
}
