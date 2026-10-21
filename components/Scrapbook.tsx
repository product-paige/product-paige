import { blog } from "@/content";
import { Chip, Container, Reveal, Rich, sansTitle, sectionHeading } from "./ui";

/**
 * Blog teaser: three posts as loose-leaf notebook pages (punch holes, a margin
 * rule and a folded corner; see .scrap, .loose-leaf and .folded in globals.css). Each card links to the post.
 */
export function Scrapbook({ className = "" }: { className?: string }) {
  return (
    <section id="blog" className={className}>
      <Container>
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-16">
          <h2 className={sectionHeading}><Rich text={blog.heading} /></h2>
          <a href={blog.href} className="link text-[15px]">
            {blog.linkLabel}
          </a>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {blog.posts.map((p, i) => (
            <Reveal key={p.href} delay={i * 120}>
              <a href={p.href} className="scrap loose-leaf folded group">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <time className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted">{p.date}</time>
                  <Chip className="bg-white/70">{p.tag}</Chip>
                </div>
                <span className="photo-grain block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
                </span>
                <h3 className={`${sansTitle} mt-6`}>{p.title}</h3>
                <p className="mt-2 text-muted">{p.excerpt}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
