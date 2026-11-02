import type { HeroCard } from "./heroCards";

export function HeroFloatingCard({
  card,
  position,
  rotate,
  widthClass,
  inline = false,
}: {
  card: HeroCard;
  position?: React.CSSProperties;
  rotate: string;
  widthClass: string;
  /**
   * Lay the card out in flow instead of absolutely over a collage.
   * Used by the carousel, so the same card markup serves both the
   * floating collage and a scrolling row rather than being rebuilt.
   */
  inline?: boolean;
}) {
  const swatch = card.variant === "swatch";
  /* A bare cut-out: the artwork is a transparent PNG/webp carrying its
     own silhouette, so it takes NO frame, NO white fill and NO inline
     hairline. Treated like `swatch` and `desktop` in the class chain
     below — all three draw their own edge (or deliberately have
     none) and must not get the default card chrome. */
  const cutout = card.variant === "cutout";
  return (
    <div
      className={`${inline ? "relative shrink-0" : "absolute"} ${widthClass} ${
        card.variant === "shopify" ? "rounded-md overflow-hidden" : ""
      } ${
        /* The desktop variant draws its own XP frame, so the inline
           hairline below would sit outside it as a second border. */
        swatch || cutout || card.variant === "desktop"
          ? /* NO CSS border here (swatch). clip-path crops the border with the
               box, so the chamfered corner came out with a gap in its
               outline — the card read as damaged rather than cut. The
               rim is a drop-shadow stack in `style` below, which
               follows the clipped silhouette. Same trick .folder-tab
               uses in globals.css. */
            swatch
            ? "bg-[var(--yellow)]"
            : ""
          : /* Inline (the scrolling row) the cards lost their shadow,
               which was the only thing giving them an edge against
               --paper. A hairline ink border replaces it: the edge
               without the weight. The floating collage keeps its
               shadow and needs no border. */
            `bg-white${inline ? " border border-[var(--ink)]/25" : ""}`
      } ${
        /* Shadows only in the floating collage. Inline — the scrolling
           row — they stack twenty deep and the whole run reads heavy.
           BORDERS ARE UNTOUCHED: the swatch card keeps its ink hairline
           above and .placeholder keeps its own. Only the shadow goes. */
        swatch || cutout || inline
          ? ""
          : "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_0_rgba(0,0,0,0.12),0_10px_24px_rgba(0,0,0,0.18)]"
      }`}
      style={{
        ...(inline ? null : position),
        /* The swatch card is cut, not rounded — the site's chamfer, the
           same shape .card uses.

           ⚠ Its shadow has to be a FILTER, not a box-shadow. clip-path
           crops a box-shadow along with the box, so the chamfered card
           would lose its shadow on the cut corner and look torn.
           drop-shadow follows the clipped silhouette instead, which is
           exactly why .card does the same thing in globals.css. */
        ...(swatch
          ? {
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)",
              /* The 1px ink rim traces the chamfer inline AND in the
                 collage — it is the card's EDGE, not its shadow. Only
                 the cast shadow is dropped inline. */
              filter: [
                "drop-shadow(1px 0 0 var(--ink))",
                "drop-shadow(-1px 0 0 var(--ink))",
                "drop-shadow(0 1px 0 var(--ink))",
                "drop-shadow(0 -1px 0 var(--ink))",
                ...(inline
                  ? []
                  : ["drop-shadow(0 10px 24px rgba(0,0,0,0.18))"]),
              ].join(" "),
            }
          : null),
        /* No hover transform. The cards used to shrink to 0.92 on
           mouseover; in a row that scrolls past the cursor that fired
           constantly and made the run twitch. They are aria-hidden
           decoration — nothing here is interactive, so nothing should
           react to a pointer. Removing it also took the last piece of
           state out of this file, so it is no longer a client
           component. */
        transform: `rotate(${rotate})`,
      }}
      aria-hidden="true"
    >
      {cutout ? (
        /* No chrome at all — the image IS the card. w-full/h-auto so
           it takes the widthClass from the row and keeps its own
           aspect; the transparent background lets --paper show
           through, which is the point of a cut-out. */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={card.image}
          alt=""
          className="block w-full h-auto select-none"
          draggable={false}
        />
      ) : card.variant === "desktop" ? (
        /* A Windows XP window around the screenshot: blue frame,
           gradient title bar, and the minimise / maximise / close
           trio at the right. No icon at the left — the reference has
           a star there and it is not this site's mark, so the bar
           starts empty.

           Everything is CSS. The chrome is five flat colours and two
           gradients, which is smaller than any screenshot of it and
           stays crisp at any size; the earlier photographed-CRT
           version needed a 28KB image and had no detail above 420px.

           ⚠ NO TITLE TEXT. Nothing in the repo records whose site
           this screenshot is, so the bar says nothing rather than
           asserting a name. */
        <div
          className="relative overflow-hidden"
          style={{
            background: "#0A4BD8",
            border: "3px solid #0A4BD8",
            borderRadius: "8px 8px 2px 2px",
          }}
        >
          {/* Title bar */}
          <div
            className="relative flex items-center justify-end gap-[3px] pl-2 pr-[3px] py-[3px]"
            style={{
              background:
                "linear-gradient(to bottom, #2E7BF0 0%, #0A54E3 8%, #0A54E3 42%, #0B45C8 92%, #1C5FD8 100%)",
              borderRadius: "5px 5px 0 0",
            }}
          >
            {/* Minimise and maximise: the same raised blue square,
                differing only in the glyph drawn inside. */}
            {["min", "max"].map((kind) => (
              <span
                key={kind}
                aria-hidden="true"
                className="flex items-end justify-center shrink-0"
                style={{
                  width: 15,
                  height: 14,
                  borderRadius: 3,
                  background:
                    "linear-gradient(to bottom, #5E9BF5 0%, #1A5FE0 55%, #0B3FBE 100%)",
                  border: "1px solid #CBDDF7",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
                  padding: kind === "min" ? "0 0 3px" : 0,
                  alignItems: kind === "min" ? "flex-end" : "center",
                }}
              >
                <span
                  style={
                    kind === "min"
                      ? { width: 7, height: 2, background: "#fff" }
                      : {
                          width: 8,
                          height: 7,
                          border: "1.5px solid #fff",
                          borderTopWidth: 3,
                        }
                  }
                />
              </span>
            ))}
            {/* Close: the one orange button. */}
            <span
              aria-hidden="true"
              className="relative flex items-center justify-center shrink-0"
              style={{
                width: 15,
                height: 14,
                borderRadius: 3,
                background:
                  "linear-gradient(to bottom, #F0A080 0%, #E2552A 55%, #C8371A 100%)",
                border: "1px solid #F4D2C4",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
                color: "#fff",
                fontSize: 10,
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              &times;
            </span>
          </div>
          {/* Window body */}
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              loading="lazy"
              src={card.image}
              alt=""
              aria-hidden="true"
              /* object-top: full-page screenshot, and the top of a PDP
                 is the part worth showing. */
              className="block w-full aspect-[16/10] object-cover object-top"
            />
          ) : (
            <div className="placeholder w-full aspect-[16/10]" />
          )}
        </div>
      ) : card.variant === "blog" ? (
        /* The scrapbook card, scaled down from BlogCard: binder holes
           down the left edge, the margin rule beside them, date and
           category up top, title at the bottom. Same construction as
           the real card so the example is of the site, not a generic
           blog tile.

           Grain and the hole punches are drawn here rather than by
           reusing BlogCard itself — that one is an <a> and this sits
           inside an aria-hidden decorative row, so nesting it would
           put a second link in the tab order for no destination. */
        <div className="relative bg-[var(--paper-card)] grain-paper flex flex-col gap-3 pl-9 pr-3 py-3">
          <span
            aria-hidden="true"
            style={{ position: "absolute" }}
            className="left-2 top-4 bottom-4 flex flex-col justify-between z-[1]"
          >
            <span className="block w-2.5 h-2.5 rounded-full bg-[var(--paper)]" />
            <span className="block w-2.5 h-2.5 rounded-full bg-[var(--paper)]" />
            <span className="block w-2.5 h-2.5 rounded-full bg-[var(--paper)]" />
          </span>
          <span
            aria-hidden="true"
            style={{ position: "absolute" }}
            className="left-6 top-0 bottom-0 w-px bg-[var(--ink)]/25 z-[1]"
          />
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              loading="lazy"
              src={card.image}
              alt=""
              aria-hidden="true"
              /* 4/3, not 16/9: the hole-punch margin eats 36px of this
                 card's width, so a widescreen image left the variant
                 ~60px shorter than everything else in the row. */
              className="w-full aspect-[4/3] object-cover"
            />
          ) : null}
          <p className="font-display text-ink text-[17px] leading-[1.15] tracking-[-0.02em]">
            {card.title}
          </p>
        </div>
      ) : card.variant === "email" ? (
        /* A DESIGNED campaign email that scrolls itself.
           It used to render as a mail-client list item — avatar,
           sender, timestamp, truncated preview. That is a screenshot
           of someone else's software; a row of work examples should
           show the email, not the client it arrived in.

           The body is taller than the card and drifts up and back
           (.email-scroll in globals.css), so the card shows a whole
           template instead of the first screen of one. The masthead
           stays put above it, as a real email client's chrome would.

           ⚠ "Cee, Backspace Body" — Backspace Body is described in
           app/projects/data.ts as a CONCEPT brand, one of Paige's
           own. So this quote is a testimonial from a brand with no
           customers, attributed to a named person. The row is
           aria-hidden decoration and the ★★★★★ (128) on the product
           tiles is invented the same way, but a made-up quote with a
           name on it is a different kind of invention from a made-up
           star rating. Worth replacing with a real one or cutting. */
        <div className="relative bg-white flex flex-col overflow-hidden">
          {/* Masthead — fixed, above the scrolling body. */}
          <div className="relative z-10 flex items-center justify-center border-b border-[var(--ink)]/15 bg-white px-3 py-2 shrink-0">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/70 truncate">
              {card.from ?? "Newsletter"}
            </span>
          </div>

          {/* The window. Fixed height; the track inside is taller. */}
          <div className="relative h-[232px] overflow-hidden">
            <div
              className="email-scroll absolute inset-x-0 top-0"
              style={{ "--email-scroll-to": "-182px" } as React.CSSProperties}
            >
              {card.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
              loading="lazy"
                  src={card.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full aspect-[16/9] object-cover"
                />
              ) : (
                <div className="placeholder w-full aspect-[16/9] !border-0" />
              )}

              <div className="flex flex-col items-center gap-2 px-4 pt-3.5 pb-4 text-center">
                <p className="font-display text-ink text-[15px] leading-[1.15] tracking-[-0.02em]">
                  {card.title}
                </p>
                {card.testimonial ? (
                  <p className="text-[9px] leading-[1.45] text-ink/70">
                    {card.testimonial}
                  </p>
                ) : null}
                <span className="mt-1 inline-block bg-[var(--ink)] text-[var(--paper)] text-[8px] uppercase tracking-[0.14em] px-3 py-1.5">
                  Read the story
                </span>
              </div>

              {/* A second block, so there is something to scroll TO. */}
              <div className="border-t border-[var(--ink)]/15 px-4 py-3 flex flex-col gap-2">
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-ink/45 text-center">
                  In this issue
                </span>
                <div className="flex gap-2">
                  {[0, 1].map((i) => (
                    <div key={i} className="flex-1 flex flex-col gap-1.5">
                      <div className="placeholder w-full aspect-square !border-0" />
                      <span className="block h-[3px] w-full bg-[var(--ink)]/15" />
                      <span className="block h-[3px] w-2/3 bg-[var(--ink)]/10" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--ink)]/15 px-3 py-2 text-center">
                <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/40">
                  View in browser &middot; Unsubscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : card.variant === "polaroid" ? (
        <div className="relative bg-white pt-2.5 px-2.5 pb-10">
          {/* Masking tape overhanging the top */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
              loading="lazy"
            src="/tape.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 -rotate-[4deg] w-24 z-20"
          />
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              loading="lazy"
              src={card.image}
              alt=""
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="placeholder w-full aspect-square" />
          )}
          <div className="absolute left-2.5 right-2.5 bottom-0 h-10 flex items-center">
            <p className="font-display italic text-sm text-ink leading-none">
              {card.title}
            </p>
          </div>
        </div>
      ) : card.variant === "shopify" ? (
        <>
          {/* This variant used to hard-code the placeholder and ignore
              card.image, unlike the polaroid and email variants. */}
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              loading="lazy"
              src={card.image}
              alt=""
              aria-hidden="true"
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="placeholder w-full aspect-square" />
          )}
          <div className="p-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-0.5 text-[10px] leading-none text-[var(--ink)]">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
              <span className="ml-1 opacity-60 text-[10px]">(128)</span>
            </div>
            <p className="text-sm text-ink line-clamp-1">
              {card.title}
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-ink">{card.price}</span>
              <button
                type="button"
                className="text-[10px] leading-none uppercase tracking-widest bg-[var(--ink)] text-white px-2.5 py-1.5 rounded"
                tabIndex={-1}
              >
                Add
              </button>
            </div>
          </div>
        </>
      ) : card.variant === "swatch" ? (
        /* A framed swatch: yellow card, hairline ink border, the image
           inset in a border of its own, and a left-aligned mono caption
           in the margin underneath. The only card in the collage that is
           not white, which is the point — it breaks up a corner that
           was four variations on a white rectangle. */
        <div className="flex flex-col gap-3 p-2.5">
          <div className="border border-[var(--ink)] overflow-hidden bg-white">
            {card.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
              loading="lazy"
                src={card.image}
                alt=""
                className="w-full aspect-[4/3] object-cover block"
              />
            ) : (
              <div className="placeholder w-full aspect-[4/3] !border-0" />
            )}
          </div>
          <p className="type-meta !text-[13px] text-ink text-left pb-1 px-0.5">
            {card.title}
          </p>
        </div>
      ) : (
        <>
          {card.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              loading="lazy"
              src={card.image}
              alt=""
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div className="placeholder w-full aspect-video" />
          )}
          <div className="p-3">
            <p className="text-sm text-ink line-clamp-1">{card.title}</p>
          </div>
        </>
      )}
    </div>
  );
}
