import type { Project } from "../projects/data";

type ProjectCardProps = {
  project: Pick<
    Project,
    "slug" | "client" | "kicker" | "role" | "year" | "coverBg" | "comingSoon"
  >;
};

/**
 * Grid card for a project — used on the /projects index and any future
 * "related projects" strip. Cover panel uses the project's coverBg so
 * cards feel varied without extra imagery.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const headline = project.kicker.split(" — ")[0];

  return (
    <a
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-5"
    >
      <div
        className="w-full aspect-[4/3] relative overflow-hidden"
        style={{ backgroundColor: project.coverBg }}
        aria-label={`Cover — ${project.client}`}
      >
        {project.comingSoon ? (
          <span className="svc-label absolute top-4 right-4">
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
      <div className="flex items-baseline justify-between text-sm leading-[1.4] opacity-70">
        <span>{project.role}</span>
        <span>{project.year}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-0.5px] text-ink group-hover:opacity-70 transition-opacity">
          {project.client}
        </h3>
        <p className="text-base leading-[1.4] opacity-80 line-clamp-2">
          {headline}
        </p>
      </div>
      <span className="text-[15px] font-medium leading-none tracking-[-0.01em] border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity">
        View project ↗
      </span>
    </a>
  );
}
