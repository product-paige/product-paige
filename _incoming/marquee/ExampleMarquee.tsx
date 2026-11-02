"use client";

import { useRef, useState } from "react";

import { HeroFloatingCard } from "./HeroFloatingCard";
import { heroFloatingCards } from "./heroCards";

/**
 * The scrolling run of examples — collage cards and the project build
 * pieces, looping continuously.
 *
 * Lifted out of a wordmark hero that has since been deleted, so the
 * homepage can show the run on its own.
 *
 * EIGHT EXAMPLES: six collage cards and two bare landscape photos.
 *
 * ⚠ NOT ONE OF THEM IS A SCREENSHOT OF REAL WORK. The cards are
 * mocked-up chrome (a product tile, an email, a polaroid, a swatch, a
 * scrapbook card) and the two photos are leftover hero textures. The
 * labelled "build piece" placeholders that used to pad this row to
 * twenty are gone — they were empty grey boxes.
 *
 * Two of the projects are LIVE (organicmoderne.com, brandplaybook.shop).
 * A screenshot of each would turn this row from a promise into
 * evidence, which is the thing the whole site is short of.
 */
export function ExampleMarquee({
  className = "",
}: {
  className?: string;
}) {
  /**
   * Drag to scroll.
   *
   * The row was already scrollable — overflow-x-auto means a trackpad
   * or a shift-wheel moves it — but a mouse had nothing to grab,
   * because the scrollbar is hidden by .scrollbar-hide. This adds the
   * press-and-pull that the row looks like it should have.
   *
   * It scrolls scrollLeft and pauses the animation for the duration of
   * the pull (.is-dragging). The CSS used to pause on :hover, which
   * did this job incidentally — now that it does not, the drag has to
   * stop the track itself or the two fight each other.
   *
   * Pointer events, not mouse events: one path covers mouse, pen and
   * touch, and setPointerCapture keeps the drag alive when the cursor
   * leaves the row mid-pull. Touch still gets native momentum scrolling
   * because nothing here calls preventDefault.
   */
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  /* The animation no longer pauses on hover, so the drag has to pause
     it itself — otherwise a pull fights the running transform. */
  const [dragging, setDragging] = useState(false);

  /**
   * EXACTLY EIGHT EXAMPLES. Six collage cards (the Shopify product,
   * the polaroid, the swatch, the email, the scrapbook card and the
   * plain card) plus two project build pieces.
   *
   * ⚠ THE TWO BUILD PIECES ARE EMPTY SLOTS. They are labelled
   * placeholders for mockups each project already names in `mockups`,
   * and there is not one UX mockup image in /public — only photographs
   * and textures. Two of those projects are LIVE (organicmoderne.com,
   * brandplaybook.shop); a screenshot of each would turn this row from
   * a promise into evidence. Until then, judge them as scaffolding.
   *
   * It used to be the whole of heroFloatingCards plus two mockups per
   * project, each list written out twice — about twenty cards, and the
   * reason the same ⚠ comment appeared in the file four times.
   */
  /**
   * Two bare landscape photos used to sit in this run, to break up a
   * row of eight framed rectangles. They were stock backgrounds left
   * from earlier hero experiments — no claim, no work — and both the
   * cards and the files are gone.
   *
   * ⚠ STILL NOT ONE SCREENSHOT OF PAIGE'S SHIPPED WORK IN THIS ROW.
   * organicmoderne.com and brandplaybook.shop are both live; a shot of
   * each would turn it from a promise into evidence.
   */
  /**
   * EIGHT EXAMPLES, ALTERNATING WIDE AND UPRIGHT.
   *
   * Odd positions are the wide cards (the desktop window, the two
   * scrapbook cards, the yellow swatch); even positions are the
   * upright ones (two product tiles, the email, the polaroid). Four
   * of each, so the alternation holds all the way round the loop
   * rather than breaking at the seam.
   *
   * Two bare landscape photos used to sit in this run. They were
   * stock backgrounds left over from earlier hero experiments,
   * carrying no claim and showing no work; both the cards and the
   * files are gone.
   *
   * ⚠ STILL NOT ONE SCREENSHOT OF SHIPPED WORK OF PAIGE'S. The
   * desktop window holds a Pinky PDP with no recorded attribution;
   * everything else is mocked-up chrome. organicmoderne.com and
   * brandplaybook.shop are both live — a screenshot of each would
   * turn this row from a promise into evidence.
   */
  const ORDER = [
    "Pinky Collagen Peptides",      // wide    — XP window
    "Backspace Body Wash",          // upright — product tile
    "The eight-second test",        // wide    — scrapbook card
    "Half a step ahead",            // upright — designed email
    "Organic Moderne",              // wide    — yellow cut-out
    "Scissors & tweezers set",      // upright — product tile
    "Shopify\u2019s agent blueprint", // wide  — scrapbook card
    "Backspace Body",               // upright — polaroid
    "Shopping basket",              // wide    — bare cut-out collage
  ];

  /* Exact match, NOT startsWith: "Backspace Body" is a prefix of
     "Backspace Body Wash", and a prefix match resolved both to the
     product tile — the polaroid vanished and every pass logged a
     duplicate-key error. */
  const EXAMPLES: Array<{ key: string; node: React.ReactNode }> = ORDER.map(
    (t) => {
      const c = heroFloatingCards.find((x) => x.card.title === t);
      /* A renamed card would silently shorten the row, so fail loudly. */
      if (!c) throw new Error(`ExampleMarquee: no hero card titled "${t}"`);
      return {
        key: c.card.title,
        node: (
          <HeroFloatingCard
            inline
            card={c.card}
            rotate="0deg"
            widthClass={c.widthClass}
          />
        ),
      };
    },
  );

  return (
    <section
      data-section="example-marquee"
      className={`relative overflow-hidden ${className}`}
    >
    {/* A continuous marquee, not a hand-scrolled row. The track holds
        the cards TWICE and translates -50%, which lands the copy
        exactly where the original began — that is what makes the loop
        seamless. It pauses on hover and on keyboard focus, and
        prefers-reduced-motion turns it off entirely (globals.css).
        overflow-x-auto stays so it is still draggable when paused. */}
    {/* Full-bleed: negative margins cancel the section's 40px so the
        row runs edge to edge and the cards leave the frame, as in the
        reference. Everything else keeps the padding. */}
    <div
      ref={scroller}
      className={`marquee relative z-10 -mx-6 md:-mx-12 w-auto overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing${
        dragging ? " is-dragging" : ""
      }`}
      onPointerDown={(e) => {
        const el = scroller.current;
        if (!el) return;
        drag.current = { x: e.clientX, left: el.scrollLeft };
        el.setPointerCapture(e.pointerId);
        setDragging(true);
      }}
      onPointerMove={(e) => {
        const el = scroller.current;
        if (!el || !drag.current) return;
        el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
      }}
      onPointerUp={(e) => {
        drag.current = null;
        setDragging(false);
        scroller.current?.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => {
        drag.current = null;
        setDragging(false);
      }}
    >
      <div
        aria-hidden="true"
        className="marquee-track flex w-max items-end gap-6 md:gap-8 py-3"
        style={{ "--marquee-duration": "75s" } as React.CSSProperties}
      >
        {/* The track holds EXAMPLES twice. Eight examples, sixteen
            elements — the second pass is what makes -50% land exactly
            on the start of the first, which is the whole trick of a
            seamless loop. Changing the count means changing it here
            once, not in four places as before. */}
        {[0, 1].map((pass) =>
          EXAMPLES.map((ex, n) => (
            <div
              key={`${pass}-${ex.key}`}
              className="snap-center shrink-0"
              /* Tailwind v4 rotate-* sets the `rotate` property.
                 Only every third card is tilted, and only slightly —
                 a row where everything is on an angle reads as
                 scattered rather than as a set. */
              style={{ rotate: n % 3 === 1 ? "-1.5deg" : "0deg" }}
            >
              {ex.node}
            </div>
          )),
        )}
      </div>
    </div>
    </section>
  );
}
