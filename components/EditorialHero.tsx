import { hero, site } from "@/content";
import { CartMockup } from "./Mockups";
import { Chip, Container, SelectionHandles } from "./ui";

/** A headline line with any {word} drawn selected: a selection box with handles around it. */
function selected(line: string) {
  return line.split(/(\{[^}]+\})/g).map((part, i) =>
    part.startsWith("{") ? (
      <span key={i} className="relative inline-block">
        {part.slice(1, -1)}
        <SelectionHandles className="-inset-x-[0.08em] -top-[0.02em] -bottom-[0.1em]" />
      </span>
    ) : part,
  );
}

/** A six-armed asterisk, as on printed ephemera. Thick strokes, so it holds up small. */
function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round">
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
      <Container className="relative py-8 lg:py-14">
        {/* Booking line, above the headline */}
        <p className="mono mb-6 flex items-center gap-3 lg:mb-8">
          <Asterisk className="live-star size-4" />
          {site.availability}
        </p>
        {/* Desktop: sized to the content width (the window less the gutter, frame and padding,
            212px) so
            the longer line, about 12.5em, always fits on one line; capped at 90px. */}
        <h1 className="relative z-1 serif text-[clamp(40px,6.6vw,88px)] leading-[1.02] tracking-[-0.04em] lg:text-[min(90px,calc((100vw-212px)/13.5))]">
          {hero.heading.map((l) => <span key={l} className="block">{selected(l)}</span>)}
        </h1>

        {/* Intro, in Manrope regular, 19px on desktop */}
        <p className="mt-6 max-w-3xl font-sans text-[17px] leading-snug tracking-[-0.02em] lg:mt-8 lg:text-[19px]">{hero.lede}</p>

        {/* Storefront screens: a row of framed shots, each with a dark label. On desktop it's a grid
            whose columns are as wide as each screen's shape (width / height), so all four come out
            the same height and the row fills the content width exactly. Phones scroll it sideways. */}
        <div
          className="relative z-1 -mx-4 mt-10 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 lg:mt-14 lg:grid lg:gap-5 lg:overflow-visible lg:pb-0"
          style={{ gridTemplateColumns: [...hero.shots.map((x) => x.width / x.height), cartRatio].map((r) => `${r.toFixed(3)}fr`).join(" ") }}
        >
          {hero.shots.map((shot) => (
            <figure key={shot.src} className="shot relative h-[220px] shrink-0 overflow-hidden border border-line lg:h-auto lg:w-full" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} decoding="async" className="size-full object-cover" />
              {/* Bottom left: the badge if the screen has one, otherwise its label */}
              <figcaption className="absolute bottom-3 left-3">
                <Chip className="text-white [--color-chip:var(--color-accent)]">{shot.tag ?? shot.label}</Chip>
              </figcaption>
            </figure>
          ))}
          {/* A fourth screen drawn in HTML: a cart on a phone */}
          <figure className="shot relative h-[220px] shrink-0 overflow-hidden border border-line lg:h-auto lg:w-full" style={{ aspectRatio: `${cartRatio}` }}>
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
