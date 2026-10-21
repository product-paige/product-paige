// All copy for the page lives here. To reuse this site as a base for someone else,
// replace this file and the photo; the components read everything from it.
// Headings carry no periods. (Optional: wrap a word in *asterisks* to italicise it;
// add "italic" back to the Newsreader styles in app/layout.tsx first.)
//
// To confirm with Stephanie: booking link, email, form endpoint, availability,
// photo, past employers, About details, testimonials, the 50–250+ people range.

export const site = {
  name: "Paige Eaton",
  role: "Fractional HR Leader",
  location: "Ontario, Canada",
  url: "https://stephaniekessler.com",
  // Keeps search engines from listing the site. Set to false at launch.
  hideFromSearch: true,
  bookingUrl: "#contact",
  email: "hello@example.com",
  // Form service URL (e.g. Formspree). Until it's set, the form opens the
  // visitor's email app with their message filled in.
  formEndpoint: "",
  linkedin: "https://www.linkedin.com/in/stephaniekessler/",
  // Headshot in public/. For a new site, start from /photo-placeholder.svg.
  photo: "/stephanie.jpg",
  availability: "Accepting new clients Q1 ’27",
  metaDescription:
    "Stephanie Kessler is a fractional HR leader in Ontario, giving teams of 50 to 250+ people experienced HR support, part time.",
};

// Each menu item's dot colour shows while its section is on screen (same colours as the hero pills).
export const nav = [
  { label: "About", href: "#about", dot: "#2f6bff" },
  { label: "Services", href: "#services", dot: "#e8553d" },
  { label: "Approach", href: "#approach", dot: "#b04de0" },
  { label: "Contact", href: "#contact", dot: "#2fa84f" },
];

export const hero = {
  heading: "Senior HR support for fast-growing teams",
  lede:
    "I’m a senior HR leader based in Ontario. I give teams of 50 to 250+ people experienced HR support, part time, so you don’t need to hire someone full time.",
  tags: [
    { label: "Startups", dot: "#2f6bff" },
    { label: "Scale-ups", dot: "#e8553d" },
    { label: "Tech & hardware", dot: "#b04de0" },
    { label: "Product & Engineering", dot: "#3cc0d6" },
    { label: "HR systems", dot: "#e8a23d" },
    { label: "Acquisitions", dot: "#2fa84f" },
  ],
};

// Past employers or notable clients (three reads best). Replace the placeholder
// slots with real names as Stephanie confirms them.
export const proof = {
  label: "Previously worked at",
  names: [
    { name: "ecobee" },
    { name: "Generac" },
    { name: "Past employer", placeholder: true },
  ],
};

// How Stephanie works. A sensible default: confirm the steps with her.
export const approach = {
  heading: "My approach",
  body:
    "When HR has been someone’s side job for a while, it’s hard to know where to start. Here’s how I keep it simple.",
  steps: [
    { dot: "#a9c3d9", title: "Get to know your team", body: "In the first couple of weeks I meet your leaders, look at what’s already in place and find the gaps." },
    { dot: "#dcc87e", title: "Set the priorities", body: "We pick the few things that will make the biggest difference this quarter, and put them in order." },
    { dot: "#dfae95", title: "Bring the plan to life", body: "I roll things out with your team and keep things moving async between weekly check-ins." },
  ],
};

export const about = {
  heading: "Hi, I’m Stephanie",
  paragraphs: [
    "I’m an HR leader based in Ontario, Canada. I spent more than five years in People Operations at ecobee, the smart-home company, through years of growth, hiring and change, including its acquisition by Generac.",
    "There I worked closely with Product & Engineering leaders on team structure, performance and hiring, helped lead the year-long move of ecobee and Generac onto Workday, and ran workshops for engineering leaders. Now I work as a fractional HR leader with a few companies at a time, so each one gets my full attention and a plan that fits how their team works.",
  ],
  facts: [
    { label: "Based in", value: "Ontario, Canada" },
    { label: "Recent", value: "ecobee · Generac" },
    { label: "Time", value: "1–3 days a week" },
    { label: "Works", value: "Remote" },
    { label: "Team size", value: "50–250+ people" },
    { label: "HR systems", value: "Workday" },
  ],
};

export const services = {
  heading: "Capabilities",
  items: [
    {
      title: "HR strategy & policies",
      tags: ["Org design", "Workforce plan", "Handbook"],
      body: "Getting the basics right: org design, a workforce plan for the year ahead, and a handbook your team can rely on.",
    },
    {
      title: "HRIS selection & rollout",
      tags: ["Workday", "HRIS", "Integration"],
      body: "I’ll help you choose an HR system, set it up and get people using it. I’ve done this on Workday across two merged companies.",
    },
    {
      title: "Leadership & manager support",
      tags: ["Product & Engineering", "Coaching", "Workshops"],
      body: "Coaching and workshops for your leaders and new managers, plus support with reorgs, performance reviews and tough conversations.",
    },
    {
      title: "Hiring plans & onboarding",
      tags: ["Hiring plans", "Process", "Onboarding"],
      body: "A hiring plan that fits your budget, a process your managers will follow, and a smooth first 90 days for every new hire.",
    },
  ],
};

export const audiences = {
  heading: "Who I work with",
  items: [
    {
      tone: "bg-sky",
      title: "A founder-led company",
      points: [
        "You have 50 to 250+ people and no one dedicated to HR",
        "A founder or ops lead is looking after HR on the side",
        "You’re about to hire fast and need the basics first",
      ],
    },
    {
      tone: "bg-butter",
      title: "A company in transition",
      points: [
        "An acquisition, a new HR system or new leaders",
        "You’d like experienced HR support while it settles",
        "You want someone who has been through it before",
      ],
    },
  ],
};


export const models = {
  heading: "Ways to work together",
  // SAMPLE PRICES for the preview only, not Stephanie's real rates.
  // Replace before launch. Set pricePlaceholder to true to fade them.
  pricePlaceholder: false,
  currency: "USD",
  items: [
    {
      tag: "Advisory",
      title: "A sounding board",
      body: "A few hours a week of senior advice for founders who already have someone handling HR.",
      price: "$1,500",
      per: "/ month",
      points: ["A few hours a week", "Advice on tricky people decisions", "Reviews of plans and policies"],
    },
    {
      tag: "Embedded",
      title: "Your part-time HR leader",
      body: "I join your leadership team and run HR for you, from planning to the day-to-day work.",
      price: "$4,500",
      per: "/ month",
      points: ["One to three days a week", "I own the HR plan", "Hands-on help"],
      featured: true,
    },
    {
      tag: "Project",
      title: "One focused project",
      body: "One focused piece of work with a clear scope and end date, delivered start to finish.",
      price: "$5,000",
      per: "/ project",
      points: ["HRIS selection & rollout", "Post-acquisition integration", "Hiring plan or manager training"],
    },
  ],
};

// Placeholders: replace with real quotes before launch.
export const testimonials = {
  heading: "From people I’ve worked with",
  items: [
    { quote: "Testimonial from an engineering or product leader you partnered with.", name: "Name", title: "Title, Company" },
    { quote: "Testimonial from a founder, CEO or COO about the impact on the business.", name: "Name", title: "Title, Company" },
    { quote: "Testimonial from someone on your HR team about how you lead.", name: "Name", title: "Title, Company" },
  ],
  placeholder: true,
};

export const faq = {
  heading: "Common questions",
  body: "Have a question that isn’t here? Ask me on an intro call.",
  items: [
    {
      q: "What does a fractional HR leader do?",
      a: "Everything a full-time HR leader would do, for fewer days a week. That means planning with the founders, and also the detailed work, like writing policies and offer letters.",
    },
    {
      q: "When should we bring one in?",
      a: "Usually when you have 50 to 250+ people and HR is still someone’s side job. It’s also a good time before a hiring push, during an acquisition, or when you’re rolling out a new HR system.",
    },
    {
      q: "How much time do you spend with us?",
      a: "Most clients have me one to three days a week. We’ll agree on a schedule at the start and keep a short weekly check-in with one person on your side. In between, I’m reachable async in your chat and shared docs.",
    },
    {
      q: "Do you work with teams outside Ontario?",
      a: "Yes. I work remotely with teams across Canada and the US.",
    },
    {
      q: "What happens when we’re ready for a full-time HR hire?",
      a: "Then I’ll help you find the right person. I can write the job description, help run the search and hand over everything I’ve set up.",
    },
  ],
};

export const closing = {
  footer: "Based in Ontario, working with teams across Canada and the US",
};

export const contact = {
  heading: "Let’s talk about your team",
  body: "Tell me where your team is and what’s on your plate. I’ll reply by email, and if it sounds like a fit, we’ll set up a short intro call.",
  emailNote: "Prefer email?",
  messageLabel: "What would you like help with?",
  messagePlaceholder: "A few lines is plenty, e.g. we’re about to hire 15 people and don’t have an HR process yet.",
  teamSizes: ["Under 50", "50–100", "100–250", "250+"],
  // The engagement types from "Ways to work together", plus a catch-all.
  interests: ["Advisory", "Embedded (part-time HR leader)", "A defined project", "Not sure yet"],
  success: "Thanks, your message is on its way. I’ll reply by email soon, usually to suggest a time for a short intro call.",
};
