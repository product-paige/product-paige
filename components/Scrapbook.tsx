import { blog, livePosts, type Post } from "@/content";
import { Chip, Container, Eyebrow, Reveal } from "./ui";

/**
 * A post as a loose-leaf notebook page (punch holes, a margin rule and a folded corner; see
 * .scrap, .loose-leaf and .folded in globals.css), linking to the post. Used on the homepage
 * and under each post.
 */
export function ScrapCard({ p }: { p: Post }) {
  return (
    <a href={`/blog/${p.slug}`} className="scrap loose-leaf folded tilt group">
      <div className="mb-5 flex items-center justify-between gap-3">
        <time className="small font-medium text-muted">{p.date}</time>
        <Chip className="text-[13px] text-white [--color-chip:var(--color-accent)]">{p.tag}</Chip>
      </div>
      <span className="photo-grain block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt="" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
      </span>
      <h3 className="mt-6 font-sans text-[16px] font-medium leading-snug tracking-[-0.03em] lg:text-[18px]">{p.title}</h3>
      <p className="copy mt-2 line-clamp-2">{p.excerpt}</p>
    </a>
  );
}

/** Blog teaser: the latest three posts as loose-leaf cards. */
export function Scrapbook({ className = "" }: { className?: string }) {
  if (!blog.live) return null;
  return (
    <section id="blog" className={className}>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {livePosts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <ScrapCard p={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
