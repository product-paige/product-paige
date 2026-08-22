export type Project = {
  slug: string;
  client: string;
  year: string;
  role: string;
  kicker: string;
  /** 1-3 sentence description shown under the h1 on the project page
   *  hero. Falls back to the kicker's lede if omitted. */
  summary?: string;
  /** Hero background color. Use one of the palette pastels or ink. */
  coverBg: string;
  /** Hero cover image. When absent the hero shows a labelled placeholder
   *  over coverBg. Also used for the homepage project tab. */
  coverImage?: string;
  problem: string;
  approach: string;
  outcome: string;
  /** Live URL for the "View live project" hero button. Optional. */
  liveUrl?: string;
  /** Long-form narrative shown in the Notes section. Array of paragraphs. */
  notes?: string[];
  /** Marks the project as not-yet-shipped. Folder tab shows a "Coming soon"
   *  badge, project panel hides the "View project" CTA. */
  comingSoon?: boolean;
  /** Labels for image placeholder tiles in the gallery */
  mockups: string[];
  /** Short result lines for the highlights block */
  highlights: { metric: string; label: string }[];
};

/**
 * ROUGH DRAFTS — first pass, written to be edited.
 *
 * `highlights` describe scope (timeline, surface count, deliverables), NOT
 * performance. Any real numbers — traffic, conversion, revenue — need to
 * come from you; don't ship invented ones on a portfolio.
 */
export const projects: Record<string, Project> = {
  "backspace-body": {
    slug: "backspace-body",
    client: "Backspace Body",
    year: "2026",
    role: "Brand + Ecommerce UX",
    coverImage: "/backspace-body-cover.jpg",
    kicker:
      "A refill-first body care brand concept — naming, identity, and the Shopify experience to carry it.",
    summary:
      "A self-directed concept for a refill-first body care brand: naming and positioning through identity, then a Shopify storefront designed around refills and subscriptions rather than one-off purchases. Built to show what the category looks like when the brand and the buying experience are designed together.",
    coverBg: "#DBE6EB",
    problem:
      "Body care is a category of look-alikes — clinical packaging, interchangeable names, single-purchase mechanics. Refill programs are usually bolted on after launch, so the experience fights the business model it&rsquo;s meant to support.",
    approach:
      "Ran it end to end as a concept: naming and positioning first, then identity and a copy system, then a Shopify Horizon storefront designed for refills from the first screen. A variant carousel handles bundles and refill packs natively instead of stacking three apps to fake it.",
    outcome:
      "A complete brand-to-storefront concept where the refill loop is the design, not a feature — showing the brand layer and the ecommerce UX layer built as a single argument.",
    mockups: [
      "Naming + identity",
      "Shopify storefront",
      "Refill flow",
      "Subscription mechanics",
    ],
    highlights: [
      { metric: "Concept", label: "Self-directed" },
      { metric: "End-to-end", label: "Name → storefront" },
      { metric: "Refill-first", label: "Designed, not bolted on" },
    ],
  },

  perch: {
    slug: "perch",
    client: "Perch",
    year: "2026",
    role: "Product marketing + Design",
    kicker:
      "SaaS website and design territory — positioning first, then the pages that carry it.",
    summary:
      "A SaaS product that could explain what it did to another engineer, but not to a buyer. I set the positioning and messaging, then built the design territory and site around it — so the story and the surface land as one thing rather than two.",
    coverBg: "#DBE6EB",
    problem:
      "The product was solid and the pitch wasn&rsquo;t. Feature-led copy that made sense internally and nowhere else, no clear category framing, and a site that asked visitors to assemble the value themselves. Design and messaging had been treated as separate steps, so neither reinforced the other.",
    approach:
      "Started with positioning — who it&rsquo;s for, what it replaces, why now — before touching a layout. Built the messaging hierarchy top-down, then developed a design territory from it: type, color, and page system that give the argument somewhere to live. Homepage, product pages, and supporting templates written and designed together.",
    outcome:
      "A site where the first screen names the product&rsquo;s job in one read, and every page below it advances the same argument. Design territory is reusable — new pages inherit the system instead of restarting it.",
    mockups: [
      "Positioning + messaging map",
      "Design territory",
      "Homepage",
      "Product page system",
    ],
    highlights: [
      { metric: "Positioning", label: "Set before design" },
      { metric: "1", label: "Reusable page system" },
      { metric: "SaaS", label: "Product marketing + design" },
    ],
  },

  "brand-playbook": {
    slug: "brand-playbook",
    client: "Brand Playbook",
    year: "2026",
    role: "Strategy + Brand + Design",
    comingSoon: true,
    kicker:
      "A productized AI playbook for Shopify brands — vetted prompts for copy, brand voice, and merchandising.",
    summary:
      "AI tooling reached Shopify faster than any shared practice for using it. This is the productized answer: a structured library of tested prompts and playbooks covering brand voice, product copy, and merchandising — packaged as a tool rather than a blog post.",
    coverBg: "#f3eb88",
    problem:
      "Merchants got powerful AI tooling and no method. The useful prompts live in scattered threads and screenshots — untested, uncredited, and impossible to apply consistently across a brand. The gap isn&rsquo;t access to AI, it&rsquo;s knowing what to ask and keeping the answers on-brand.",
    approach:
      "Treated it as a product, not content. Built a taxonomy first — brand voice, product copy, merchandising, customer replies — then wrote and tested prompts against real Shopify stores. Designed the library so a merchant can find the right prompt, understand why it works, and adapt it to their own voice instead of pasting someone else&rsquo;s.",
    outcome:
      "A packaged playbook that holds a brand&rsquo;s voice steady across everything AI touches — the strategy, brand, and design layers shipped as one tool.",
    mockups: [
      "Playbook taxonomy",
      "Prompt library UI",
      "Brand voice module",
      "Merchandising plays",
    ],
    highlights: [
      { metric: "Productized", label: "Tool, not a doc" },
      { metric: "4", label: "Playbook categories" },
      { metric: "Strategy", label: "Brand + design" },
    ],
  },

  "organic-moderne": {
    slug: "organic-moderne",
    client: "Organic Moderne",
    year: "2026",
    role: "Content strategy + IA",
    kicker:
      "Editorial-led ecommerce — one architecture for journal, products, and affiliate shopping.",
    summary:
      "A content-driven ecommerce brand with hundreds of posts, products, and seasonal stories that never referenced each other. I rebuilt the content strategy and information architecture so editorial, commerce, and affiliate revenue run on one system instead of three.",
    coverBg: "#f3eb88",
    problem:
      "Editorial and commerce were built as separate properties. Hundreds of journal posts sat disconnected from the products they discussed, affiliate and shopping paths dead-ended, and nothing linked a reader&rsquo;s interest to something they could actually buy. The content was the traffic engine and the least monetized surface on the site.",
    approach:
      "Rebuilt the IA around a single shared taxonomy so journal entries, products, seasonal collections, and affiliate picks all tag into the same structure. Designed shopping paths that begin in editorial rather than bolting a store onto a blog, plus a filter UX that matches how readers browse. Warm editorial register throughout — deliberately not the clinical DTC default.",
    outcome:
      "Reading and shopping became one path instead of two. Every journal piece now has somewhere to send a reader, and the affiliate surface is part of the architecture rather than an afterthought.",
    mockups: [
      "Content architecture",
      "Journal → shop paths",
      "Affiliate / shopping UX",
      "Seasonal collection",
    ],
    highlights: [
      { metric: "1", label: "Shared taxonomy" },
      { metric: "Editorial", label: "Led, commerce-linked" },
      { metric: "IA", label: "Rebuilt from scratch" },
    ],
  },
};

export const projectList: Project[] = Object.values(projects);
