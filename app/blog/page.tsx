import { ClosingCTA } from "../components/ClosingCTA";
import { blogList } from "./data";

export default function BlogIndexPage() {
  const [feature, ...rest] = blogList;

  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === HEADER === matches other simple-header pages (privacy, terms) */}
      <section
        id="blog-hero"
        data-section="blog-hero"
        className="p-6 md:p-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Blog</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h1 className="type-display-h1 max-w-[14ch]">
              Notes on shipping clearly.
            </h1>
            <p className="type-leading opacity-80 max-w-[560px]">
              Short reads on positioning, ecommerce UX, and AI content design.
              For founders and product teams shipping fast.
            </p>
          </div>
        </div>
      </section>

      {/* === FEATURED POST === */}
      {feature ? (
        <section data-section="blog-feature" className="p-6 md:p-10 section-border-b">
          <a
            href={`/blog/${feature.slug}`}
            className="grid md:grid-cols-2 gap-6 md:gap-12 items-stretch group"
          >
            <div
              className="placeholder w-full aspect-[4/3] transition-opacity group-hover:opacity-90"
              aria-label={`Cover — ${feature.title}`}
            />
            <div className="flex flex-col gap-6 justify-center">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 type-body-sm opacity-60">
                <span className="type-marker">Featured</span>
                <span>· {feature.category}</span>
                <span>· {feature.readingTime}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="type-display-h2 max-w-[18ch] group-hover:opacity-70 transition-opacity">
                  {feature.title}
                </h2>
                <p className="type-leading opacity-80 max-w-[520px]">
                  {feature.kicker}
                </p>
              </div>
              <span className="type-nav border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
                Read post ↗
              </span>
            </div>
          </a>
        </section>
      ) : null}

      {/* === POST LIST === */}
      {rest.length > 0 ? (
        <section data-section="blog-list" className="p-6 md:p-10 section-border-b">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">More posts</span>
              <h2 className="type-display-h2 max-w-[24ch]">
                From the notebook
              </h2>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {rest.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/blog/${p.slug}`}
                    className="flex flex-col gap-4 group h-full"
                  >
                    <div
                      className="placeholder w-full aspect-[4/3] transition-opacity group-hover:opacity-90"
                      aria-label={`Cover — ${p.title}`}
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3 type-body-sm opacity-60">
                      <span>{p.category}</span>
                      <span>· {p.readingTime}</span>
                    </div>
                    <h3 className="type-card-title group-hover:opacity-70 transition-opacity">
                      {p.title}
                    </h3>
                    <p className="type-body opacity-80 max-w-[420px]">
                      {p.kicker}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ClosingCTA
        eyebrow="Get in touch"
        title="Have a topic you want me to write about?"
        body="Send it. Best posts start from a real question a founder is stuck on."
        ctaLabel="Say hello"
        ctaHref="mailto:hello@productpaige.com?subject=Blog%20topic%20idea"
      />
    </div>
  );
}
