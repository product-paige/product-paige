import { projects, type Project } from "@/content";
import type { CSSProperties, ReactNode } from "react";
import { CuttingMat } from "./CuttingMat";
import { Cover } from "./Folder";
import { Chip, Container, Reveal } from "./ui";

// More card designs for Recent projects, to compare. Temporary: once one is picked it goes into
// RecentProjects and this file goes.

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

/**
 * A phone showing the project as a small storefront, drawn in HTML from its own name, line and
 * cover. It rises over the cover on hover. Placeholder until each project has a real UX screenshot.
 */
function PhoneMockup({ p }: { p: Project }) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/20 opacity-0 transition duration-500 group-hover:opacity-100">
      <span className="flex h-[86%] aspect-[9/17] translate-y-6 flex-col overflow-hidden rounded-[22px] border-[5px] border-[#1a1a1a] bg-paper shadow-[0_20px_50px_rgb(0_0_0/0.35)] transition duration-500 group-hover:translate-y-0">
        {/* Status bar and the store's header */}
        <span className="flex items-center justify-between px-3 pt-2 text-[8px] font-medium"><span>9:41</span><span>●●●</span></span>
        <span className="flex items-center justify-between border-b border-line px-3 py-2">
          <span className="text-[10px] leading-none">☰</span>
          <span className="serif truncate px-2 text-[11px] leading-none">{p.client}</span>
          <span className="text-[10px] leading-none">⌕</span>
        </span>
        {/* Hero: the cover, then the line and a button */}
        <Cover p={p} className="aspect-[4/5] w-full" />
        <span className="px-3 pt-2.5">
          <span className="serif block text-[11px] leading-tight">{p.excerpt}</span>
          <span className="mono mt-2 inline-block bg-ink px-2.5 py-1 text-[7px] text-white">Shop now</span>
        </span>
        {/* Product tiles */}
        <span className="mt-2.5 grid grid-cols-2 gap-1.5 px-3">
          {[0, 1].map((n) => <i key={n} className="block aspect-square bg-scrap" />)}
        </span>
      </span>
    </span>
  );
}

// The cutting mat in bright blue whatever the palette, so the white text on it always reads.
const blueMat = {
  "--color-mat": "#2450e0",
  "--color-mat-line": "rgb(170 205 255 / 0.32)",
  "--color-mat-major": "rgb(190 220 255 / 0.62)",
  "--color-mat-text": "rgb(200 225 255 / 0.85)",
} as CSSProperties;

// E. Launches: big covers two to a row, straight on the page (no mat), with the name in the serif
// and its one-line description beside it. Hovering a cover brings up a phone mockup of the project.
function Launches({ onMat = false }: { onMat?: boolean }) {
  const list = (
    <ul className={`relative grid gap-x-6 gap-y-12 md:grid-cols-2 ${onMat ? "text-white" : ""}`}>
      {projects.items.map((p) => (
        <li key={p.slug}>
          <a href={`/projects/${p.slug}`} className="group block">
            {/* Hover: a phone showing the project rises over the cover. The role sits on the
                cover in a red pill, like the hero's screens. */}
            <span className="relative block overflow-hidden">
              <Cover p={p} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]" />
              <Chip className="absolute bottom-3 left-3 text-white [--color-chip:var(--color-accent)]">{p.role}</Chip>
              <PhoneMockup p={p} />
            </span>
            <span className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <span className="serif text-[clamp(24px,2vw,30px)] leading-none tracking-[-0.03em]">{p.client}</span>
              <span className="max-w-[32ch] text-[15px] md:text-right">{p.excerpt}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="border-t border-grid py-8 lg:py-16">
      <Container>
        <p className="mono mb-6 inline-block rounded-full bg-ink px-3 py-1.5 text-[12px] text-white">{onMat ? "Option E2 · Launches on the mat" : "Option E · Launches"}</p>
        <p className="mono mb-5 flex items-center gap-3 text-[14px]">
          <i aria-hidden className="size-3 rounded-full bg-accent" />Recent launches
        </p>
        {onMat ? (
          // On the cutting mat: covers kept straight, the names and lines in white.
          <div className="relative overflow-hidden rounded-[20px] px-6 py-10 lg:px-14 lg:py-16" style={blueMat}>
            <CuttingMat />
            {list}
          </div>
        ) : list}
      </Container>
    </section>
  );
}

export function ProjectCardOptions() {
  return (
    <>
      <Option label="Option B · Print and caption" card={(p) => <Caption p={p} />} />
      <Launches />
      <Launches onMat />
    </>
  );
}
