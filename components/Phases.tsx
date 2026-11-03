import { approachPage, projects } from "@/content";
import { Chip, Reveal } from "./ui";

/**
 * The four phases as numbered rows: the number, the title and a line on it, then what it can
 * include and, optionally, the case studies that show it. With topBorder every row has a rule
 * above it (for use under a heading). The last row has no bottom padding, so the section's own sets the gap. Used on /approach and the homepage.
 * Dividers run out to the sheet's edges; the rows keep the usual inset.
 * On desktop the rows stack as you scroll: each pins under the header, 84px lower than the one
 * before, and the next slides up over it, so the earlier titles stay in view like tabs.
 */
// Where each row pins on desktop: under the 56px header, 84px lower each time.
const stickTop = ["lg:top-[56px]", "lg:top-[140px]", "lg:top-[224px]", "lg:top-[308px]"];

export function Phases({ caseStudies = false, topBorder = false }: { caseStudies?: boolean; topBorder?: boolean }) {
  const project = (slug: string) => projects.items.find((p) => p.slug === slug);
  return (
    <div className="-mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20">
      {approachPage.phases.map((ph, i) => (
        <Reveal as="article" key={ph.title} className={`rails grid gap-6 border-grid bg-paper py-8 ${topBorder ? "border-t" : "not-first:border-t"} md:grid-cols-[auto_1.1fr_1fr] px-4 sm:px-6 md:gap-8 md:px-12 lg:sticky ${stickTop[i % stickTop.length]} lg:gap-12 lg:px-20 lg:py-10 last:pb-0`}>
          {/* The page's side lines, which the row's paper would otherwise cover while it's pinned */}
          <i aria-hidden className="rails-inner" />
          <p className="serif text-[clamp(28px,2.8vw,38px)] leading-none text-accent">{String(i + 1).padStart(2, "0")}</p>
          <div>
            <h3 className="serif text-[clamp(24px,2.4vw,34px)] leading-[1.08] tracking-[-0.04em]">{ph.title}</h3>
            <p className="mt-4 max-w-lg">{ph.body}</p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-medium">Can include</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ph.includes.map((c) => <li key={c}><Chip>{c}</Chip></li>)}
              </ul>
            </div>
            {caseStudies && (
              <div>
                <p className="text-[14px] font-medium">Case studies</p>
                <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                  {ph.caseStudies.map((slug) => {
                    const p = project(slug);
                    return p && <a key={slug} href={`/projects/${slug}`} className="link">{p.client}</a>;
                  })}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
