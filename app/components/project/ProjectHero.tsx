import { BtnIcons } from "../BtnIcons";
import type { Project } from "../../projects/data";

/** Project page hero. `heroFg` is derived by the page from coverBg. */
export function ProjectHero({
  project,
  heroFg,
}: {
  project: Project;
  heroFg: string;
}) {
  return (
    <>
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
                  <p
                    className="text-lg leading-[1.5] opacity-80 max-w-[56ch]"
                    dangerouslySetInnerHTML={{
                      __html: project.summary ?? project.kicker.split(" — ")[0],
                    }}
                  />
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
            className="relative min-h-[420px] md:min-h-0 divider-indent-left overflow-hidden"
            style={{
              backgroundColor: project.coverBg,
              color: heroFg,
            }}
          >
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="placeholder w-full h-full !border-0">
                <span className="placeholder-label">
                  Cover — {project.client}
                </span>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
