export type BlogPost = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  readingTime: string;
  category: string;
  /** Body is authored as an array of paragraphs. Simple + no MDX pipeline. */
  body: string[];
};

export const blogPosts: Record<string, BlogPost> = {
  "the-eight-second-test": {
    slug: "the-eight-second-test",
    title: "The eight-second test",
    kicker:
      "How to know if your homepage is actually working — before spending another month tweaking it.",
    date: "2026-08-14",
    readingTime: "4 min",
    category: "Positioning",
    body: [
      "You have eight seconds. A merchant lands on your site, and within eight seconds they should know what you sell, who it's for, and whether it's worth staying. If they don't get it, they leave.",
      "Most homepages fail this test. Not because the copy is bad, but because the copy is trying to do too much. The hero explains features, competes with three CTAs, drops a video, quotes a customer, and then finally says what the product actually does — in the third scroll.",
      "The fix is embarrassingly simple: cut everything until the hero can be read out loud in one breath. Then rebuild from there.",
      "Try it on your own site right now. Read the hero out loud, stopwatch running. If you're still talking at eight seconds, the copy is doing too much.",
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
    body: [
      "Onboarding isn't a tutorial. It's a promise being kept in real time. The merchant signed up because they thought the product would do X. Onboarding is where they find out whether it actually does.",
      "The mistake most teams make: they treat onboarding as an obligation — a checklist to get through so the real product can start. But onboarding IS the real product for the first thirty minutes. If it feels slow, generic, or off-brand, the promise cracks.",
      "The fix isn't to add more onboarding. It's to make the first screen do exactly what the marketing said. If you promised 'set up in five minutes,' the first screen better take five minutes — not fifty.",
      "Audit your onboarding this week: does the first meaningful screen match the promise a merchant read on your homepage? If not, you know where the leak is.",
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
    body: [
      "Open ten SaaS product pages. Nine of them will read like a changelog: a stack of features, each with an icon and a paragraph, ordered roughly by how proud the team is of them.",
      "This is not positioning. This is a spec sheet dressed up as marketing. Buyers don't parse spec sheets — they scan for the one thing that tells them if this product is for them.",
      "Positioning is the one sentence that answers: 'why would I switch?' Everything else on the page is either evidence for that sentence or in the way of it.",
      "If you can't state the switching reason in one sentence, you don't have a positioning problem — you have a product-strategy problem. And no amount of feature-page rewriting will fix it.",
    ],
  },
};

export const blogList: BlogPost[] = Object.values(blogPosts).sort(
  (a, b) => (a.date < b.date ? 1 : -1),
);
