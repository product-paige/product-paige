import { BtnIcons } from "../components/BtnIcons";

const contactCards = [
  {
    label: "Email",
    value: "hello@productpaige.com",
    href: "mailto:hello@productpaige.com",
    note: "Best for project inquiries, intros, and anything with a link attached.",
  },
  {
    label: "Ask Paige session",
    value: "$250 · one session",
    href: "/ask-paige",
    note: "60 minutes of focused product feedback. Async review + live call.",
  },
  {
    label: "Newsletter",
    value: "Subscribe",
    href: "/subscribe",
    note: "Prompts, templates, and short notes on product clarity and AI workflows.",
  },
];

export default function ContactPage() {
  return (
    <div className="theme-v2 contents">
      <div className="theme-v2-rails" aria-hidden="true" />

      {/* === HERO === matches homepage hero layout (50/50, image bg right) */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Contact</span>
              <div className="flex flex-col gap-3">
                <h1 className="type-display-h1 max-w-[20ch]">
                  Send the part you can&rsquo;t see clearly yet.
                </h1>
                <p className="type-leading opacity-80 max-w-[640px]">
                  A link, a screenshot, the half-finished idea — whatever&rsquo;s
                  on your mind. You&rsquo;ll hear back fast, without the
                  consulting theatre.
                </p>
              </div>
            </div>
            <a
              href="mailto:hello@productpaige.com?subject=Hello"
              className="inline-flex btn self-start"
            >
              <span className="btn-text bg-[#0E6BFF] text-white">
                Say hello
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
              <h3 className="type-card-title">
                Most replies within 48 hours.
              </h3>
              <p className="type-body opacity-80 leading-[1.2]">
                Canada · Remote. Booking Q3 2026.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* === CHANNELS === */}
      <section data-section="channels" className="p-10 section-border-b">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Channels</span>
            <div className="flex flex-col gap-3">
              <h2 className="type-display-h2 max-w-[24ch]">
                Three ways to reach me
              </h2>
              <p className="type-leading opacity-80 max-w-[560px]">
                Pick the one that fits — they all land in the same inbox.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
            {contactCards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="card card-blue-light flex flex-col gap-4 aspect-[16/11] !min-h-0 group"
              >
                <div className="flex flex-col gap-2">
                  <span className="type-eyebrow">{c.label}</span>
                  <h3 className="type-card-title group-hover:opacity-70 transition-opacity">
                    {c.value}
                  </h3>
                </div>
                <p className="type-body-sm opacity-80 mt-auto">{c.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === FIT === */}
      <section data-section="fit" className="p-10 section-border-b">
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Good fit</span>
            <h2 className="type-display-h3">
              Founders, solo builders, small product teams, teams moving fast
              and needing clarity.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <span className="type-eyebrow">Probably not</span>
            <h2 className="type-display-h3">
              Enterprise procurement, long strategy engagements, pixel-perfect
              visual reviews, &ldquo;tell us everything wrong with our business.&rdquo;
            </h2>
          </div>
        </div>
      </section>

      {/* === CLOSING CTA === */}
      <section
        data-section="closing-cta"
        className="bg-[#1A191E] text-white p-16 m-6 section-chamfer relative grain-vintage flex flex-col gap-10 items-start"
      >
        <div className="flex flex-col gap-6 max-w-[800px]">
          <span className="type-eyebrow">Send it</span>
          <div className="flex flex-col gap-3">
            <h2 className="type-display-h1 !text-white max-w-[14ch]">
              Bring the messy version.
            </h2>
            <p className="type-leading !text-white opacity-80 max-w-[560px]">
              The confusing onboarding, the homepage that almost works, the
              AI workflow held together with prompts and hope. That&rsquo;s
              usually where the interesting work starts.
            </p>
          </div>
        </div>
        <a
          href="mailto:hello@productpaige.com?subject=Hello"
          className="inline-flex btn"
        >
          <span className="btn-text bg-[#0E6BFF] text-white">
            Say hello
          </span>
          <span className="btn-tab bg-[#0E6BFF] text-white">
            <BtnIcons />
          </span>
        </a>
      </section>
    </div>
  );
}
