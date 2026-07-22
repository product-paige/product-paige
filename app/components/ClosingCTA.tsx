import { BtnIcons } from "./BtnIcons";

type ClosingCTAProps = {
  /** Main headline — display font, white on ink. */
  title: string;
  /** Optional supporting paragraph under the headline. */
  body?: string;
  /** Button label. Defaults to "Let's talk". */
  ctaLabel?: string;
  /** Button href. Defaults to /contact. */
  ctaHref?: string;
};

/**
 * The dark ink closing CTA panel used at the bottom of every content page.
 * Standardized here so every consumer gets the same padding, chamfer,
 * grain treatment, and accent button styling. Pass just the copy.
 */
export function ClosingCTA({
  title,
  body,
  ctaLabel = "Let's talk",
  ctaHref = "/contact",
}: ClosingCTAProps) {
  return (
    <section
      data-section="closing-cta-wrap"
      className="p-6 md:p-10 section-border-b"
    >
      <div
        data-section="closing-cta"
        className="bg-[#1A191E] text-white py-10 px-6 md:py-16 md:px-10 section-chamfer relative grain-vintage flex flex-col md:flex-row md:items-start md:justify-between gap-10"
      >
        <div className="flex flex-col gap-3 max-w-[1000px] flex-1 min-w-0">
          <h2 className="text-5xl font-display leading-[1.05] text-white">
            {title}
          </h2>
          {body ? (
            <p className="text-lg leading-[1.4] text-white opacity-80 max-w-[720px]">
              {body}
            </p>
          ) : null}
        </div>
        <a href={ctaHref} className="inline-flex btn shrink-0">
          <span className="btn-text bg-[#F3EB88] text-ink">{ctaLabel}</span>
          <span className="btn-tab bg-[#F3EB88] text-ink">
            <BtnIcons />
          </span>
        </a>
      </div>
    </section>
  );
}
