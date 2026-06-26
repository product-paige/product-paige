export type Playbook = {
  slug: string;
  no: string;
  title: string;
  kicker: string;
  department: string;
  year: string;
  readingTime: string;
  /** Publish date shown on the blog card (e.g. "Mar 2026") */
  date: string;
  /** Short description shown on the blog card */
  body: string;
  /** Tag chips shown on the blog card */
  chips: string[];
  /** Hero background — Tailwind arbitrary class without the bracket prefix */
  heroBg: string;
  /** Card tone class used on the home grid */
  homeTone: "card-red" | "card-blue-bright" | "card-blue-light" | "card-cream";
  chapters: string[];
  /** Map chapter title → array of paragraphs */
  chapterBodies: Record<string, string[]>;
  /** Final four-item recap list */
  takeaways: string[];
  status?: "live" | "coming-soon";
};

export const playbooks: Record<string, Playbook> = {
  "ai-predictions": {
    slug: "ai-predictions",
    no: "003",
    title: "AI predictions",
    kicker:
      "What I think will matter in AI products over the next 18 months — and what’s already noise.",
    department: "Field forecast",
    year: "2026",
    readingTime: "12 min",
    date: "Mar 4, 2026",
    body: "A running set of notes on what’s changing, what’s noise, and what still matters.",
    chips: ["trends", "products", "judgment"],
    heroBg: "#1a1a1a", // navy — feels inky / forecast-y
    homeTone: "card-red",
    status: "live",
    chapters: [
      "What we got wrong in 2025",
      "Why most AI features fail",
      "What’s actually compounding",
      "Bets for the next 18 months",
    ],
    chapterBodies: {
      "What we got wrong in 2025": [
        "Everyone assumed the moat was the model. It was never the model. It was always the data loop, the workflow it slots into, the brand people trust enough to share work with, and the defaults the product picks for you. The model was the easy part.",
        "We also assumed chat was the interface. Chat is rarely the interface. Chat is a debugger for the interface you haven’t designed yet — a way to brute-force functionality before someone sits down and decides what the actual product is supposed to do.",
      ],
      "Why most AI features fail": [
        "Most AI features fail because they answer a question the user wasn’t asking. The button gets added to the product, generates a confident-looking blob, the user nods politely, and never clicks it again. Adoption looks fine for two weeks, then trails to zero.",
        "Real adoption comes from features that compress an existing job by 80%, not features that invent a new job. If a user wouldn’t have done the task without AI, the feature doesn’t have a foothold yet — it has a curiosity moment.",
        "The test is brutally simple: does removing this feature make the product feel broken, or just less interesting?",
      ],
      "What’s actually compounding": [
        "Personalized retrieval — the model gets better the more it knows about the specific user, team, or repo. Workflow templates with real defaults — not blank prompts, not 30 settings, just the four common starting points pre-filled. Onboarding flows that learn from the user’s first three actions and adapt the second visit.",
        "Anything that gets sharper with use is compounding. Anything that stays the same regardless of usage is a demo.",
      ],
      "Bets for the next 18 months": [
        "Smaller models running locally on capable consumer hardware, mostly invisible — surfaced as faster suggestions, not as a chat button.",
        "Voice as a secondary interface for narrow, hands-busy tasks — driving, cooking, walking. Not voice as a primary interface for office work, which keeps not happening despite a decade of trying.",
        "Better defaults beating better prompts. The product that picks for you wins the user who didn’t want to learn prompt engineering.",
        "Brand trust becoming the second moat after data. Users will pick the AI product they’re willing to share private context with — which is a brand question, not a model question.",
      ],
    },
    takeaways: [
      "The model is the cheapest piece. The data loop and the defaults are the moat.",
      "Real adoption means the product feels broken without the feature.",
      "Anything that gets sharper with use is compounding. Everything else is a demo.",
      "Trust becomes the second moat. People share private context with brands, not models.",
    ],
  },

  "operate-like-a-founder": {
    slug: "operate-like-a-founder",
    no: "002",
    title: "Operate like a founder",
    kicker:
      "A lightweight operating system for builders in the AI era.",
    department: "Practice manual",
    year: "2026",
    readingTime: "16 min",
    date: "Nov 12, 2026",
    body: "Weekly habits that keep momentum without chaos. Clear decisions, fewer rabbit holes.",
    chips: ["systems", "focus", "cadence"],
    heroBg: "#cdb8e3", // sage
    homeTone: "card-blue-bright",
    status: "coming-soon",
    chapters: [
      "Why most operating systems collapse",
      "The weekly cadence",
      "Decisions you make once",
      "Building the writing habit",
    ],
    chapterBodies: {
      "Why most operating systems collapse": [
        "Most founders don’t have an operating problem. They have a clarity problem dressed up as one. The standup, the doc, the planner — they get installed in week one and abandoned by month two because nothing connects them to the actual product bet.",
        "The trick isn’t more ceremony. It’s fewer, tighter loops that match how the work actually moves.",
      ],
      "The weekly cadence": [
        "One short Monday review. One Friday write-up. Everything else is execution. The two bookend rituals exist to ask two questions — what changed, and what did we learn — and to put both on the record where you can see them six weeks later.",
      ],
      "Decisions you make once": [
        "Pricing tier shape, refund posture, support hours, who owns the homepage. These are decisions you should make once, write down, and stop relitigating in standup.",
      ],
      "Building the writing habit": [
        "Founders who write — to themselves, to their team, to no one — compound faster. Writing is the only tool that forces you to think instead of react.",
      ],
    },
    takeaways: [
      "Operating systems get installed; clarity gets earned.",
      "Two bookend rituals beat five mid-week ceremonies.",
      "Decide once. Write it down. Stop relitigating.",
      "Writing is the only tool that forces thinking.",
    ],
  },

  "the-product-compass": {
    slug: "the-product-compass",
    no: "004",
    title: "The product compass",
    kicker:
      "A living reference for messaging, UX, and what to do next.",
    department: "Frameworks / editorial",
    year: "2026",
    readingTime: "20 min",
    date: "Feb 18, 2027",
    body: "A living reference for messaging, UX decisions, and what to do next.",
    chips: ["narrative", "UX", "priorities"],
    heroBg: "#0E6BFF", // red
    homeTone: "card-blue-light",
    status: "coming-soon",
    chapters: ["Coming soon"],
    chapterBodies: {
      "Coming soon": [
        "This playbook is being assembled. Subscribe below to get the first chapter when it lands.",
      ],
    },
    takeaways: [],
  },

};

export const playbookList: Playbook[] = Object.values(playbooks);
