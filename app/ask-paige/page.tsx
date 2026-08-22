import { BtnIcons } from "../components/BtnIcons";
import { Reveal } from "../components/Reveal";
import { HowItWorks } from "../components/ask-paige/HowItWorks";
import { ClosingCTA } from "../components/ClosingCTA";
import { type PixelIconName } from "../components/PixelIcon";

const useCases: Array<{
  name: string;
  blurb: string;
  icon: PixelIconName;
}> = [
  {
    name: "Product feedback",
    blurb: "Something feels off but hard to name. Great place to start.",
    icon: "cursor",
  },
  {
    name: "UX review",
    blurb: "Onboarding, navigation, the drop-off moments quietly costing users.",
    icon: "target",
  },
  {
    name: "Homepage critique",
    blurb: "Messaging, structure, whether a stranger gets it in three seconds.",
    icon: "browser",
  },
  {
    name: "AI-built products",
    blurb: "Vibe-coded or AI-assisted. What&rsquo;s real, what&rsquo;s noise, what needs product thinking.",
    icon: "sparkleA",
  },
  {
    name: "Product clarity",
    blurb: "What it does, who it&rsquo;s for, where the story is getting muddy.",
    icon: "megaphone",
  },
  {
    name: "SaaS + product-led tools",
    blurb: "Especially software people actually pay for and rely on.",
    icon: "door",
  },
];

export default function AskPaigePage() {
  return (
    <div className="theme contents">

      {/* === HERO === matches homepage hero layout */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[520px] md:min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Ask Paige</span>
              <div className="flex flex-col gap-3">
                <h1 className="text-display font-display text-ink max-w-[20ch]">
                  One focused hour on what you&rsquo;re building
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
                  Send what you&rsquo;re building. A product, an onboarding
                  flow, a homepage, positioning, or the half-formed idea. You
                  get honest, product-minded feedback in a single session.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="/contact?topic=ask-paige"
                className="inline-flex btn"
              >
                <span className="btn-text bg-[#0E6BFF] text-white">
                  Book a session
                </span>
                <span className="btn-tab bg-[#0E6BFF] text-white">
                  <BtnIcons />
                </span>
              </a>
              <span className="text-xl font-display leading-[1.1] text-ink flex items-baseline gap-2">
                $250 USD
                <span className="text-sm leading-[1.4] opacity-60">· one session</span>
              </span>
            </div>
          </div>
          <aside
            className="relative min-w-0 p-6 flex items-end justify-end divider-indent-left bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg-2.webp')" }}
          >
            <div className="card card-sm card-cream flex flex-col gap-2 !min-h-0 w-full md:max-w-[380px]">
              <h3 className="text-xl font-display leading-[1.1] text-ink">
                One focused hour
              </h3>
              <p className="text-base leading-[1.2] opacity-80">
                Bring the product, the questions, the half-thoughts.
              </p>
            </div>
          </aside>
        </div>
      </section>

      
      {/* === SECTION: use-cases === */}
      <section id="use-cases" data-section="use-cases" className="p-6 md:p-10 flex flex-col gap-10 section-border-b">
        <div className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
            <h2 className="text-section font-display text-ink max-w-[20ch]">
              Common places sessions start
            </h2>
            <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
              Most sessions land in one of these. Not sure which fits? Send
              what you&rsquo;re working on and we&rsquo;ll figure it out.
            </p>
          </div>
        </div>
        <Reveal>
          {/* Minimal list rather than filled icon cards — the page reads
              quieter and the copy carries it. */}
          <ul className="grid sm:grid-cols-2 gap-x-10 border-t border-[#1a1a1a]/20">
            {useCases.map((u) => (
              <li
                key={u.name}
                className="flex flex-col gap-1 py-5 border-b border-[#1a1a1a]/20"
              >
                <h3 className="text-xl leading-[1.2] text-ink">{u.name}</h3>
                <p
                  className="text-base leading-[1.4] opacity-70 max-w-[420px]"
                  dangerouslySetInnerHTML={{ __html: u.blurb }}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      
      <HowItWorks />

      
      {/* === SECTION: fit-check === split into two columns */}
      <section
        data-section="fit-check"
        className="p-6 md:p-10 section-border-b flex flex-col gap-10"
      >
        <h2 className="text-section font-display text-ink max-w-[20ch]">
          A quick fit check
        </h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Great fit for</h3>
            <p className="text-base leading-[1.4] opacity-80 max-w-[420px]">
              Founders, solo builders, small product teams, teams moving
              fast and needing clarity.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Probably not a fit for</h3>
            <p className="text-base leading-[1.4] opacity-80 max-w-[420px]">
              Enterprise procurement, long strategy engagements, &ldquo;tell
              us everything wrong with our business,&rdquo; pixel-perfect
              visual design reviews.
            </p>
          </div>
        </div>
        <p className="text-sm leading-[1.4] opacity-60">
          Saying it out loud saves both of us a week.
        </p>
      </section>

      <ClosingCTA
        title="Ready when you are."
        body="Send whatever's on your mind. I'll come back with what stands out and where to shape it next."
        ctaLabel="Book Ask Paige"
        ctaHref="/contact?topic=ask-paige"
      />
    </div>
  );
}
