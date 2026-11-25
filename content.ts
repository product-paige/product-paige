import { posts } from "./blog-posts";
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
  url: "https://www.productpaige.com",
  // Keeps search engines from listing the site. Off since launch.
  hideFromSearch: false,
  // Google Analytics 4 measurement ID; empty turns analytics off. Loads on the live site only.
  gaId: "G-QXVD5MQDMJ",
  bookingUrl: "/#contact",
  email: "hello@productpaige.com",
  // Where the contact form posts: app/api/contact, which emails it through Resend (needs
  // RESEND_API_KEY; see .env.example). Set to "" to have the form open the visitor's email app.
  formEndpoint: "/api/contact",
  // Where the newsletter sign-up posts: app/api/subscribe, which adds the email to the Product Prompt publication (shown on the site as Prompt with Paige)
  // in beehiiv (needs BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID). Until those are set, or if this is
  // "", signing up opens the visitor's email app with a sign-up request to you.
  newsletterEndpoint: "/api/subscribe",
  // Leave empty to hide the LinkedIn link in the footer.
  linkedin: "https://www.linkedin.com/in/paigeaeaton/",
  // About photo in public/, and its description for screen readers.
  photo: "/headshot.webp",
  photoAlt: "Paige Eaton smiling, in a black turtleneck, against a grey backdrop",
  // Shown in the dark announcement bar at the top. Leave empty to hide the bar.
  availability: "Booking for December ’26",
  // The title and description search results and link previews show for the home page
  seoTitle: "Shopify design and ecommerce marketing | Product Paige",
  metaDescription:
    "Web design, content and lifecycle for small Shopify brands and ecommerce software teams. Start with a $300 call or scope a project.",
};

// An accent underline marks the menu item whose section is on screen.
// The blog switch: shows the Scrapbook section, its nav link, the footer's Latest posts and the post
// pages. Posts marked `draft` (in blog-posts.ts) stay in local preview only.
const blogLive = true as boolean;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  // Services goes to Ways to work together (the offers and prices, #services), not How I can help (#capabilities)
  { label: "Services", href: "#services" },
  { label: "Scrapbook", href: "#blog", blog: true },
].filter((n) => !("blog" in n) || blogLive);

export const hero = {
  // The headline, one phrase per line.
  // A word in {braces} is drawn selected, with a selection box and handles.
  heading: ["Product marketing, {design}", "& AI builds for Shopify"],
  lede:
    "13 years on Shopify. I fix, rewrite and rebuild stores and ecommerce software sites for small teams who want one person, not an agency.",
  // Under the intro: the main button (opens the contact form) and a text link to the services
  cta: { label: "Let’s talk", link: { label: "See how I work", href: "#services" } },
  // Storefront screens shown in a row under the intro. Width and height are the files' own;
  // `tag` (optional) replaces the label in the caption under the screen; `hover` (optional)
  // is a second image, the same size, that fades in on hover, as on a real product card. `afterCart`
  // puts it after the cart (which is drawn in code), at the far right.
  shots: [
    { src: "/hero/swim-homepage.webp", label: "Homepage", tag: "Theme design", alt: "A swimwear homepage: the blue serif headline Cut for the sea, made for the season, over two beach photos with category links between them", width: 1364, height: 960 },
    { src: "/hero/jewellery-banner-minimal.webp", afterCart: true, label: "Collection banner", alt: "A jewellery banner: a gold chain with a hand clasp draped over a clay vase on rust, with the headline Weakest link? Never and a Shop chains link", width: 1359, height: 1406 },
    { src: "/hero/spf-product-card.webp", afterCart: true, hover: "/hero/spf-product-card-pool.webp", label: "Product card", tag: "Product pages", alt: "A product card for The Daily SPF 50, a yellow sunscreen bottle on a grey background, with a star rating, a short description and an Add button with the price. On hover it switches to the bottle floating in a pool", width: 876, height: 1040 },
  ] as { src: string; label: string; alt: string; width: number; height: number; tag?: string; hover?: string; afterCart?: boolean }[],
};

// How I work: a line on building with Claude, the four steps, then three principles
export const approach = {
  eyebrow: "How I work",
  heading: "Design, copy and code in the same pass",
  body: "One person on design, copy and code, so there are no handoffs and less waiting.",
  steps: [
    { title: "Tell me what’s going on", body: "Send links, screenshots, a rant. The messier the better." },
    { title: "We scope it", body: "A short call, then a written scope and a fixed price. Nothing starts until you say yes." },
    { title: "I do the work", body: "In a shared Slack channel or an email thread. Calls only when they’re faster than typing." },
    { title: "Handover", body: "Files, copy and templates are yours, so you don’t need me to change a button." },
  ],
};

export const about = {
  heading: "Hi, I’m Paige, a founder turned Shopify designer",
  // Paragraphs under the heading, then a line for recruiters with the email
  body: [
    "I’ve bootstrapped two brands of my own, so I know what it’s like to be the founder, the designer and the customer support. I’m also the person who notices your checkout button says “Submit.”",
    "Now I help small Shopify brands and ecommerce software teams fix the stuff that quietly costs them sales.",
    "Based in Kitchener, Ontario. Working remotely, mostly in Slack.",
  ],
  // A callout under the paragraphs, for recruiters
  hiring: { label: "Hiring?", text: "I’m open to the right full-time role. Say hi at" },
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
  // The section heading beside the list, and a line under it
  title: "Capabilities",
  description: "Design, copy and builds for Shopify stores that look right and sell.",
};

// The Working style section on the homepage: a picture on the left, three principles on the right.
export const workingStyle = {
  eyebrow: "How I think",
  heading: "Keep it simple",
  body: "Fast prototypes and clear decisions.",
  // Behind every picture
  background: "/blog/agent-blueprint.webp",
  // Each principle has its own picture, which shows while it's the active one: a storefront
  // screen, framed as a browser window ("browser"), a floating card ("card"), or a card with a
  // Claude chat window working on it ("claude").
  items: [
    { title: "Let AI do the heavy lifting", body: "I build with Claude. The slow parts get fast, and you get my time on the decisions.", image: { src: "/hero/spf-product-card.webp", width: 876, height: 1040, frame: "claude" } },
    { title: "Move fast, learn early", body: "You see real pages in days, not a deck in weeks.", image: { src: "/hero/swim-homepage.webp", width: 1364, height: 960, frame: "browser", url: "yourstore.com" } },
    { title: "Clear before pretty", body: "If people don’t get it in five seconds, the typography doesn’t matter.", image: { src: "/hero/jewellery-banner.webp", width: 1359, height: 1406, frame: "card" } },
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


// The Services section (#services): the three offers as cards. Each offer's `interest` is the option its button picks in the contact form.
export const offers = {
  eyebrow: "Services",
  button: "Let’s talk",
  offersHeading: "Three ways to work with me",
  offersIntro: "Not sure which? Start with the call.",
  // Each card: its name, price (with a tip) and time, one line, three short points,
  // and example deliverables behind a dropdown
  items: [
    {
      name: "Ask Paige",
      price: "$300 flat",
      time: "Booked within a few days",
      body: "Send me the page or the question. We talk it through, and you get written notes.",
      points: ["A review of what you send", "A live call to work through it", "Notes ranked by what to fix first"],
      tip: "3 hours in total. Book a project within 30 days and the $300 counts toward it.",
      deliverables: ["Homepage and key pages review", "SEO and AI search check", "A prioritized fix list"],
      button: "Ask Paige",
      interest: "Ask Paige, $300 call",
    },
    {
      name: "Project",
      price: "From $750",
      time: "1 to 2 weeks",
      body: "One piece of work with a fixed price and a finish line, scoped before it starts.",
      points: ["Written scope and price first", "Design, copy and build, by me", "Live, not a mockup"],
      tip: "Priced by scope and brand size.",
      deliverables: ["Landing pages", "Email flows", "Shopify sections", "SEO projects", "Campaigns"],
      button: "Start a project",
      interest: "Project, from $750",
    },
    {
      name: "Refresh",
      price: "From $2,500",
      time: "3 to 4 weeks",
      body: "A full or partial website refresh: your whole site or key pages, redone and live.",
      points: ["Full site or key pages, your call", "New structure, messaging and copy", "Built, launched and handed over"],
      tip: "Refresh everything, or start with the homepage, product and collection pages.",
      deliverables: ["Theme and page templates", "Conversion-focused copy", "SEO and AEO improvements", "Design files and templates"],
      button: "Plan a refresh",
      interest: "Refresh, from $2,500",
    },
  ] as { name: string; price: string; time: string; body: string; points: string[]; tip: string; deliverables: string[]; button: string; interest: string }[],
  // Labels inside each card
  deliverablesLabel: "Example deliverables",
  deliverablesTip: "Every project is scoped to what you need, so yours may differ from these examples.",
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
  /** Not out yet: shows in local preview only. */
  draft?: boolean;
  /** A closing line and a button to an offer, at the end of the post (the button opens the contact form on that offer). */
  cta?: { line: string; button: string; interest: string };
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
  // Off on the live site while the posts are drafts: hides the Scrapbook section, the Scrapbook nav
  // link, the footer's Latest posts, the post pages, and the posts in the sitemap and llms.txt.
  live: blogLive,
  eyebrow: "From the scrapbook",
  linkLabel: "Read the scrapbook",
  // The "Read the scrapbook" link to a page of all posts. Empty hides it: there's no /blog page yet,
  // and the section already shows all three posts.
  href: "" as string,
  // On a post page
  tocLabel: "Contents",
  // The credits under a post's title
  meta: { published: "Posted", readTime: "Read time", author: "Author" },
  moreHeading: "More from the scrapbook",
  // The posts themselves live in blog-posts.ts
  posts,
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
  /** Which offer the project shows (Ask Paige, Project or Refresh). */
  shows?: string;
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
  intro: "Builds I gave myself as briefs, made the way I’d make yours.",
  // The tag under each card's name: which offer it shows
  showsLabel: "Shows",
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
      shows: "Refresh",
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
      slug: "brand-playbook",
      shows: "Project",
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
    {
      slug: "organic-moderne",
      shows: "Project",
      comingSoon: true,
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
      title: "Web design",
      body: "Shopify themes, sections and design systems, built and launched.",
      includes: ["Shopify theme build", "Design system", "Front-end build", "QA and launch"],
      caseStudies: ["backspace-body", "organic-moderne", "brand-playbook"],
    },
    {
      title: "Messaging",
      body: "What you sell, who it’s for, and how to say it so people get it in five seconds.",
      includes: ["Positioning", "Naming and identity", "Copywriting", "AI search content"],
      caseStudies: ["backspace-body", "brand-playbook"],
    },
    {
      title: "Conversion",
      body: "Where shoppers get lost, and the fixes that stop it.",
      includes: ["UX review", "Conversion", "Information architecture", "UI design"],
      caseStudies: ["organic-moderne", "brand-playbook"],
    },
    {
      title: "Campaigns",
      body: "Landing pages, emails, ads and SEO that go live instead of into a doc.",
      includes: ["Landing pages", "Email design", "Campaign copy", "SEO"],
      caseStudies: ["backspace-body", "organic-moderne"],
    },
  ],
  cta: { heading: "Not sure which of these you need?", button: "Let’s talk", href: "/#contact" },
};

export const faq = {
  // The /faq page and the homepage section: the label is the eyebrow and the page's name in the left rail and footer
  label: "FAQs",
  heading: "Questions I get asked",
  body: "Anything else, just ask.",
  items: [
    { q: "How much does it cost?", a: "Ask Paige is $300. Projects start at $750 and refreshes at $2,500. You get a fixed price in writing before anything starts." },
    { q: "How long does it take?", a: "A few days for Ask Paige, one to two weeks for a project, and three to four for a refresh." },
    { q: "What if I don’t need you?", a: "I’ll tell you on the call. Book a project within 30 days and the $300 counts toward it." },
    { q: "What do I get at the end?", a: "The work, live, plus the Figma files, copy, code and templates. All yours." },
    { q: "What happens if the scope changes?", a: "Small tweaks are included. Anything new gets a written quote first." },
    { q: "Do you do monthly retainers?", a: "No. Every job is a fixed-price project. Need more? We scope the next one." },
  ],
};

// Privacy and terms, from productpaige.com/privacy and /terms, updated to match this site:
// Ontario law, no retainers, and Google Analytics for visit counts (site.gaId).
// Worth a review by a lawyer before launch.
export const legal = {
  privacy: {
    label: "Privacy",
    heading: "Plain-language privacy",
    lede: "Product Paige is a one-person practice. The site collects very little, uses what it has only to reply to you, and never sells your data.",
    effective: "November 23, 2026",
    sections: [
      { label: "Scope", title: "What this covers", body: "This policy applies to productpaige.com and any direct correspondence with Product Paige (Paige Eaton, sole practitioner). It does not cover third-party sites linked from here." },
      { label: "Collection", title: "What gets collected", body: "Just the basics needed to run a small consulting site: the email address you send messages from, and any information you choose to share in those messages. The site also uses Google Analytics to see how many people visit and which pages they read. It records things like pages viewed, the site that sent you, your device and browser, and a rough location, not your name or email. Vercel, the site’s host, also counts page views with its own analytics, which uses no cookies. No tracking pixels, no fingerprinting, no third-party ad networks." },
      { label: "Usage", title: "How it's used", body: "Email correspondence is used only to reply to your message and, if a project starts, to deliver the work. Information is never sold, rented, or shared with marketing partners." },
      { label: "Storage", title: "Where it lives", body: "Email: stored in a personal inbox provider (Google Workspace). Project work: stored in personal tools (Notion, Figma, Linear) under standard provider security." },
      { label: "Cookies", title: "Cookies", body: "The site uses essential cookies, plus Google Analytics cookies that count visits and tell new visitors from returning ones. No marketing or advertising cookies. You can block analytics with your browser’s settings or Google’s opt-out add-on (tools.google.com/dlpage/gaoptout) and the site will work the same." },
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
    heading: "Prompt with Paige",
    body: "A monthly note on designing and building with AI. Real examples, prompts you can copy, no spam.",
    label: "Subscribe",
    success: "You’re on the list. Thanks for signing up.",
  },
};

// The contact form. The first question decides what else it asks: people hiring skip the project
// questions, team size shows for brands and software teams, monthly sales for brands only. The open
// box's label follows the offer picked. The offers' buttons open it with their option picked.
export const contact = {
  heading: "Let’s talk about what’s not working",
  body: "Tell me where things stand and what’s on your plate. I reply by email, usually within two business days.",
  roleLabel: "Which describes you?",
  roles: { brand: "Shopify brand", software: "Ecommerce software company", hiring: "I’m hiring", other: "Something else" },
  interestLabel: "Interested in",
  // The offers, with their prices, plus a catch-all
  interests: ["Ask Paige, $300 call", "Project, from $750", "Refresh, from $2,500", "Not sure yet"],
  deadlineLabel: "Deadline",
  deadlines: ["No fixed date", "Within a month", "1 to 3 months", "It’s urgent"],
  teamLabel: "Team size",
  teamSizes: ["Just me", "2 to 5", "6 to 15", "16 to 30", "More than 30"],
  salesLabel: "Monthly sales, roughly",
  sales: ["Under $10K", "$10K to $25K", "$25K to $100K", "Over $100K"],
  optionalHelp: "Helps me scope. Skip it if you’d rather.",
  // The open box's label: for Ask Paige, for the rest, and for people hiring
  messageLabels: {
    ask: "What should I look at? Send a link, a screenshot or your biggest question.",
    other: "What’s going on? Tell me what you’re trying to do and what’s in the way.",
    hiring: "Tell me about the role and the team.",
  },
  button: "Send it",
  emailLine: "Prefer email?",
  success: "Got it. I’ll read this and reply by email. If we’re a fit, I send a written scope with a fixed price, plus a short intake form for tools and contacts. Nothing starts until you say yes.",
};

// The posts that are out: all of them once blog.live is on, none before.
export const livePosts = blog.live ? blog.posts.filter((p) => !p.draft || process.env.NODE_ENV === "development") : [];

// Privacy, Terms and FAQs: the pages the left rail on each links between, in order (also the
// footer's bottom links).
export const infoPages = [
  { key: "privacy", label: legal.privacy.label, href: "/privacy" },
  { key: "terms", label: legal.terms.label, href: "/terms" },
  { key: "faq", label: faq.label, href: "/faq" },
] as const;

// The projects that have a page: everything not marked comingSoon.
export const liveProjects = projects.items.filter((p) => !p.comingSoon);
