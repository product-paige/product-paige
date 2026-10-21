// All copy for the page lives here. To reuse this site as a base for someone else,
// replace this file and the photo; the components read everything from it.
// Headings carry no periods. (Optional: wrap a word in *asterisks* to italicise it.)
//
// To confirm before launch: site URL, booking link, form endpoint, LinkedIn,
// availability line, photo, testimonials, the $1,500 tier.

export const site = {
  name: "Paige Eaton",
  // Header logo, set on two lines (first word, then the rest).
  logo: "Product Paige",
  role: "Product marketer & designer",
  location: "Kitchener, Ontario",
  url: "https://productpaige.com",
  // Keeps search engines from listing the site. Set to false at launch.
  hideFromSearch: true,
  bookingUrl: "#contact",
  email: "hello@productpaige.com",
  // Form service URL (e.g. Formspree). Until it's set, the form opens the
  // visitor's email app with their message filled in.
  formEndpoint: "",
  // Leave empty to hide the LinkedIn link in the footer.
  linkedin: "",
  // Headshot in public/. Swap the placeholder for a real photo.
  photo: "/photo-placeholder.svg",
  // Shown beside the header button. Leave empty to hide it.
  availability: "",
  metaDescription:
    "Paige Eaton is a product marketer and designer in Kitchener, Ontario. Strategy, design and the build itself for Shopify and ecommerce teams.",
};

// A dot (the accent colour) marks the menu item whose section is on screen.
export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  heading: "Product, design and build support for Shopify teams",
  lede:
    "A one-person studio launching and fixing Shopify stores. Strategy, design and the build itself, from one person instead of three handoffs.",
  tags: [
    { label: "Ecommerce + DTC", dot: "#2f6bff" },
    { label: "Shopify apps + ecosystem", dot: "#e8553d" },
    { label: "Product-led SaaS", dot: "#b04de0" },
    { label: "Loyalty + retention", dot: "#3cc0d6" },
    { label: "AI + developer tools", dot: "#e8a23d" },
    { label: "Apparel", dot: "#2fa84f" },
  ],
};

export const approach = {
  heading: "My approach",
  body:
    "A fixed price in writing before any work starts, then async work with as few calls as possible.",
  steps: [
    { dot: "#a9c3d9", title: "You send it over", body: "A link to your site, a screenshot of the thing that’s bothering you. Whatever you have is enough to start." },
    { dot: "#dcc87e", title: "I come back with a price", body: "A fixed price, what’s included and how long it takes, in writing. One short call only if the scope needs one." },
    { dot: "#dfae95", title: "The work", body: "Async by default, plus one live session. Calls only when they’d be faster than writing." },
    { dot: "#c3b3dd", title: "Handover", body: "Whatever the work produced, from design files and copy to code and your theme, handed over so you can keep going without me." },
  ],
};

export const about = {
  heading: "Hi, I’m Paige",
  paragraphs: [
    "A decade and more in Shopify and ecommerce, across funded startups and bootstrapped teams. I’ve been the first marketing hire twice, and I’ve run two ecommerce brands of my own, one with a cofounder, handling everything from sourcing a manufacturer to go-to-market.",
    "Now I do strategy, design and the build itself: Shopify themes and modern site builders, with Claude Code and MCP wired into Figma and Shopify, so design, copy and working code happen in one pass instead of three handoffs. I’m not a developer, and I’ll say so before you pay me anything.",
  ],
  facts: [
    { label: "Based in", value: "Kitchener, Ontario" },
    { label: "Recent", value: "Kiite · Enzuzo · Smile.io" },
    { label: "Experience", value: "A decade and more" },
    { label: "Works", value: "Remote, async by default" },
    { label: "Platform", value: "Shopify and ecommerce" },
    { label: "First marketing hire", value: "Twice" },
  ],
};

export const services = {
  heading: "Capabilities",
  items: [
    {
      title: "Web and product design",
      tags: ["Shopify themes", "Typography and color", "Product data"],
      body: "A Shopify storefront or marketing site. A refresh of what you already have, or the whole thing designed and built from scratch: hero, homepage and product page, built in your own theme.",
    },
    {
      title: "UX and conversion",
      tags: ["UX review", "Conversion", "Scoped plan"],
      body: "What’s wrong, and what to fix first. A positioning and UX review with a written, ranked list, and I’ll tell you if you don’t need me.",
    },
    {
      title: "Positioning and messaging",
      tags: ["Positioning", "Copywriting", "Product strategy"],
      body: "Naming, positioning and the copy across the whole thing, so the product makes sense to someone outside the building.",
    },
    {
      title: "AI content design",
      tags: ["Landing pages", "Email design", "Campaign copy"],
      body: "Landing pages, email design, content, or a whole campaign. Scoped, built, shipped and handed over, live before the date you need it.",
    },
  ],
};

export const audiences = {
  heading: "Who I work with",
  items: [
    {
      tone: "bg-sky",
      title: "You already have a store",
      points: [
        "Traffic that doesn’t convert",
        "It still looks like the theme it came from",
        "The brand has outgrown the site",
      ],
    },
    {
      tone: "bg-butter",
      title: "Nobody owns this yet",
      points: [
        "Something’s wrong and you can’t name it",
        "You’re getting conflicting advice",
        "A launch date that isn’t moving, and nobody to build it",
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
      body: "Your store designed, written and built.",
      price: "$1,500",
      per: "/ project",
      points: ["A refresh in your own theme", "Or a full build from scratch, from $8,500", "Design, copy, QA and launch"],
      featured: true,
    },
    {
      tag: "Sprints",
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

// From productpaige.com/projects. Only Backspace Body has a cover image so far;
// the others show their folder colour until they get one.
export const projects = {
  heading: "Recent projects",
  body: "A mix of product audits, UX work and personal projects, all in the Shopify and ecommerce world.",
  items: [
    {
      client: "Backspace Body",
      excerpt: "A concept body care brand, built as a working Shopify store",
      role: "Brand and build",
      year: "2026",
      image: "/projects/backspace-body.jpg",
      tone: "#e9dcc0",
      href: "https://productpaige.com/projects/backspace-body",
    },
    {
      client: "Organic Moderne",
      excerpt: "An editorial and affiliate site for Canadian shoppers",
      role: "Websites",
      year: "2026",
      tone: "#d8e4ee",
      href: "https://productpaige.com/projects/organic-moderne",
    },
    {
      client: "Brand Playbook",
      excerpt: "A resource hub for solo founders on Shopify",
      role: "Websites",
      year: "2026",
      tone: "#dce2d4",
      href: "https://productpaige.com/projects/brand-playbook",
    },
    {
      client: "Product Prompt",
      excerpt: "A paid content platform for people building with AI",
      role: "Websites",
      year: "2026",
      tone: "#efe7c8",
      href: "https://productpaige.com/projects/product-prompt",
    },
  ] as { client: string; excerpt: string; role: string; year: string; image?: string; tone: string; href: string }[],
};

// The section is hidden while this list is empty. Add real quotes with names and companies.
export const testimonials = {
  heading: "From people I’ve worked with",
  items: [] as { quote: string; name: string; title: string }[],
};

export const faq = {
  heading: "Common questions",
  body: "Have a question that isn’t here? Send it over and I’ll answer by email.",
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
