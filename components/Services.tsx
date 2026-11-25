import { offers, site } from "@/content";
import { Button, Container, Eyebrow, Reveal, ScribbleBullet, section, sectionHeading } from "./ui";

/** A small tick or cross before each line of the fit check. */
function Mark({ yes }: { yes: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={`mt-0.5 size-5 shrink-0 ${yes ? "text-accent" : "text-muted"}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {yes ? <path d="M4 10.5l4 4 8-9" /> : <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />}
    </svg>
  );
}

/**
 * Services (#services): the heading and who it's for with the button to get in touch, a fit check
 * (good fit, probably not) and a line for recruiters, then the three offers as cards, each with a
 * button that opens the contact form with that offer picked, a line under them, and a comparison table.
 */
export function Services() {
  return (
    <section id="services" className={section}>
      <Container>
        {/* Heading and intro, with the button on the right */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow>{offers.eyebrow}</Eyebrow>
            <h2 className={sectionHeading}>{offers.heading}</h2>
            <p className="lede mt-5 max-w-xl">{offers.intro}</p>
          </div>
          <Button href={site.bookingUrl} accent>{offers.button}</Button>
        </Reveal>

        {/* Is this you? Good fit beside probably not */}
        <Reveal className="mt-12 lg:mt-16">
          <h3 className="mono mb-5">{offers.fit.heading}</h3>
          <div className="grid border border-line md:grid-cols-2">
            {[offers.fit.good, offers.fit.not].map((col, c) => (
              <div key={col.label} className={`p-6 lg:p-8 ${c ? "border-t border-line md:border-t-0 md:border-l" : ""}`}>
                <p className="serif text-[24px] leading-tight tracking-[-0.03em]">{col.label}</p>
                <ul className="mt-5 space-y-3.5">
                  {col.items.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[16px] leading-snug"><Mark yes={c === 0} />{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-muted">{offers.hiring} <a href={`mailto:${site.email}`} className="link">{site.email}</a>.</p>
        </Reveal>

        {/* The three offers */}
        <Reveal className="mt-16 lg:mt-24">
          <h3 className="serif text-[clamp(26px,2.6vw,38px)] leading-[1.1] tracking-[-0.035em]">{offers.offersHeading}</h3>
          <p className="lede mt-4 max-w-2xl">{offers.offersIntro}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-10">
          {offers.items.map((o, i) => (
            <Reveal key={o.name} delay={i * 100} className={`flex flex-col border p-6 lg:p-8 ${i === 1 ? "border-accent bg-accent text-white [&_.text-accent]:text-white [&_.text-muted]:text-white/75" : "border-line bg-paper"}`}>
              <p className="serif text-[clamp(26px,2.4vw,34px)] leading-none tracking-[-0.035em]">{o.name}</p>
              <p className="mono mt-4 text-muted">{o.meta}</p>
              <p className="mt-5">{o.body}</p>
              <ul className="mt-5 space-y-3">
                {o.points.map((pt, j) => (
                  <li key={pt} className="flex items-start gap-3 text-[15px] leading-snug"><ScribbleBullet variant={j} className="mt-px text-accent" />{pt}</li>
                ))}
              </ul>
              {o.note && <p className="mt-5 text-[14px] text-muted">{o.note}</p>}
              <div className="mt-auto pt-8">
                <Button href={site.bookingUrl} interest={o.interest} accent={i !== 1} light={i === 1}>{o.button}</Button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="mt-6 text-muted">{offers.footnote}</Reveal>

        {/* Comparison table */}
        <Reveal className="mt-12 overflow-x-auto lg:mt-16">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[18%] border-b border-line py-4" />
                {offers.items.map((o) => (
                  <th key={o.name} scope="col" className="serif border-b border-line py-4 pr-4 text-[22px] font-normal tracking-[-0.03em]">{o.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offers.table.map(([label, ...cells]) => (
                <tr key={label}>
                  <th scope="row" className="mono border-b border-line py-4 pr-4 align-top font-normal">{label}</th>
                  {cells.map((c, i) => <td key={i} className="border-b border-line py-4 pr-4 align-top text-[16px]">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
