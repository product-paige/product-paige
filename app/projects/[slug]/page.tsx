import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BtnIcons } from "../../components/BtnIcons";
import { ClosingCTA } from "../../components/ClosingCTA";
import { type PixelIconName } from "../../components/PixelIcon";
import { IconCard } from "../../components/IconCard";
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

  // Hero text contrast — light bgs get ink text, dark bgs get paper.
  const lightHero =
    project.coverBg === "#f3eb88" ||
    project.coverBg === "#DBE6EB" ||
    project.coverBg === "#f7c8d4";
  const heroFg = lightHero ? "#1a1a1a" : "#ffffff";

  return (
    <div className="theme contents">

      {/* === HERO === two-column layout matching the homepage hero.
          Breadcrumb sits inside the top of the left column so the
          section starts flush with the nav (no extra top padding). */}
      <section
        id="hero"
        data-section="project-hero"
        className="min-h-[520px] md:min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col justify-between gap-10 p-6 md:p-10 min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="text-base leading-[1.4]"
            >
              <ol className="flex flex-wrap items-baseline gap-x-2">
                <li>
                  <a
                    href="/#work"
                    className="opacity-70 hover:opacity-100 transition-opacity underline underline-offset-4 decoration-1"
                  >
                    Projects
                  </a>
                </li>
                <li aria-hidden="true" className="opacity-40">
                  /
                </li>
                <li aria-current="page" className="text-ink">
                  {project.client}
                </li>
              </ol>
            </nav>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <span className="type-eyebrow">{project.role}</span>
                <div className="flex flex-col gap-3">
                  <h1 className="text-display font-display text-ink max-w-[18ch]">
                    {project.client}
                  </h1>
                  <p className="text-lg leading-[1.4] opacity-80 max-w-[42ch]">
                    {project.kicker.split(" — ")[0]}
                  </p>
                </div>
              </div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex btn self-start"
                >
                  <span className="btn-text bg-[#0E6BFF] text-white">
                    View live project
                  </span>
                  <span className="btn-tab bg-[#0E6BFF] text-white">
                    <BtnIcons />
                  </span>
                </a>
              ) : null}
            </div>
          </div>
          <aside
            aria-label={`Cover — ${project.client}`}
            className="relative min-h-[420px] md:min-h-0"
            style={{
              backgroundColor: project.coverBg,
              color: heroFg,
              borderLeft: "1px solid rgba(26, 25, 30, 0.25)",
            }}
          />
        </div>
      </section>

      {/* === CASE STUDY: Problem / Approach / Outcome (as cards) === */}
      <section
        data-section="project-case"
        className="p-6 md:px-10 md:py-16 section-border-b"
      >
        <div className="grid md:grid-cols-3 gap-4">
          {caseBlocks.map((b) => (
            <IconCard
              key={b.key}
              name={b.title}
              blurb={project[b.key]}
              icon={b.icon}
            />
          ))}
        </div>
      </section>

      {/* === NOTES (long-form narrative) === */}
      {project.notes && project.notes.length > 0 ? (
        <section
          data-section="project-notes"
          className="p-6 md:px-10 md:py-16 section-border-b"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Notes</span>
              <h2 className="text-2xl md:text-3xl font-display text-ink max-w-[18ch] leading-[1.15] tracking-[-0.5px]">
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

      {/* === IMAGE GALLERY === selected screens from the project. */}
      <section
        data-section="project-gallery"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Selected work</span>
          <h2 className="text-2xl md:text-3xl font-display text-ink max-w-[24ch] leading-[1.15] tracking-[-0.5px]">
            A few pieces of the build
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {project.mockups.map((m) => (
            <figure key={m} className="flex flex-col gap-3">
              <div
                className="placeholder w-full aspect-[4/3]"
                aria-label={`Mockup — ${m}`}
              />
              <figcaption className="text-base leading-[1.4] opacity-80">
                {m}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* === HIGHLIGHTS === dark plaque with the metrics. */}
      <section
        data-section="project-highlights"
        className="bg-[#1A191E] text-white p-6 md:p-10 mx-6 md:mx-10 my-10 md:my-16 section-chamfer relative grain-vintage flex flex-col gap-10"
      >
        <h2
          className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-0.5px]"
          style={{ color: "#FBFAF6" }}
        >
          Outcomes worth measuring
        </h2>
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
              <span className="text-base leading-[1.4] opacity-80">
                {h.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* === CLOSING CTA === */}
      <ClosingCTA
        title="Have a project like this?"
        body="Send the link or the screenshot you keep meaning to share — I'll come back with where the seams are and what's worth fixing first."
      />
    </div>
  );
}
