import { BtnIcons } from "../components/BtnIcons";
import { PixelIcon, type PixelIconName } from "../components/PixelIcon";
import { ClosingCTA } from "../components/ClosingCTA";

type Service = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  whatItIs: string;
  includes: string[];
  deliverable: string;
  goodFor: string;
  icon: PixelIconName;
};

const services: Service[] = [
  {
    slug: "positioning",
    eyebrow: "Service 01",
    title: "Positioning + messaging",
    lead: "Clarify what you sell, who it&rsquo;s for, and why it matters — so customers understand the value faster.",
    whatItIs:
      "A focused audit + rewrite of your core product story. The thing buyers should be able to repeat back to you in one sentence after eight seconds on your site.",
    includes: [
      "Audit of current positioning across homepage, product pages, and key flows",
      "Buyer + competitor framing — who else they&rsquo;re weighing you against",
      "New positioning statement + supporting messaging hierarchy",
      "Headline / subhead / value prop copy for the spaces where it matters most",
    ],
    deliverable:
      "A short positioning doc + ready-to-paste copy for hero, product pages, and pricing.",
    goodFor:
      "Products that have evolved past their original story, founders trying to articulate what they actually do, teams stuck in feature-list-mode.",
    icon: "megaphone",
  },
  {
    slug: "ux",
    eyebrow: "Service 02",
    title: "Ecommerce UX + conversion",
    lead: "Clean up the path from first impression to action — product pages, landing pages, flows, and decision points.",
    whatItIs:
      "An honest walk-through of where your site or product is leaking attention, trust, or buyers. Practical fixes for the screens that actually move revenue.",
    includes: [
      "Heuristic + buyer-mindset walkthrough of the live experience",
      "Prioritized list of friction points — what to fix now vs. later",
      "Reworked product page / PDP / signup / checkout flow (depending on scope)",
      "Component-level redesigns where the layout is the problem",
    ],
    deliverable:
      "A walkthrough doc, redesigned key screens (Figma), and a prioritized action list mapped to revenue impact.",
    goodFor:
      "Shopify stores leaking conversions, SaaS signup flows that lose buyers between intent and activation, anyone whose analytics show a clear drop-off.",
    icon: "cursor",
  },
  {
    slug: "ai-content",
    eyebrow: "Service 03",
    title: "AI content design",
    lead: "Use AI to create better product content, page systems, prompts, and workflows — without losing taste or clarity.",
    whatItIs:
      "Design + build of AI-assisted content systems that hold up at scale. Less &ldquo;ChatGPT wrote my homepage,&rdquo; more &ldquo;repeatable system that produces on-brand pages every week.&rdquo;",
    includes: [
      "Audit of where AI is helping vs. where it&rsquo;s adding noise",
      "Prompt + workflow design for content production (product pages, PDPs, blog, email)",
      "Page system + template design — so AI fills in the right slots, not blank canvases",
      "Editorial guardrails so the output stays recognizably yours",
    ],
    deliverable:
      "A prompt library, a content workflow doc, and templated page systems your team can run weekly.",
    goodFor:
      "Teams shipping AI-assisted content that feels generic, founders who want to scale content without scaling the content team, anyone with &ldquo;100 PDPs to write&rdquo; on their list.",
    icon: "sparkleA",
  },
  {
    slug: "strategy",
    eyebrow: "Service 04",
    title: "Product strategy",
    lead: "Decide what to fix, test, or build next — based on customer friction, business goals, and what actually moves the needle.",
    whatItIs:
      "A short engagement focused on the next 90 days. Not a deck. A clear set of decisions about where to put attention and where to stop spending it.",
    includes: [
      "Audit of current roadmap + recent shipped work",
      "Customer + business signal review — what&rsquo;s the data actually saying",
      "Prioritized next-90-days plan with rationale per bet",
      "A short list of what to stop doing (often the harder half)",
    ],
    deliverable:
      "A one-pager with the next 90 days mapped, plus a working session to debate it.",
    goodFor:
      "Teams shipping work but unclear it&rsquo;s the right work, founders managing competing priorities, leaders heading into planning season.",
    icon: "target",
  },
];

const process = [
  {
    step: "01",
    title: "Send a link or a screenshot",
    body: "Email what you&rsquo;re working on and the specific thing you can&rsquo;t see clearly yet. The messier the better — that&rsquo;s usually where the interesting work is.",
  },
  {
    step: "02",
    title: "We scope it together",
    body: "Short call to align on the actual problem, the deliverable, the timeline, and the price. You get a written scope before anything starts. No surprise invoices.",
  },
  {
    step: "03",
    title: "Two-week sprint",
    body: "Most engagements run in two-week sprints. Async reviews + a live working session. Real artifacts your team can use the day they&rsquo;re delivered.",
  },
];

const growthBlockers = [
  {
    title: "Unclear product story",
    body: "The product evolved, but the message didn't. Customers should not have to work this hard to understand it.",
  },
  {
    title: "Confusing shopping or signup flow",
    body: "People are interested, but they are not sure what to do next. That friction costs sales, signups, and trust.",
  },
  {
    title: "Too many priorities",
    body: "Everything feels urgent. Work ships, but it's unclear what is actually moving the business forward.",
  },
  {
    title: "Shaky product foundation",
    body: "The core experience is not clear enough yet. Scaling now just amplifies the friction.",
  },
];

export default function ServicesPage() {
  return (
    <div className="theme-v2 contents">

      {/* === HERO === matches homepage hero layout */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Services</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] text-[#1A191E] max-w-[18ch]">
                  What we&rsquo;ll work on together.
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[640px]">
                  Positioning, ecommerce UX, AI content design, and product
                  strategy for Shopify and ecommerce teams. Two-week sprints,
                  real artifacts, no consulting theatre.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex btn self-start"
            >
              <span className="btn-text bg-[#0E6BFF] text-white">
                Let's talk
              </span>
              <span className="btn-tab bg-[#0E6BFF] text-white">
                <BtnIcons />
              </span>
            </a>
          </div>
          <aside
            className="relative min-w-0 p-6 flex items-end justify-end divider-indent-left bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            <div className="card card-cream flex flex-col gap-2 !min-h-0 w-full md:max-w-[380px]">
              <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">
                Four services. One practice.
              </h3>
              <p className="text-base leading-[1.4] opacity-80 leading-[1.2]">
                Pick the one that fits — or send what&rsquo;s on your mind and
                we&rsquo;ll figure it out together.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* === SUMMARY GRID === */}
      <section data-section="services-summary" className="p-6 md:p-10 section-border-b">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Overview</span>
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-[#1A191E] max-w-[24ch]">
                Four lanes of work, deeply connected.
              </h2>
              <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
                Most engagements pull from more than one. The thread between
                them: making the product easier to understand, easier to use,
                and easier to sell.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="card card-blue-light flex flex-col justify-between aspect-square !min-h-0 group"
              >
                <div className="w-14 h-14 flex items-center justify-center shrink-0 !rounded-[4px] bg-[#1A191E]">
                  <PixelIcon name={s.icon} color="#ffffff" size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-display leading-[1.1] text-[#1A191E] group-hover:opacity-70 transition-opacity">
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.4] opacity-80"
                    dangerouslySetInnerHTML={{ __html: s.lead }}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === GROWTH BLOCKERS === the problems these services address */}
      <section
        id="growth"
        data-section="growth-blockers"
        className="p-6 md:p-10 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Growth blockers</span>
          <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-[#1A191E] max-w-[24ch]">
            Fix what&rsquo;s slowing growth
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 items-stretch">
          {growthBlockers.map((g) => (
            <article
              key={g.title}
              className="flex flex-col gap-2 p-6 border border-[#1A191E]/20"
            >
              <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">
                {g.title}
              </h3>
              <p className="text-base leading-[1.4] opacity-80 max-w-[480px]">
                {g.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* === DETAILED SERVICE SECTIONS === */}
      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          data-section={`service-${s.slug}`}
          className="p-6 md:p-10 section-border-b"
        >
          <div className="grid md:grid-cols-12 gap-6 md:gap-16 items-start">
            <div className="md:col-span-5 flex flex-col gap-6">
              <span className="type-eyebrow">{s.eyebrow}</span>
              <div className="flex flex-col gap-3">
                <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-[#1A191E] max-w-[16ch]">{s.title}</h2>
                <p
                  className="text-lg leading-[1.4] opacity-80 max-w-[460px]"
                  dangerouslySetInnerHTML={{ __html: s.lead }}
                />
              </div>
              {i === services.length - 1 ? null : (
                <div className="w-14 h-14 flex items-center justify-center shrink-0 !rounded-[4px] bg-[#1A191E]">
                  <PixelIcon name={s.icon} color="#ffffff" size={24} />
                </div>
              )}
            </div>
            <div className="md:col-span-7 flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">What it is</h3>
                <p
                  className="text-base leading-[1.4] opacity-80 max-w-[560px]"
                  dangerouslySetInnerHTML={{ __html: s.whatItIs }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">What&rsquo;s included</h3>
                <ul className="flex flex-col gap-3 max-w-[560px]">
                  {s.includes.map((item) => (
                    <li
                      key={item}
                      className="text-base leading-[1.4] opacity-80 flex gap-3 items-start"
                    >
                      <span
                        aria-hidden="true"
                        className="block w-1.5 h-1.5 bg-current mt-[10px] shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">Deliverable</h3>
                  <p
                    className="text-base leading-[1.4] opacity-80"
                    dangerouslySetInnerHTML={{ __html: s.deliverable }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">Good for</h3>
                  <p
                    className="text-base leading-[1.4] opacity-80"
                    dangerouslySetInnerHTML={{ __html: s.goodFor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* === PROCESS === */}
      <section data-section="services-process" className="p-6 md:p-10 section-border-b">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Process</span>
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl md:text-5xl font-display leading-[1.05] tracking-[-1px] text-[#1A191E] max-w-[24ch]">
                How a project starts.
              </h2>
              <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
                Short, written, mutual. No deck-thick proposals. Most projects
                are scoped and started in the same week.
              </p>
            </div>
          </div>
          <ol className="grid md:grid-cols-3 gap-6 md:gap-10 pt-6 border-t border-[#1A191E]/20">
            {process.map((p) => (
              <li key={p.step} className="flex flex-col gap-3.5">
                <span className="font-mono text-[11px] leading-[1.2] tracking-[0.1em] uppercase opacity-60">.{p.step}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-display leading-[1.1] text-[#1A191E]">{p.title}</h3>
                  <p
                    className="text-base leading-[1.4] opacity-80"
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* === ASK PAIGE NUDGE === */}
      <section data-section="services-ask-paige" className="p-6 md:p-10 section-border-b">
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Not ready for a project</span>
            <h2 className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-[#1A191E] max-w-[20ch]">
              Start with a single Ask Paige session.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              $250, one session. Async review of what you send, then a live
              60-minute conversation, then a short prioritized list of what
              to fix now vs. later. A cheap way to find out whether a full
              engagement makes sense.
            </p>
            <a href="/ask-paige" className="inline-flex btn self-start">
              <span className="btn-text bg-[#1A191E] text-white">
                Learn about Ask Paige
              </span>
              <span className="btn-tab bg-[#1A191E] text-white">
                <BtnIcons />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* === CLOSING CTA === */}
      <ClosingCTA
        title="Bring the part you can't see clearly yet."
        body="Send a link, a screenshot, or the half-finished idea. I'll help you find the seams, the friction, and what's worth fixing first."
      />
    </div>
  );
}
