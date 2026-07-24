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
      className="card grain-off bg-[#DBE6EB] text-ink flex flex-col justify-between gap-8 !min-h-0 aspect-[16/9] group"
    >
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
