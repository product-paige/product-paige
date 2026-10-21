import { hero, site } from "@/content";
import { Container } from "./ui";

/** A bold six-armed asterisk, as on printed ephemera. */
function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round">
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    </svg>
  );
}

/** An image placeholder: a grey sheet with a small label, until real photos go in. */
function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`photo-grain grid place-items-center bg-scrap text-muted ${className}`}>
      <span className="font-sans text-[14px]">{label}</span>
    </div>
  );
}

/**
 * Alternative hero, laid out like an editorial spread: the headline is broken across a
 * 12-column grid and wraps around image placeholders (an arched photo, a small print and an
 * oval). On desktop the type is sized to the width of the grid (8cqw), so each phrase fills its
 * columns at any screen size, and the images take their height from the lines of text beside
 * them (sized in em of the same type). Phones get the plain stack: arched photo, headline, intro.
 */
export function EditorialHero() {
  // On desktop each phrase of the headline is its own grid item (the h1 is display: contents).
  const line = "block lg:whitespace-nowrap";
  const type = "lg:text-[8cqw]";
  return (
    <section className="relative z-1 border-t border-grid">
      <Container className="paper-grain bg-paper py-10 lg:py-14">
        <div className="@container">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
            {/* Arched photo, two lines of type tall, beside "Product, design / & build" */}
            <div className={`relative lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 ${type}`}>
              <Asterisk className="absolute -top-4 -left-3 z-1 size-9 lg:-top-5 lg:-left-5 lg:size-11" />
              <Placeholder label="Image" className="aspect-[4/3] rounded-tl-[120px] rounded-tr-[6px] rounded-b-[6px] lg:aspect-auto lg:h-[2.3em] lg:rounded-tl-[1.4em]" />
            </div>

            <h1 className={`serif text-[clamp(44px,11vw,72px)] leading-[0.95] tracking-[-0.02em] lg:contents`}>
              <span className={`${line} ${type} lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-start`}>Product, design </span>
              <span className={`${line} ${type} lg:col-span-4 lg:col-start-6 lg:row-start-2 lg:self-end`}>& build </span>
              <span className={`${line} ${type} lg:col-span-5 lg:col-start-1 lg:row-start-3 lg:mt-[0.2em] lg:self-start`}>for Shopify </span>
              <span className={`${line} ${type} lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:mt-[0.2em] lg:self-start lg:text-right`}>teams</span>
            </h1>

            {/* Small print beside "& build", and an oval between "for Shopify" and "teams" */}
            <Placeholder label="Image" className="hidden rounded-[6px] lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:mb-[0.12em] lg:grid lg:h-[0.85em] lg:self-end lg:text-[8cqw]" />
            <Placeholder label="Image" className="hidden rounded-[50%] lg:col-span-2 lg:col-start-6 lg:row-span-2 lg:row-start-3 lg:mt-[0.2em] lg:grid lg:h-[1.9em] lg:text-[8cqw]" />

            {/* Intro under "for Shopify", beside the oval */}
            <p className="max-w-md lg:col-span-5 lg:col-start-1 lg:row-start-4 lg:mt-4 lg:self-start">{hero.lede}</p>

            <p className="flex items-center gap-3 border-t border-line pt-5 text-[14px] font-medium tracking-[0.08em] uppercase lg:col-span-12 lg:row-start-5 lg:mt-8 lg:justify-end">
              <Asterisk className="size-5" />
              {site.logo}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
