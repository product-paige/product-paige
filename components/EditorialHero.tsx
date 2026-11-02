import { hero, site } from "@/content";
import { TagIcon } from "./TagIcon";
import { Chip, Container } from "./ui";

/** A six-armed asterisk in a light stroke, as on printed ephemera. */
function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    </svg>
  );
}

/**
 * The hero: the headline in three stacked lines, the intro, then a rule with the hero pills on
 * the left and the booking line on the right.
 */
export function EditorialHero() {
  return (
    <section className="relative">
      <Container className="pt-8 lg:pt-10">
        {/* Desktop: sized to the content width (the window less the rails and padding, 184px) so
            the longer line, about 12.5em, always fits on one line; capped at 88px. */}
        <h1 className="serif text-[clamp(40px,6.6vw,88px)] leading-[1.02] tracking-[-0.04em] lg:text-[min(88px,calc((100vw-184px)/12.8))]">
          {hero.heading.map((l) => <span key={l} className="block">{l}</span>)}
        </h1>

        {/* Intro, in Manrope medium, 22px on desktop */}
        <p className="mt-6 max-w-xl font-sans text-[18px] leading-snug font-medium tracking-[-0.03em] lg:mt-8 lg:text-[22px]">{hero.lede}</p>

        {/* Under the rule: the hero pills on the left, the booking line on the right. The rule runs
            the full width of the page sheet, like the section lines, and the row sits centred between
            it and the next section's line, with the usual inset. */}
        <div className="-mx-4 mt-8 flex flex-col gap-5 border-t border-grid px-4 py-6 sm:-mx-6 sm:px-6 md:-mx-12 md:px-12 lg:-mx-20 lg:flex-row lg:items-center lg:justify-between lg:px-20 lg:py-8">
          <div className="flex flex-wrap gap-2 text-white [--color-chip:var(--color-ink)]">
            {hero.tags.map((t) => (
              <Chip key={t.label} icon={<TagIcon name={t.icon} />}>{t.label}</Chip>
            ))}
          </div>
          <p className="flex shrink-0 items-center gap-3 font-sans text-[17px] font-medium tracking-[-0.03em] lg:text-[20px]">
            <Asterisk className="live-star size-5" />
            {site.availability}
          </p>
        </div>
      </Container>
    </section>
  );
}
