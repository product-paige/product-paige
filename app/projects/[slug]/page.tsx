"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { BtnIcons } from "../../components/BtnIcons";
import { projects, projectList } from "../data";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
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
      <div data-section="project-hero-frame" className="mx-3 md:mx-6">
        <section
          id="hero"
          data-section="project-hero"
          className="p-8 md:p-10 m-6 section-chamfer relative overflow-hidden flex flex-col gap-6"
          style={{ backgroundColor: project.coverBg, color: heroFg }}
        >
          <div className="flex items-baseline justify-between text-sm opacity-80">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>
          <h1 className="font-display leading-[1] tracking-tightest text-4xl md:text-5xl lg:text-7xl max-w-[18ch]">
            {project.kicker}
          </h1>
          <p className="text-sm opacity-70">{project.role}</p>
        </section>
      </div>

      {/* === COVER IMAGE === */}
      <section
        data-section="project-cover"
        className="p-8 mx-3 md:mx-6"
      >
        <div
          className="placeholder w-full aspect-[16/9]"
          aria-label={`Cover image — ${project.client}`}
        />
      </section>

      {/* === CASE STUDY: Problem / Approach / Outcome === */}
      <section
        data-section="project-case"
        className="p-8 mx-3 md:mx-6"
      >
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <article className="md:col-span-4 flex flex-col gap-4">
            <span
              aria-hidden="true"
              className="block w-2 h-2 bg-current"
            />
            <h2 className="font-display text-2xl md:text-3xl leading-[1.15]">
              The problem
            </h2>
            <p className="text-base leading-[1.7]">{project.problem}</p>
          </article>
          <article className="md:col-span-4 flex flex-col gap-4">
            <span
              aria-hidden="true"
              className="block w-2 h-2 bg-current"
            />
            <h2 className="font-display text-2xl md:text-3xl leading-[1.15]">
              The approach
            </h2>
            <p className="text-base leading-[1.7]">{project.approach}</p>
          </article>
          <article className="md:col-span-4 flex flex-col gap-4">
            <span
              aria-hidden="true"
              className="block w-2 h-2 bg-current"
            />
            <h2 className="font-display text-2xl md:text-3xl leading-[1.15]">
              The outcome
            </h2>
            <p className="text-base leading-[1.7]">{project.outcome}</p>
          </article>
        </div>
      </section>

      {/* === IMAGE GALLERY === */}
      <section
        data-section="project-gallery"
        className="p-8 mx-3 md:mx-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {project.mockups.map((m) => (
            <figure key={m} className="flex flex-col gap-3">
              <div
                className="placeholder w-full aspect-[4/3]"
                aria-label={`Mockup — ${m}`}
              />
              <figcaption className="text-sm opacity-70">{m}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* === HIGHLIGHTS === */}
      <div data-section="project-highlights-frame" className="mx-3 md:mx-6">
        <section
          data-section="project-highlights"
          className="bg-[#1a1a1a] text-white p-10 m-6 section-chamfer relative flex flex-col gap-10"
        >
          <h2 className="font-display text-2xl md:text-3xl leading-[1.15]">
            By the numbers
          </h2>
          <ul className="grid md:grid-cols-3 gap-6 md:gap-12">
            {project.highlights.map((h) => (
              <li
                key={h.label}
                className="flex flex-col gap-2 border-t border-white/20 pt-4"
              >
                <span className="font-display tracking-tightest text-5xl md:text-6xl leading-[0.9]">
                  {h.metric}
                </span>
                <span className="text-sm opacity-70">{h.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* === RELATED PROJECTS === */}
      <section
        id="related"
        data-section="project-related"
        className="p-8 mx-3 md:mx-6 flex flex-col gap-10"
      >
        <h2 className="font-display text-2xl md:text-3xl leading-[1.15]">
          More projects
        </h2>
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
              <div className="flex items-baseline justify-between text-sm opacity-70">
                <span>{r.client}</span>
                <span>{r.year}</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-[1.1]">
                {r.kicker}
              </h3>
              <span className="text-sm font-medium border-b border-[#1a1a1a] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
                View project
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* === CLOSING CTA === */}
      <div data-section="project-cta-frame" className="mx-3 md:mx-6">
        <section
          data-section="project-cta"
          className="bg-[#1a1a1a] text-white p-10 m-6 section-chamfer relative grain-vintage flex flex-col gap-8 items-start"
        >
          <h2 className="font-display leading-[0.95] tracking-tightest text-4xl md:text-6xl lg:text-7xl max-w-[14ch]">
            Have a project like this?
          </h2>
          <a
            href="mailto:hello@productpaige.com?subject=Start%20a%20project"
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
    </div>
  );
}
