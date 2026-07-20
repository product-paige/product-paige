import { ClosingCTA } from "../components/ClosingCTA";
import { PostMeta } from "../components/PostMeta";
import { BlogCard } from "../components/BlogCard";
import { blogList } from "./data";

export default function BlogIndexPage() {
  const [feature, ...rest] = blogList;

  return (
    <div className="theme contents">

      {/* === HEADER === matches other simple-header pages (privacy, terms) */}
      <section
        id="blog-hero"
        data-section="blog-hero"
        className="p-6 md:p-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Blog</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h1 className="text-display font-display text-ink max-w-[30ch]">
              Notes on shipping clearly
            </h1>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Short reads on positioning, ecommerce UX, and AI content design.
              For founders and product teams shipping fast.
            </p>
          </div>
        </div>
      </section>

      {/* === FEATURED POST === */}
      {feature ? (
        <section data-section="blog-feature" className="p-6 md:p-10 section-border-b">
          <a
            href={`/blog/${feature.slug}`}
            className="grid md:grid-cols-2 gap-6 md:gap-12 items-stretch group"
          >
            <div
              className="placeholder w-full aspect-[4/3] transition-opacity group-hover:opacity-90"
              aria-label={`Cover — ${feature.title}`}
            />
            <div className="flex flex-col gap-6 justify-center">
              <PostMeta items={["Featured", feature.category, feature.readingTime]} size="sm" />
              <div className="flex flex-col gap-3">
                <h2 className="text-section font-display text-ink max-w-[18ch] group-hover:opacity-70 transition-opacity">
                  {feature.title}
                </h2>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[520px]">
                  {feature.kicker}
                </p>
              </div>
              <span className="text-[15px] font-medium leading-none tracking-[-0.01em] border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
                Read post ↗
              </span>
            </div>
          </a>
        </section>
      ) : null}

      {/* === POST LIST === */}
      {rest.length > 0 ? (
        <section data-section="blog-list" className="p-6 md:p-10 section-border-b">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">More posts</span>
              <h2 className="text-section font-display text-ink max-w-[24ch]">
                From the notebook
              </h2>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
              {rest.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ClosingCTA
        title="Have a topic you want me to write about?"
        body="Send it. Best posts start from a real question a founder is stuck on."
        ctaLabel="Say hello"
        ctaHref="mailto:hello@productpaige.com?subject=Blog%20topic%20idea"
      />
    </div>
  );
}
