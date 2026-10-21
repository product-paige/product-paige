import { hero, site } from "@/content";
import { CartMockup, ProductPageMockup } from "./Mockups";
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
 * The hero, laid out like an editorial spread: the headline is broken across a
 * 12-column grid and wraps around two ecommerce mockups (an arched product page and a phone
 * cart down the right edge). On desktop the type is sized to the width of the grid (9.7cqw), so each phrase fills its
 * columns at any screen size, and the images take their height from the lines of text beside
 * them (sized in em of the same type). Phones get the plain stack: arched photo, headline, intro.
 * On desktop it stays pinned under the header while the dark About panel slides up over it.
 */
export function EditorialHero() {
  // On desktop each phrase of the headline is its own grid item (the h1 is display: contents),
  // drawn above the mockups so a descender like the g in "design" sits on top of them.
  const line = "block lg:relative lg:z-1 lg:whitespace-nowrap";
  const type = "lg:text-[9.7cqw]";
  return (
    <section className="relative lg:sticky lg:top-[68px]">
      <Container className="pt-8 pb-10 lg:pt-10 lg:pb-14">
        <div className="@container">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
            {/* Arched product page mockup, exactly two lines of type tall, so the three lines keep an even 1.04em pitch, beside "Product, design / & build" */}
            <div className={`relative lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 ${type}`}>
              {/* The Shopify glyph, as a grey mark. On desktop its top lines up with the top of the image. */}
              <span aria-hidden className="shopify-mark absolute -top-5 -left-3 z-1 h-10 w-[35px] lg:top-0 lg:left-0 lg:h-12 lg:w-[42px]" />
              <ProductPageMockup className="aspect-[4/3] rounded-tl-[120px] rounded-tr-[6px] rounded-b-[6px] lg:aspect-auto lg:h-[2.08em] lg:rounded-tl-[1.4em]" />
            </div>

            <h1 className={`serif text-[clamp(44px,11vw,72px)] leading-[0.95] tracking-[-0.06em] lg:contents lg:leading-[1.04]`}>
              <span className={`${line} ${type} lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:self-start`}>{hero.heading[0]} </span>
              <span className={`${line} ${type} lg:col-span-5 lg:col-start-5 lg:row-start-2 lg:self-start`}>{hero.heading[1]} </span>
              <span className={`${line} ${type} lg:col-span-9 lg:col-start-1 lg:row-start-3 lg:self-start`}>{hero.heading[2]}</span>
            </h1>

            {/* A landscape phone cart mockup on the right, beside "& build" and "for Shopify teams" */}
            <CartMockup className="hidden rounded-[6px] lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-2 lg:mt-[0.12em] lg:block" />

            {/* Intro under "for Shopify teams", in Manrope medium, 22px on desktop */}
            <p className={`max-w-xl font-sans text-[18px] leading-snug font-medium tracking-[-0.03em] lg:col-span-8 lg:col-start-1 lg:row-start-4 lg:mt-6 lg:self-start lg:text-[22px]`}>{hero.lede}</p>

            {/* Under the rule: the hero pills on the left, the booking line on the right */}
            <div className="flex flex-col gap-5 border-t border-line pt-6 lg:col-span-12 lg:pt-8 lg:row-start-5 lg:mt-8 lg:flex-row lg:items-center lg:justify-between">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
