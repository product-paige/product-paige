import { offers, site } from "@/content";
import { Button, Container, Eyebrow, Reveal, ScribbleBullet, itemTitle, section, sectionHeading } from "./ui";

/**
 * Services (#services): the heading, then the three offers as folders: the price on the tab, then the
 * name and the time, a short line, three points with scribble bullets, and a button that opens the contact form with that offer picked.
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
            // Each offer as a folder: a tab with the price on top, the folder body below it
            <Reveal key={o.name} delay={i * 100} className={`flex flex-col ${i === 1 ? "text-white [&_.text-accent]:text-white [&_.text-muted]:text-white/75" : ""}`}>
              {/* The tab, overlapping the body's top edge by a pixel so they read as one shape */}
              <p className={`mono relative z-1 -mb-px self-start rounded-t-[10px] border border-b-0 px-5 pt-3 pb-2.5 ${i === 1 ? "border-accent bg-accent" : "border-line bg-paper"}`}>{o.price}</p>
              <div className={`flex flex-1 flex-col rounded-[10px] rounded-tl-none border p-6 lg:p-8 ${i === 1 ? "border-accent bg-accent" : "border-line bg-paper"}`}>
                {/* The name, then the time */}
                <p className={`${itemTitle} leading-none`}>{o.name}</p>
                <p className="mono mt-4 text-muted">{o.time}</p>
                <p className="copy mt-6">{o.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {o.points.map((pt, j) => (
                    <li key={pt} className="copy flex items-start gap-3"><ScribbleBullet variant={j} className="mt-px text-accent" />{pt}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <Button href={site.bookingUrl} interest={o.interest} accent={i !== 1} light={i === 1}>{o.button}</Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
