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
    <div className={`photo-grain grid place-items-center bg-scrap text-[14px] text-muted ${className}`}>
      {label}
    </div>
  );
}

/**
 * Alternative hero, laid out like an editorial spread: the headline is broken across a
 * 12-column grid and wraps around image placeholders (an arched photo, a small print and an
 * oval). Phones get the plain stack: arched photo, headline, intro.
 */
export function EditorialHero() {
  // On desktop each phrase of the headline is its own grid item (the h1 is display: contents).
  const line = "block lg:whitespace-nowrap";
  return (
    <section className="relative z-1 border-t border-grid">
      <Container className="paper-grain bg-paper py-10 lg:py-16">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-2">
          <div className="relative lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <Asterisk className="absolute -top-4 -left-3 z-1 size-9 lg:-top-5 lg:-left-5 lg:size-11" />
            <Placeholder label="Image" className="aspect-[4/3] rounded-tl-[120px] rounded-tr-[6px] rounded-b-[6px] lg:h-full lg:aspect-auto lg:min-h-[340px]" />
          </div>

          <h1 className="serif text-[clamp(44px,6.4vw,92px)] leading-[0.95] tracking-[-0.02em] lg:contents">
            <span className={`${line} lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:self-start`}>Product, design </span>
            <span className={`${line} lg:col-span-4 lg:col-start-6 lg:row-start-2 lg:self-start`}>& build </span>
            <span className={`${line} lg:col-span-5 lg:col-start-8 lg:row-start-3 lg:self-end lg:text-right`}>support for </span>
            <span className={`${line} lg:col-span-4 lg:col-start-1 lg:row-start-4 lg:self-end`}>Shopify </span>
            <span className={`${line} lg:col-span-5 lg:col-start-8 lg:row-start-4 lg:self-end lg:text-right`}>teams</span>
          </h1>

          <Placeholder label="Image" className="hidden rounded-[6px] lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:grid lg:aspect-[4/3] lg:self-center" />
          <Placeholder label="Image" className="hidden rounded-[50%] lg:col-span-3 lg:col-start-5 lg:row-span-2 lg:row-start-3 lg:grid lg:aspect-[4/5] lg:self-end" />

          <div className="flex flex-col gap-4 border-t border-line pt-5 lg:col-span-12 lg:row-start-5 lg:mt-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xl">{hero.lede}</p>
            <p className="flex items-center gap-3 text-[14px] font-medium tracking-[0.08em] uppercase">
              <Asterisk className="size-5" />
              {site.logo}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
