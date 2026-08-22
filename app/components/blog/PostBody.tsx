import { type BlogBlock } from "../../blog/data";

/** Kebab-case a heading string for use as a scroll anchor id. */
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Post body — plain-text TOC in the left column, rich blocks on the
 *  right. Falls back to an author card when a post has no h2 blocks. */
export function PostBody({ body }: { body: BlogBlock[] }) {
  // h2 blocks become anchor links in the yellow TOC card on the left.
  const toc = body
    .filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: slugify(b.text), text: b.text }));

  return (
    <>
      {/* === BODY === Plain-text TOC in the left column; rich block
          rendering in the right column (p / h2 with anchor / h3 / image
          placeholder). If a post has no h2 blocks, the TOC falls back
          to an author card so the column doesn't sit empty. */}
      <section
        data-section="post-body"
        className="p-6 md:px-10 md:pt-16 md:pb-16 section-border-b"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-24">
          <aside className="md:col-span-4 md:sticky md:top-24 md:self-start flex flex-col gap-4">
            {toc.length > 0 ? (
              <nav
                aria-label="On this page"
                className="section-chamfer flex flex-col bg-[#f3eb88] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_10px_24px_rgba(0,0,0,0.10)]"
                style={{ ["--section-chamfer-size" as string]: "24px" }}
              >
                <p className="text-lg leading-[1.3] text-ink mb-3">
                  On this page
                </p>
                <ol className="flex flex-col gap-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-base leading-[1.15] text-ink hover:opacity-70 transition-opacity"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
                {/* Back to /blog — inside the TOC card, pinned to the
                    bottom of the flex column. mt-auto keeps it there
                    if the card ever stretches to a shared height;
                    pt-6 guarantees the 24px gap above regardless. */}
                <a
                  href="/blog"
                  className="mt-auto pt-6 self-start text-sm leading-[1.3] text-ink underline underline-offset-4 decoration-1 opacity-70 hover:opacity-100 transition-opacity"
                >
                  Back to blog
                </a>
              </nav>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="type-eyebrow">Author</span>
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-display leading-[1.1] text-ink">
                    Paige Eaton
                  </p>
                  <p className="text-sm leading-[1.4] opacity-60">Product Paige</p>
                </div>
              </div>
            )}
          </aside>
          <article className="md:col-span-8 flex flex-col gap-6 max-w-[680px]">
            {body.map((block, i) => {
              if (block.type === "p") {
                return (
                  <p key={i} className="text-lg leading-[1.4] opacity-90">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "h2") {
                const id = slugify(block.text);
                return (
                  <h2
                    key={i}
                    id={id}
                    className="text-3xl md:text-4xl font-display leading-[1.15] tracking-[-1px] text-ink mt-6 -mb-3 scroll-mt-24"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3
                    key={i}
                    className="text-xl md:text-2xl font-display leading-[1.2] text-ink mt-4 -mb-3"
                  >
                    {block.text}
                  </h3>
                );
              }
              // image placeholder — grey block + optional caption.
              return (
                <figure key={i} className="flex flex-col gap-3 my-4">
                  <div
                    role="img"
                    aria-label={block.alt ?? "Image placeholder"}
                    className="w-full aspect-[16/9] bg-[#DBE6EB] flex items-center justify-center"
                  >
                    <span className="text-sm opacity-50 uppercase tracking-[0.14em] font-mono">
                      Image
                    </span>
                  </div>
                  {block.caption ? (
                    <figcaption className="text-base leading-[1.4] opacity-60">
                      {block.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </article>
        </div>
      </section>
    </>
  );
}
