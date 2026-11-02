import { projects, type Project } from "@/content";
import { CuttingMat } from "./CuttingMat";
import { Cover } from "./Folder";
import { ArrowUpRight, Container, Reveal, Rich, sectionHeading } from "./ui";

// Each sheet's tilt and offset on the mat (desktop); phones stack them with a slight tilt.
const fan = ["lg:-rotate-[4deg] lg:translate-y-6", "lg:rotate-[1.5deg] lg:-translate-y-1", "lg:rotate-[5deg] lg:translate-y-8"];
const fanPhone = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"];

/** A project as a spec sheet: the cover inset at the top, the name (with an arrow) and a line on it, then the role and scope in ruled rows. */
function SpecSheet({ p }: { p: Project }) {
  return (
    <span className="flex h-full flex-col bg-paper p-4 shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_30px_rgb(26_26_26/0.12)] transition-shadow duration-300 group-hover:shadow-[0_1px_0_rgb(0_0_0/0.06),0_20px_40px_rgb(26_26_26/0.16)] lg:p-5">
      <Cover p={p} className="aspect-[16/10] w-full" />
      {/* The name, with the buttons' arrow tab beside it; it turns on hover */}
      <span className="mt-4 flex items-center justify-between gap-3">
        <span className="font-sans text-[20px] font-semibold leading-tight tracking-[-0.03em]">{p.client}</span>
        <span className="btn shrink-0" aria-hidden><span className="btn-tab size-8"><ArrowUpRight turn className="size-4" /></span></span>
      </span>
      <span className="mt-1 block text-[15px] text-muted">{p.excerpt}</span>
      {/* The spec rows, kept short: the role, and the first two parts of the scope */}
      <span className="mt-4 block border-t border-line text-[13px]">
        <span className="grid grid-cols-[56px_1fr] gap-3 border-b border-line py-2.5">
          <span className="text-muted">Role</span>
          <span>{p.role}</span>
        </span>
        <span className="grid grid-cols-[56px_1fr] gap-3 border-b border-line py-2.5">
          <span className="text-muted">Scope</span>
          <span>{p.capabilities.slice(0, 2).join(", ")}</span>
        </span>
      </span>
    </span>
  );
}

/**
 * Recent projects: spec sheets laid out on the grey-beige cutting mat, slightly overlapping and
 * tilted. Hovering one brings it to the front and lifts it a little.
 */
export function RecentProjects({ className = "" }: { className?: string }) {
  return (
    <section id="projects" className={className}>
      <Container>
        <Reveal className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className={sectionHeading}><Rich text={projects.heading} /></h2>
          <p className="lede max-w-xl">{projects.body}</p>
        </Reveal>
        <Reveal className="relative overflow-hidden rounded-[20px] px-6 py-12 lg:px-14 lg:py-20">
          <CuttingMat />
          <ul className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center">
            {projects.items.map((p, i) => (
              <li key={p.slug} className={`lg:-mx-2 lg:w-[32%] lg:hover:z-10 ${fanPhone[i % 3]} ${fan[i % 3]}`}>
                <a href={`/projects/${p.slug}`} className="group block h-full transition-transform duration-300 hover:-translate-y-1.5">
                  <SpecSheet p={p} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
