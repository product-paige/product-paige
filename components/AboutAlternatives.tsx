import { about, art, site } from "@/content";
import { Button, Chip, Container, Illo, Reveal, Rich, section, sectionHeading } from "./ui";

/** A small label above each option, so they can be told apart while choosing. */
function OptionLabel({ children }: { children: string }) {
  return <Chip className="mb-8 self-start text-white [--color-chip:var(--color-accent)] lg:mb-10">{children}</Chip>;
}

/** The About photo as a print: white border, deep bottom margin. */
function Print({ className = "" }: { className?: string }) {
  return (
    <figure className={`polaroid ${className}`}>
      <span className="photo-grain block aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={site.photo} alt={site.photoAlt} width={540} height={540} loading="lazy" decoding="async" className="size-full object-cover" />
      </span>
    </figure>
  );
}

/**
 * Option B, an editorial spread on the page background: the heading and a tilted print (with a
 * starburst sticker behind it) on the left; on the right the first paragraph set large in the
 * serif as a lead, the second as body text, and the facts as big serif figures under a rule.
 */
export function AboutOptionB() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <section className={section}>
      <Container className="flex flex-col">
        <OptionLabel>About · option B</OptionLabel>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className={sectionHeading}><Rich text={about.heading} /></h2>
            </Reveal>
            <Reveal className="relative mt-10 max-w-[360px] lg:mt-14">
              <Illo art={art.starburstCream} className="absolute -top-10 -right-12 w-44 rotate-12" />
              <Print className="relative -rotate-3" />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <Reveal as="p" className="serif text-[clamp(22px,2.1vw,30px)] leading-[1.25] tracking-[-0.02em]">{lead}</Reveal>
            <div className="mt-8 space-y-5 text-muted">
              {rest.map((p, i) => <Reveal as="p" key={i} delay={80}>{p}</Reveal>)}
            </div>
            <Reveal className="mt-12 grid grid-cols-1 border-t border-grid sm:grid-cols-3 lg:mt-16">
              {about.facts.map((f) => (
                <div key={f.label} className="border-b border-grid py-6 pr-4 sm:border-b-0">
                  <p className="serif text-[clamp(24px,2.2vw,32px)] leading-[1.1] tracking-[-0.03em]">{f.value}</p>
                  <p className="mt-2 text-[14px] label text-muted">{f.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Option C, a centred profile on a soft tinted panel between the inner rails: the photo in an
 * arched frame with a starburst behind it, the heading and intro centred, three stat tiles, and
 * the booking button.
 */
export function AboutOptionC() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <section className="border-t border-grid py-8 lg:py-20">
      <div className="md:px-6 lg:px-10">
        <div className="flex flex-col bg-sheet px-6 py-10 sm:px-8 md:px-10 lg:px-16 lg:py-16">
          <OptionLabel>About · option C</OptionLabel>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="relative">
              <Illo art={art.starburstBlue} className="absolute -top-8 -left-16 w-48 -rotate-12" />
              <span className="photo-grain relative block aspect-[4/5] w-[220px] overflow-hidden rounded-t-full lg:w-[260px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.photo} alt={site.photoAlt} width={540} height={540} loading="lazy" decoding="async" className="size-full object-cover" />
              </span>
            </Reveal>
            <Reveal>
              <h2 className={`${sectionHeading} mt-10`}><Rich text={about.heading} /></h2>
            </Reveal>
            <Reveal as="p" className="lede mt-6">{lead}</Reveal>
            {rest.map((p, i) => <Reveal as="p" key={i} delay={80} className="mt-4 text-muted">{p}</Reveal>)}
            <Reveal className="mt-10 grid w-full gap-3 sm:grid-cols-3">
              {about.facts.map((f) => (
                <div key={f.label} className="border border-line bg-paper px-5 py-6">
                  <p className="serif text-[clamp(22px,2vw,28px)] leading-[1.1] tracking-[-0.03em]">{f.value}</p>
                  <p className="mt-2 text-[14px] label text-muted">{f.label}</p>
                </div>
              ))}
            </Reveal>
            <Reveal className="mt-10">
              <Button href={site.bookingUrl} accent>Book an intro call</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
