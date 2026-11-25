import { offers, site } from "@/content";
import { CompareTable } from "./CompareTable";
import { Tip } from "./Tip";
import { Button, Container, Eyebrow, Reveal, ScribbleBullet, section, sectionHeading } from "./ui";

/**
 * Services (#services): the heading and a line with the button to get in touch, the three offers as
 * cards (price with a tip for the detail, a line, three points, and a button that opens the contact
 * form with that offer picked), a line under them, then the comparison table.
 */
export function Services() {
  return (
    <section id="services" className={section}>
      <Container>
        {/* Heading and a line, with the button on the right */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow>{offers.eyebrow}</Eyebrow>
            <h2 className={sectionHeading}>{offers.offersHeading}</h2>
            <p className="lede mt-5 max-w-xl">{offers.offersIntro}</p>
          </div>
          <Button href={site.bookingUrl} accent>{offers.button}</Button>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14">
          {offers.items.map((o, i) => (
            <Reveal key={o.name} delay={i * 100} className={`flex flex-col border p-6 lg:p-8 ${i === 1 ? "border-accent bg-accent text-white [&_.text-accent]:text-white [&_.text-muted]:text-white/75" : "border-line bg-paper"}`}>
              <p className="serif text-[clamp(26px,2.4vw,34px)] leading-none tracking-[-0.035em]">{o.name}</p>
              {/* The price, with the detail in a tip, and the time */}
              <p className="mono mt-4 flex items-center gap-2">{o.price} <Tip text={o.tip} label={`About ${o.name}`} /></p>
              <p className="mono mt-1 text-muted">{o.time}</p>
              <p className="mt-5">{o.body}</p>
              <ul className="mt-5 space-y-3">
                {o.points.map((pt, j) => (
                  <li key={pt} className="flex items-start gap-3 text-[15px] leading-snug"><ScribbleBullet variant={j} className="mt-px text-accent" />{pt}</li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button href={site.bookingUrl} interest={o.interest} accent={i !== 1} light={i === 1}>{o.button}</Button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="mt-6 text-muted">{offers.footnote}</Reveal>

        {/* Comparison table, in the old Ways to work together style */}
        <Reveal className="mt-12 lg:mt-16">
          <CompareTable />
        </Reveal>
      </Container>
    </section>
  );
}
