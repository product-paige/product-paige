# Scrolling examples row — portable bundle

Lifted from `product-paige-website`. Four files, ~860 lines of TSX plus a small CSS block.

## Files

| File | What it is |
|---|---|
| `ExampleMarquee.tsx` | The row. Client component — owns the drag-to-scroll and the seamless loop. |
| `HeroFloatingCard.tsx` | One card, in seven variants (`desktop`, `blog`, `email`, `polaroid`, `shopify`, `swatch`, `cutout`). |
| `heroCards.ts` | The card data. Plain module, not `"use client"` — see the note at the top of it. |
| `marquee.css` | Every global rule the above depend on. |

## How the loop works

The track renders the card list **twice** and animates `translateX(0 → -50%)`. At -50% the
second copy sits exactly where the first began, so it repeats with no visible seam. That's
the whole trick — and it's why the card count has to stay even if you want the
wide/upright alternation to survive the wrap.

`ExampleMarquee` pairs the CSS animation with a real `scrollLeft` drag:

- Pointer events (not mouse events), so mouse/pen/touch take one code path.
- `setPointerCapture` keeps the drag alive when the cursor leaves the row mid-pull.
- Dragging sets `.is-dragging`, which pauses the animation — otherwise the pull fights
  the running transform.
- Nothing calls `preventDefault`, so touch keeps native momentum scrolling.

## Dependencies you must bring across

**CSS custom properties** — define these or the cards render transparent:

```css
--ink:        #383838;
--paper:      #fbfaf6;
--paper-card: #faf9f2;
--yellow:     #f3eb88;
```

**Global classes** — all included in `marquee.css`: `.card`, `.grain-paper`,
`.placeholder`, `.type-meta`, `.scrollbar-hide`, `.marquee-track`.

**Fonts** — the cards reference `font-display` (a serif) and `font-mono`. Either map those
to your own stack or strip them.

**Tailwind v4.** The markup uses arbitrary values (`w-[340px]`, `[--chamfer:40px]`) and
the v4 important **suffix** (`!min-h-0`, `shadow-none!`). On v3 the suffix form is wrong —
it's a prefix there.

## Three traps that cost real time

1. **Don't put `marquee.css` inside `@layer`.** In the source project it's unlayered, which
   in Tailwind v4 means it beats layered utilities regardless of specificity. Layer it and
   `.card` starts losing to utility classes.

2. **`.card > *` forces `position: relative; z-index: 1` on direct children.** That defeats
   `absolute`. Escape with an inline `style={{position:"absolute"}}` or `!absolute`.

3. **`clip-path` crops `box-shadow`.** Anything chamfered must cast its shadow with
   `filter: drop-shadow(...)` instead, or the cut corner looks torn. `.card` already does
   this; copy the pattern if you add a variant.

## Images

`heroCards.ts` points at `/public` paths that do **not** exist in another project —
`/work-pinky-pdp.webp`, `/backspace-body-wash.webp`, `/collage-shopping-basket.webp`,
`/product-grooming-set.webp`, `/tape.webp`, `/hero-alt-1.jpg`, `/hero-flowers.jpg`,
`/backspace-body-cover.jpg`. Copy the files across or swap the `image:` fields.

## Minimal usage

```tsx
import { ExampleMarquee } from "./ExampleMarquee";

<ExampleMarquee />
```

It renders its own `<section>` with `-mx-6 md:-mx-12` negative margins to run full-bleed
out of a padded parent. Drop those if your container isn't padded.

The row is `aria-hidden` — it's decoration, and nothing in it is reachable by keyboard.
