import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCTA } from "../../components/ClosingCTA";
import { projects, projectList } from "../data";
import { ProjectHero } from "../../components/project/ProjectHero";
import { ProjectCase } from "../../components/project/ProjectCase";
import { ProjectNotes } from "../../components/project/ProjectNotes";
import { ProjectGallery } from "../../components/project/ProjectGallery";
import { ProjectHighlights } from "../../components/project/ProjectHighlights";

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

      <ProjectHero project={project} heroFg={heroFg} />
      <ProjectCase project={project} />
      <ProjectNotes project={project} />
      <ProjectGallery project={project} />
      <ProjectHighlights project={project} />

      {/* === CLOSING CTA === */}
      <ClosingCTA
        title="Have a project like this?"
        body="Send the link or the screenshot you keep meaning to share — I'll come back with where the seams are and what's worth fixing first."
      />
    </div>
  );
}
