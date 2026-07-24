import type { BlogPost } from "../blog/data";

type BlogCardProps = {
  post: Pick<BlogPost, "slug" | "title" | "kicker" | "category" | "date">;
};

/**
 * Standard blog card. Grid-bg background, category chip + date at top,
 * title + kicker at bottom. Used on the homepage Notes row, the blog
 * index list, and related posts on individual post pages.
 */
export function BlogCard({ post }: BlogCardProps) {
  const dateLabel = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <a
      href={`/blog/${post.slug}`}
      className="card grain-off bg-[#DBE6EB] text-ink flex flex-col justify-between gap-8 !min-h-0 aspect-[16/9] group !pl-11"
    >
      {/* Three hole punches down the left edge, evenly spaced —
          binder-paper visual language. Inline position:absolute
          overrides the .card > * relative + z-index rule. */}
      <span
        aria-hidden="true"
        style={{ position: "absolute" }}
        className="left-4 top-6 bottom-6 flex flex-col justify-between z-[1]"
      >
        <span className="block w-2.5 h-2.5 rounded-full bg-[#1A191E]/25" />
        <span className="block w-2.5 h-2.5 rounded-full bg-[#1A191E]/25" />
        <span className="block w-2.5 h-2.5 rounded-full bg-[#1A191E]/25" />
      </span>
      {/* Vertical margin rule running the full card height, just
          right of the hole-punch column. */}
      <span
        aria-hidden="true"
        style={{ position: "absolute" }}
        className="left-9 top-0 bottom-0 w-px bg-[#1A191E]/25 z-[1]"
      />
      <div className="flex items-center justify-between gap-2">
        <span className="svc-label text-ink">
          <span
            className="svc-label-text"
            style={{
              backgroundColor: "#DBE6EB",
              borderColor: "#1A191E",
            }}
          >
            {post.category}
          </span>
        </span>
        <span className="text-base opacity-60">{dateLabel}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl group-hover:opacity-70 transition-opacity">
          {post.title}
        </h3>
        <p className="text-base opacity-80 line-clamp-3">{post.kicker}</p>
      </div>
    </a>
  );
}
