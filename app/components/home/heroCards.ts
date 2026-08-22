/** Hero collage card data. Kept in a non-client module so the
 *  Server Component Hero can import the array directly — importing
 *  non-component values from a "use client" module yields a client
 *  reference proxy, not the data. */
export type HeroCard = {
  title: string;
  image?: string;
  variant?: "default" | "shopify" | "polaroid" | "email";
  price?: string;
  testimonial?: string;
  /** Email variant only — the "from" name shown above the subject. */
  from?: string;
  /** Email variant only — pretty timestamp. */
  timestamp?: string;
};

export const heroFloatingCards: Array<{
  card: HeroCard;
  position: React.CSSProperties;
  rotate: string;
  widthClass: string;
}> = [
  {
    // Top area, pushed further right.
    card: {
      title: "Rinse Body Wash",
      variant: "shopify",
      price: "$24",
    },
    position: { top: "4%", right: "3%" },
    rotate: "3deg",
    widthClass: "w-52",
  },
  {
    // Bottom-left, mostly visible.
    card: {
      title: "Backspace Body",
      image: "/backspace-body-cover.jpg",
      variant: "polaroid",
    },
    position: { bottom: "4%", left: "4%" },
    rotate: "-4deg",
    widthClass: "w-48",
  },
  {
    // Up + right; larger + placeholder image for a stronger left-side
    // counterweight to the Paige card at bottom-right.
    card: { title: "Organic Moderne", image: "" },
    position: { top: "8%", left: "6%" },
    rotate: "-6deg",
    widthClass: "w-72",
  },
  {
    // Email preview — mimics an inbox row / client thank-you note.
    // Sits above the yellow "Hi I'm Paige" card, angled slightly.
    card: {
      title: "Half a step ahead",
      variant: "email",
      from: "Cee, Backspace Body",
      timestamp: "Tue 2:14 pm",
      testimonial:
        "Shipped in two weeks what we'd been debating for six months. No politics, no deck-thick proposal — just the work.",
    },
    position: { top: "36%", left: "36%" },
    rotate: "5deg",
    widthClass: "w-64",
  },
];
