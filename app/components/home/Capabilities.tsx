"use client";

import { useState } from "react";
import { Chip } from "../Chip";

const capabilities: Array<{ title: string; sub: string; blurb: string }> = [
  {
    title: "Strategy",
    sub: "Positioning + messaging · Product strategy",
    blurb:
      "Positioning, product strategy, and the sentence that names what you sell, who it&rsquo;s for, and why it matters. I help teams get clear before they get loud — the story has to work before the design or the growth tactics can.",
  },
  {
    title: "Design",
    sub: "UX + conversion · Web + app design",
    blurb:
      "UX, conversion, and web + app design. I simplify the experience, remove friction, and make sure it looks as good as it works — from first click to onboarding to checkout.",
  },
  {
    title: "Brand",
    sub: "Brand identity · Content + voice",
    blurb:
      "Brand identity, content, and voice — built from experience, not theory. I&rsquo;ve launched two ecommerce brands from scratch, so I know what it takes to make a brand people actually trust, not just notice.",
  },
  {
    // PLACEHOLDER 4th group — Growth is the pick because it's the territory
    // your own copy keeps returning to (the callout, the About "special
    // projects" line). Swap the title/sub/blurb once you decide.
    title: "Growth",
    sub: "Experiments + AI tooling · Demand gen",
    blurb:
      "Scrappy growth experiments: AI-coded mini tools, demand gen, and top-of-funnel plays. I build with Claude, including MCP integrations that plug straight into Shopify. Built fast, tested fast, killed fast if they don&rsquo;t work. The point is learning what moves, not shipping something permanent.",
  },
];


/** Capability accordion — one group open at a time. */
export function Capabilities() {
  const [activeCap, setActiveCap] = useState(0);

  return (
    <>
      {/* === CAPABILITIES === Flush section (no outer padding). Left
          column: h2 + lead pinned to the bottom. Right column: full-
          bleed accordion. Section auto-sizes to accordion content so
          padding never gets weird when items open/close. */}
      <section
        id="services"
        data-section="capabilities"
        className="section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          <div className="flex flex-col gap-4 p-6 md:p-10 md:justify-end">
            <h2 className="text-section font-display text-ink max-w-[18ch]">
              Building better Shopify experiences
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[480px]">
              Understand the problem, simplify the experience, and focus on
              what actually moves things forward.
            </p>
            {/* Callout — the scrappy-experiments note. Sits under the lead
                so it reads as an aside to the three capability groups. */}
            <aside className="mt-4 border-l-2 border-[#0E6BFF] pl-4 py-1 max-w-[480px]">
              <p className="text-base leading-[1.4] opacity-80">
                I also love a good scrappy growth experiment — AI-coded mini
                tools, demand gen and top-of-funnel plays. Built fast, tested
                fast, killed fast if they don&rsquo;t work.
              </p>
            </aside>
          </div>
          {/* Accordion. First item open by default (activeCap=0),
              one-open-at-a-time via the single activeCap state. Row
              dividers span the full column width; heading + description
              take their own inner horizontal padding. */}
          <div className="divider-indent-left flex flex-col">
            <ul className="flex flex-col border-t border-[#1a1a1a]/25">
              {capabilities.map((c, i) => {
                const isOpen = activeCap === i;
                return (
                  <li
                    key={c.title}
                    className="border-b border-[#1a1a1a]/25 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCap(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className={`w-full text-left px-6 md:px-10 py-8 text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-ink transition-opacity ${
                        isOpen ? "opacity-100" : "opacity-40 hover:opacity-80"
                      }`}
                    >
                      <span className="block">{c.title}</span>
                    </button>
                    {/* Smooth accordion via a 0fr → 1fr grid row.
                        The inner div uses overflow-hidden so the
                        contents clip while the parent row height
                        animates. Fade + tiny lift on the copy makes
                        the reveal feel deliberate. */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={`px-6 md:px-10 pb-6 flex flex-col gap-4 transition-opacity duration-500 ease-out ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <p
                            className="text-base leading-[1.4] opacity-80 max-w-[640px]"
                            dangerouslySetInnerHTML={{ __html: c.blurb }}
                          />
                          {/* Disciplines as grey pills — inside the panel so
                              the closed accordion stays to just the group name. */}
                          <span className="flex flex-wrap items-center gap-2">
                            {c.sub.split("·").map((d) => (
                              <Chip key={d}>{d.trim()}</Chip>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
