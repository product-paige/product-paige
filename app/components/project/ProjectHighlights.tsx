import type { Project } from "../../projects/data";

/** Dark plaque with the scope highlights. */
export function ProjectHighlights({ project }: { project: Project }) {
  return (
    <>
      {/* === HIGHLIGHTS === dark plaque with the metrics. */}
      <section
        data-section="project-highlights"
        className="bg-[#1A191E] text-white p-6 md:p-10 mx-6 md:mx-10 my-10 md:my-16 section-chamfer relative grain-vintage flex flex-col gap-10"
      >
        <h2
          className="text-section font-display"
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
    </>
  );
}
