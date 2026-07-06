import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BtnIcons } from "../../components/BtnIcons";
import { projects, projectList } from "../data";

export function generateStaticParams() {
  return projectList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return { title: "Project not found" };
  const title = `${project.client} — ${project.kicker}`;
  const description = `${project.client}: ${project.problem.slice(0, 140)}`;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  const related = projectList.filter((p) => p.slug !== slug).slice(0, 2);

  // Hero text contrast — same rules as the playbook hero
  const lightHero =
    project.coverBg === "#f3eb88" ||
    project.coverBg === "#DBE6EB" ||
    project.coverBg === "#cdb8e3" ||
    project.coverBg === "#f7c8d4";
  const heroFg = lightHero ? "#1a1a1a" : "#ffffff";

  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === HERO === */}
      <section
        id="hero"
        data-section="project-hero"
        className="p-6 md:p-10 m-6 section-chamfer relative overflow-hidden flex flex-col gap-6"
        style={{ backgroundColor: project.coverBg, color: heroFg }}
      >
        <div className="flex items-baseline justify-between type-body-sm opacity-80">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="type-display-h1 max-w-[18ch]" style={{ color: heroFg }}>
            {project.kicker}
          </h1>
          <p className="type-body-sm opacity-70">{project.role}</p>
        </div>
      </section>

      {/* === COVER IMAGE === */}
      <section data-section="project-cover" className="p-6 md:p-10">
        <div
          className="placeholder w-full aspect-[16/9]"
          aria-label={`Cover image — ${project.client}`}
        />
      </section>

      {/* === CASE STUDY: Problem / Approach / Outcome === */}
      <section data-section="project-case" className="p-6 md:p-10 section-border-b">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {[
            { eyebrow: "Problem", title: "The problem", body: project.problem },
            { eyebrow: "Approach", title: "The approach", body: project.approach },
            { eyebrow: "Outcome", title: "The outcome", body: project.outcome },
          ].map((b) => (
            <article key={b.title} className="flex flex-col gap-6">
              <span className="type-eyebrow">{b.eyebrow}</span>
              <div className="flex flex-col gap-3">
                <h2 className="type-display-h3">{b.title}</h2>
                <p className="type-body opacity-80">{b.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === IMAGE GALLERY === */}
      <section data-section="project-gallery" className="p-6 md:p-10 section-border-b">
        <div className="grid md:grid-cols-2 gap-6">
          {project.mockups.map((m) => (
            <figure key={m} className="flex flex-col gap-3">
              <div
                className="placeholder w-full aspect-[4/3]"
                aria-label={`Mockup — ${m}`}
              />
              <figcaption className="type-body-sm opacity-70">{m}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* === HIGHLIGHTS === */}
      <section
        data-section="project-highlights"
        className="bg-[#1A191E] text-white p-6 md:p-10 m-4 md:m-6 section-chamfer relative grain-vintage flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow !text-white">By the numbers</span>
          <h2 className="type-display-h2 !text-white">Outcomes worth measuring</h2>
        </div>
        <ul className="grid md:grid-cols-3 gap-6 md:gap-12">
          {project.highlights.map((h) => (
            <li
              key={h.label}
              className="flex flex-col gap-2 border-t border-white/20 pt-4"
            >
              <span
                className="font-display text-white"
                style={{ fontSize: "72px", lineHeight: "0.9", letterSpacing: "-3px" }}
              >
                {h.metric}
              </span>
              <span className="type-body-sm opacity-70">{h.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* === RELATED PROJECTS === */}
      <section
        id="related"
        data-section="project-related"
        className="p-6 md:p-10 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">More work</span>
          <h2 className="type-display-h2 max-w-[24ch]">More projects</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {related.map((r) => (
            <a
              key={r.slug}
              href={`/projects/${r.slug}`}
              className="flex flex-col gap-4 group"
            >
              <div
                className="placeholder w-full aspect-[4/3]"
                aria-label={`Image — ${r.client}`}
              />
              <div className="flex items-baseline justify-between type-body-sm opacity-70">
                <span>{r.client}</span>
                <span>{r.year}</span>
              </div>
              <h3 className="type-display-h3">{r.kicker}</h3>
              <span className="type-nav border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
                View project ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* === CLOSING CTA === */}
      <section
        data-section="project-cta"
        className="bg-[#1A191E] text-white p-8 md:p-16 m-6 section-chamfer relative grain-vintage flex flex-col gap-10 items-start"
      >
        <div className="flex flex-col gap-6 max-w-[800px]">
          <span className="type-eyebrow">Get in touch</span>
          <div className="flex flex-col gap-3">
            <h2 className="type-display-h1 !text-white max-w-[14ch]">
              Have a project like this?
            </h2>
            <p className="type-leading !text-white opacity-80 max-w-[560px]">
              Send the link or the screenshot you keep meaning to share —
              I&rsquo;ll come back with where the seams are and what&rsquo;s
              worth fixing first.
            </p>
          </div>
        </div>
        <a
          href="/contact"
          className="inline-flex btn"
        >
          <span className="btn-text bg-[#0E6BFF] text-white">
            Start a project
          </span>
          <span className="btn-tab bg-[#0E6BFF] text-white">
            <BtnIcons />
          </span>
        </a>
      </section>
    </div>
  );
}
