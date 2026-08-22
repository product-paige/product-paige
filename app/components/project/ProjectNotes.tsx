import type { Project } from "../../projects/data";

/** Long-form narrative, rendered only when notes exist. */
export function ProjectNotes({ project }: { project: Project }) {
  return (
    <>

      {/* === NOTES (long-form narrative) === */}
      {project.notes && project.notes.length > 0 ? (
        <section
          data-section="project-notes"
          className="p-6 md:px-10 md:py-10 section-border-b"
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

    </>
  );
}
