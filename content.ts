// All copy for the page lives here. To reuse this site as a base for someone else,
// replace this file and the photo; the components read everything from it.
// Headings carry no periods. (Optional: wrap a word in *asterisks* to italicise it.)
//
// To confirm before launch: site URL, booking link, form endpoint, LinkedIn,
// availability line, photo, testimonials, the prices ($300, $1,500 and $3,500).

// Collage illustrations (public/illustrations/mm), with each file's own width and height.
const illo = (name: string, width: number, height: number) => ({ src: `/illustrations/mm/${name}.webp`, width, height });
export const art = {
  computer: illo("computer", 1200, 1583),
  eye: illo("eye-magnifier", 1200, 719),
  megaphone: illo("megaphone", 1200, 970),
  mailbox: illo("mailbox", 1200, 932),
  seedling: illo("seedling-in-hand", 1200, 1107),
  cashRegister: illo("cash-register", 1200, 1180),
  telephone: illo("telephone-lips", 1200, 2252),
  parcel: illo("parcel", 1200, 1022),
  building: illo("building", 1200, 1454),
  lightbulb: illo("lightbulb", 1200, 1285),
  phone: illo("phone-in-hand", 1200, 1204),
  laptop: illo("laptop-telephone", 1200, 1223),
  starburstCream: illo("starburst-cream", 1200, 865),
  starburstBlue: illo("starburst-blue", 1200, 1204),
  basket: illo("shopping-basket", 1200, 989),
  receipt: illo("receipt", 1200, 1273),
};
export type Art = (typeof art)[keyof typeof art];

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
  // Where the contact form posts: app/api/contact, which emails it through Resend (needs
  // RESEND_API_KEY; see .env.example). Set to "" to have the form open the visitor's email app.
  formEndpoint: "/api/contact",
  // Newsletter service URL for the footer sign-up (e.g. beehiiv or Buttondown). Until it's set,
  // signing up opens the visitor's email app with a sign-up request to you.
  newsletterEndpoint: "",
  // Leave empty to hide the LinkedIn link in the footer.
  linkedin: "",
  // About photo in public/, and its description for screen readers.
  photo: "/headshot.webp",
  photoAlt: "Paige Eaton smiling, in a black turtleneck, against a grey backdrop",
  // Shown in the dark announcement bar at the top. Leave empty to hide the bar.
  availability: "Booking for December ’26",
  metaDescription:
    "Paige Eaton is a product marketer and designer in Kitchener, Ontario. Strategy, design and the build itself for Shopify and ecommerce teams.",
};

// An accent underline marks the menu item whose section is on screen.
export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  // Services goes to Ways to work together (the offers and prices), not How I can help
  { label: "Services", href: "#pricing" },
  { label: "Scrapbook", href: "#blog" },
];

export const hero = {
  // The headline, one phrase per line.
  // A word in {braces} is drawn selected, with a selection box and handles.
  heading: ["Product marketing, {design}", "& AI builds for Shopify"],
  lede:
    "I’ve spent 13 years building on Shopify. Now I fix and refresh stores for founders who want one person on it, not an agency.",
  // Storefront screens shown in a row under the intro. Width and height are the files' own;
  // `tag` (optional) replaces the label in the caption under the screen; `hover` (optional)
  // is a second image, the same size, that fades in on hover, as on a real product card.
  shots: [
    { src: "/hero/swim-homepage.webp", label: "Homepage", tag: "Theme design", alt: "A swimwear homepage: the blue serif headline Cut for the sea, made for the season, over two beach photos with category links between them", width: 1364, height: 960 },
    { src: "/hero/jewellery-banner.webp", label: "Collection banner", alt: "A jewellery banner: gold hoops on the edge of a glass against black, with the headline Gold on the rocks and a Shop now button", width: 1359, height: 1406 },
    { src: "/hero/spf-product-card.webp", hover: "/hero/spf-product-card-pool.webp", label: "Product card", tag: "Product pages", alt: "A product card for The Daily SPF 50, a yellow sunscreen bottle on a grey background, with a star rating, a short description and an Add button with the price. On hover it switches to the bottle floating in a pool", width: 876, height: 1040 },
  ] as { src: string; label: string; alt: string; width: number; height: number; tag?: string; hover?: string }[],
};

export const approach = {
  heading: "My process",
  body:
    "A fixed price in writing before any work starts, then async work with as few calls as possible.",
  steps: [
    { art: art.mailbox, title: "You send it over", body: "A link to your site and a screenshot of what’s bothering you. Whatever you have is enough to start." },
    { art: art.receipt, title: "I come back with a price", body: "A fixed price, what’s included and how long it takes, in writing. A short call only if needed." },
    { art: art.laptop, title: "The work", body: "Async by default, with one live session. Calls only when they’d be faster than writing it down." },
    { art: art.parcel, title: "Handover", body: "Design files, copy, code and your theme, all handed over so you can keep going without me." },
  ],
};

export const about = {
  heading: "Hi, I’m Paige, a founder turned Shopify designer",
  body: "I’ve bootstrapped two brands of my own, so I know your side of it, including how far a small budget has to stretch. I care about the details most people skip, like product data and the copy on a checkout button. And I still design whenever I can, online or off.",
  // Tool logos stuck to the photo panel.
  tools: [
    { name: "Shopify", logo: "/logos/shopify-glyph.svg", file: "shopify.app" },
    { name: "Figma", logo: "/logos/figma.svg", file: "design.fig" },
    { name: "Claude", logo: "/logos/claude.svg", file: "claude.md" },
  ],
  // The About board: the photo's file name and the folder that opens the projects.
  photoFile: "paige.jpg",
  // On the mat, bottom right: the files on it can be dragged around
  dragHint: "Move things around",
  folder: "case studies",
};

// The rows under this heading are the approach phases (approachPage.phases).
export const services = {
  eyebrow: "How I can help",
  heading: "From quick fixes to full refreshes",
};

// The Working style section on the homepage: a picture on the left, three principles on the right.
export const workingStyle = {
  eyebrow: "Working style",
  heading: "Keep it simple",
  body: "Fast prototypes and clear decisions. Claude does the repetitive work, so my time goes on the parts that need a person.",
  // Behind every picture
  background: "/blog/agent-blueprint.webp",
  // Each principle has its own picture, which shows while it's the active one: a storefront
  // screen, framed as a browser window ("browser"), a floating card ("card"), or a card with a
  // Claude chat window working on it ("claude").
  items: [
    { title: "Let AI do the heavy lifting", body: "Claude Code and Shopify Sidekick handle the setup. I review every line.", image: { src: "/hero/spf-product-card.webp", width: 876, height: 1040, frame: "claude" } },
    { title: "Move fast, learn early", body: "Get a simple version live quickly, then adjust to what’s real.", image: { src: "/hero/swim-homepage.webp", width: 1364, height: 960, frame: "browser", url: "yourstore.com" } },
    { title: "Make it clear before pretty", body: "Nail the structure and flow first, then polish what matters.", image: { src: "/hero/jewellery-banner.webp", width: 1359, height: 1406, frame: "card" } },
  ] as { title: string; body: string; image: { src: string; width: number; height: number; frame: "browser" | "card" | "claude"; url?: string } }[],
};

// Who I work with: a short list under the About copy, who it's for and one line on each.
export const audiences = {
  heading: "Who I work with",
  items: [
    {
      title: "Just launched",
      body: "Your store is live, but it isn’t selling yet",
    },
    {
      title: "Already selling",
      body: "You’ve got customers and want more",
    },
    {
      title: "Building for Shopify",
      body: "Apps and tools for Shopify merchants",
    },
  ],
};


export const models = {
  heading: "Ways to work together",
  // Set pricePlaceholder to true to fade the prices.
  pricePlaceholder: false,
  currency: "USD",
  // The table's row labels; a row with a tip gets an (i) beside its last word that shows it
  rows: {
    startingAt: { label: "Starting at", tip: "A guide for typical scope. You’ll get a fixed quote in writing before any work starts." },
    deliverables: { label: "Example deliverables", tip: "Every project is scoped to your needs, so your deliverables may differ from these examples." },
  },
  // Smallest to biggest, left to right. Each card: its category, its name, one line, what's
  // included (short), its starting price and how long it takes.
  // To confirm: the refresh and one-off prices and timelines are placeholders.
  items: [
    {
      tag: "Review",
      title: "Ask Paige",
      body: "A focused review of your store or app, with a written list of priorities.",
      points: ["Homepage and key pages", "SEO and AI search review", "Prioritized recommendations"],
      price: "$300",
      per: "/ session",
      timeline: "Booked within a few days",
    },
    {
      tag: "Project",
      title: "Scoped project",
      body: "A single, well-defined piece of work, delivered on an agreed timeline.",
      points: ["Email flows", "Landing pages", "Content and copy"],
      price: "$750",
      per: "/ project",
      timeline: "Delivered in 1 to 2 weeks",
      // The table opens with this one highlighted
      featured: true,
    },
    {
      tag: "Refresh",
      title: "Store refresh",
      body: "Your theme and key pages, redesigned and rewritten.",
      points: ["Theme and page templates", "Conversion-focused copy", "SEO and AEO improvements"],
      price: "$2,500",
      per: "/ project",
      timeline: "Delivered in 3 to 4 weeks",
    },
  ],
};

// Blog posts. Each gets a page at /blog/<slug> (app/blog/[slug]); the homepage Scrapbook shows
// the latest three. A post's body is a list of blocks, in order. Until a post has its own,
// it shows samplePostBody: placeholder copy to show the template, to replace with the real post.
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src?: string; caption: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** The longer line under the title on the post's page (the card uses `excerpt`). */
  standfirst?: string;
  date: string;
  readTime: string;
  tag: string;
  image: string;
  body?: PostBlock[];
};

export const samplePostBody: PostBlock[] = [
  { type: "p", text: "Placeholder copy: this is where the post starts. Open with the point in one or two sentences, so someone skimming knows what they’ll get from reading on." },
  { type: "p", text: "Then the context. What prompted it, who it’s for and why it matters to a founder running a Shopify store right now." },
  { type: "h2", text: "A section heading" },
  { type: "p", text: "Each section makes one point. Keep paragraphs short, three or four lines at most, and let the headings carry the argument so the post still makes sense at a glance." },
  { type: "list", items: ["A list for steps or examples", "Each item a short phrase or one sentence", "Three to five items reads best"] },
  { type: "quote", text: "A pull quote for the one line worth remembering." },
  { type: "image", caption: "An image or screenshot, with a short caption" },
  { type: "h2", text: "What to do next" },
  { type: "p", text: "Close with something the reader can act on this week, and a line on how I can help if they’d rather not do it alone." },
];

export const blog = {
  eyebrow: "From the scrapbook",
  linkLabel: "Read the scrapbook",
  href: "https://productpaige.com/blog",
  // On a post page
  tocLabel: "Contents",
  // The credits under a post's title
  meta: { published: "Posted", readTime: "Read time", author: "Author" },
  moreHeading: "More from the scrapbook",
  posts: [
    {
      slug: "shopifys-agent-blueprint",
      title: "Shopify’s agent blueprint",
      excerpt: "Shopify open-sourced a shopping agent. The useful part isn’t the code.",
      standfirst: "Shopify open-sourced a shopping agent. The useful part isn’t the code, it’s what it shows about how AI assistants will read your store, and what to fix before they do.",
      date: "Sep 3, 2026",
      readTime: "5 min read",
      tag: "AI",
      image: "/blog/agent-blueprint.webp",
    },
    {
      slug: "the-eight-second-test",
      title: "The eight-second test",
      excerpt: "How to tell if your homepage works, before you rebuild it again.",
      standfirst: "How to tell if your homepage works, before you rebuild it again. A quick test you can run this week, and how to read the answers so you know what to change first.",
      date: "Aug 14, 2026",
      readTime: "4 min read",
      tag: "Positioning",
      image: "/blog/eight-second-test.webp",
    },
    {
      slug: "onboarding-is-a-promise",
      title: "Onboarding is a promise",
      excerpt: "Every onboarding step promises something. Break it, lose the merchant.",
      standfirst: "Every onboarding step promises something. Break it, lose the merchant. How to spot the promises your app makes on day one, and keep each of them.",
      date: "Jul 30, 2026",
      readTime: "6 min read",
      tag: "UX",
      image: "/blog/onboarding-promise.jpg",
    },
  ] satisfies Post[] as Post[],
};

// Case studies, from productpaige.com/projects. Each gets a page at /projects/<slug>.
// Only Backspace Body has a cover image so far; the others show their name on a plain sheet.
// To confirm: the 92% Canadian figure for Organic Moderne is the only hard number on the site.
export type Project = {
  slug: string;
  client: string;
  /** One line on the folder card. */
  excerpt: string;
  role: string;
  image?: string;
  /** Large panels on the case study page. Without `src`, a panel shows its caption as a placeholder. */
  gallery?: { src?: string; caption: string }[];
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
  /** The one proof point under the description: a client quote, or a result as `quote` with `name` as its source. Until it's set, a placeholder shows. */
  proof?: { quote: string; name: string };
  /** Not ready yet: its card shows a Coming soon badge and doesn't link, and it has no page. */
  comingSoon?: boolean;
};

export const projects = {
  eyebrow: "Recent projects",
  // The link to the next one, at the bottom of a project page
  nextLabel: "Next project",
  // Shown in place of a project's proof point until it has one
  proofPlaceholder: { quote: "A client quote or one hard result goes here, e.g. “92% of visitors now come from Canada.”", name: "Client name, role (placeholder)" },
  // The button under a project's dropdowns; it opens the contact drawer
  cta: { label: "Let’s talk" },
  // On a project card that isn't ready yet
  comingSoonLabel: "Coming soon",
  items: [
    {
      slug: "backspace-body",
      client: "Backspace Body",
      excerpt: "A concept body care brand on Shopify",
      role: "Brand and build",
      image: "/projects/backspace-body.webp",
      gallery: [
        { src: "/projects/backspace-body/conditioner.webp", caption: "Conditioner" },
        { src: "/projects/backspace-body/body-lotion.webp", caption: "Body lotion" },
        { src: "/projects/backspace-body/shampoo.webp", caption: "Shampoo" },
      ],
      tagline: "A body care brand that doesn’t exist, built like it does",
      summary:
        "Backspace Body is a concept brand for family body care. It’s unisex, fragrance-free and refill-first, with one range for body, hair, face and hands.",
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
        "A working Shopify storefront rather than a set of mockups, with a mega nav, blog, help center, footprint page and a refill flow that works end to end. Every claim traces to a source.",
    },
    {
      slug: "organic-moderne",
      client: "Organic Moderne",
      excerpt: "An editorial and affiliate site for Canadians",
      role: "Websites",
      liveUrl: "https://organicmoderne.com/",
      tagline: "A Canadian shopping guide for a look that mostly ships from the States",
      summary:
        "Organic Moderne is an editorial and affiliate site for warm-minimal interiors, written for Canadian shoppers.",
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
      comingSoon: true,
      client: "Brand Playbook",
      excerpt: "A resource hub for solo Shopify founders",
      role: "Websites",
      liveUrl: "https://brandplaybook.shop/",
      tagline: "The Shopify guide I wanted when I was figuring it out alone",
      summary:
        "Brand Playbook is a resource hub for solo founders building a Shopify store without an agency behind them.",
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
        "Structure first rather than pages, in the order decisions come up: start, validate, build, launch, grow, operate. Flat URLs, nothing nested, and content written in Notion and mapped to the site schema.",
      outcome:
        "Library, playbooks, questions, glossary, stack and tutorials, every page prerendered for search. Write in Notion and it ships with the schema already attached.",
    },
  ] as Project[],
};

// The section is hidden while this list is empty. Add real quotes with names and companies.
export const testimonials = {
  heading: "From people I’ve worked with",
  items: [] as { quote: string; name: string; title: string }[],
};

// The /approach page. "Who I work with" and the FAQs there are the shared sections (audiences
// and faq), so they match the homepage; only the Who I work with intro is the page's own.
export const approachPage = {
  eyebrow: "How the work runs",
  heading: "My approach",
  lede: "Four phases. Most projects use two or three of them, not all four — and I’ll say which ones you actually need before you’ve paid me anything.",
  phases: [
    {
      title: "Web and product design",
      body: "Storefronts, marketing sites and product surfaces. A refresh of what you have, done properly.",
      includes: ["Shopify theme build", "Design system", "Front-end build", "QA and launch"],
      caseStudies: ["backspace-body", "organic-moderne", "brand-playbook"],
    },
    {
      title: "Positioning and messaging",
      body: "Naming, positioning and copy across the whole site, including the definitional pages AI assistants cite. Your product will make sense to someone outside the building.",
      includes: ["Positioning", "Naming and identity", "Copywriting", "AI search content"],
      caseStudies: ["backspace-body", "brand-playbook"],
    },
    {
      title: "UX and conversion",
      body: "A positioning and UX review, with a written list of what to fix first. I’ll tell you if you don’t need me.",
      includes: ["UX review", "Conversion", "Information architecture", "UI design"],
      caseStudies: ["organic-moderne", "brand-playbook"],
    },
    {
      title: "Content and campaigns",
      body: "Landing pages, emails, an AI-coded tool or a whole campaign. Scoped, built and handed over before your launch date.",
      includes: ["Landing pages", "Email design", "Campaign copy", "SEO"],
      caseStudies: ["backspace-body", "organic-moderne"],
    },
  ],
  cta: { heading: "Not sure which of these you need?", button: "Let’s talk", href: "/#contact" },
};

export const faq = {
  // The /faq page: the label is its eyebrow and its name in the left rail and footer
  label: "FAQs",
  heading: "Questions, answered",
  body: "Short answers on how I work, what I take on and what happens if plans change.",
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

// Privacy and terms, from productpaige.com/privacy and /terms, updated to match this site:
// Ontario law, no retainers, and no analytics (add it back here if analytics is turned on).
// Worth a review by a lawyer before launch.
export const legal = {
  privacy: {
    label: "Privacy",
    heading: "Plain-language privacy",
    lede: "Product Paige is a one-person practice. The site collects very little, uses what it has only to reply to you, and never sells your data.",
    effective: "June 26, 2026",
    sections: [
      { label: "Scope", title: "What this covers", body: "This policy applies to productpaige.com and any direct correspondence with Product Paige (Paige Eaton, sole practitioner). It does not cover third-party sites linked from here." },
      { label: "Collection", title: "What gets collected", body: "Just the basics needed to run a small consulting site: the email address you send messages from, and any information you choose to share in those messages. No analytics, no tracking pixels, no fingerprinting, no third-party ad networks." },
      { label: "Usage", title: "How it's used", body: "Email correspondence is used only to reply to your message and, if a project starts, to deliver the work. Information is never sold, rented, or shared with marketing partners." },
      { label: "Storage", title: "Where it lives", body: "Email: stored in a personal inbox provider (Google Workspace). Project work: stored in personal tools (Notion, Figma, Linear) under standard provider security." },
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
      { label: "Scope", title: "What's covered", body: "These terms apply to consulting work performed by Product Paige (Paige Eaton, sole practitioner), including Ask Paige sessions and project engagements, and to use of productpaige.com." },
      { label: "Engagement", title: "How work is scoped", body: "Every engagement starts with a written scope: what's included, what's not, the expected timeline, and the price. Anything outside that scope is a new engagement with its own scope and price. No surprise invoices." },
      { label: "Payment", title: "Payment terms", body: "Ask Paige sessions: paid in full before the session. Project work: 50% on signature, 50% on delivery, unless otherwise written into the scope. Invoices are payable within 14 days via Wise, Stripe, or bank transfer. Currency is USD unless otherwise agreed." },
      { label: "Deliverables", title: "Ownership of deliverables", body: "On final payment, ownership of all written deliverables, design files, and code transfers to the client. The right to reference the engagement in case studies and portfolio work is retained — sensitive details can be anonymized on request before any public reference." },
      { label: "Confidentiality", title: "Confidentiality", body: "Anything shared in the course of an engagement is treated as confidential and is not discussed with third parties without permission. A mutual NDA can be signed before any sensitive material is reviewed." },
      { label: "Cancellation", title: "Cancellation + refunds", body: "Ask Paige sessions: full refund if canceled 48+ hours before the scheduled time, no refund within 48 hours (one reschedule allowed). Project work: 50% deposit is non-refundable after work begins; remaining balance is owed for work completed up to the cancellation date." },
      { label: "Liability", title: "Limitations", body: "Product Paige provides product strategy, marketing, and design advice — not legal, financial, accounting, or regulatory advice. Total liability for any engagement is limited to fees paid for that engagement. Work is delivered as-is with no implied warranty of merchantability or fitness for a particular purpose." },
      { label: "Jurisdiction", title: "Governing law", body: "These terms are governed by the laws of Ontario, Canada. Any disputes will be resolved in the courts of Ontario unless both parties agree to binding arbitration." },
    ],
  },
};

export const closing = {
  footer: "Based in Kitchener, Ontario, working remotely",
  // The footer's link columns' headings.
  pagesHeading: "Pages",
  postsHeading: "Latest posts",
  elsewhereHeading: "Elsewhere",
  // The big line in the footer, under the name
  tagline: "Building better on Shopify",
  newsletter: {
    heading: "New posts by email",
    body: "Notes from the scrapbook, about once a month. No spam.",
    label: "Subscribe",
    success: "You’re on the list. Thanks for signing up.",
  },
};

export const contact = {
  heading: "Let’s talk about your store",
  body: "Tell me where your store is and what’s on your plate, and I’ll reply by email.",
  messageLabel: "What would you like help with?",
  messagePlaceholder: "A few lines is plenty, e.g. our product pages get traffic but hardly anyone adds to cart.",
  deadlines: ["No fixed date", "Within a month", "1–3 months", "It’s urgent"],
  // The three ways to work together, in the client's voice (as in models.items), plus a catch-all.
  interests: ["Ask Paige", "A scoped project", "A store refresh", "Not sure yet"],
  success: "Thanks, your message is on its way. I’ll reply by email soon, usually to suggest a time for a short intro call.",
};

// Privacy, Terms and FAQs: the pages the left rail on each links between, in order (also the
// footer's bottom links).
export const infoPages = [
  { key: "privacy", label: legal.privacy.label, href: "/privacy" },
  { key: "terms", label: legal.terms.label, href: "/terms" },
  { key: "faq", label: faq.label, href: "/faq" },
] as const;

// The projects that have a page: everything not marked comingSoon.
export const liveProjects = projects.items.filter((p) => !p.comingSoon);
