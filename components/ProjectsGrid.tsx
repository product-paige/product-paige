import { projects, type Project } from "@/content";
import { Cover } from "./Cover";
import { Chip, Container, Eyebrow, Reveal } from "./ui";

// A colour block behind each project's browser window, in turn: warm paper, off-black, the blue
const grounds = [
  { tile: "bg-[#e9e3d6]", frame: "border-ink/10 bg-paper" },
  { tile: "bg-dark", frame: "border-white/15 bg-[#2a2a28]" },
  { tile: "bg-accent", frame: "border-white/20 bg-paper" },
];

/** A small browser window holding the project's cover (or its name, until it has one). */
function BrowserWindow({ p, frame }: { p: Project; frame: string }) {
  return (
    <span className={`block w-[74%] overflow-hidden rounded-[6px] border shadow-[0_18px_40px_rgb(0_0_0/0.18)] transition-transform duration-500 group-hover:-translate-y-1.5 ${frame}`}>
      <span className="flex gap-1 px-2.5 py-2">
        {[0, 1, 2].map((n) => <i key={n} className="size-1.5 rounded-full bg-current opacity-25" />)}
      </span>
      {p.image ? (
        <Cover p={p} className="aspect-[16/10] w-full" />
      ) : (
        // No screenshot yet: the name on a paper page, like a site's opening screen
        <span className="grid aspect-[16/10] w-full place-items-center bg-paper text-ink">
          <span className="serif text-[clamp(20px,2vw,28px)] tracking-[-0.03em]">{p.client}</span>
        </span>
      )}
    </span>
  );
}

/** One project: the colour block with its tag and browser window, then the name, an arrow and its line. */
function Tile({ p, i }: { p: Project; i: number }) {
  const g = grounds[i % grounds.length];
  const inner = (
    <>
      <span className={`relative grid aspect-[5/4] place-items-center overflow-hidden ${g.tile}`}>
        <Chip className="absolute top-4 left-4 bg-paper text-ink">{p.comingSoon ? projects.comingSoonLabel : p.role}</Chip>
        <BrowserWindow p={p} frame={g.frame} />
      </span>
      <span className="mt-5 flex items-start justify-between gap-6">
        <span className="flex items-center gap-4">
          <span className="text-[clamp(30px,3.2vw,46px)] leading-none font-medium tracking-[-0.04em]">{p.client}</span>
          {!p.comingSoon && (
            <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
            </span>
          )}
        </span>
        <span className="mt-1 max-w-[22ch] text-[13px] leading-snug text-muted">{p.excerpt}</span>
      </span>
    </>
  );
  return p.comingSoon ? <div>{inner}</div> : <a href={`/projects/${p.slug}`} className="group block">{inner}</a>;
}

/**
 * A second take on Recent projects, to compare: a short statement beside the label, then the projects
 * as colour blocks in two staggered columns (the right column starts lower), each with a browser
 * window holding the cover, its tag top left, the name large with an arrow, and its line to the side.
 */
export function ProjectsGrid({ className = "" }: { className?: string }) {
  const left = projects.items.filter((_, i) => i % 2 === 0);
  const right = projects.items.filter((_, i) => i % 2 === 1);
  return (
    <section id="projects-grid" className={className}>
      <Container>
        <Reveal className="mb-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:mb-16">
          <Eyebrow as="h2">{projects.eyebrow}</Eyebrow>
          <p className="max-w-[30ch] text-[clamp(22px,2.2vw,30px)] leading-[1.2] font-medium tracking-[-0.03em]">{projects.intro}</p>
        </Reveal>
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-10">
          <div className="flex flex-col gap-12 lg:gap-16">
            {left.map((p) => <Reveal key={p.slug}><Tile p={p} i={projects.items.indexOf(p)} /></Reveal>)}
          </div>
          <div className="flex flex-col gap-12 md:pt-[22%] lg:gap-16">
            {right.map((p) => <Reveal key={p.slug} delay={120}><Tile p={p} i={projects.items.indexOf(p)} /></Reveal>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
