import { IconCard } from "../IconCard";
import { type PixelIconName } from "../PixelIcon";
import type { Project } from "../../projects/data";

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

/** Problem / Approach / Outcome cards. */
export function ProjectCase({ project }: { project: Project }) {
  return (
    <>

      {/* === CASE STUDY: Problem / Approach / Outcome (as cards) === */}
      <section
        data-section="project-case"
        className="p-6 md:px-10 md:py-10 section-border-b"
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
    </>
  );
}
