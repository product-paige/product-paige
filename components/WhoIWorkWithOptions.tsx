import { audiences } from "@/content";
import type { ReactNode } from "react";
import { CuttingMat } from "./CuttingMat";
import { Container, Reveal } from "./ui";

// Three card designs for Who I work with, each on the blue mat, to compare with the current ones.
// Temporary: once one is picked it goes into WhoIWorkWith and this file goes.

type Audience = (typeof audiences.items)[number];
const n = (i: number) => String(i + 1).padStart(2, "0");
const shadow = "shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_30px_rgb(0_0_0/0.18)]";

// A. Numbered list: a plain white card, the title in the serif, then the points as a numbered
// list with fine rules between them.
function Numbered({ a }: { a: Audience }) {
  return (
    <div className={`h-full bg-paper p-6 lg:p-8 ${shadow}`}>
      <h3 className="serif text-[clamp(24px,2.2vw,30px)] leading-[1.1] tracking-[-0.03em]">{a.title}</h3>
      <p className="mt-2">{a.body}</p>
      <ol className="mt-6 border-t border-line">
        {a.points.map((p, i) => (
          <li key={p} className="flex gap-4 border-b border-line py-3 text-[15px]">
            <span className="mono pt-0.5 text-[12px] text-accent">{n(i)}</span>
            {p}
          </li>
        ))}
      </ol>
    </div>
  );
}

// B. Checklist: a "Sound familiar?" form. A mono label naming who it's for, the title, then the
// points as boxes already ticked in red.
function Checklist({ a }: { a: Audience }) {
  return (
    <div className={`h-full bg-paper p-6 lg:p-8 ${shadow}`}>
      <p className="mono text-[12px] text-muted">For founders who are</p>
      <h3 className="serif mt-2 text-[clamp(24px,2.2vw,30px)] leading-[1.1] tracking-[-0.03em]">{a.title}</h3>
      <p className="mt-2">{a.body}</p>
      <p className="mono mt-6 text-[12px] text-muted">Sound familiar?</p>
      <ul className="mt-3 space-y-3">
        {a.points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-[15px]">
            <span aria-hidden className="mt-0.5 grid size-[18px] shrink-0 place-items-center border-[1.5px] border-ink">
              <svg viewBox="0 0 16 16" className="size-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7" /></svg>
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

// C. Sticky notes: square notes in the site's paper colours, each tilted a touch, the title and
// the points written straight on.
const notes = ["bg-butter", "bg-sky", "bg-sage"];
const tilts = ["-rotate-2", "rotate-1", "-rotate-1"];
function Sticky({ a, i }: { a: Audience; i: number }) {
  return (
    <div className={`h-full ${notes[i % 3]} ${tilts[i % 3]} p-6 shadow-[0_2px_0_rgb(0_0_0/0.05),0_16px_26px_rgb(0_0_0/0.2)] transition hover:rotate-0 lg:p-8`}>
      <h3 className="font-sans text-[20px] font-semibold leading-tight tracking-[-0.03em]">{a.title}</h3>
      <p className="mt-1.5">{a.body}</p>
      <ul className="mt-5 space-y-2.5 text-[15px]">
        {a.points.map((p) => <li key={p} className="flex gap-2.5"><span aria-hidden>–</span>{p}</li>)}
      </ul>
    </div>
  );
}

function Option({ label, card }: { label: string; card: (a: Audience, i: number) => ReactNode }) {
  return (
    <section className="border-t border-grid py-8 lg:py-14">
      <Container>
        <p className="mono mb-6 inline-block rounded-full bg-ink px-3 py-1.5 text-[12px] text-white">{label}</p>
        <div className="relative overflow-hidden rounded-[20px] px-4 py-10 sm:px-6 lg:px-14 lg:py-16">
          <CuttingMat />
          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {audiences.items.map((a, i) => <Reveal key={a.title} delay={i * 120} className="h-full">{card(a, i)}</Reveal>)}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function WhoIWorkWithOptions() {
  return (
    <>
      <Option label="Option A · Numbered list" card={(a) => <Numbered a={a} />} />
      <Option label="Option B · Checklist" card={(a) => <Checklist a={a} />} />
      <Option label="Option C · Sticky notes" card={(a, i) => <Sticky a={a} i={i} />} />
    </>
  );
}
