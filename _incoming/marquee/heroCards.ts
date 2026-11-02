/** Hero collage card data. Kept in a non-client module so the
 *  Server Component Hero can import the array directly — importing
 *  non-component values from a "use client" module yields a client
 *  reference proxy, not the data. */
export type HeroCard = {
  title: string;
  image?: string;
  variant?:
    | "default"
    | "shopify"
    | "polaroid"
    | "email"
    | "swatch"
    | "blog"
    /** A screenshot in a desktop browser window. */
    | "desktop"
    /** A bare cut-out illustration — no frame, no fill, no border.
        The artwork carries its own silhouette on a transparent
        background, so any chrome would box in something that is
        meant to be loose on the page. */
    | "cutout";
  price?: string;
  testimonial?: string;
  /** Email variant only — the wordmark in the email's masthead. */
  from?: string;
};

/**
 * ⚠ widthClass IS SIZED FOR THE SCROLLING ROW, NOT THE COLLAGE.
 * Each variant carries different chrome (a title bar, a caption
 * margin, an info block) over a different image aspect, so equal
 * widths give very unequal heights — the row ran 221px to 324px.
 * These widths are picked per variant so every card lands near the
 * same height and the run reads as one set rather than a jumble.
 *
 * Change a variant's padding or image aspect and these need
 * re-measuring.
 */
export const heroFloatingCards: Array<{
  card: HeroCard;
  position: React.CSSProperties;
  rotate: string;
  widthClass: string;
}> = [
  {
    /* A PDP product tile.
       ⚠ THE PRICE AND THE RATING ARE INVENTED. "ArteStile" and "MADE
       IN ITALY" are engraved on the tools in the photograph, so the
       brand is legible whatever this card is called — but the $48,
       the five stars and the review count are not theirs and are not
       anyone's. The shopify variant draws a fixed ★★★★★ (128) for
       every card that uses it. Decorative chrome on an aria-hidden
       row, same as the rest, but worth knowing before this ends up in
       a screenshot of the site. */
    card: {
      title: "Scissors & tweezers set",
      image: "/product-grooming-set.webp",
      variant: "shopify",
      price: "$48",
    },
    position: { bottom: "10%", right: "22%" },
    rotate: "-3deg",
    widthClass: "w-[200px]",
  },
  {
    /* A storefront screenshot in a desktop browser frame — the only
       card in the run that is a picture of a real shipped page rather
       than mocked-up chrome.

       ⚠ ATTRIBUTION IS NOT RECORDED ANYWHERE. This is a Pinky
       Collagen Peptides PDP. The row is aria-hidden and makes no
       written claim, but it sits in a run labelled "examples" next to
       Backspace Body and Organic Moderne, which ARE Paige's — so a
       reader will read it as hers too. If it is not, or if there is no
       permission to show it, pull it. If it is, it deserves a case
       study, not a decorative card. */
    card: {
      title: "Pinky Collagen Peptides",
      image: "/work-pinky-pdp.webp",
      variant: "desktop",
    },
    position: { top: "12%", left: "8%" },
    rotate: "-1deg",
    widthClass: "w-[420px]",
  },
  {
    /* A second scrapbook card — /blog/shopifys-agent-blueprint, with
       its own title and coverImage from
       app/blog/data.ts. Same hand-copy caveat as the card below. */
    card: {
      title: "Shopify\u2019s agent blueprint",
      variant: "blog",
      image: "/hero-alt-2.jpg",
    },
    position: { bottom: "28%", right: "30%" },
    rotate: "2deg",
    /* Wider than the other cards: the scrapbook card carries an image
       AND two lines of chrome, so at w-52 the cover was a letterbox
       strip. */
    widthClass: "w-[340px]",
  },
  {
    /* A scrapbook card in the run of examples.
       ⚠ THIS IS A REAL POST — /blog/the-eight-second-test, with its own
       title and cover image from app/blog/data.ts. Nothing here is
       invented copy. If the post is renamed or unpublished, this card
       goes stale silently; it is a hand-copy, not a live read, because
       heroCards is a plain data module the collage also imports. */
    card: {
      title: "The eight-second test",
      variant: "blog",
      /* The post's own coverImage from app/blog/data.ts. */
      image: "/hero-alt-1.jpg",
    },
    position: { top: "30%", left: "4%" },
    rotate: "-2deg",
    /* Matches the other scrapbook card — see the note there. */
    widthClass: "w-[340px]",
  },
  {
    // Top area, pushed further right.
    card: {
      title: "Backspace Body Wash",
      image: "/backspace-body-wash.webp",
      variant: "shopify",
      price: "$24",
    },
    position: { top: "4%", right: "3%" },
    rotate: "3deg",
    widthClass: "w-[195px]",
  },
  {
    // Bottom-left. It sat bottom-right until the yellow Meet Paige
    // sticky took that corner.
    card: {
      title: "Backspace Body",
      image: "/backspace-body-cover.jpg",
      variant: "polaroid",
    },
    position: { bottom: "4%", left: "12%" },
    rotate: "-4deg",
    widthClass: "w-[250px]",
  },
  {
    // Up + right; larger + placeholder image for a stronger left-side
    // counterweight to the Paige card at bottom-right.
    /* ⚠ NOT A SCREENSHOT OF ORGANIC MODERNE. image was "" here, which
       rendered an empty grey placeholder inside the yellow card — the
       one card in the row with nothing in it at all. /hero-flowers.jpg
       is a stock texture standing in until there is a shot of the real
       site, which is live at organicmoderne.com. */
    card: {
      title: "Organic Moderne",
      image: "/hero-flowers.jpg",
      variant: "swatch",
    },
    position: { top: "6%", left: "4%" },
    rotate: "-6deg",
    widthClass: "w-[315px]",
  },
  {
    // Email preview — mimics an inbox row / client thank-you note.
    // Centred in the collage: it sat high and slightly left, which put it
    // closer to the Organic Moderne card than to the middle.
    card: {
      title: "Half a step ahead",
      variant: "email",
      from: "Backspace Body",
      /* The hero image for the designed-email layout — the same cover
         the project uses, so the card is of a real project. */
      image: "/backspace-body-cover.jpg",
      testimonial:
        "Shipped in two weeks what we'd been debating for six months. No politics, no deck-thick proposal. Just the work.",
    },
    position: { top: "46%", left: "31%" },
    rotate: "5deg",
    widthClass: "w-[205px]",
  },
  {
    /* A cut-out collage: lipstick, a pump and a cake in a wire
       shopping basket, halftoned. Paige's own artwork, exported from
       Figma.

       ⚠ RASTERISED FROM A 1.4MB SVG. The export was a Figma SVG whose
       six <pattern> fills each carried a base64 raster, so the file
       was 1.4MB of embedded bitmap wrapped in vector syntax — all the
       weight of a photograph with none of a photograph's compression.
       It is now a 97KB webp at 720px, which is 2x for the ~360px it
       renders at. Re-export from the SVG in Downloads if it is ever
       needed larger; do not ship the SVG itself.

       ⚠ TRANSPARENT. Hence variant "cutout" — the frame, the white
       fill and the inline hairline are all skipped, because the
       artwork is already a silhouette. */
    card: {
      title: "Shopping basket",
      image: "/collage-shopping-basket.webp",
      variant: "cutout",
    },
    position: { top: "12%", left: "6%" },
    rotate: "-2deg",
    widthClass: "w-[320px]",
  },
];
