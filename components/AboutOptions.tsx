import { about, site } from "@/content";
import { Container, Reveal, Rich, section, sectionHeading } from "./ui";

// Three About layouts to compare on the homepage. Keep one, delete the others (and their
// CSS under "About options" in globals.css).

function OptionLabel({ children }: { children: string }) {
  return <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.08em] text-accent">{children}</p>;
}

/** The About photo with grain. `className` sizes it. */
function Photo({ className = "" }: { className?: string }) {
  return (
    <span className={`photo-grain block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={site.photo} alt={site.photoAlt} loading="lazy" decoding="async" className="size-full object-cover" />
    </span>
  );
}

const caption = `${site.name} · ${site.role}`;

/** Option A: a taped, tilted Polaroid with a handwritten caption; facts on small folded cards. */
export function AboutPolaroid() {
  return (
    <section className={section}>
      <Container className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-[420px] lg:mx-0">
          <figure className="polaroid">
            <i aria-hidden className="tape" />
            <Photo className="aspect-[4/5]" />
            <figcaption className="font-hand mt-4 text-center text-[24px] leading-tight lg:text-[26px]">{caption}</figcaption>
          </figure>
        </Reveal>
        <div>
          <Reveal>
            <OptionLabel>Option A · Polaroid</OptionLabel>
            <h2 className={`${sectionHeading} mb-8`}><Rich text={about.heading} /></h2>
          </Reveal>
          <div className="lede space-y-5">
            {about.paragraphs.map((p, i) => <Reveal as="p" key={i} delay={i * 80}>{p}</Reveal>)}
          </div>
          <Reveal className="mt-10 grid gap-3 sm:grid-cols-3">
            {about.facts.map((f) => (
              <div key={f.label} className="folded paper-grain bg-scrap p-4 pr-6">
                <p className="mb-1 text-[13px] label text-muted">{f.label}</p>
                <p className="serif text-[18px] leading-snug">{f.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Option B: one grey paper folder with an About tab; photo left, text right, facts as a typed record. */
export function AboutFile() {
  return (
    <section className={section}>
      <Container>
        <Reveal>
          <OptionLabel>Option B · Case file</OptionLabel>
          <div className="folder flex flex-col">
            <span className="folder-tab self-start text-[14px] font-medium">About</span>
            <div className="folder-body grid gap-8 p-5 md:grid-cols-[2fr_3fr] md:gap-10 lg:p-10">
              <Photo className="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[420px]" />
              <div className="flex flex-col">
                <h2 className={`${sectionHeading} mb-6`}><Rich text={about.heading} /></h2>
                <div className="space-y-4">
                  {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <dl className="mt-8 space-y-3 lg:mt-auto lg:pt-10">
                  {about.facts.map((f) => (
                    <div key={f.label} className="leader flex items-baseline gap-3">
                      <dt className="shrink-0 text-[13px] label text-muted">{f.label}</dt>
                      <dd className="serif shrink-0 text-[18px] leading-snug">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Option C: the first paragraph as a large opening statement, a wide photo strip, then the rest. */
export function AboutEditorial() {
  const [first, ...rest] = about.paragraphs;
  return (
    <section className={section}>
      <Container>
        <Reveal>
          <OptionLabel>Option C · Editorial</OptionLabel>
          <h2 className="text-[15px] label text-muted"><Rich text={about.heading} /></h2>
          <p className="serif mt-5 max-w-5xl text-[clamp(26px,3.2vw,44px)] leading-[1.15] text-balance">{first}</p>
        </Reveal>
        <Reveal className="relative mt-10 lg:mt-14">
          <Photo className="aspect-[4/3] md:aspect-[21/9]" />
          <p className="font-hand absolute bottom-4 left-5 z-1 -rotate-2 text-[24px] text-white drop-shadow lg:bottom-6 lg:left-8 lg:text-[30px]">{caption}</p>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal as="dl" className="border-t border-line">
            {about.facts.map((f) => (
              <div key={f.label} className="border-b border-line py-4">
                <dt className="mb-1 text-[13px] label text-muted">{f.label}</dt>
                <dd className="serif text-[18px] leading-snug lg:text-[20px]">{f.value}</dd>
              </div>
            ))}
          </Reveal>
          <div className="lede space-y-5">
            {rest.map((p, i) => <Reveal as="p" key={i} delay={i * 80}>{p}</Reveal>)}
          </div>
        </div>
      </Container>
    </section>
  );
}
