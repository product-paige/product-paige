import { projects, type Project } from "@/content";
import type { ReactNode } from "react";
import { CuttingMat } from "./CuttingMat";
import { Cover } from "./Folder";
import { ArrowUpRight, Container, Reveal } from "./ui";

// Four simpler card designs for Recent projects, each shown straight on the mat to compare.
// Temporary: once one is picked it goes into RecentProjects and this file goes.

const name = "font-sans text-[20px] font-semibold leading-tight tracking-[-0.03em]";

/** The buttons' arrow tab; it turns when the card is hovered. */
function Arrow() {
  return <span className="btn shrink-0" aria-hidden><span className="btn-tab size-8"><ArrowUpRight turn className="size-4" /></span></span>;
}

// A. Plain: the cover, then the name and a line on it. Nothing else.
function Plain({ p }: { p: Project }) {
  return (
    <span className="block bg-paper p-3">
      <Cover p={p} className="aspect-[4/3] w-full" />
      <span className={`${name} mt-4 block px-1`}>{p.client}</span>
      <span className="mt-1 mb-1 block px-1 text-[15px]">{p.excerpt}</span>
    </span>
  );
}

// B. Print and caption: the cover in a thin white frame, the name and role as a caption under it.
function Caption({ p }: { p: Project }) {
  return (
    <span className="block">
      <span className="block bg-white p-2"><Cover p={p} className="aspect-[4/5] w-full" /></span>
      <span className="mt-3 flex items-baseline justify-between gap-3 text-[15px]">
        <span className="font-medium">{p.client}</span>
        <span className="text-muted">{p.role}</span>
      </span>
    </span>
  );
}

// C. One line: the cover, then the name, the role and an arrow on a single line.
function OneLine({ p }: { p: Project }) {
  return (
    <span className="block bg-paper">
      <Cover p={p} className="aspect-[16/10] w-full" />
      <span className="flex items-center justify-between gap-3 px-4 py-3.5">
        <span className="min-w-0 truncate">
          <span className="font-medium">{p.client}</span>
          <span className="text-muted"> · {p.role}</span>
        </span>
        <Arrow />
      </span>
    </span>
  );
}

// D. Text first: the name and a line on it on top, a hairline, then the cover.
function TextFirst({ p }: { p: Project }) {
  return (
    <span className="block bg-paper p-5">
      <span className="flex items-start justify-between gap-3">
        <span>
          <span className={`${name} block`}>{p.client}</span>
          <span className="mt-1 block text-[15px]">{p.excerpt}</span>
        </span>
        <Arrow />
      </span>
      <Cover p={p} className="mt-5 aspect-[4/3] w-full" />
    </span>
  );
}

function Option({ label, card }: { label: string; card: (p: Project) => ReactNode }) {
  return (
    <section className="border-t border-grid py-8 lg:py-16">
      <Container>
        <p className="mono mb-6 inline-block rounded-full bg-ink px-3 py-1.5 text-[12px] text-white">{label}</p>
        <Reveal className="relative overflow-hidden rounded-[20px] px-6 py-12 lg:px-14 lg:py-20">
          <CuttingMat />
          {/* Straight and evenly spaced, no tilt */}
          <ul className="relative grid gap-6 md:grid-cols-3 lg:gap-8">
            {projects.items.map((p) => (
              <li key={p.slug}>
                <a href={`/projects/${p.slug}`} className="group block transition-transform duration-300 hover:-translate-y-1">
                  {card(p)}
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
      <Option label="Option A · Plain" card={(p) => <Plain p={p} />} />
      <Option label="Option B · Print and caption" card={(p) => <Caption p={p} />} />
      <Option label="Option C · One line" card={(p) => <OneLine p={p} />} />
      <Option label="Option D · Text first" card={(p) => <TextFirst p={p} />} />
    </>
  );
}
