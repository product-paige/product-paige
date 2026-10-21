import {
  about, approach, audiences, contact, faq, hero, models, services, site, testimonials,
} from "@/content";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { RecentProjects } from "@/components/RecentProjects";
import { PageRails, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { TagIcon } from "@/components/TagIcon";
import { Scrapbook } from "@/components/Scrapbook";
import { TimelineProgress } from "@/components/TimelineProgress";
import type { CSSProperties } from "react";
import {
  Button, Check, Chip, Container, Reveal, Rich, SectionHead, cardTitle, listTitle, section, sectionHeading, sideHeading,
} from "@/components/ui";

// Hover lift shared by every card.
const lift = "transition hover:-translate-y-1";
// Testimonial card colours, in turn.
const quoteTones = ["bg-sky", "bg-butter", "bg-sage"];
// Stagger for the hero's on-load fade.
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function Home() {
  return (
    <>
      <PageRails />
      <SiteHeader />

      <main id="top">
        {/* Hero and About share a wrapper: on desktop the hero stays pinned while the dark About panel
            slides up over it, then both scroll away together. */}
        <div className="relative">
        {/* Hero: on the page background. Desktop: it fills the first screen under the 68px header, content
            centred but nudged up (extra bottom padding) since the torn paper covers the bottom; the
            About panel peeks 64px at the bottom. Like About, the block is the Container
            itself, so from md up it stays between the page rails. */}
        <section className="relative lg:sticky lg:top-[68px] lg:flex lg:min-h-[calc(100svh_-_132px)]">
          <Container className="pt-8 pb-20 lg:flex lg:flex-col lg:justify-center lg:pt-16 lg:pb-40">
            <h1 className="rise serif mb-6 max-w-4xl text-[clamp(34px,5vw,72px)] leading-[1] text-balance" style={delay(100)}>
              <Rich text={hero.heading} />
            </h1>
            <div className="rise" style={delay(200)}>
              <p className="lede mb-10 max-w-2xl lg:mb-12 lg:max-w-3xl">{hero.lede}</p>
              {/* Light pills, each with a line icon; a highlight travels along them (.pill-cycle). */}
              <div className="pill-cycle flex flex-wrap gap-2" style={{ "--n": hero.tags.length } as CSSProperties}>
                {hero.tags.map((t, i) => (
                  <Chip key={t.label} icon={<TagIcon name={t.icon} />} style={{ "--i": i } as CSSProperties}>{t.label}</Chip>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* About */}
        {/* About: a sheet of paper with a torn top edge (the edge image sits just above the sheet).
            The sheet is the Container itself, so from md up it stays between the page rails. */}
        <section id="about" className="relative z-1">
          <Container className="relative bg-sheet py-8 lg:py-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/paper-edge.svg" alt="" aria-hidden className="pointer-events-none absolute bottom-full left-0 h-[clamp(64px,12vw,230px)] w-full translate-y-px select-none" />
          {/* A taped, tilted Polaroid with a handwritten caption, beside the text. */}
          <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <Reveal className="mx-auto w-full max-w-[420px] lg:mx-0">
              <figure className="polaroid">
                <i aria-hidden className="tape" />
                <span className="photo-grain block aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={site.photo} alt={site.photoAlt} width={540} height={675} loading="lazy" decoding="async" className="size-full object-cover" />
                </span>
                {/* Non-breaking space before the dot, so a wrapped line never starts with one. */}
                <figcaption className="font-hand mt-4 text-center text-[24px] leading-tight lg:text-[26px]">{site.name}{"\u00a0"}· {site.role}</figcaption>
              </figure>
            </Reveal>
            <div>
              <Reveal>
                <h2 className="serif mb-5 text-[clamp(28px,2.8vw,38px)] leading-[1.1] text-balance"><Rich text={about.heading} /></h2>
              </Reveal>
              <div className="lede space-y-5">
                {about.paragraphs.map((p, i) => <Reveal as="p" key={i} delay={i * 80}>{p}</Reveal>)}
              </div>
              {/* Stats line */}
              <Reveal className="mt-10 grid border-t border-line sm:grid-cols-3 lg:mt-14">
                {about.facts.map((f) => (
                  <div key={f.label} className="border-b border-line py-5 pr-4">
                    <p className="mb-1 text-[14px] label text-muted">{f.label}</p>
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
            <SectionHead heading={audiences.heading} />
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
              <Button href="#services" arrow="down">How I can help</Button>
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
        <section className={section}>
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
              <h2 className={sideHeading}><Rich text={approach.heading} /></h2>
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
