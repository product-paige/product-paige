import { offers, site } from "@/content";
import { Deliverables } from "./Deliverables";
import { Tip } from "./Tip";
import { Button, Container, Eyebrow, Reveal, ScribbleBullet, section, sectionHeading } from "./ui";

/**
 * Services (#services): the heading and a line with the button to get in touch, then the three offers
 * as cards: the name with the price top right (a tip with the detail), the time, what it's best for,
 * one line, three points, example deliverables behind a dropdown, and a button that opens the contact
 * form with that offer picked.
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
        {/* items-start: opening one card's deliverables grows only that card, not the whole row */}
        <div className="mt-10 grid items-start gap-4 md:grid-cols-3 lg:mt-14">
          {offers.items.map((o, i) => (
            <Reveal key={o.name} delay={i * 100} className={`flex flex-col border p-6 lg:p-8 ${i === 1 ? "border-accent bg-accent text-white [&_.text-accent]:text-white [&_.text-muted]:text-white/75" : "border-line bg-paper"}`}>
              {/* The name, with the price (and a tip with the detail) top right, then the time */}
              <div className="flex items-start justify-between gap-4">
                <p className="serif text-[clamp(22px,2vw,28px)] leading-none tracking-[-0.03em]">{o.name}</p>
                <p className="mono flex shrink-0 items-center gap-2">{o.price} <Tip text={o.tip} label={`About ${o.name}`} /></p>
              </div>
              <p className="mono mt-3 text-muted">{o.time}</p>
              <p className="mt-4 text-[14px]"><span className="text-muted">{offers.bestForLabel}:</span> {o.bestFor}</p>
              <p className="mt-5">{o.body}</p>
              <ul className="mt-5 space-y-3">
                {o.points.map((pt, j) => (
                  <li key={pt} className="flex items-start gap-3 text-[15px] leading-snug"><ScribbleBullet variant={j} className="mt-px text-accent" />{pt}</li>
                ))}
              </ul>
              <Deliverables items={o.deliverables} />
              <div className="mt-auto pt-8">
                <Button href={site.bookingUrl} interest={o.interest} accent={i !== 1} light={i === 1}>{o.button}</Button>
              </div>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
