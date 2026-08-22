import { PostFilter } from "../components/blog/PostFilter";
import { FeaturedBlogCard } from "../components/FeaturedBlogCard";
import { blogList } from "./data";

export default function BlogIndexPage() {
  const [feature, ...rest] = blogList;

  return (
    <div className="theme contents">

      {/* === HERO === generous 64px vertical rhythm on desktop. */}
      <section
        id="blog-hero"
        data-section="blog-hero"
        className="p-6 md:px-10 md:py-10 section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          <h1 className="text-display font-display text-ink max-w-[30ch]">
            Notes on shipping clearly
          </h1>
          <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
            Short reads on positioning, ecommerce UX, and AI content design.
            For founders and product teams shipping fast.
          </p>
        </div>
      </section>

      {/* === FEATURED POST === image left, text right (FeaturedBlogCard).
          Bottom padding is 0 so the gap between this section and the
          category-filter section below adds up to exactly 40px (the
          list section's top padding is 40px). */}
      {feature ? (
        <section
          data-section="blog-feature"
          className="p-6 pb-0 md:px-10 md:pt-10 md:pb-0"
        >
          <FeaturedBlogCard post={feature} />
        </section>
      ) : null}

      {/* === POST LIST === clickable category chip filter above the
          grid. "All" is the default; click a category to filter the
          remaining posts. */}
      {rest.length > 0 ? (
        <section
          data-section="blog-list"
          className="p-6 md:px-10 md:pt-10 md:pb-10 section-border-b"
        >
          <PostFilter posts={rest} />
        </section>
      ) : null}

    </div>
  );
}
