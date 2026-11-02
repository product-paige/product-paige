"use client";

import { useState } from "react";
import { CuttingMat } from "./CuttingMat";
import { ArrowUpRight, Container, sectionHeading } from "./ui";

// Three other ways to do Who I work with: each helps a founder see themselves and then sends
// them to the right place. Temporary, to compare; the winner replaces WhoIWorkWith.

// Who, what they usually need, and where to start (the engagement it maps to in Ways to work
// together). Draft copy for Paige to edit.
const who = [
  {
    title: "Starting out",
    phrase: "starting out",
    you: "You've got the product. The store isn't built yet.",
    need: "Brand, site and copy, launched together.",
    start: "Full store build",
  },
  {
    title: "Already selling",
    phrase: "already selling",
    you: "You've got customers. The site isn't keeping up.",
    need: "A clear read on what's costing you sales, then the fixes.",
    start: "Advice and reviews",
  },
  {
    title: "Building for Shopify",
    phrase: "building for Shopify",
    you: "Your app works. Merchants don't see why yet.",
    need: "Positioning, a listing and a site that sell it.",
    start: "One focused project",
  },
];

function OptionLabel({ children }: { children: string }) {
  return <p className="mono mb-6 inline-block rounded-full bg-ink px-3 py-1.5 text-[12px] text-white">{children}</p>;
}

/** A link to the pricing, in the mono label style. */
function StartLink({ label }: { label: string }) {
  return (
    <a href="#pricing" className="group mono inline-flex items-center gap-2 text-[13px]">
      <span className="border-b border-current pb-0.5">Start with: {label}</span>
      <ArrowUpRight turn className="size-4" />
    </a>
  );
}

// A. "Which one are you?": a three-way switch. Picking one shows what you usually need and
// where to start, on the blue mat.
function Picker() {
  const [i, setI] = useState(0);
  const w = who[i];
  return (
    <section className="border-t border-grid py-8 lg:py-14">
      <Container>
        <OptionLabel>Option A · Which one are you?</OptionLabel>
        <h2 className={sectionHeading}>Which one are you?</h2>
        <div role="tablist" aria-label="Where you are" className="mt-8 inline-flex flex-wrap gap-1 rounded-ui border border-line bg-sheet p-1">
          {who.map((x, n) => (
            <button
              key={x.title}
              role="tab"
              aria-selected={i === n}
              onClick={() => setI(n)}
              className={`mono rounded-ui px-4 py-2.5 text-[13px] transition-colors ${i === n ? "bg-ink text-white" : "hover:bg-paper"}`}
            >
              {x.title}
            </button>
          ))}
        </div>
        <div className="relative mt-6 overflow-hidden rounded-[20px] px-4 py-10 sm:px-6 lg:px-14 lg:py-16">
          <CuttingMat />
          <div role="tabpanel" className="relative grid gap-6 bg-paper p-6 shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_30px_rgb(0_0_0/0.18)] md:grid-cols-2 lg:gap-12 lg:p-10">
            <p className="serif text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-0.03em]">{w.you}</p>
            <div className="md:pt-2">
              <p className="mono text-[12px] text-muted">What usually helps</p>
              <p className="mt-2 text-[17px] lg:text-[18px]">{w.need}</p>
              <div className="mt-6"><StartLink label={w.start} /></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// B. One sentence: the three audiences inline in a single big line, each a link down to where
// to start. No cards at all.
function Sentence() {
  return (
    <section className="border-t border-grid py-8 lg:py-14">
      <Container>
        <OptionLabel>Option B · One sentence</OptionLabel>
        <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />Who I work with</p>
        <p className="serif mt-6 max-w-[22ch] text-[clamp(32px,4.4vw,60px)] leading-[1.12] tracking-[-0.04em]">
          Founders{" "}
          {who.map((w, n) => (
            <span key={w.title}>
              <a href="#pricing" className="underline decoration-accent decoration-[0.06em] underline-offset-[0.16em] transition-colors hover:text-accent">
                {w.phrase}
              </a>
              {n === 0 ? ", " : n === 1 ? " and teams " : ""}
            </span>
          ))}
          .
        </p>
        <p className="mt-6 max-w-xl text-[17px]">Pick the one that sounds like you and I'll point you to where to start.</p>
      </Container>
    </section>
  );
}

// C. A table: three columns, one per audience, and three rows (where you are, what helps,
// where to start), so it reads as a quick comparison rather than three cards. Every cell has a
// fine border, and the column headings are folder tabs on top of the grid.
function Table() {
  const rows: [string, (w: (typeof who)[number]) => React.ReactNode][] = [
    ["Where you are", (w) => <span className="serif text-[22px] leading-[1.2] tracking-[-0.02em]">{w.you}</span>],
    ["What helps", (w) => w.need],
    ["Start with", (w) => <StartLink label={w.start} />],
  ];
  return (
    <section className="border-t border-grid py-8 lg:py-14">
      <Container>
        <OptionLabel>Option C · At a glance</OptionLabel>
        <h2 className={sectionHeading}>Who I work with</h2>
        <div className="mt-8 overflow-x-auto lg:mt-10">
          {/* A full grid of fine borders; the column headings sit on top as folder tabs */}
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-[16%]" />
                {who.map((w) => (
                  <th key={w.title} className="pl-0 align-bottom">
                    <span className="mono -mb-px inline-flex items-center gap-2.5 rounded-t-ui border border-b-0 border-line bg-sheet px-4 pt-2.5 pb-2 text-[13px] font-normal">
                      <i aria-hidden className="size-2.5 rounded-full bg-accent" />{w.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, cell], r) => (
                <tr key={label} className="align-top">
                  <th className={`mono border-b border-l border-line px-4 py-5 text-[12px] font-normal text-muted ${r === 0 ? "border-t" : ""}`}>{label}</th>
                  {who.map((w) => (
                    <td key={w.title} className={`border-r border-b border-l-0 border-line px-5 py-5 text-[16px] ${r === 0 ? "border-t" : ""} first-of-type:border-l`}>{cell(w)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

export function AudienceOptions() {
  return (
    <>
      <Picker />
      <Sentence />
      <Table />
    </>
  );
}
