import type { BlogPost } from "../blog/data";

type FeaturedBlogCardProps = {
  post: Pick<BlogPost, "slug" | "title" | "kicker" | "category" | "readingTime">;
};

/**
 * Featured-post card for the /blog index. Wider, image-left / text-right
 * layout inside the same .card grain-paper container as BlogCard. The
 * two-column grid lives on an inner div because the .card class itself
 * hard-sets `display: flex; flex-direction: column`, which would collapse
 * a grid applied directly to the anchor.
 */
export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="card grain-paper bg-[#FAF9F2] text-ink group !min-h-0 !p-6 md:!p-10"
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-stretch h-full">
        {/* Image column — left */}
        <div
          className="placeholder w-full aspect-[4/3] transition-opacity group-hover:opacity-90"
          aria-label={`Cover — ${post.title}`}
        />
        {/* Text + meta column — right */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 text-sm leading-[1.4] opacity-70">
            <span>Featured</span>
            <span aria-hidden="true">·</span>
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-section font-display text-ink max-w-[18ch] group-hover:opacity-70 transition-opacity">
              {post.title}
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[520px]">
              {post.kicker}
            </p>
          </div>
          <span className="text-[15px] font-medium leading-none tracking-[-0.01em] border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
            Read post ↗
          </span>
        </div>
      </div>
    </a>
  );
}
