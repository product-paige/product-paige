import type { ReactNode } from "react";
import { hero, site } from "@/content";
import { CartMockup } from "./Mockups";
import { Button, Chip, Container, SelectionHandles, selectionBlue } from "./ui";

/**
 * A headline line with any {word} drawn selected, as in a design tool. On load a cursor drags a
 * marquee across the word, then lets go and the selection box and handles appear (the .drag-*
 * animations in globals.css; with reduced motion, just the box).
 */
function selected(line: string) {
  const inset = "-inset-x-[0.14em] -top-[0.02em] -bottom-[0.1em]";
  return line.split(/(\{[^}]+\})/g).map((part, i) =>
    part.startsWith("{") ? (
      <span key={i} className="relative inline-block">
        {part.slice(1, -1)}
        <span aria-hidden className={`drag-marquee pointer-events-none absolute ${inset}`} style={{ border: `1px solid ${selectionBlue}`, background: `color-mix(in srgb, ${selectionBlue} 12%, transparent)` }} />
        <SelectionHandles className={`drag-box ${inset}`} handleClassName="drag-handle" />
        <svg aria-hidden viewBox="0 0 16 20" className="drag-cursor pointer-events-none absolute size-[22px]">
          <path d="M1 1v15.5l4.2-4.1 2.7 6.2 2.6-1.1-2.7-6.1H14z" fill="#1d1d1b" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      </span>
    ) : part,
  );
}

/** A six-armed asterisk, as on printed ephemera. Thick strokes by default, so it holds up small; `weight` thins them for bigger uses. */
export function Asterisk({ className = "", weight = 4 }: { className?: string; weight?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={weight} strokeLinecap="round">
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    </svg>
  );
}

/**
 * The hero: the booking line, the headline, the intro, then a row of storefront screens.
 */
// The cart mockup's shape (width / height); it's drawn in HTML, so this is ours to pick.
const cartRatio = 0.875;

/** One storefront screen in its frame, with its label as a caption underneath, clear of the screen. */
function Shot({ ratio, label, children }: { ratio: number; label: string; children: ReactNode }) {
  return (
    <figure className="flex shrink-0 flex-col items-start gap-3 lg:w-full">
      <div className="shot group relative h-[220px] overflow-hidden rounded-[8px] border border-line lg:h-auto lg:w-full" style={{ aspectRatio: `${ratio}` }}>
        {children}
      </div>
      <figcaption>
        <Chip className="text-[13px] text-white [--color-chip:var(--color-accent)]">{label}</Chip>
      </figcaption>
    </figure>
  );
}

export function EditorialHero() {
  // The screens in order: the images, the cart, then any image marked `afterCart`
  const row = [...hero.shots.filter((x) => !x.afterCart), "cart" as const, ...hero.shots.filter((x) => x.afterCart)];
  return (
    <section className="relative">
      <Container className="relative py-8 lg:py-14">
        {/* Booking line, above the headline */}
        <p className="mono mb-6 flex items-center gap-3">
          <Asterisk className="live-star size-4" />
          {site.availability}
        </p>
        {/* Desktop: sized to the content width (the window less the gutter, frame and padding,
            212px) so the longer line, about 12.5em, always fits on one line with room to spare;
            capped at 82px. */}
        <h1 className="relative z-1 serif text-[clamp(36px,6vw,80px)] leading-[1.02] tracking-[-0.04em] lg:text-[min(82px,calc((100vw-212px)/14.75))]">
          {hero.heading.map((l) => <span key={l} className="block">{selected(l)}</span>)}
        </h1>

        {/* Intro, in Manrope regular, 19px on desktop */}
        <p className="mt-6 max-w-2xl font-sans text-[18px] leading-[1.5] tracking-[-0.015em] text-balance lg:mt-8 lg:text-[21px]">{hero.lede}</p>
        {/* The main button, which opens the contact form, and a text link down to the services */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-8">
          <Button href={site.bookingUrl} accent>{hero.cta.label}</Button>
          <a href={hero.cta.link.href} className="link">{hero.cta.link.label}</a>
        </div>

        {/* Storefront screens: a row of framed shots, each with a dark label. On desktop it's a grid
            whose columns are as wide as each screen's shape (width / height), so all four come out
            the same height and the row fills the content width exactly. Phones scroll it sideways. */}
        <div
          className="relative z-1 -mx-4 mt-10 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 lg:mt-14 lg:grid lg:gap-4 lg:overflow-visible lg:pb-0"
          style={{ gridTemplateColumns: row.map((r) => `${(r === "cart" ? cartRatio : r.width / r.height).toFixed(3)}fr`).join(" ") }}
        >
          {row.map((shot) =>
            shot === "cart" ? (
              // A screen drawn in HTML: a cart on a phone
              <Shot key="cart" ratio={cartRatio} label="Conversion">
                <CartMockup className="size-full" />
              </Shot>
            ) : (
              <Shot key={shot.src} ratio={shot.width / shot.height} label={shot.tag ?? shot.label}>
                <div className="relative size-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} decoding="async" className="size-full object-cover" />
                  {/* A second image that fades in on hover, as a product card swaps to a lifestyle shot */}
                  {shot.hover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={shot.hover} alt="" width={shot.width} height={shot.height} decoding="async" loading="lazy" className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  )}
                </div>
              </Shot>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
