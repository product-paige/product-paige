import { art, hero, site } from "@/content";
import { CartMockup } from "./Mockups";
import { Chip, Container, Illo } from "./ui";

/** A six-armed asterisk, as on printed ephemera. */
function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    </svg>
  );
}

/**
 * The hero: the booking line, the headline, the intro, then a row of storefront screens.
 */
// The cart mockup's shape (width / height); it's drawn in HTML, so this is ours to pick.
const cartRatio = 0.9;

export function EditorialHero() {
  return (
    <section className="relative">
      <Container className="relative pt-14 pb-14 lg:pt-20 lg:pb-20">
        {/* A sticker on the right (desktop): the beauty box, tilted, overlapping the end of the
            headline's first line, which is drawn above it (z-1). */}
        <Illo art={art.parcel} className="pointer-events-none absolute top-[72px] right-[5%] hidden w-[clamp(185px,15.5vw,235px)] rotate-[8deg] lg:block" />
        {/* Booking line, above the headline */}
        <p className="mb-6 flex items-center gap-3 font-sans text-[17px] font-medium tracking-[-0.03em] lg:mb-8 lg:text-[20px]">
          <Asterisk className="live-star size-5" />
          {site.availability}
        </p>
        {/* Desktop: sized to the content width (the window less the gutter, frame and padding,
            212px) so
            the longer line, about 12.5em, always fits on one line; capped at 90px. */}
        <h1 className="relative z-1 serif text-[clamp(40px,6.6vw,88px)] leading-[1.02] tracking-[-0.04em] lg:text-[min(90px,calc((100vw-212px)/13.5))]">
          {hero.heading.map((l) => <span key={l} className="block">{l}</span>)}
        </h1>

        {/* Intro, in Manrope medium, 22px on desktop */}
        <p className="mt-6 max-w-xl font-sans text-[18px] leading-snug font-medium tracking-[-0.03em] lg:mt-8 lg:text-[22px]">{hero.lede}</p>

        {/* Storefront screens: a row of framed shots, each with a dark label. On desktop it's a grid
            whose columns are as wide as each screen's shape (width / height), so all four come out
            the same height and the row fills the content width exactly. Phones scroll it sideways. */}
        <div
          className="relative z-1 -mx-4 mt-10 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 lg:mt-14 lg:grid lg:gap-5 lg:overflow-visible lg:pb-0"
          style={{ gridTemplateColumns: [...hero.shots.map((x) => x.width / x.height), cartRatio].map((r) => `${r.toFixed(3)}fr`).join(" ") }}
        >
          {hero.shots.map((shot) => (
            <figure key={shot.src} className="shot relative h-[220px] shrink-0 overflow-hidden rounded-[6px] border border-line lg:h-auto lg:w-full" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} decoding="async" className="size-full object-cover" />
              {/* Bottom left: the badge if the screen has one, otherwise its label */}
              <figcaption className="absolute bottom-3 left-3">
                <Chip className="text-white [--color-chip:var(--color-accent)]">{shot.tag ?? shot.label}</Chip>
              </figcaption>
            </figure>
          ))}
          {/* A fourth screen drawn in HTML: a cart on a phone */}
          <figure className="shot relative h-[220px] shrink-0 overflow-hidden rounded-[6px] border border-line lg:h-auto lg:w-full" style={{ aspectRatio: `${cartRatio}` }}>
            <CartMockup className="size-full" />
            <figcaption className="absolute bottom-3 left-3">
              <Chip className="text-white [--color-chip:var(--color-accent)]">Conversion</Chip>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
