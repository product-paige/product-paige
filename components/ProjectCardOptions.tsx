import { projects, type Project } from "@/content";
import type { ReactNode } from "react";
import { CuttingMat } from "./CuttingMat";
import { Cover } from "./Folder";
import { ArrowUpRight, Chip, Container, Reveal } from "./ui";

// Four more card designs for Recent projects, each shown on the mat to compare.
// Temporary: once one is picked it goes into RecentProjects and this file goes.

const shadow = "shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_30px_rgb(26_26_26/0.12)]";
const name = "font-sans text-[20px] font-semibold leading-tight tracking-[-0.03em]";
const host = (p: Project) => (p.liveUrl ? new URL(p.liveUrl).host.replace(/^www\./, "") : `${p.slug}.com`);

/** The buttons' arrow tab; it turns when the card is hovered. */
function Arrow() {
  return <span className="btn shrink-0" aria-hidden><span className="btn-tab size-8"><ArrowUpRight turn className="size-4" /></span></span>;
}

// A. Browser window: the cover as the page in a small browser, the site's address in the bar.
function Browser({ p }: { p: Project }) {
  return (
    <span className={`block overflow-hidden rounded-[10px] border border-line bg-paper ${shadow}`}>
      <span className="flex items-center gap-3 border-b border-line bg-sheet px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} className="size-2.5 rounded-full" style={{ background: c }} />)}
        </span>
        <span className="flex-1 truncate rounded-[5px] bg-paper px-2.5 py-1 text-center text-[12px] text-muted">{host(p)}</span>
      </span>
      <Cover p={p} className="aspect-[16/10] w-full" />
      <span className="flex items-center justify-between gap-3 p-4 lg:p-5">
        <span>
          <span className={`${name} block`}>{p.client}</span>
          <span className="mt-1 block text-[15px]">{p.excerpt}</span>
        </span>
        <Arrow />
      </span>
    </span>
  );
}

// B. Swing tag: a kraft tag with a punched hole and string, the cover inset, the role stamped on.
function SwingTag({ p, i }: { p: Project; i: number }) {
  return (
    <span className="relative block pt-8">
      {/* The string, looping up off the tag */}
      <svg aria-hidden viewBox="0 0 40 40" className="absolute top-0 left-1/2 h-10 w-10 -translate-x-1/2" fill="none" stroke="#9a7b55" strokeWidth="1.5">
        <path d={i % 2 ? "M20 38C14 26 28 16 22 2" : "M20 38C26 26 12 16 18 2"} />
      </svg>
      <span className={`relative block bg-[#e7d5b5] px-4 pt-8 pb-5 [clip-path:polygon(18%_0,82%_0,100%_9%,100%_100%,0_100%,0_9%)] ${shadow}`}>
        <i aria-hidden className="absolute top-3 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-paper shadow-[inset_0_1px_2px_rgb(0_0_0/0.25)]" />
        <span className="block bg-paper p-1.5"><Cover p={p} className="aspect-square w-full" /></span>
        <span className={`${name} mt-4 block`}>{p.client}</span>
        <span className="mt-1 block text-[15px]">{p.excerpt}</span>
        <span className="mt-4 flex items-center justify-between gap-3">
          <span className="mono rotate-[-2deg] border-[1.5px] border-accent px-2 py-1 text-[11px] text-accent">{p.role}</span>
          <Arrow />
        </span>
      </span>
    </span>
  );
}

// C. Index card: a ruled card with a red top line, the cover clipped on with a paper clip.
function IndexCard({ p }: { p: Project }) {
  return (
    <span className={`relative block bg-white px-5 pt-6 pb-5 ${shadow}`}
      style={{ backgroundImage: "linear-gradient(transparent 0 23px, rgb(80 130 200 / 0.22) 23px 24px)", backgroundSize: "100% 24px", backgroundPosition: "0 108px" }}>
      <i aria-hidden className="absolute inset-x-0 top-[52px] h-px bg-accent/60" />
      <span className="relative flex items-baseline justify-between gap-3">
        <span className={name}>{p.client}</span>
        <span className="text-[13px] text-muted">{p.role}</span>
      </span>
      {/* The cover, clipped on at a slight angle */}
      <span className="relative mt-7 block rotate-[1.5deg] bg-white p-1.5 shadow-[0_6px_14px_rgb(26_26_26/0.12)]">
        <Cover p={p} className="aspect-[16/10] w-full" />
        <svg aria-hidden viewBox="0 0 16 44" className="absolute -top-4 right-6 h-11 w-4" fill="none" stroke="#8a8f99" strokeWidth="1.6" strokeLinecap="round">
          <path d="M4 30V8a4 4 0 0 1 8 0v26a6 6 0 0 1-12 0V12" />
        </svg>
      </span>
      <span className="relative mt-4 flex items-end justify-between gap-3">
        <span className="text-[15px] leading-6">{p.excerpt}</span>
        <Arrow />
      </span>
    </span>
  );
}

// D. Shot: like the hero's screens. The cover full-bleed with the role in a red pill, the name
// and a line on it underneath on the mat's own paper strip.
function Shot({ p }: { p: Project }) {
  return (
    <span className={`block bg-paper ${shadow}`}>
      <span className="relative block">
        <Cover p={p} className="aspect-[4/3] w-full" />
        <Chip className="absolute bottom-3 left-3 text-white [--color-chip:var(--color-accent)]">{p.role}</Chip>
      </span>
      <span className="flex items-center justify-between gap-3 px-4 py-3.5">
        <span className="min-w-0">
          <span className={`${name} block`}>{p.client}</span>
          <span className="mt-0.5 block truncate text-[15px]">{p.excerpt}</span>
        </span>
        <Arrow />
      </span>
    </span>
  );
}

// The same fan as Recent projects.
const fan = ["lg:-rotate-[4deg] lg:translate-y-6", "lg:rotate-[1.5deg] lg:-translate-y-1", "lg:rotate-[5deg] lg:translate-y-8"];
const fanPhone = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"];

function Option({ label, card }: { label: string; card: (p: Project, i: number) => ReactNode }) {
  return (
    <section className="border-t border-grid py-8 lg:py-16">
      <Container>
        <p className="mono mb-6 inline-block rounded-full bg-ink px-3 py-1.5 text-[12px] text-white">{label}</p>
        <Reveal className="relative overflow-hidden rounded-[20px] px-6 py-12 lg:px-14 lg:py-20">
          <CuttingMat />
          <ul className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center">
            {projects.items.map((p, i) => (
              <li key={p.slug} className={`lg:-mx-2 lg:w-[32%] lg:hover:z-10 ${fanPhone[i % 3]} ${fan[i % 3]}`}>
                <a href={`/projects/${p.slug}`} className="group block transition-transform duration-300 hover:-translate-y-1.5">
                  {card(p, i)}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

export function ProjectCardOptions() {
  return (
    <>
      <Option label="Option A · Browser window" card={(p) => <Browser p={p} />} />
      <Option label="Option B · Swing tag" card={(p, i) => <SwingTag p={p} i={i} />} />
      <Option label="Option C · Index card" card={(p) => <IndexCard p={p} />} />
      <Option label="Option D · Shot, like the hero" card={(p) => <Shot p={p} />} />
    </>
  );
}
