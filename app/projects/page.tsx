import type { Metadata } from "next";
import { ClosingCTA } from "../components/ClosingCTA";
import { ProjectCard } from "../components/ProjectCard";
import { projectList } from "./data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A mix of product audits, UX work, and personal projects — all in the Shopify and ecommerce world.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndexPage() {
  const [feature, ...rest] = projectList;

  return (
    <div className="theme contents">
      {/* === HERO === matches blog index hero structure. */}
      <section
        id="projects-hero"
        data-section="projects-hero"
        className="p-6 md:p-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Projects</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h1 className="text-display font-display text-ink max-w-[24ch]">
              A few things I&rsquo;ve been building
            </h1>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Product audits, UX work, and personal builds — all in the
              Shopify and ecommerce world. Some shipped, some in flight.
            </p>
          </div>
        </div>
      </section>

      {/* === FEATURED PROJECT === most recent, big spread. */}
      {feature ? (
        <section
          id="feature"
          data-section="projects-feature"
          className="min-h-[520px] md:min-h-[640px] flex section-border-b"
        >
          <a
            href={`/projects/${feature.slug}`}
            className="grid md:grid-cols-2 gap-0 items-stretch w-full group"
          >
            <div className="flex flex-col justify-between gap-10 p-6 md:p-10 min-w-0">
              <span className="type-eyebrow">Featured</span>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-3 text-sm leading-[1.4] opacity-70">
                    <span>{feature.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{feature.year}</span>
                  </div>
                  <h2 className="text-display font-display text-ink max-w-[18ch] group-hover:opacity-70 transition-opacity">
                    {feature.client}
                  </h2>
                  <p className="text-lg leading-[1.4] opacity-80 max-w-[42ch]">
                    {feature.kicker}
                  </p>
                </div>
                <span className="text-[15px] font-medium leading-none tracking-[-0.01em] border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
                  View project ↗
                </span>
              </div>
            </div>
            <div
              className="relative min-h-[420px] md:min-h-0 overflow-hidden section-border-b"
              style={{
                backgroundColor: feature.coverBg,
                borderLeft: "1px solid rgba(26, 25, 30, 0.25)",
              }}
              aria-label={`Cover — ${feature.client}`}
            >
              {feature.comingSoon ? (
                <span
                  className="svc-label z-[2]"
                  style={{ position: "absolute", top: "16px", right: "16px" }}
                >
                  <span
                    className="svc-label-text"
                    style={{
                      backgroundColor: "#3D3A45",
                      borderColor: "#3D3A45",
                      color: "#FBFAF6",
                    }}
                  >
                    Coming soon
                  </span>
                </span>
              ) : null}
            </div>
          </a>
        </section>
      ) : null}

      {/* === PROJECT LIST === */}
      {rest.length > 0 ? (
        <section
          data-section="projects-list"
          className="p-6 md:p-10 section-border-b"
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">More projects</span>
              <h2 className="text-section font-display text-ink max-w-[24ch]">
                Also in flight
              </h2>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 items-stretch">
              {rest.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ClosingCTA
        title="Have a project like this?"
        body="Send the link or the screenshot you keep meaning to share — I'll come back with where the seams are and what's worth fixing first."
      />
    </div>
  );
}
