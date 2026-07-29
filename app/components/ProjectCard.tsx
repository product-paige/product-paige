import type { Project } from "../projects/data";

type ProjectCardProps = {
  project: Pick<
    Project,
    "slug" | "client" | "kicker" | "role" | "year" | "coverBg" | "comingSoon"
  >;
};

/**
 * Grid card for a project — used on the /projects index. Wrapped in
 * the same .card grain-paper container as BlogCard so both grids read
 * as the same object type. Cover image sits inside the card with the
 * meta + title + kicker + "View project" link beneath.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const headline = project.kicker.split(" — ")[0];

  return (
    <a
      href={`/projects/${project.slug}`}
      className="card grain-paper bg-[#FAF9F2] text-ink flex flex-col gap-5 !min-h-0 !p-4 group h-full"
    >
      <div
        className="w-full aspect-[4/3] relative overflow-hidden"
        style={{ backgroundColor: project.coverBg }}
        aria-label={`Cover — ${project.client}`}
      >
        {project.comingSoon ? (
          <span
            className="svc-label z-[2]"
            style={{ position: "absolute", top: "12px", right: "12px" }}
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
      <div className="flex flex-col gap-3 px-2 pb-2 flex-1">
        <div className="flex items-baseline justify-between text-sm leading-[1.4] opacity-70">
          <span>{project.role}</span>
          <span>{project.year}</span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-0.5px] text-ink group-hover:opacity-70 transition-opacity">
            {project.client}
          </h3>
          <p className="text-base leading-[1.4] opacity-80 line-clamp-2">
            {headline}
          </p>
        </div>
        <span className="text-[15px] font-medium leading-none tracking-[-0.01em] border-b border-[#1A191E] pb-0.5 self-start group-hover:opacity-60 transition-opacity mt-1">
          View project ↗
        </span>
      </div>
    </a>
  );
}
