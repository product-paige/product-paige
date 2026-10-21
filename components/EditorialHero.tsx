import type { CSSProperties } from "react";
import { hero, site } from "@/content";
import { CartMockup, ProductPageMockup } from "./Mockups";
import { TagIcon } from "./TagIcon";
import { Chip, Container, sansTitle } from "./ui";

/** A bold six-armed asterisk, as on printed ephemera. */
function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round">
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    </svg>
  );
}

/**
 * The hero, laid out like an editorial spread: the headline is broken across a
 * 12-column grid and wraps around two ecommerce mockups (an arched product page and a phone
 * cart down the right edge). On desktop the type is sized to the width of the grid (8.6cqw), so each phrase fills its
 * columns at any screen size, and the images take their height from the lines of text beside
 * them (sized in em of the same type). Phones get the plain stack: arched photo, headline, intro.
 * On desktop it stays pinned under the header while the dark About panel slides up over it.
 */
export function EditorialHero() {
  // On desktop each phrase of the headline is its own grid item (the h1 is display: contents).
  const line = "block lg:whitespace-nowrap";
  const type = "lg:text-[8.6cqw]";
  return (
    <section className="relative lg:sticky lg:top-[68px]">
      <Container className="paper-grain bg-paper py-10 lg:py-14">
        <div className="@container">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
            {/* Arched product page mockup, exactly two lines of type tall, so the three lines keep an even 1em pitch, beside "Product, design / & build" */}
            <div className={`relative lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 ${type}`}>
              <Asterisk className="absolute -top-4 -left-3 z-1 size-9 lg:-top-5 lg:-left-5 lg:size-11" />
              <ProductPageMockup className="aspect-[4/3] rounded-tl-[120px] rounded-tr-[6px] rounded-b-[6px] lg:aspect-auto lg:h-[2em] lg:rounded-tl-[1.4em]" />
            </div>

            <h1 className={`serif text-[clamp(44px,11vw,72px)] leading-[0.95] lg:contents lg:leading-none`}>
              <span className={`${line} ${type} lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:self-start`}>{hero.heading[0]} </span>
              <span className={`${line} ${type} lg:col-span-5 lg:col-start-5 lg:row-start-2 lg:self-start`}>{hero.heading[1]} </span>
              <span className={`${line} ${type} lg:col-span-9 lg:col-start-1 lg:row-start-3 lg:self-start`}>{hero.heading[2]}</span>
            </h1>

            {/* A phone cart mockup down the right edge, from "& build" to the bottom of the intro */}
            <CartMockup className="hidden rounded-[6px] lg:col-span-3 lg:col-start-10 lg:row-span-3 lg:row-start-2 lg:mt-[0.12em] lg:block" />

            {/* Intro under "for Shopify teams", in the blog card heading style */}
            <p className={`${sansTitle} max-w-xl lg:col-span-8 lg:col-start-1 lg:row-start-4 lg:mt-4 lg:self-start`}>{hero.lede}</p>

            {/* Under the rule: the hero pills on the left, the booking line on the right */}
            <div className="flex flex-col gap-5 border-t border-line pt-5 lg:col-span-12 lg:row-start-5 lg:mt-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="pill-cycle flex flex-wrap gap-2" style={{ "--n": hero.tags.length } as CSSProperties}>
                {hero.tags.map((t, i) => (
                  <Chip key={t.label} icon={<TagIcon name={t.icon} />} style={{ "--i": i } as CSSProperties}>{t.label}</Chip>
                ))}
              </div>
              <p className="flex shrink-0 items-center gap-3 font-sans text-[17px] font-medium lg:text-[20px]">
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
