import type { BlogPost } from "../blog/data";
import { Chip } from "./Chip";

type BlogCardProps = {
  post: Pick<
    BlogPost,
    "slug" | "title" | "kicker" | "category" | "date" | "coverImage"
  >;
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
      className="card grain-paper bg-[#FAF9F2] text-ink flex flex-col justify-between gap-6 !min-h-0 group !pl-14"
    >
      {/* Three hole punches down the left edge, evenly spaced —
          binder-paper visual language. Inline position:absolute
          overrides the .card > * relative + z-index rule. */}
      <span
        aria-hidden="true"
        style={{ position: "absolute" }}
        className="left-3 top-6 bottom-6 flex flex-col justify-between z-[1]"
      >
        <span className="block w-4 h-4 rounded-full bg-[#FBFAF6]" />
        <span className="block w-4 h-4 rounded-full bg-[#FBFAF6]" />
        <span className="block w-4 h-4 rounded-full bg-[#FBFAF6]" />
      </span>
      {/* Vertical margin rule running the full card height, just
          right of the hole-punch column. */}
      <span
        aria-hidden="true"
        style={{ position: "absolute" }}
        className="left-9 top-0 bottom-0 w-px bg-[#1A191E]/25 z-[1]"
      />
      <div className="flex items-center justify-between gap-2 text-base">
        <span className="opacity-70">{dateLabel}</span>
        {/* Category as a grey pill, matching the label style used on the
            project tabs and capability groups. */}
        <Chip className="shrink-0">{post.category}</Chip>
      </div>
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          aria-hidden="true"
          className="w-full aspect-[16/9] object-cover"
        />
      ) : null}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl group-hover:opacity-70 transition-opacity">
          {post.title}
        </h3>
        <p className="text-base opacity-80 line-clamp-2">{post.kicker}</p>
      </div>
    </a>
  );
}
