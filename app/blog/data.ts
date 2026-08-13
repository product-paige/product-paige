/**
 * A single rich-content block in a blog post body. Each block renders
 * to its own element in the post template — no MDX pipeline, just a
 * tiny discriminated union that's easy to author by hand.
 *
 * - `p`     — a paragraph of body text.
 * - `h2`    — a section heading. The template auto-anchors these
 *             (kebab-cased id) so the sticky TOC can jump to them.
 * - `h3`    — a subsection heading nested under the previous h2.
 * - `image` — a placeholder for a figure. `caption` is optional.
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "image"; caption?: string; alt?: string };

export type BlogPost = {
  slug: string;
  title: string;
  kicker: string;
  /** Longer excerpt for the featured card on /blog. Falls back to
   *  `kicker` when omitted. Keep to 2–3 sentences. */
  excerpt?: string;
  date: string;
  readingTime: string;
  category: string;
  /** Card cover image. Currently pointing at existing /public art as
   *  placeholders — swap for real post images. */
  coverImage?: string;
  /** Body is authored as an array of typed blocks. Simple + no MDX. */
  body: BlogBlock[];
};

export const blogPosts: Record<string, BlogPost> = {
  "the-eight-second-test": {
    slug: "the-eight-second-test",
    title: "The eight-second test",
    kicker:
      "How to know if your homepage is actually working — before spending another month tweaking it.",
    excerpt:
      "Most homepages fail the eight-second test. Not because the copy is bad, but because the copy is trying to do too much. Here's how to strip it back until a stranger can name what you sell in one breath — and why that's the only test that matters before you rebuild.",
    date: "2026-08-14",
    readingTime: "4 min",
    category: "Positioning",
    coverImage: "/hero-alt-1.jpg",
    body: [
      {
        type: "p",
        text: "You have eight seconds. A merchant lands on your site, and within eight seconds they should know what you sell, who it's for, and whether it's worth staying. If they don't get it, they leave.",
      },
      { type: "h2", text: "Why most homepages fail" },
      {
        type: "p",
        text: "Most homepages fail this test. Not because the copy is bad, but because the copy is trying to do too much. The hero explains features, competes with three CTAs, drops a video, quotes a customer, and then finally says what the product actually does — in the third scroll.",
      },
      {
        type: "image",
        alt: "Annotated homepage hero — too many competing elements",
        caption:
          "A typical hero doing too much at once. Every element earning attention is one less second for the message.",
      },
      { type: "h3", text: "The one-breath rule" },
      {
        type: "p",
        text: "The fix is embarrassingly simple: cut everything until the hero can be read out loud in one breath. Then rebuild from there.",
      },
      { type: "h2", text: "Try it on your own site" },
      {
        type: "p",
        text: "Read the hero out loud, stopwatch running. If you're still talking at eight seconds, the copy is doing too much. Cut a sentence and try again.",
      },
    ],
  },
  "onboarding-is-a-promise": {
    slug: "onboarding-is-a-promise",
    title: "Onboarding is a promise",
    kicker:
      "Every step of your onboarding is a promise about what the product will do. Break the promise, lose the merchant.",
    date: "2026-07-30",
    readingTime: "5 min",
    category: "UX",
    coverImage: "/hero-alt-3.jpg",
    body: [
      {
        type: "p",
        text: "Onboarding isn't a tutorial. It's a promise being kept in real time. The merchant signed up because they thought the product would do X. Onboarding is where they find out whether it actually does.",
      },
      { type: "h2", text: "The mistake most teams make" },
      {
        type: "p",
        text: "Teams treat onboarding as an obligation — a checklist to get through so the real product can start. But onboarding IS the real product for the first thirty minutes. If it feels slow, generic, or off-brand, the promise cracks.",
      },
      {
        type: "image",
        alt: "First-run screen alongside its marketing promise",
        caption:
          "The first meaningful screen has to match the promise a merchant just read on your homepage.",
      },
      { type: "h3", text: "The five-minute test" },
      {
        type: "p",
        text: "If you promised 'set up in five minutes,' the first screen better take five minutes — not fifty. The fix isn't more onboarding. It's an honest first screen.",
      },
      { type: "h2", text: "Audit yours this week" },
      {
        type: "p",
        text: "Does the first meaningful screen match the promise a merchant read on your homepage? If not, you know where the leak is.",
      },
    ],
  },
  "positioning-vs-features": {
    slug: "positioning-vs-features",
    title: "Positioning vs. features",
    kicker:
      "Why most product pages read like changelogs — and what to do instead.",
    date: "2026-07-12",
    readingTime: "3 min",
    category: "Positioning",
    coverImage: "/hero-alt-4.jpg",
    body: [
      {
        type: "p",
        text: "Open ten SaaS product pages. Nine of them will read like a changelog: a stack of features, each with an icon and a paragraph, ordered roughly by how proud the team is of them.",
      },
      { type: "h2", text: "A spec sheet isn't positioning" },
      {
        type: "p",
        text: "This is not positioning. It's a spec sheet dressed up as marketing. Buyers don't parse spec sheets — they scan for the one thing that tells them if this product is for them.",
      },
      {
        type: "image",
        alt: "Two product pages side by side — feature list vs. one clear sentence",
        caption:
          "Left: the changelog-as-marketing page. Right: the same product, one clear switching reason at the top.",
      },
      { type: "h3", text: "The switching reason" },
      {
        type: "p",
        text: "Positioning is the one sentence that answers: 'why would I switch?' Everything else on the page is either evidence for that sentence or in the way of it.",
      },
      { type: "h2", text: "When rewriting won't help" },
      {
        type: "p",
        text: "If you can't state the switching reason in one sentence, you don't have a positioning problem — you have a product-strategy problem. And no amount of feature-page rewriting will fix it.",
      },
    ],
  },
};

export const blogList: BlogPost[] = Object.values(blogPosts).sort(
  (a, b) => (a.date < b.date ? 1 : -1),
);
