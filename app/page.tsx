import {
  about, approach, art, contact, models, services, site, testimonials,
} from "@/content";
import { ContactForm } from "@/components/ContactForm";
import { EditorialHero } from "@/components/EditorialHero";
import { FaqSection } from "@/components/FaqSection";
import { Phases } from "@/components/Phases";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { TimelineProgress } from "@/components/TimelineProgress";
import { WhoIWorkWith } from "@/components/WhoIWorkWith";
import {
  Button, Chip, Container, Illo, Reveal, Rich, SectionHead, cardTitle, listTitle, section, sectionHeading,
} from "@/components/ui";

// Hover lift shared by every card.
const lift = "transition hover:-translate-y-1";
// Testimonial card colours, in turn.
const quoteTones = ["bg-sky", "bg-butter", "bg-sage"];
// Where each tool tile sits beside the About photo, scattered around it.
const toolSpots = [
  "top-[12%] left-[5%] -rotate-12",
  "top-[48%] left-[6%] rotate-6",
  "top-[30%] right-[5%] rotate-[14deg]",
];

export default function Home() {
  return (
    <>
      <PageRails />
      <SiteHeader />

      <main id="top">
        <EditorialHero />

        {/* About: two columns. Left, the heading, one paragraph in the serif on who I am
            and how I work, and the booking button. Right, the photo as a tilted
            print with tool tiles and the basket around it. */}
        <section id="about" className={`${section} overflow-x-clip`}>
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <h2 className={sectionHeading}><Rich text={about.heading} /></h2>
              </Reveal>
              <Reveal as="p" delay={60} className="serif mt-5 max-w-xl text-[clamp(22px,2vw,28px)] leading-[1.2] tracking-[-0.03em] lg:mt-6">{about.body}</Reveal>
              <Reveal className="mt-8 lg:mt-10">
                <Button href={site.bookingUrl} accent>Book an intro call</Button>
              </Reveal>
            </div>

            {/* The photo, tool tiles and basket, laid out in a square that fills the column. */}
            <Reveal className="relative">
              <div className="relative aspect-square">
                <figure className="absolute top-[10%] left-1/2 w-[58%] -translate-x-1/2 -rotate-3 bg-white p-3 pb-5 shadow-[0_1px_0_rgb(0_0_0/0.06),0_16px_36px_rgb(26_26_26/0.14)]">
                  <span className="photo-grain block aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={site.photo} alt={site.photoAlt} width={540} height={675} loading="lazy" decoding="async" className="size-full object-cover" />
                  </span>
                </figure>
                <Illo art={art.basket} className="absolute bottom-[2%] left-[2%] w-[30%] -rotate-[10deg]" />
                {/* The tools, as little tiles stuck down at odd angles around the board */}
                <ul aria-label="Tools I use">
                  {about.tools.map((t, i) => (
                    <li key={t.name} className={`absolute grid size-12 place-items-center rounded-[10px] bg-white shadow-[0_1px_0_rgb(0_0_0/0.06),0_8px_18px_rgb(26_26_26/0.12)] lg:size-16 ${toolSpots[i % toolSpots.length]}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.logo} alt={t.name} width={32} height={32} loading="lazy" className="size-6 lg:size-8" />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Recent projects */}
        <RecentProjects className={section} />


        {/* Audiences (shared with /approach) */}
        <WhoIWorkWith link />

        {/* Services */}
        {/* No bottom padding: the last row's rule meets the next section's. */}
        <section id="services" className="border-t border-grid pt-8 lg:pt-20">
          <Container>
            <Reveal className="mb-8 lg:mb-12">
              <h2 className={sectionHeading}><Rich text={services.heading} /></h2>
            </Reveal>
            <Phases topBorder />
          </Container>
        </section>

        {/* Engagement models */}
        <section id="pricing" className={section}>
          <Container>
            <SectionHead heading={models.heading} />
            <div className="grid gap-3 lg:grid-cols-3">
              {models.items.map((m, i) => (
                <Reveal key={m.tag} delay={i * 120}>
                  {/* Hover lives on this inner layer so it doesn't fight the reveal's transition. */}
                  <div
                    className={`flex h-full flex-col gap-5 border p-6 ${lift} lg:p-8 ${m.featured ? "border-dark bg-dark text-white" : "border-line bg-surface"}`}
                  >
                    <Chip className={`self-start ${m.featured ? "bg-white/10" : ""}`}>{m.tag}</Chip>
                    <h3 className={cardTitle}>{m.title}</h3>
                    <p className={m.featured ? "text-white/60" : "text-muted"}>{m.body}</p>
                    <div className="mt-auto pt-8 lg:pt-12">
                      <p className={`text-sm label ${m.featured ? "text-white/60" : "text-muted"}`}>Starting at</p>
                      <p className="mt-1 flex items-baseline gap-1.5">
                        <span className={`serif text-[28px] leading-none ${models.pricePlaceholder ? "opacity-40" : ""}`}>{m.price}</span>
                        <span className={m.featured ? "text-white/60" : "text-muted"}>{models.currency} {m.per}</span>
                      </p>
                    </div>
                    <ul className={`divide-y border-t ${m.featured ? "divide-line-dark border-line-dark" : "divide-line border-line"}`}>
                      {m.points.map((p) => <li key={p} className="py-2.5">{p}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8 flex justify-center lg:mt-12">
              <Button href={site.bookingUrl} accent>Book an intro call</Button>
            </Reveal>
          </Container>
        </section>

        {/* Approach */}
        <section id="approach" className={section}>
          <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-32">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className={sectionHeading}><Rich text={approach.heading} /></h2>
              <p className="lede mt-5 max-w-xl">{approach.body}</p>
            </Reveal>
            {/* Vertical timeline: a grey track down the left that fills in as you scroll, with a dot per step
                (grey and small until the line reaches it, then accent red). */}
            <ol className="relative grid gap-12 lg:gap-16 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-px before:bg-line before:content-['']">
              <TimelineProgress />
              {approach.steps.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 120} className="group pl-12">
                  {/* Number and title share one line; the dot sits on the first line, out on the timeline. */}
                  <h3 className={`${listTitle} relative flex items-baseline gap-4`}>
                    <span
                      data-dot
                      aria-hidden
                      className="absolute top-[0.52em] -left-[46px] size-[15px] -translate-y-1/2 rounded-full bg-accent ring-[6px] ring-paper transition duration-500 group-data-pending:scale-[0.6] group-data-pending:bg-muted"
                    />
                    <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-[40ch] text-muted">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {/* FAQ */}
        <FaqSection />

        {/* Blog */}
        <Scrapbook className={section} />

        {/* Testimonials: hidden until there are real quotes */}
        {testimonials.items.length > 0 && (
        <section className={section}>
          <Container>
            <SectionHead heading={testimonials.heading} />
            <div className="grid gap-3 lg:grid-cols-3">
              {testimonials.items.map((t, i) => (
                <Reveal key={t.quote} delay={i * 120}>
                  <figure className={`folded flex h-full flex-col justify-between gap-6 p-6 lg:gap-8 lg:p-7 ${quoteTones[i % quoteTones.length]} ${lift} lg:min-h-[300px]`}>
                    <blockquote className="serif text-[20px] leading-[1.25] lg:text-2xl">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <i className="size-[34px] shrink-0 rounded-full bg-white/60" aria-hidden />
                      <span>{t.name}<br /><span className="text-muted">{t.title}</span></span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
        )}

        {/* Contact and footer share one dark block. */}
        <section id="contact" className={`rails on-dark relative bg-dark text-white ${section}`}>
          <i aria-hidden className="rails-inner" />
          <Container className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Illo art={contact.art} className="mb-6 h-36 w-auto -rotate-[8deg] lg:mb-8 lg:h-48" />
              <h2 className={`${sectionHeading} mb-5`}><Rich text={contact.heading} /></h2>
              <p className="lede max-w-md text-white">{contact.body}</p>
            </Reveal>
            <Reveal delay={120}>
              <ContactForm endpoint={site.formEndpoint} email={site.email} deadlines={contact.deadlines} interests={contact.interests} messageLabel={contact.messageLabel} messagePlaceholder={contact.messagePlaceholder} success={contact.success} />
            </Reveal>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
