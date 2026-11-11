import { approachPage, projects } from "@/content";
import { ScrollFocus } from "./ScrollFocus";
import { Chip, Reveal } from "./ui";

/**
 * The four phases as numbered rows: the number, the title and a line on it, then what it can
 * include and, optionally, the case studies that show it. With topBorder every row has a rule
 * above it (for use under a heading). The last row has no bottom padding, so the section's own sets the gap. Used on /approach and the homepage.
 * Dividers run out to the sheet's edges; the rows keep the usual inset.
 * As you scroll, the row crossing the middle of the screen is at full strength and the others
 * fade back (see ScrollFocus), and its badges turn the accent red.
 */
// Faded until active, once ScrollFocus is running (data-focus); the side lines stay as they are.
const focus = "[&>:not(i)]:transition-opacity [&>:not(i)]:duration-500 in-data-focus:[&:not([data-active])>:not(i)]:opacity-30";

export function Phases({ caseStudies = false, topBorder = false }: { caseStudies?: boolean; topBorder?: boolean }) {
  const project = (slug: string) => projects.items.find((p) => p.slug === slug && !p.comingSoon);
  return (
    <ScrollFocus className="-mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20">
      {approachPage.phases.map((ph, i) => (
        <Reveal as="article" key={ph.title} className={`grid gap-6 border-grid py-10 ${topBorder ? "border-t" : "not-first:border-t"} md:grid-cols-[auto_1.1fr_1fr] px-4 sm:px-6 md:gap-8 md:px-12 lg:gap-12 lg:px-20 lg:py-14 last:pb-0 data-active:[--color-chip:var(--color-accent)] ${focus}`}>
          <p className="serif text-[clamp(28px,2.8vw,38px)] leading-none text-accent">{String(i + 1).padStart(2, "0")}</p>
          <div>
            <h3 className="serif text-[clamp(24px,2.4vw,34px)] leading-[1.08] tracking-[-0.04em]">{ph.title}</h3>
            <p className="mt-4 max-w-lg">{ph.body}</p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-medium">Can include</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ph.includes.map((c) => <li key={c}><Chip className="transition-colors duration-500 in-data-active:text-white">{c}</Chip></li>)}
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
    </ScrollFocus>
  );
}
