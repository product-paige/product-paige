export type Project = {
  slug: string;
  client: string;
  year: string;
  role: string;
  kicker: string;
  /** Hero background color. Use one of the palette pastels or ink. */
  coverBg: string;
  problem: string;
  approach: string;
  outcome: string;
  /** Live URL for the "View live project" hero button. Optional. */
  liveUrl?: string;
  /** Long-form narrative shown in the Notes section. Array of paragraphs. */
  notes?: string[];
  /** Labels for image placeholder tiles in the gallery */
  mockups: string[];
  /** Short result lines for the highlights block */
  highlights: { metric: string; label: string }[];
};

export const projects: Record<string, Project> = {
  "backspace-body": {
    slug: "backspace-body",
    client: "Backspace Body",
    year: "2026",
    role: "Brand + Shopify build",
    kicker:
      "A refill-first body care brand built on Shopify, from product story to storefront experience.",
    coverBg: "#cdb8e3",
    problem:
      "A founder with a product, a vision, and no name. The category was crowded with brands that all looked the same — clinical, identical packaging, single-purchase only. No story, no system, no reason to come back.",
    approach:
      "Two-week sprint on naming and positioning, then identity, copy system, and a Horizon-theme Shopify build wired for refills and subscriptions from day one. A variant carousel that handles bundles and refill packs without three apps duct-taped together.",
    outcome:
      "Launched with subscriptions converting 31% of first-time orders. Refill UX has held a 68% repeat rate over the first quarter — the loop the strategy was designed for, working as designed.",
    mockups: [
      "Brand identity",
      "Shopify homepage",
      "Refill flow",
      "Subscription mechanics",
    ],
    highlights: [
      { metric: "31%", label: "Sub conversion" },
      { metric: "68%", label: "Refill repeat rate" },
      { metric: "2 wks", label: "Naming → launch" },
    ],
  },

  "productprompt-shop": {
    slug: "productprompt-shop",
    client: "ProductPrompt.shop",
    year: "2026",
    role: "Strategy + Lovable build",
    kicker:
      "Curated prompts for Shopify merchants working alongside Claude.",
    coverBg: "#DBE6EB",
    problem:
      "With Claude&rsquo;s MCPs now connecting to Shopify, merchants suddenly need to know what to actually ask. The good prompts are scattered across Twitter threads and Reddit. Nothing curated, nothing tested, no shared starting point.",
    approach:
      "Shipped a lightweight Lovable site in a weekend with a focused set of vetted prompts — product copy, inventory questions, customer-message rewrites — each tested against a real Claude MCP session against a live Shopify store. No fluff, no signup wall.",
    outcome:
      "2,400 first-week visits with zero paid distribution. Now indexed as a top organic result for &ldquo;Shopify Claude prompts.&rdquo; Proof I&rsquo;m shipping on the AI + ecommerce frontier, not just narrating it from the sidelines.",
    mockups: [
      "Prompt library",
      "Category filter",
      "Copy-and-use flow",
      "MCP session demo",
    ],
    highlights: [
      { metric: "2.4k", label: "First-week visits" },
      { metric: "1 wknd", label: "Build time" },
      { metric: "Top 3", label: "Organic SERP" },
    ],
  },

  "organic-moderne": {
    slug: "organic-moderne",
    client: "Organic Moderne",
    year: "2026",
    role: "Content architecture + UX",
    kicker:
      "Content-led commerce for a slow-living brand — search, filter, and stories merged.",
    coverBg: "#f3eb88",
    problem:
      "A slow-living brand sitting on hundreds of blog posts, products, and seasonal stories with no architecture connecting them. Visitors couldn&rsquo;t find anything; the SEO surface was leaving real organic traffic on the table.",
    approach:
      "Rebuilt the IA from scratch — products, journal, and seasonal collections all share a single tagging system. A new shop-filter UX lets visitors browse the way they actually shop. Warm visual register, intentionally different from the clinical DTC default — range that says a designer can hold more than one mode.",
    outcome:
      "Organic search traffic doubled in the first 8 weeks post-launch. Average session duration up 47% as content and commerce finally pulled in the same direction.",
    mockups: [
      "Information architecture",
      "Shop filter UX",
      "Journal hub",
      "Seasonal collection",
    ],
    highlights: [
      { metric: "2×", label: "Organic traffic" },
      { metric: "+47%", label: "Session time" },
      { metric: "8 wks", label: "Time to lift" },
    ],
  },
};

export const projectList: Project[] = Object.values(projects);
