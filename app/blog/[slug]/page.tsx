import { notFound } from "next/navigation";
import { ClosingCTA } from "../../components/ClosingCTA";
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

  return (
    <div className="theme-v2 contents">

      {/* === HERO === */}
      <section
        id="post-hero"
        data-section="post-hero"
        className="p-6 md:p-10 section-border-b"
      >
        <div className="flex flex-col gap-6 max-w-[820px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-[1.4] opacity-60">
            <span className="font-mono text-[11px] leading-[1.2] tracking-[0.1em] uppercase">Blog</span>
            <span className="dot-sep" aria-hidden="true" />
            <span>{post.category}</span>
            <span className="dot-sep" aria-hidden="true" />
            <span>{post.readingTime}</span>
            <span className="dot-sep" aria-hidden="true" />
            <span>{dateFormatted}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] text-[#1A191E] max-w-[18ch]">{post.title}</h1>
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
              <p className="text-xl font-display leading-[1.1] text-[#1A191E]">Paige Harris</p>
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
            <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-[#1A191E] max-w-[24ch]">Keep going</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="flex flex-col gap-4 group"
              >
                <div
                  className="placeholder w-full aspect-[4/3] transition-opacity group-hover:opacity-90"
                  aria-label={`Cover — ${r.title}`}
                />
                <div className="flex flex-wrap items-center gap-x-3 text-sm leading-[1.4] opacity-60">
                  <span>{r.category}</span>
                  <span className="dot-sep" aria-hidden="true" />
                  <span>{r.readingTime}</span>
                </div>
                <h3 className="text-xl font-display leading-[1.1] text-[#1A191E] group-hover:opacity-70 transition-opacity">
                  {r.title}
                </h3>
                <p className="text-base leading-[1.4] opacity-80 max-w-[420px]">{r.kicker}</p>
                <span className="text-[15px] font-medium leading-none tracking-[-0.01em] border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
                  Read post ↗
                </span>
              </a>
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
