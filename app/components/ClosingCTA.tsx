import { BtnIcons } from "./BtnIcons";

type ClosingCTAProps = {
  /** Eyebrow chip above the headline. Defaults to "Get in touch". */
  eyebrow?: string;
  /** Main headline — renders at type-display-h1 scale, white on ink. */
  title: string;
  /** Optional supporting paragraph under the headline. */
  body?: string;
  /** Button label. Defaults to "Start a project". */
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
  eyebrow = "Get in touch",
  title,
  body,
  ctaLabel = "Start a project",
  ctaHref = "/contact",
}: ClosingCTAProps) {
  return (
    <section
      data-section="closing-cta"
      className="bg-[#1A191E] text-white p-8 md:p-16 m-4 md:m-6 section-chamfer relative grain-vintage flex flex-col gap-10 items-start"
    >
      <div className="flex flex-col gap-6 max-w-[1000px]">
        <span className="type-eyebrow">{eyebrow}</span>
        <div className="flex flex-col gap-3">
          <h2 className="type-display-h1 !text-white">{title}</h2>
          {body ? (
            <p className="type-leading !text-white opacity-80 max-w-[720px]">
              {body}
            </p>
          ) : null}
        </div>
      </div>
      <a href={ctaHref} className="inline-flex btn">
        <span className="btn-text bg-[#0E6BFF] text-white">{ctaLabel}</span>
        <span className="btn-tab bg-[#0E6BFF] text-white">
          <BtnIcons />
        </span>
      </a>
    </section>
  );
}
