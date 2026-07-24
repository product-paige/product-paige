import { BtnIcons } from "../components/BtnIcons";
import { PixelIcon, type PixelIconName } from "../components/PixelIcon";
import { IconCard } from "../components/IconCard";

type Service = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
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
    lead: "The one sentence buyers can repeat after eight seconds on your site.",
    includes: [
      "Audit of current positioning across homepage, product pages, and key flows",
      "Buyer + competitor framing — who else they&rsquo;re weighing you against",
      "New positioning statement + supporting messaging hierarchy",
      "Ready-to-paste hero, product, and pricing copy",
    ],
    deliverable:
      "A short positioning doc + copy for the pages that carry the story.",
    goodFor:
      "Products that outgrew their original story. Founders stuck in feature-list mode.",
    icon: "megaphone",
  },
  {
    slug: "ux",
    eyebrow: "Service 02",
    title: "Ecommerce UX + conversion",
    lead: "Fix the screens between interest and revenue — PDPs, checkouts, signup flows.",
    includes: [
      "Heuristic + buyer-mindset walkthrough of the live experience",
      "Prioritized list of friction points — what to fix now vs. later",
      "Redesigned key screens (PDP, signup, or checkout — scoped to you)",
      "Component-level rework where the layout is the problem",
    ],
    deliverable:
      "Redesigned Figma screens + a prioritized action list mapped to revenue impact.",
    goodFor:
      "Shopify stores leaking conversion. SaaS signup flows losing intent-to-activate.",
    icon: "cursor",
  },
  {
    slug: "ai-content",
    eyebrow: "Service 03",
    title: "AI content design",
    lead: "AI-assisted content systems that scale without sounding generic.",
    includes: [
      "Audit of where AI is helping vs. adding noise",
      "Prompt + workflow design for product pages, PDPs, blog, and email",
      "Page templates so AI fills the right slots — not blank canvases",
      "Editorial guardrails so the output stays recognizably yours",
    ],
    deliverable:
      "A prompt library, a content workflow doc, and templated page systems your team can run weekly.",
    goodFor:
      "Teams shipping AI content that reads generic. Anyone with &ldquo;100 PDPs to write&rdquo; on their list.",
    icon: "sparkleA",
  },
  {
    slug: "strategy",
    eyebrow: "Service 04",
    title: "Product strategy",
    lead: "Decide what to build next — grounded in customer signal, not opinion.",
    includes: [
      "Audit of current roadmap + recent shipped work",
      "Customer + business signal review — what the data is actually saying",
      "Prioritized next-90-days plan with rationale per bet",
      "A short list of what to stop doing (often the harder half)",
    ],
    deliverable:
      "A one-pager mapping the next 90 days + a working session to pressure-test it.",
    goodFor:
      "Teams shipping fast but unclear it&rsquo;s the right work. Leaders heading into planning season.",
    icon: "target",
  },
];

const process = [
  {
    step: "01",
    title: "Send a link or a screenshot",
    body: "Email what you&rsquo;re working on and the thing you can&rsquo;t see clearly. Messier the better.",
  },
  {
    step: "02",
    title: "We scope it together",
    body: "Short call to align on the problem, deliverable, timeline, and price. Written scope before anything starts. No surprise invoices.",
  },
  {
    step: "03",
    title: "Two-week sprint",
    body: "Async reviews + a live working session. Real artifacts your team can use the day they&rsquo;re delivered.",
  },
];

const growthBlockers = [
  {
    title: "Unclear product story",
    body: "The product evolved, the message didn&rsquo;t. Buyers should not have to work this hard to understand it.",
  },
  {
    title: "Confusing shopping or signup flow",
    body: "People are interested but they aren&rsquo;t sure what to do next. That friction costs sales, signups, and trust.",
  },
  {
    title: "Too many priorities",
    body: "Everything feels urgent. Work ships, but it&rsquo;s unclear what is actually moving the business forward.",
  },
  {
    title: "Shaky product foundation",
    body: "The core experience isn&rsquo;t clear yet. Scaling now just amplifies the friction.",
  },
];

export default function ServicesPage() {
  return (
    <div className="theme contents">

      {/* === HERO === Ask Paige callout occupies the right yellow card,
          replacing the old ClosingCTA at the bottom of the page. */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[520px] md:min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Services</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-display font-display text-ink max-w-[18ch]">
                  Fix what&rsquo;s slowing the product down
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[640px]">
                  Positioning, ecommerce UX, AI content, and product strategy
                  for Shopify and ecommerce teams. Two-week sprints, real
                  artifacts, no consulting theatre.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex btn self-start"
            >
              <span className="btn-text bg-[#0E6BFF] text-white">
                Let&rsquo;s talk
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
            <div
              className="card card-sm is-static !min-h-0 w-full md:max-w-[380px] flex flex-col gap-3"
              style={{ backgroundColor: "#f3eb88" }}
            >
              <h3 className="text-2xl font-display leading-[1.1] text-ink">
                Not ready for a full project?
              </h3>
              <p className="text-base leading-[1.4] text-ink/80">
                Get one focused hour with me for $250 — async review before
                the call, a prioritized list after.
              </p>
              <a href="/ask-paige" className="inline-flex btn self-start mt-2">
                <span className="btn-text bg-[#1A191E] text-white">
                  Ask Paige
                </span>
                <span className="btn-tab bg-[#1A191E] text-white">
                  <BtnIcons />
                </span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* === GROWTH BLOCKERS === surfaced right after the hero so the
          page opens with pain resonance, not a features grid. */}
      <section
        id="growth"
        data-section="growth-blockers"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Where teams get stuck</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-section font-display text-ink max-w-[22ch]">
              The problems worth solving
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Most engagements start with one of these. The work below is how
              I unstick it — quickly, and in a way your team can carry forward.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 items-stretch">
          {growthBlockers.map((g) => (
            <article
              key={g.title}
              className="flex flex-col gap-2 p-6 border border-[#1A191E]/60"
            >
              <h3 className="text-xl font-display leading-[1.1] text-ink">
                {g.title}
              </h3>
              <p
                className="text-base leading-[1.4] opacity-80 max-w-[480px]"
                dangerouslySetInnerHTML={{ __html: g.body }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* === SUMMARY GRID === four services at a glance, jump-links to
          detailed sections below. */}
      <section
        data-section="services-summary"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10 section-border-b"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">The work</span>
          <h2 className="text-section font-display text-ink max-w-[22ch]">
            How I unstick them
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {services.map((s) => (
            <IconCard
              key={s.slug}
              name={s.title}
              blurb={s.lead}
              icon={s.icon}
              href={`#${s.slug}`}
            />
          ))}
        </div>
      </section>

      {/* === DETAILED SERVICE SECTIONS === compressed vs. the earlier
          version: dropped the redundant "What it is" prose so scanability
          wins. Left column: title + lead. Right column: includes,
          deliverable, and who it&rsquo;s for. */}
      {services.map((s) => (
        <section
          key={s.slug}
          id={s.slug}
          data-section={`service-${s.slug}`}
          className="p-6 md:px-10 md:py-16 section-border-b"
        >
          <div className="flex">
            <span
              className="folder-tab"
              style={{ backgroundColor: "#DBE6EB", color: "#1A191E" }}
            >
              {s.eyebrow}
            </span>
          </div>
          <article className="card card-blue-light is-static !min-h-0 w-full !p-16">
            <div className="grid md:grid-cols-12 gap-6 md:gap-16 items-start w-full">
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl md:text-4xl font-display leading-[1.05] tracking-[-1px] text-ink max-w-[16ch]">
                    {s.title}
                  </h2>
                  <p
                    className="text-lg leading-[1.4] opacity-80 max-w-[460px]"
                    dangerouslySetInnerHTML={{ __html: s.lead }}
                  />
                </div>
              </div>
              <div className="md:col-span-7 flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl">What&rsquo;s included</h3>
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
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl">Deliverable</h3>
                    <p
                      className="text-base leading-[1.4] opacity-80"
                      dangerouslySetInnerHTML={{ __html: s.deliverable }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl">Good for</h3>
                    <p
                      className="text-base leading-[1.4] opacity-80"
                      dangerouslySetInnerHTML={{ __html: s.goodFor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      ))}

      {/* === PROCESS === last section on the page, no bottom border. */}
      <section
        data-section="services-process"
        className="p-6 md:px-10 md:py-16 flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <span className="type-eyebrow">Process</span>
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-section font-display text-ink max-w-[22ch]">
              How a project starts
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Short, written, mutual. No deck-thick proposals. Most projects
              are scoped and started in the same week.
            </p>
          </div>
        </div>
        <ol className="grid md:grid-cols-3 gap-6 md:gap-10">
          {process.map((p) => (
            <li key={p.step} className="flex flex-col gap-3.5">
              <span className="font-mono text-[11px] leading-[1.2] tracking-[0.1em] uppercase opacity-60">
                {p.step}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-display leading-[1.1] text-ink">
                  {p.title}
                </h3>
                <p
                  className="text-base leading-[1.4] opacity-80"
                  dangerouslySetInnerHTML={{ __html: p.body }}
                />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
