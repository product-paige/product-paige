import { BtnIcons } from "../BtnIcons";
import { TearText } from "../TearText";
import { HeroFloatingCard } from "./HeroFloatingCard";
import { heroFloatingCards } from "./heroCards";

/** Homepage hero — headline + lede on the left, image collage with
 *  floating cards on the right. */
export function Hero() {
  return (
    <>
      {/* === HERO === */}
      <section
        id="hero"
        data-section="hero"
        className="min-h-[520px] md:min-h-[640px] flex section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-0 items-stretch w-full">
          <div className="flex flex-col gap-10 justify-end p-6 md:p-10 min-w-0">
            <div className="flex flex-col gap-6">
              <span className="type-eyebrow">Open to new projects</span>
              <div className="flex flex-col gap-4">
                <h1 className="text-display font-display text-ink max-w-[20ch]">
                  <TearText>{"Multidisciplinary\nproduct marketer\n& designer"}</TearText>
                </h1>
                <p className="text-lg leading-[1.4] opacity-80 max-w-[640px]">
                  I help DTC brands, app makers, and ecommerce SaaS teams
                  sharpen positioning, clean up the customer experience, and
                  make products people actually understand.
                </p>
              </div>
            </div>
          </div>
          <aside
            className="relative min-w-0 p-6 flex items-end justify-end divider-indent-left bg-cover bg-center overflow-hidden section-border-b"
            style={{ backgroundImage: "url('/hero-alt-2.jpg')" }}
          >
            {/* Floating cards — layered over the bg image, clipped to the
                column via overflow-hidden. Desktop only. */}
            <div
              className="inset-0 hidden lg:block"
              style={{ position: "absolute", pointerEvents: "none" }}
              aria-hidden="true"
            >
              {heroFloatingCards.map((c) => (
                <HeroFloatingCard key={c.card.title} {...c} />
              ))}
            </div>
            <div className="relative card card-sm card-cream flex flex-col gap-3 !min-h-0 w-full md:w-[260px] md:max-w-[260px] md:aspect-square">
              <h3 className="text-xl font-display leading-[1.1] text-ink">
                Hi, I&rsquo;m Paige
              </h3>
              <p className="text-base leading-[1.25] opacity-80">
                13 years across Shopify, ecommerce, and product-led SaaS —
                plus two brands built from scratch.
              </p>
              <a
                href="/about"
                className="inline-flex btn self-start mt-auto"
              >
                <span className="btn-text bg-[#1A191E] text-white">
                  About me
                </span>
                <span className="btn-tab bg-[#1A191E] text-white">
                  <BtnIcons />
                </span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
