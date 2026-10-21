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
  Button, Check, Chip, Container, Reveal, Rich, SectionHead, cardTitle, listTitle, section, sectionHeading, sideHeading,
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
        {/* Hero and About share a wrapper: on desktop the hero stays pinned while the dark About panel
            slides up over it, then both scroll away together. */}
        <div className="relative">
        <EditorialHero />

        {/* About: a dark block with rounded top corners that slides up over the hero, laid out like a
            magazine page: a running head, the heading across the full width, then the Polaroid
            beside the text, which opens with a drop cap. The block is the Container itself, so from
            md up it stays between the page rails. */}
        <section id="about" className="relative z-1">
          <Container className="graph-grid relative rounded-t-[28px] bg-dark pt-5 pb-8 text-white lg:rounded-t-[40px] lg:pt-8 lg:pb-20">
            {/* Running head */}
            <div className="flex items-center justify-between border-b border-line-dark pb-4 text-[14px] font-medium text-white/70 lg:pb-5">
              <span className="flex items-center gap-2.5">
                <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" /></svg>
                About
              </span>
              <span>{about.facts[0].value}</span>
            </div>

            <Reveal>
              <h2 className="serif mt-8 text-[clamp(40px,6.4vw,92px)] leading-[0.95] lg:mt-12"><Rich text={about.heading} /></h2>
            </Reveal>

            <div className="mt-10 grid items-start gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-6">
              {/* A taped Polaroid with a caption */}
              <Reveal className="mx-auto w-full max-w-[420px] lg:col-span-5 lg:mx-0">
                <figure className="polaroid">
                  <i aria-hidden className="tape" />
                  <span className="photo-grain block aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={site.photo} alt={site.photoAlt} width={540} height={540} loading="lazy" decoding="async" className="size-full object-cover" />
                  </span>
                  {/* Non-breaking space before the dot, so a wrapped line never starts with one. */}
                  <figcaption className="mt-4 text-center text-[16px] leading-tight font-medium text-ink">{site.name}{"\u00a0"}· {site.role}</figcaption>
                </figure>
              </Reveal>
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="lede space-y-5">
                  {about.paragraphs.map((p, i) => <Reveal as="p" key={i} delay={i * 80} className={i === 0 ? "drop-cap" : ""}>{p}</Reveal>)}
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
          </Container>
        </section>

        </div>

        {/* Recent projects */}
        <RecentProjects className={`${section} lg:pt-0`} />

        {/* Audiences */}
        <section className={section}>
          <Container>
            <SectionHead heading={audiences.heading} body={audiences.body} />
            <div className="grid gap-3 md:grid-cols-2">
              {audiences.items.map((a, i) => (
                <Reveal key={a.title} delay={i * 120}>
                  <div className={`${a.tone} folded flex h-full flex-col p-6 ${lift} lg:p-10`}>
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
            <div className="border-b border-grid md:-mx-12 lg:-mx-20">
              {services.items.map((s) => (
                <Reveal as="article" key={s.title} className="grid gap-3 border-t border-grid py-6 md:grid-cols-[1.1fr_1fr] md:gap-6 md:px-12 md:py-10 lg:px-20">
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
              <Button href={site.bookingUrl}>Book an intro call</Button>
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
        <section id="faq" className={section}>
          <Container className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className={sideHeading}><Rich text={faq.heading} /></h2>
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
          <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal>
              <h2 className={`${sectionHeading} mb-5`}><Rich text={contact.heading} /></h2>
              <p className="lede max-w-md text-white">{contact.body}</p>
              <p className="mt-6 text-white/60">
                {contact.emailNote}{" "}
                <a href={`mailto:${site.email}`} className="link text-white">
                  {site.email}
                </a>
              </p>
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
