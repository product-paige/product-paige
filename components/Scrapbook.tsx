import { blog, livePosts, type Post } from "@/content";
import { Chip, Container, Eyebrow, Reveal, sansTitle } from "./ui";

type CardStyle = "plain" | "sheet" | "leaf";

/**
 * A post as a card, linking to it. Used on the homepage and under each post (sheet by default). Three styles:
 * plain (the picture, then the date and tag, title and excerpt), sheet (the same on a grey paper
 * sheet with punch holes and a folded corner) and leaf (a loose-leaf notebook page with punch holes, a margin
 * rule and a folded corner; see .scrap, .loose-leaf and .folded in globals.css).
 */
export function ScrapCard({ p, style = "sheet" }: { p: Post; style?: CardStyle }) {
  const meta = (
    <div className={`flex items-center justify-between gap-3 ${style === "plain" ? "mt-5" : "mb-5"}`}>
      <time className="small font-medium text-muted">{p.date}</time>
      <Chip className="text-[13px] text-white [--color-chip:var(--color-accent)]">{p.tag}</Chip>
    </div>
  );
  const picture = (
    <span className="photo-grain block overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt="" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
    </span>
  );
  const words = (
    <>
      <h3 className={`${sansTitle} ${style === "plain" ? "mt-3" : "mt-6"} transition-colors group-hover:text-accent`}>{p.title}</h3>
      <p className="copy mt-2 line-clamp-2">{p.excerpt}</p>
    </>
  );
  if (style === "leaf") return <a href={`/blog/${p.slug}`} className="scrap loose-leaf folded tilt group">{meta}{picture}{words}</a>;
  if (style === "sheet") return <a href={`/blog/${p.slug}`} className="folded punched tilt group block h-full bg-sheet py-5 pr-5 pb-9 lg:py-6 lg:pr-6 lg:pb-10">{meta}{picture}{words}</a>;
  return <a href={`/blog/${p.slug}`} className="group block">{picture}{meta}{words}</a>;
}

export function Scrapbook({ className = "", style = "sheet", id = "blog" }: { className?: string; style?: CardStyle; id?: string }) {
  if (!blog.live) return null;
  return (
    <section id={id} className={className}>
      <Container>
        {/* A list section: the mono label is the heading, the link to the rest on the right */}
        <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Eyebrow as="h2">{blog.eyebrow}</Eyebrow>
          {blog.href && (
            <a href={blog.href} className="link">
              {blog.linkLabel}
            </a>
          )}
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {livePosts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <ScrapCard p={p} style={style} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
