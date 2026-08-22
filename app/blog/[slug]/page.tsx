import { notFound } from "next/navigation";
import { BlogCard } from "../../components/BlogCard";
import { blogPosts, blogList } from "../data";
import { PostBody } from "../../components/blog/PostBody";

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

      <PostBody body={post.body} />

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
