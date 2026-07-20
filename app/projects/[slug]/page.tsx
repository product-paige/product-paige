import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BtnIcons } from "../../components/BtnIcons";
import { ClosingCTA } from "../../components/ClosingCTA";
import { PixelIcon, type PixelIconName } from "../../components/PixelIcon";
import { projects, projectList } from "../data";

const caseBlocks: Array<{
  key: "problem" | "approach" | "outcome";
  eyebrow: string;
  title: string;
  icon: PixelIconName;
}> = [
  { key: "problem", eyebrow: "Problem", title: "The problem", icon: "megaphone" },
  { key: "approach", eyebrow: "Approach", title: "The approach", icon: "cursor" },
  { key: "outcome", eyebrow: "Outcome", title: "The outcome", icon: "target" },
];

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
    <div className="theme contents">

      {/* === HERO === */}
      <section
        id="hero"
        data-section="project-hero"
        className="p-6 md:p-10 m-6 section-chamfer relative overflow-hidden flex flex-col gap-6"
        style={{ backgroundColor: project.coverBg, color: heroFg }}
      >
        <div className="flex items-baseline justify-between text-sm leading-[1.4] opacity-80">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
        <div className="flex flex-col gap-3">
          <h1
            className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] max-w-[32ch]"
            style={{ color: heroFg }}
          >
            {project.kicker}
          </h1>
          <p className="text-sm leading-[1.4] opacity-70">{project.role}</p>
        </div>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex btn self-start"
          >
            <span className="btn-text bg-[#1A191E] text-white">
              View live project
            </span>
            <span className="btn-tab bg-[#1A191E] text-white">
              <BtnIcons />
            </span>
          </a>
        ) : null}
      </section>

      {/* === COVER IMAGE === */}
      <section data-section="project-cover" className="p-6 md:p-10">
        <div
          className="placeholder w-full aspect-[16/9]"
          aria-label={`Cover image — ${project.client}`}
        />
      </section>

      {/* === CASE STUDY: Problem / Approach / Outcome (as cards) === */}
      <section data-section="project-case" className="p-6 md:p-10 section-border-b">
        <div className="grid md:grid-cols-3 gap-4">
          {caseBlocks.map((b) => (
            <article
              key={b.key}
              className="card card-blue-light flex flex-col justify-between !min-h-0"
            >
              <div className="w-14 h-14 flex items-center justify-center shrink-0 !rounded-[4px] bg-[#1A191E] text-white">
                <PixelIcon name={b.icon} color="#ffffff" size={24} />
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <h3 className="text-xl">{b.title}</h3>
                <p className="text-base leading-[1.4] opacity-80">
                  {project[b.key]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* === NOTES (long-form narrative) === */}
      {project.notes && project.notes.length > 0 ? (
        <section data-section="project-notes" className="p-6 md:p-10 section-border-b">
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Notes</span>
              <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[20ch]">
                Behind the build
              </h2>
            </div>
            <div className="flex flex-col gap-6 max-w-[560px]">
              {project.notes.map((p, i) => (
                <p key={i} className="text-lg leading-[1.4] opacity-80">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* === IMAGE GALLERY === */}
      <section data-section="project-gallery" className="p-6 md:p-10 section-border-b">
        <div className="grid md:grid-cols-2 gap-6">
          {project.mockups.map((m) => (
            <figure key={m} className="flex flex-col gap-3">
              <div
                className="placeholder w-full aspect-[4/3]"
                aria-label={`Mockup — ${m}`}
              />
              <figcaption className="text-sm leading-[1.4] opacity-70">{m}</figcaption>
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
          <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink !text-white">Outcomes worth measuring</h2>
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
              <span className="text-sm leading-[1.4] opacity-70">{h.label}</span>
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
          <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[24ch]">More projects</h2>
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
              <div className="flex items-baseline justify-between text-sm leading-[1.4] opacity-70">
                <span>{r.client}</span>
                <span>{r.year}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-ink">{r.kicker}</h3>
              <span className="text-[15px] font-medium leading-none tracking-[-0.01em] border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
                View project ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* === CLOSING CTA === */}
      <ClosingCTA
        title="Have a project like this?"
        body="Send the link or the screenshot you keep meaning to share — I'll come back with where the seams are and what's worth fixing first."
      />
    </div>
  );
}
