import { projects, type Project } from "@/content";
import { CuttingMat } from "./CuttingMat";
import { Cover } from "./Folder";
import { ArrowUpRight, Chip, Container, Reveal, Rich, sectionHeading } from "./ui";

// Three other layouts for Recent projects, shown one after another so Paige can compare them.
// Temporary: once one is picked it replaces RecentProjects and this file goes.

const n = (i: number) => String(i + 1).padStart(2, "0");

/** A grey label above each option. */
function OptionLabel({ children }: { children: string }) {
  return <p className="mb-6 inline-block rounded-full bg-ink px-3 py-1 text-[13px] font-medium text-white">{children}</p>;
}

function Head() {
  return (
    <Reveal className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-2 lg:items-end lg:gap-16">
      <h2 className={sectionHeading}><Rich text={projects.heading} /></h2>
      <p className="lede max-w-xl">{projects.body}</p>
    </Reveal>
  );
}

/** A cover as a white-bordered print. */
function Print({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <span className={`block bg-white p-2.5 pb-3 shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_30px_rgb(26_26_26/0.14)] ${className}`}>
      <Cover p={p} className="aspect-[4/3] w-full" />
    </span>
  );
}

// 1. The covers fanned out on a wide cutting mat; hovering one lifts it and straightens it.
const fan = ["lg:-rotate-[7deg] lg:translate-y-6", "lg:rotate-[2deg] lg:-translate-y-2", "lg:rotate-[8deg] lg:translate-y-8"];
const fanPhone = ["-rotate-2", "rotate-2", "-rotate-1"];

function OnTheMat() {
  return (
    <section className="border-t border-grid py-8 lg:py-20">
      <Container>
        <OptionLabel>Option 1 · Fanned on the mat</OptionLabel>
        <Head />
        <div className="relative overflow-hidden rounded-[20px] px-6 py-12 lg:px-16 lg:py-24">
          <CuttingMat />
          <ul className="relative flex flex-col gap-8 lg:flex-row lg:justify-center">
            {projects.items.map((p, i) => (
              <li key={p.slug} className="lg:-mx-6 lg:w-[34%] lg:hover:z-10">
                <a href={`/projects/${p.slug}`} className={`group block transition duration-300 hover:rotate-0 hover:-translate-y-3 ${fanPhone[i % 3]} ${fan[i % 3]}`}>
                  <Print p={p} />
                  {/* The label, like a slip tucked under the print */}
                  <span className="mx-auto -mt-1 flex w-[88%] items-center justify-between gap-3 bg-paper px-4 py-2.5 shadow-[0_6px_14px_rgb(26_26_26/0.08)]">
                    <span className="font-medium">{p.client}</span>
                    <span className="text-[14px] text-muted">{p.role}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

// 2. An index: one big serif row per project. Hovering a row shows its cover as a tilted print
// on the right (desktop); phones get a small thumbnail at the start of each row.
function Index() {
  return (
    <section className="border-t border-grid pt-8 lg:pt-20">
      <Container>
        <OptionLabel>Option 2 · Editorial index</OptionLabel>
        <Head />
        <ul className="-mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20">
          {projects.items.map((p, i) => (
            <li key={p.slug} className="border-t border-grid">
              <a href={`/projects/${p.slug}`} className="group relative grid grid-cols-[64px_1fr] items-center gap-4 px-4 py-6 sm:px-6 md:grid-cols-[auto_1fr_auto] md:gap-8 md:px-12 md:py-10 lg:px-20">
                <Cover p={p} className="aspect-square w-16 overflow-hidden rounded-[6px] md:hidden" />
                <span className="serif hidden text-[clamp(28px,2.8vw,38px)] leading-none text-accent md:block">{n(i)}</span>
                <span>
                  <span className="serif block text-[clamp(30px,4.4vw,64px)] leading-[1] tracking-[-0.04em] transition-transform duration-300 md:group-hover:translate-x-3">{p.client}</span>
                  <span className="mt-2 block text-muted md:mt-3">{p.excerpt}</span>
                </span>
                <span className="col-span-2 flex flex-wrap items-center gap-2 md:col-span-1 md:justify-end">
                  <Chip>{p.role}</Chip>
                  <span className="btn hidden md:inline-flex" aria-hidden>
                    <span className="btn-tab size-9"><ArrowUpRight turn className="size-5" /></span>
                  </span>
                </span>
                {/* The cover, shown on hover */}
                <span className="pointer-events-none absolute top-1/2 right-[18%] z-10 hidden w-[260px] -translate-y-1/2 rotate-3 opacity-0 transition duration-300 group-hover:rotate-[-2deg] group-hover:opacity-100 lg:block">
                  <Print p={p} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// 3. A static spread of case files: the first project large, the other two stacked beside it.
// Each is a folder with its tab, the cover pinned on as a tilted print, a line on it and its scope.
function CaseFile({ p, i, big = false }: { p: Project; i: number; big?: boolean }) {
  return (
    <a href={`/projects/${p.slug}`} className="folder group flex h-full flex-col transition hover:-translate-y-1">
      <span className="folder-tab self-start text-[14px] font-medium">Project {n(i)}</span>
      <div className={`folder-body grid flex-1 gap-5 p-5 lg:p-6 ${big ? "" : "sm:grid-cols-[42%_1fr] sm:items-center"}`}>
        <Print p={p} className={i % 2 ? "rotate-2" : "-rotate-2"} />
        <div>
          <h3 className={big ? "serif text-[clamp(28px,3vw,42px)] leading-[1.05] tracking-[-0.04em]" : "serif text-[26px] leading-[1.05] tracking-[-0.03em]"}>{p.client}</h3>
          <p className="mt-2 text-muted">{p.excerpt}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.capabilities.slice(0, big ? 5 : 3).map((c) => <li key={c}><Chip>{c}</Chip></li>)}
          </ul>
        </div>
      </div>
    </a>
  );
}

function Spread() {
  const [first, ...rest] = projects.items;
  return (
    <section className="border-t border-grid py-8 lg:py-20">
      <Container>
        <OptionLabel>Option 3 · Case-file spread</OptionLabel>
        <Head />
        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <Reveal><CaseFile p={first} i={0} big /></Reveal>
          <div className="grid gap-5">
            {rest.map((p, i) => <Reveal key={p.slug} delay={(i + 1) * 120}><CaseFile p={p} i={i + 1} /></Reveal>)}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProjectOptions() {
  return (
    <>
      <OnTheMat />
      <Index />
      <Spread />
    </>
  );
}
