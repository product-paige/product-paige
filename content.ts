// All copy for the page lives here. To reuse this site as a base for someone else,
// replace this file and the photo; the components read everything from it.
// Headings carry no periods. (Optional: wrap a word in *asterisks* to italicise it.)
//
// To confirm before launch: site URL, booking link, form endpoint, LinkedIn,
// availability line, photo, testimonials, the $1,500 tier.

import type { TagIconName } from "./components/TagIcon";

export const site = {
  name: "Paige Eaton",
  // Header logo, on one line.
  logo: "Product Paige",
  role: "Product marketer & designer",
  location: "Kitchener, Ontario",
  url: "https://productpaige.com",
  // Keeps search engines from listing the site. Set to false at launch.
  hideFromSearch: true,
  bookingUrl: "/#contact",
  email: "hello@productpaige.com",
  // Form service URL (e.g. Formspree). Until it's set, the form opens the
  // visitor's email app with their message filled in.
  formEndpoint: "",
  // Leave empty to hide the LinkedIn link in the footer.
  linkedin: "",
  // About photo in public/, and its description for screen readers.
  photo: "/about.jpg",
  photoAlt: "Someone in a red jumper and jeans lying upside down on a pink sofa, a book over their face",
  // Shown in the dark announcement bar at the top. Leave empty to hide the bar.
  availability: "Booking for November ’26",
  metaDescription:
    "Paige Eaton is a product marketer and designer in Kitchener, Ontario. Strategy, design and the build itself for Shopify and ecommerce teams.",
};

// An accent underline marks the menu item whose section is on screen.
export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#pricing" },
  { label: "Scrapbook", href: "#blog" },
];

export const hero = {
  heading: "Product, design and build support for Shopify teams",
  lede:
    "I launch and fix Shopify stores: the strategy, the design and the build itself, without three handoffs.",
  // Each pill has a line icon (see components/TagIcon.tsx for the names).
  tags: [
    { label: "Ecommerce + DTC", icon: "bag" },
    { label: "Shopify apps + ecosystem", icon: "apps" },
    { label: "Product-led SaaS", icon: "window" },
    { label: "Loyalty + retention", icon: "heart" },
    { label: "AI + developer tools", icon: "sparkle" },
    { label: "Apparel", icon: "shirt" },
  ] as { label: string; icon: TagIconName }[],
};

export const approach = {
  heading: "My process",
  body:
    "A fixed price in writing before any work starts, then async work with as few calls as possible.",
  steps: [
    { title: "You send it over", body: "A link to your site and a screenshot of what’s bothering you. Whatever you have is enough to start." },
    { title: "I come back with a price", body: "A fixed price, what’s included and how long it takes, in writing. A short call only if needed." },
    { title: "The work", body: "Async by default, with one live session. Calls only when they’d be faster than writing it down." },
    { title: "Handover", body: "Design files, copy, code and your theme, all handed over so you can keep going without me." },
  ],
};

export const about = {
  heading: "Hey, I’m Paige\nI make things online and off",
  paragraphs: [
    "My whole career has been in Shopify and ecommerce, across funded startups and bootstrapped teams. I’ve been the first marketing hire twice, and I’ve run two ecommerce brands of my own, one with a cofounder, handling everything from sourcing a manufacturer to go-to-market.",
    "Now I do strategy, design and the build itself: Shopify themes and modern site builders, with Claude Code and MCP wired into Figma and Shopify, so design, copy and working code happen in one pass instead of three handoffs. I’m not a developer, and I’ll say so before you pay me anything.",
  ],
  // The stats line under the About text.
  facts: [
    { label: "Based in", value: "Kitchener, Ontario" },
    { label: "Experience", value: "13+ years on Shopify" },
    { label: "Founder", value: "2x brand founder" },
  ],
};

export const services = {
  heading: "How I can help",
  items: [
    {
      title: "Web and product design",
      tags: ["Shopify themes", "Typography and color", "Product data"],
      body: "Shopify storefronts and marketing sites. A refresh of what you already have, or designed and built from scratch in your theme.",
    },
    {
      title: "UX and conversion",
      tags: ["UX review", "Conversion", "Scoped plan"],
      body: "A positioning and UX review, with a written list of what to fix first. I’ll tell you if you don’t need me.",
    },
    {
      title: "Positioning and messaging",
      tags: ["Positioning", "Copywriting", "Product strategy"],
      body: "Naming, positioning and copy across the whole site. Your product will make sense to someone outside the building.",
    },
    {
      title: "Content and campaigns",
      tags: ["Landing pages", "Email design", "Campaign copy"],
      body: "Landing pages, emails or a whole campaign, made with AI tools. Scoped, built and handed over before your launch date.",
    },
  ],
};

export const audiences = {
  heading: "Who I work with",
  body: "I work closely with founders and small teams building on Shopify, typically at the startup or scale-up stage.",
  items: [
    {
      tone: "bg-scrap",
      title: "You’re starting from scratch",
      points: [
        "You’ve got the product, just not the store",
        "Your brand guidelines are three screenshots and a vibe",
        "Launch day is booked. The website is not",
      ],
    },
    {
      tone: "bg-scrap",
      title: "You’re already selling on Shopify",
      points: [
        "Your traffic window-shops, then leaves",
        "It still looks like the theme’s demo store",
        "You’ve outgrown the site you built at 2am",
      ],
    },
  ],
};


export const models = {
  heading: "Ways to work together",
  // Set pricePlaceholder to true to fade the prices.
  pricePlaceholder: false,
  currency: "USD",
  items: [
    {
      tag: "Strategy",
      title: "Advice and reviews",
      body: "Find out what’s wrong and what to fix first.",
      price: "$150",
      per: "/ call",
      points: ["A focused hour, booked within days", "A written list of what to fix first", "Or a full-week review and plan"],
    },
    {
      tag: "Websites",
      title: "Store design and build",
      body: "Your store designed, written and built, start to finish.",
      price: "$1,500",
      per: "/ project",
      points: ["A refresh in your own theme", "Or a full build from scratch, from $8,500", "Design, copy, QA and launch"],
      featured: true,
    },
    {
      tag: "Projects",
      title: "One-time project",
      body: "One focused piece of work, live before your deadline.",
      price: "$4,000",
      per: "/ project",
      points: ["A page, an email set or an AI-built tool", "Or a whole campaign", "Done in two to three weeks"],
    },
  ],
};

// Latest three posts from productpaige.com/blog. Images are the covers used there.
export const blog = {
  heading: "From the scrapbook",
  linkLabel: "Read the scrapbook",
  href: "https://productpaige.com/blog",
  posts: [
    {
      title: "Shopify’s agent blueprint",
      excerpt: "Shopify open-sourced a shopping agent. The useful part isn’t the code.",
      date: "Sep 3, 2026",
      tag: "AI",
      image: "/blog/agent-blueprint.jpg",
      href: "https://productpaige.com/blog/shopifys-agent-blueprint",
    },
    {
      title: "The eight-second test",
      excerpt: "How to tell if your homepage works, before you rebuild it again.",
      date: "Aug 14, 2026",
      tag: "Positioning",
      image: "/blog/eight-second-test.jpg",
      href: "https://productpaige.com/blog/the-eight-second-test",
    },
    {
      title: "Onboarding is a promise",
      excerpt: "Every onboarding step promises something. Break it, lose the merchant.",
      date: "Jul 30, 2026",
      tag: "UX",
      image: "/blog/onboarding-promise.jpg",
      href: "https://productpaige.com/blog/onboarding-is-a-promise",
    },
  ],
};

// Case studies, from productpaige.com/projects. Each gets a page at /projects/<slug>.
// Only Backspace Body has a cover image so far; the others show their name on a plain sheet.
// To confirm: Product Prompt is hidden on productpaige.com right now, and the 92%
// Canadian figure for Organic Moderne is the only hard number on the site.
export type Project = {
  slug: string;
  client: string;
  /** One line on the folder card. */
  excerpt: string;
  role: string;
  image?: string;
  liveUrl?: string;
  /** Under the name on the case study page. */
  tagline: string;
  summary: string;
  capabilities: string[];
  specs: { label: string; value: string }[];
  highlights: { label: string; value: string }[];
  problem: string;
  approach: string;
  outcome: string;
};

export const projects = {
  heading: "Recent projects",
  body: "A mix of product audits, UX work and personal projects, all in the Shopify and ecommerce world.",
  items: [
    {
      slug: "backspace-body",
      client: "Backspace Body",
      excerpt: "A concept body care brand on Shopify",
      role: "Brand and build",
      image: "/projects/backspace-body.jpg",
      tagline: "A body care brand that doesn’t exist, built like it does",
      summary:
        "Backspace Body is a concept brand for family body care: unisex, fragrance-free, refill-first, one range covering body, hair, face and hands. Not a set of mockups, but a working Shopify storefront with 21 products, real copy, ingredient data and SEO behind all of it.",
      capabilities: ["Naming and identity", "Copywriting", "Product data", "Shopify theme build", "SEO"],
      specs: [
        { label: "Platform", value: "Shopify (Horizon)" },
        { label: "Built with", value: "Claude Code + Shopify MCP" },
      ],
      highlights: [
        { label: "Products", value: "21 across 30 variants" },
        { label: "Ingredient glossary", value: "49 entries" },
        { label: "Surfaces", value: "Store, blog, help center, footprint" },
      ],
      problem:
        "Body care sells on fragrance and gendered packaging, with six bottles doing one job. Refills are an opt-in extra, and nothing covers body, hair and face in one range.",
      approach:
        "Designed in Paper, built on Shopify Horizon. Ingredient data lives in metaobjects read from one source, so the glossary, product pages and filters can’t disagree.",
      outcome:
        "The storefront runs: mega nav, blog, help center, footprint page, and a refill flow that works end to end rather than being described. Every claim traces to a source.",
    },
    {
      slug: "organic-moderne",
      client: "Organic Moderne",
      excerpt: "An editorial and affiliate site for Canadians",
      role: "Websites",
      liveUrl: "https://organicmoderne.com/",
      tagline: "A Canadian shopping guide for a look that mostly ships from the States",
      summary:
        "Organic Moderne is an editorial and affiliate site for warm-minimal interiors, built for Canadian shoppers specifically. Long-form guides, a directory of Canadian stores, a design glossary and a filterable shop, all written in Notion and published without touching code.",
      capabilities: ["Content architecture", "SEO", "Affiliate integration", "UI design", "Front-end build"],
      specs: [
        { label: "Platform", value: "React, Vite, Supabase" },
        { label: "CMS", value: "Notion" },
      ],
      highlights: [
        { label: "Articles", value: "Around sixty" },
        { label: "Curated products", value: "A hundred-odd" },
        { label: "Audience", value: "92% Canadian" },
      ],
      problem:
        "Canadians searching for organic-modern furniture get sent to US retailers: USD pricing, cross-border shipping, duties after checkout. What ranks is written for US shoppers.",
      approach:
        "Notion is the source of truth, syncing to Supabase through edge functions, so publishing is a content action rather than a deploy. Every route is prerendered with structured data.",
      outcome:
        "Articles, products, a glossary, an FAQ and a directory of Canadian stores, all published without touching code. The store pages outrank the long guides.",
    },
    {
      slug: "brand-playbook",
      client: "Brand Playbook",
      excerpt: "A resource hub for solo Shopify founders",
      role: "Websites",
      liveUrl: "https://brandplaybook.shop/",
      tagline: "The Shopify guide I wanted when I was figuring it out alone",
      summary:
        "Brand Playbook is a resource hub for solo founders building a Shopify store without an agency behind them: playbooks, answers, a glossary and a vetted tool stack. It’s structured around the order decisions actually come up in: start, validate, build, launch, grow, operate.",
      capabilities: ["Positioning", "Information architecture", "Design system", "Content structure", "Front-end build"],
      specs: [
        { label: "Platform", value: "Web" },
        { label: "CMS", value: "Notion" },
      ],
      highlights: [
        { label: "Structure", value: "Six stages, one path" },
        { label: "Guides", value: "A pillar guide per stage" },
        { label: "Readers", value: "Accounts and saved items" },
      ],
      problem:
        "Advice for new Shopify merchants is either a 90-second reel or a $5k agency retainer. What sits between is written to rank, not to be used: the same six tips, no sequencing.",
      approach:
        "Structure first rather than pages: six stages, pillar guides inside each, flat URLs, nothing nested. Content is written in Notion and mapped to the site schema.",
      outcome:
        "Library, playbooks, questions, glossary, stack and tutorials, every page prerendered for search. Write in Notion and it ships with the schema already attached.",
    },
    {
      slug: "product-prompt",
      client: "Product Prompt",
      excerpt: "A paid content platform for AI builders",
      role: "Websites",
      liveUrl: "https://www.productprompt.io/",
      tagline: "The marketing playbook for people who can suddenly build anything, and sell none of it",
      summary:
        "Product Prompt is a paid content platform (guides, workflows and a newsletter) for people building apps with AI. It teaches the less glamorous half of shipping: positioning, launch, activation, pricing and growth. The parts the AI tools don’t hand you.",
      capabilities: ["Positioning", "Brand and identity", "Product design", "Full-stack build", "Payments and paywall"],
      specs: [
        { label: "Platform", value: "Next.js, Supabase, Stripe" },
        { label: "CMS", value: "Sanity" },
      ],
      highlights: [
        { label: "Guide library", value: "10 guides, 75 chapters" },
        { label: "Access model", value: "One-time, not subscription" },
        { label: "Status", value: "Newly live" },
      ],
      problem: "AI collapsed the cost of building an app. It didn’t touch anything that happens after that.",
      approach:
        "Positioning first: building got easy, the marketing part didn’t, and every other decision followed from that.",
      outcome: "A live paid content platform, with the library architected and ready to write into.",
    },
  ] as Project[],
};

// The section is hidden while this list is empty. Add real quotes with names and companies.
export const testimonials = {
  heading: "From people I’ve worked with",
  items: [] as { quote: string; name: string; title: string }[],
};

export const faq = {
  heading: "Things founders ask me",
  body: "Everything you might still be wondering.",
  items: [
    {
      q: "Do you work with teams that already have a designer?",
      a: "Yes. Often the gap isn’t design capacity, it’s the positioning and structure underneath it. I’m happy to hand off clean files and rationale to whoever is building.",
    },
    {
      q: "Do you write custom code?",
      a: "Shopify themes, modern site builders and AI-assisted builds, yes. That’s most of what I do, and it’s why one person can cover design, copy and the build. Custom application engineering, no. If you need a backend built from scratch, you want a developer, and I’m happy to say so before you’ve paid me anything.",
    },
    {
      q: "Do you work with non-Shopify teams?",
      a: "Yes. Shopify is where most of the ecommerce work lands, but marketing sites, product UX and content projects aren’t platform-specific.",
    },
    {
      q: "What happens if the scope changes halfway through?",
      a: "We rewrite it. The scope is a document we both keep, so a change is a conversation and a new line, not a surprise invoice at the end.",
    },
    {
      q: "Can I hire you part-time instead of per project?",
      a: "Yes. I take part-time and full-time contract work alongside project work. Email me and say roughly what you need and for how long.",
    },
    {
      q: "What do you need from us?",
      a: "Access to what already exists, one person who can make decisions, and a rough idea of what success looks like. I’ll do the digging from there.",
    },
  ],
};

// Privacy and terms, ported unchanged from productpaige.com/privacy and /terms.
// To confirm before launch: the terms name British Columbia law (the site says Ontario),
// and the privacy policy mentions Vercel Analytics, which this site doesn't use yet.
export const legal = {
  privacy: {
    label: "Privacy",
    heading: "Plain-language privacy",
    lede: "Product Paige is a one-person practice. The site collects very little, uses what it has only to reply to you, and never sells your data.",
    effective: "June 26, 2026",
    sections: [
      { label: "Scope", title: "What this covers", body: "This policy applies to productpaige.com and any direct correspondence with Product Paige (Paige Eaton, sole practitioner). It does not cover third-party sites linked from here." },
      { label: "Collection", title: "What gets collected", body: "Just the basics needed to run a small consulting site: anonymized analytics (page views, referrer, country), the email address you send messages from, and any information you choose to share in those messages. No tracking pixels, no fingerprinting, no third-party ad networks." },
      { label: "Usage", title: "How it's used", body: "Analytics inform what content is working and where the site can be improved. Email correspondence is used only to reply to your message and, if a project starts, to deliver the work. Information is never sold, rented, or shared with marketing partners." },
      { label: "Storage", title: "Where it lives", body: "Analytics: Vercel Analytics (no cookies, no personal identifiers). Email: stored in a personal inbox provider (Google Workspace). Project work: stored in personal tools (Notion, Figma, Linear) under standard provider security." },
      { label: "Cookies", title: "Cookies", body: "The site uses essential cookies only — those required for the site to function. No analytics cookies, no marketing cookies, no consent banner needed." },
      { label: "Rights", title: "Your rights", body: "You can request to see, correct, or delete any information held about you at any time. Email hello@productpaige.com and you'll get a response within 30 days." },
      { label: "Updates", title: "Changes to this policy", body: "If this policy changes, the updated version will be posted on this page with a new effective date. For substantive changes, returning clients will be notified by email." },
    ],
  },
  terms: {
    label: "Terms",
    heading: "The shape of the engagement",
    lede: "Short, written, mutual — no surprises. These are the standard terms for any work with Product Paige. A signed scope of work takes precedence over anything below.",
    effective: "June 26, 2026",
    sections: [
      { label: "Scope", title: "What's covered", body: "These terms apply to consulting work performed by Product Paige (Paige Eaton, sole practitioner) — including Ask Paige sessions, retainers, and project engagements — and to use of productpaige.com." },
      { label: "Engagement", title: "How work is scoped", body: "Every engagement starts with a written scope: what's included, what's not, the expected timeline, and the price. Anything outside that scope is a new engagement with its own scope and price. No surprise invoices." },
      { label: "Payment", title: "Payment terms", body: "Ask Paige sessions: paid in full before the session. Retainers and project work: 50% on signature, 50% on delivery, unless otherwise written into the scope. Invoices are payable within 14 days via Wise, Stripe, or bank transfer. Currency is USD unless otherwise agreed." },
      { label: "Deliverables", title: "Ownership of deliverables", body: "On final payment, ownership of all written deliverables, design files, and code transfers to the client. The right to reference the engagement in case studies and portfolio work is retained — sensitive details can be anonymized on request before any public reference." },
      { label: "Confidentiality", title: "Confidentiality", body: "Anything shared in the course of an engagement is treated as confidential and is not discussed with third parties without permission. A mutual NDA can be signed before any sensitive material is reviewed." },
      { label: "Cancellation", title: "Cancellation + refunds", body: "Ask Paige sessions: full refund if canceled 48+ hours before the scheduled time, no refund within 48 hours (one reschedule allowed). Project work: 50% deposit is non-refundable after work begins; remaining balance is owed for work completed up to the cancellation date." },
      { label: "Liability", title: "Limitations", body: "Product Paige provides product strategy, marketing, and design advice — not legal, financial, accounting, or regulatory advice. Total liability for any engagement is limited to fees paid for that engagement. Work is delivered as-is with no implied warranty of merchantability or fitness for a particular purpose." },
      { label: "Jurisdiction", title: "Governing law", body: "These terms are governed by the laws of British Columbia, Canada. Any disputes will be resolved in the courts of British Columbia unless both parties agree to binding arbitration." },
    ],
  },
};

export const closing = {
  footer: "Based in Kitchener, Ontario, working remotely",
};

export const contact = {
  heading: "Let’s talk about your store",
  body: "Tell me where your store is and what’s on your plate. I’ll reply by email, and if it sounds like a fit, we’ll set up a short intro call.",
  emailNote: "Prefer email?",
  messageLabel: "What would you like help with?",
  messagePlaceholder: "A few lines is plenty, e.g. our product pages get traffic but hardly anyone adds to cart.",
  deadlines: ["No fixed date", "Within a month", "1–3 months", "It’s urgent"],
  // The offers from "Ways to work together", in more detail, plus a catch-all.
  interests: ["Ask Paige", "Get a full review", "Store refresh", "New build", "Ship a one-off", "Launch a campaign", "Not sure yet"],
  success: "Thanks, your message is on its way. I’ll reply by email soon, usually to suggest a time for a short intro call.",
};
