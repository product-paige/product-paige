import { BlogCard } from "../BlogCard";
import { LinkBtn } from "../LinkBtn";
import { blogList } from "../../blog/data";

/** Latest three posts. Last section on the page — no bottom border. */
export function BlogRow() {
  return (
    <>
      {/* === BLOG — latest posts row === last section, no bottom border */}
      <section
        id="blog"
        data-section="blog"
        className="p-6 md:px-10 md:py-10 flex flex-col gap-10"
      >
        <div className="flex flex-wrap items-start justify-between gap-6">
          <h2 className="text-section font-display text-ink max-w-[20ch]">
            From the notebook
          </h2>
          <LinkBtn href="/blog" className="shrink-0">Read all notes</LinkBtn>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {blogList.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
