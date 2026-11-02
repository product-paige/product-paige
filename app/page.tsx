import {
  about, approach, audiences, contact, faq, models, services, site, testimonials,
} from "@/content";
import { ContactForm } from "@/components/ContactForm";
import { EditorialHero } from "@/components/EditorialHero";
import { Faq } from "@/components/Faq";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Scrapbook } from "@/components/Scrapbook";
import { TimelineProgress } from "@/components/TimelineProgress";
import {
  Button, Check, Chip, Container, Illo, Reveal, Rich, SectionHead, cardTitle, listTitle, section, sectionHeading,
} from "@/components/ui";

// Hover lift shared by every card.
const lift = "transition hover:-translate-y-1";
// Testimonial card colours, in turn.
const quoteTones = ["bg-sky", "bg-butter", "bg-sage"];

export default function Home() {
  return (
    <>
      <PageRails />
      <SiteHeader />

      <main id="top">
        <EditorialHero />

        {/* About: a dark block with a folded top-right corner, laid out like a magazine page: the photo on the left, the heading and text beside it. From md up the block sits between the
            inner rails. */}
        <section id="about" className="relative z-1">
          {/* Padded so the dark block's edges sit on the inner rails (24px md, 40px lg in from the
              sheet's edge); inside, the content has its own padding, balanced with the top and bottom. */}
          <div className="md:px-6 lg:px-10">
          <div className="folded-top relative bg-dark px-5 py-8 text-white sm:px-6 md:px-8 lg:px-12 lg:py-16 xl:px-16">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-6">
              {/* The photo as a print, in a white border */}
              <Reveal className="mx-auto w-full max-w-[460px] lg:col-span-6 lg:mx-0 lg:max-w-none lg:pr-16">
                <figure className="polaroid">
                  <span className="photo-grain block aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={site.photo} alt={site.photoAlt} width={540} height={540} loading="lazy" decoding="async" className="size-full object-cover" />
                  </span>
                </figure>
              </Reveal>
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <h2 className="serif mb-6 text-[clamp(32px,3.8vw,48px)] leading-[1] tracking-[-0.04em] lg:mb-8"><Rich text={about.heading} /></h2>
                </Reveal>
                <div className="lede space-y-5">
                  {about.paragraphs.map((p, i) => <Reveal as="p" key={i} delay={i * 80}>{p}</Reveal>)}
                </div>
                {/* Stats line */}
                <Reveal className="mt-10 grid border-t border-line-dark sm:grid-cols-3 lg:mt-14">
                  {about.facts.map((f) => (
                    <div key={f.label} className="border-b border-line-dark py-5 pr-4">
                      <p className="mb-1 text-[14px] label text-white/60">{f.label}</p>
                      <p className="serif text-[18px] leading-snug lg:text-[20px]">{f.value}</p>
                    </div>
                  ))}
                </Reveal>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Recent projects */}
        <RecentProjects className="border-t border-grid py-8 lg:py-0" />


        {/* Audiences */}
        <section className={section}>
          <Container>
            <SectionHead heading={audiences.heading} body={audiences.body} />
            <div className="grid gap-3 md:grid-cols-2">
              {audiences.items.map((a, i) => (
                <Reveal key={a.title} delay={i * 120}>
                  <div className={`${a.tone} folded flex h-full flex-col p-6 ${lift} lg:p-10`}>
                    {/* The card's illustration, above the title */}
                    <Illo art={a.art} className="mb-5 h-24 w-auto lg:mb-6 lg:h-32" />
                    <h3 className={`${cardTitle} mb-8 lg:mb-16`}>{a.title}</h3>
                    {/* Rules run edge to edge across the card; the items keep their inset. */}
                    <ul className="mt-auto -mx-6 divide-y divide-line border-y border-line lg:-mx-10">
                      {a.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 px-6 py-3 lg:px-10 lg:py-4">
                          <Check className="mt-0.5 text-muted" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8 flex justify-center lg:mt-12">
              <a href="#services" className="link">How I can help</a>
            </Reveal>
          </Container>
        </section>

        {/* Services */}
        <section id="services" className={section}>
          <Container>
            <SectionHead heading={services.heading} />
            {/* Dividers run out to the page rails; the rows keep the usual inset. */}
            <div className="md:-mx-12 lg:-mx-20">
              {services.items.map((s) => (
                <Reveal as="article" key={s.title} className="grid gap-3 border-t border-grid py-6 md:grid-cols-[auto_1.1fr_1fr] md:items-center md:gap-6 md:px-12 md:py-10 lg:gap-10 lg:px-20">
                  {/* The row's illustration, left of the heading (from md); a fixed-width slot so the
                      headings line up whatever each image's shape. */}
                  <div className="hidden w-28 justify-center md:flex lg:w-32">
                    <Illo art={s.art} className="h-24 w-auto max-w-full object-contain lg:h-28" />
                  </div>
                  <div>
                    <h3 className={listTitle}>{s.title}</h3>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {s.tags.map((t) => <Chip key={t}>{t}</Chip>)}
                    </div>
                  </div>
                  <p className="max-w-lg">{s.body}</p>
                </Reveal>
              ))}
            </div>
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
              <Illo art={approach.art} className="mb-6 h-28 w-auto lg:mb-8 lg:h-40" />
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
        <section id="faq" className={section}>
          <Container className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className={sectionHeading}><Rich text={faq.heading} /></h2>
              <p className="lede mt-5 max-w-lg">{faq.body}</p>
            </Reveal>
            <Reveal>
              <Faq items={faq.items} />
            </Reveal>
          </Container>
        </section>

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
              <h2 className={`${sectionHeading} mb-5`}><Rich text={contact.heading} /></h2>
              <p className="lede max-w-md text-white">{contact.body}</p>
              <p className="mt-6 text-white/60">
                {contact.emailNote}{" "}
                <a href={`mailto:${site.email}`} className="link text-white">
                  {site.email}
                </a>
              </p>
              <Illo art={contact.art} className="mt-10 hidden h-44 w-auto lg:block" />
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
