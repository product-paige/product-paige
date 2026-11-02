import {
  about, approach, art, contact, models, services, site, testimonials,
} from "@/content";
import { ContactForm } from "@/components/ContactForm";
import { Asterisk, EditorialHero } from "@/components/EditorialHero";
import { FaqSection } from "@/components/FaqSection";
import { Phases } from "@/components/Phases";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { TimelineProgress } from "@/components/TimelineProgress";
import { WhoIWorkWith } from "@/components/WhoIWorkWith";
import {
  Button, Chip, Container, Illo, Reveal, Rich, ScribbleBullet, SectionHead, cardTitle, listTitle, section, sectionHeading,
} from "@/components/ui";

// Hover lift shared by every card.
const lift = "transition hover:-translate-y-1";
// Testimonial card colours, in turn.
const quoteTones = ["bg-sky", "bg-butter", "bg-sage"];
// Where each tool tile sits on the About board, scattered around the photo.
const toolSpots = [
  "top-[17%] left-[9%] -rotate-12",
  "top-[44%] left-[15%] rotate-6",
  "top-[14%] right-[7%] rotate-[14deg]",
];

/** Why founders work with me: a short list with scribble bullets (the About panel's card). */
function ProofList() {
  return (
    <>
      <p className="font-medium">{about.proofHeading}</p>
      <ul className="mt-3 space-y-2 text-[15px]">
        {about.proof.map((f, i) => (
          <li key={f} className="flex items-start gap-2.5">
            <ScribbleBullet variant={i} className="mt-0.5 text-accent" />
            {f}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Home() {
  return (
    <>
      <PageRails />
      <SiteHeader />

      <main id="top">
        <EditorialHero />

        {/* About: two columns. Left, "Hi, I’m Paige" as an eyebrow, the lead as the heading, one line on how I work and the booking
            button. Right, a sheet of graph paper with punched holes running out to the
            page's edge, with the photo as a tilted print, the basket sticker, and why founders work with me on a pinned card. */}
        <section id="about" className={`${section} overflow-x-clip`}>
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                {/* Eyebrow, styled like the hero's booking line */}
                <p className="flex items-center gap-3 font-sans text-[17px] font-medium tracking-[-0.03em] lg:text-[20px]">
                  <Asterisk className="live-star size-5" />
                  {about.heading}
                </p>
                <h2 className={`${sectionHeading} mt-6 lg:mt-8`}>{about.paragraphs[0]}</h2>
              </Reveal>
              {about.paragraphs.slice(1).map((p) => <Reveal as="p" key={p} delay={80} className="lede mt-6 max-w-xl">{p}</Reveal>)}
              <Reveal className="mt-8 lg:mt-10">
                <Button href={site.bookingUrl} accent>Book an intro call</Button>
              </Reveal>
            </div>

            {/* The panel: from the column's left edge out past the inner rail to the page sheet's
                edge (lg:-mr-20 cancels the Container's padding), square on that side. */}
            <Reveal className="relative lg:-mr-20">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] border border-line shadow-[0_1px_0_rgb(0_0_0/0.04),0_18px_40px_rgb(26_26_26/0.08)] lg:aspect-auto lg:h-[620px] lg:rounded-r-none lg:border-r-0">
                {/* One sheet of graph paper, with punched holes along the top */}
                <div aria-hidden className="page-graph absolute inset-0" />
                <div aria-hidden className="absolute inset-x-8 top-5 flex justify-between">
                  {Array.from({ length: 9 }).map((_, i) => <i key={i} className="size-4 rounded-full bg-paper shadow-[inset_0_1px_2px_rgb(26_26_26/0.18)] lg:size-5" />)}
                </div>
                <figure className="absolute top-[12%] left-[26%] w-[54%] -rotate-3 bg-white p-3 pb-5 shadow-[0_1px_0_rgb(0_0_0/0.06),0_16px_36px_rgb(26_26_26/0.14)]">
                  <span className="photo-grain block aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={site.photo} alt={site.photoAlt} width={540} height={540} loading="lazy" decoding="async" className="size-full object-cover" />
                  </span>
                </figure>
                <Illo art={art.basket} className="absolute bottom-[5%] left-[3%] w-[30%] -rotate-[10deg]" />
                {/* The tools, as little tiles stuck down at odd angles around the board */}
                <ul aria-label="Tools I use">
                  {about.tools.map((t, i) => (
                    <li key={t.name} className={`absolute grid size-12 place-items-center rounded-[10px] bg-white shadow-[0_1px_0_rgb(0_0_0/0.06),0_8px_18px_rgb(26_26_26/0.12)] lg:size-16 ${toolSpots[i % toolSpots.length]}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.logo} alt={t.name} width={32} height={32} loading="lazy" className="size-6 lg:size-8" />
                    </li>
                  ))}
                </ul>
                {/* Why founders work with me, on a card pinned to the panel (desktop) */}
                <div className="absolute right-[6%] bottom-[10%] hidden w-max rotate-2 bg-white p-5 shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_30px_rgb(26_26_26/0.12)] lg:block">
                  <ProofList />
                </div>
              </div>
              {/* Phones and tablets: the same list under the panel */}
              <div className="mt-6 lg:hidden">
                <ProofList />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Recent projects */}
        <RecentProjects className="border-t border-grid py-8 lg:py-0" />


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
