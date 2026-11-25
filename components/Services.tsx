import { offers, site } from "@/content";
import { Button, Container, Eyebrow, Reveal, ScribbleBullet, section, sectionHeading } from "./ui";

/**
 * Services (#services): the heading, then the three offers as cards: the name, the price and time
 * on one line, a short line, three points with scribble bullets, and a button that opens the contact form with that offer picked.
 */
export function Services() {
  return (
    <section id="services" className={section}>
      <Container>
        {/* The eyebrow and heading */}
        <Reveal className="max-w-3xl">
          <Eyebrow>{offers.eyebrow}</Eyebrow>
          <h2 className={sectionHeading}>{offers.offersHeading}</h2>
        </Reveal>
        {/* The cards share a height, so their buttons line up along the bottom */}
        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14">
          {offers.items.map((o, i) => (
            <Reveal key={o.name} delay={i * 100} className={`flex flex-col border p-6 lg:p-8 ${i === 1 ? "border-accent bg-accent text-white [&_.text-accent]:text-white [&_.text-muted]:text-white/75" : "border-line bg-paper"}`}>
              {/* The name, then the price and the time on one line */}
              <p className="serif text-[clamp(22px,2vw,28px)] leading-none tracking-[-0.03em]">{o.name}</p>
              <p className="mono mt-4">{o.price}<span className="text-muted"> · {o.time}</span></p>
              <p className="mt-6">{o.body}</p>
              <ul className="mt-6 space-y-2.5">
                {o.points.map((pt, j) => (
                  <li key={pt} className="flex items-start gap-3 text-[15px] leading-snug"><ScribbleBullet variant={j} className="mt-px text-accent" />{pt}</li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Button href={site.bookingUrl} interest={o.interest} accent={i !== 1} light={i === 1}>{o.button}</Button>
              </div>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
