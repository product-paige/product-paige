import type { Project } from "../../projects/data";

/** Selected screens from the project. */
export function ProjectGallery({ project }: { project: Project }) {
  return (
    <>
      <section
        data-section="project-gallery"
        className="p-6 md:px-10 md:py-10 flex flex-col gap-10 section-border-b"
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
              >
                <span className="placeholder-label">{m}</span>
              </div>
              <figcaption className="text-base leading-[1.4] opacity-80">
                {m}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
