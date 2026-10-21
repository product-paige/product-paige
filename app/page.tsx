import {
  about, approach, audiences, closing, contact, faq, hero, models, nav, services, site, testimonials,
} from "@/content";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Nav } from "@/components/Nav";
import { RecentProjects } from "@/components/RecentProjects";
import { Scrapbook } from "@/components/Scrapbook";
import { TimelineProgress } from "@/components/TimelineProgress";
import type { CSSProperties } from "react";
import {
  ArrowUpRight, Button, Check, Chip, Container, Reveal, Rich, SectionHead, cardTitle, listTitle, sectionHeading, sideHeading,
} from "@/components/ui";

// Every section: the same padding top and bottom (32px phones, 80px desktop), so sections sit
// 64px / 160px apart, with a full-width grid line on the boundary.
const section = "border-t border-grid py-8 lg:py-20";
// Hover lift shared by every card.
const lift = "transition hover:-translate-y-1";
// Testimonial card colours, in turn.
const quoteTones = ["bg-sky", "bg-butter", "bg-sage"];
// Stagger for the hero's on-load fade.
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function Home() {
  return (
    <>
      <div aria-hidden className="page-rails"><i className="rails-inner" /></div>
      <header className="rails sticky top-0 z-10 border-b border-grid bg-paper/85 backdrop-blur-md backdrop-saturate-150">
        <i aria-hidden className="rails-inner" />
        <Container tight className="grid h-[60px] grid-cols-[auto_1fr] items-center lg:h-[68px] lg:grid-cols-[1fr_auto_1fr]">
          <Nav items={nav} />
          <a href="#top" className="serif text-[19px] leading-[0.95] lg:text-center lg:text-[26px]">
            {site.logo.split(" ")[0]}<br />{site.logo.split(" ").slice(1).join(" ")}
          </a>
          <div className="flex items-center justify-end gap-5">
            {site.availability && (
              <span className="hidden items-center gap-2 text-[13px] text-live-text xl:inline-flex">
                <i className="pulse-dot size-[9px] rounded-full bg-live" aria-hidden />
                {site.availability}
              </span>
            )}
            <Button href={site.bookingUrl}>Book an intro call</Button>
          </div>
        </Container>
      </header>

      <main id="top">
        {/* Hero and About share a wrapper: on desktop the hero stays pinned while the dark About panel
            slides up over it, then both scroll away together. */}
        <div className="relative">
        {/* Hero: a dark block. Desktop: it fills the first screen under the 68px header, content
            centred; the About panel peeks 64px at the bottom. Like About, the block is the Container
            itself, so from md up it stays between the page rails. */}
        <section className="relative lg:sticky lg:top-[68px] lg:flex lg:min-h-[calc(100svh_-_132px)]">
          <Container className="bg-dark pt-10 pb-20 text-white lg:flex lg:flex-col lg:justify-center lg:py-16">
            <h1 className="rise serif mb-6 max-w-6xl text-[clamp(40px,6.3vw,92px)] leading-[0.97]" style={delay(100)}>
              <Rich text={hero.heading} />
            </h1>
            <div className="rise" style={delay(200)}>
              <p className="lede mb-10 max-w-2xl lg:mb-12 lg:max-w-3xl lg:text-[20px]">{hero.lede}</p>
              {/* A soft highlight travels along the pills, tinting each with its own dot colour in turn. */}
              <div className="pill-cycle flex flex-wrap gap-2" style={{ "--n": hero.tags.length } as CSSProperties}>
                {hero.tags.map((t, i) => (
                  <Chip key={t.label} dot={t.dot} className="text-ink" style={{ "--i": i, "--tint": t.dot } as CSSProperties}>{t.label}</Chip>
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
          <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <figure className="photo-grain folded aspect-[4/5] bg-chip [--fold-color:#e6e2da]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.photo} alt={site.photoAlt} width={540} height={700} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 z-1 bg-linear-to-t from-black/45 to-transparent p-7 pt-16 font-hand text-[24px] leading-tight text-white lg:text-[28px]">
                  <span className="inline-block -rotate-2">
                  {/* Non-breaking space before the dot, so a wrapped line never starts with one. */}
                  {site.name} · {site.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            <div>
              <Reveal>
                <h2 className={`${sectionHeading} mb-8`}><Rich text={about.heading} /></h2>
              </Reveal>
              <div className="lede space-y-5">
                {about.paragraphs.map((p, i) => <Reveal as="p" key={i} delay={i * 80}>{p}</Reveal>)}
              </div>
              <Reveal className="mt-10 grid border-t border-line sm:grid-cols-3 lg:mt-20">
                {about.facts.map((f) => (
                  <div key={f.label} className="border-b border-line py-5 pr-4">
                    <p className="mb-1 text-[13px] label text-muted">{f.label}</p>
                    <p className="serif text-[18px] leading-snug lg:text-[20px]">{f.value}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
          </Container>
        </section>

        </div>

        {/* Audiences */}
        <section className={section}>
          <Container>
            <SectionHead heading={audiences.heading} />
            <div className="grid gap-3 md:grid-cols-2">
              {audiences.items.map((a, i) => (
                <Reveal key={a.title} delay={i * 120}>
                  <div className={`${a.tone} loose-leaf folded flex h-full flex-col p-6 ${lift} lg:p-10`}>
                    <h3 className={`${cardTitle} mb-8 lg:mb-16`}>{a.title}</h3>
                    <ul className="mt-auto divide-y divide-line border-y border-line">
                      {a.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 py-3 lg:py-4">
                          <Check className="mt-0.5 text-ink/55" />
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

        {/* Recent projects */}
        <RecentProjects className={`${section} lg:pt-0`} />

        {/* Approach */}
        <section id="approach" className={section}>
          <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-32">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className={sideHeading}><Rich text={approach.heading} /></h2>
              <p className="lede mt-5 max-w-xl">{approach.body}</p>
            </Reveal>
            {/* Vertical timeline: a grey track down the left that fills in as you scroll, with a colour dot per step. */}
            <ol className="relative grid gap-12 lg:gap-16 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-px before:bg-line before:content-['']">
              <TimelineProgress />
              {approach.steps.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 120} className="group pl-12">
                  {/* Number and title share one line; the dot sits on the first line, out on the timeline. */}
                  <h3 className="serif relative flex items-baseline gap-4 text-[clamp(22px,2vw,28px)] leading-[1.1]">
                    <span
                      data-dot
                      aria-hidden
                      className="absolute top-[0.52em] -left-12 size-[19px] -translate-y-1/2 rounded-full ring-[6px] ring-paper transition duration-500 group-data-pending:scale-[0.6] group-data-pending:grayscale"
                      style={{ background: p.dot }}
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

        {/* Engagement models: extra space above on desktop, to separate it from the approach timeline */}
        <section className={section}>
          <Container>
            <SectionHead heading={models.heading} />
            <div className="grid gap-3 lg:grid-cols-3">
              {models.items.map((m, i) => (
                <Reveal key={m.tag} delay={i * 120}>
                  {/* Hover lives on this inner layer so it doesn't fight the reveal's transition. */}
                  <div
                    className={`folded flex h-full flex-col gap-5 border p-6 ${lift} lg:p-7 ${m.featured ? "border-dark bg-dark text-white [--fold-color:rgb(255_255_255/0.14)]" : "border-line bg-surface hover:border-ink/40"}`}
                  >
                    <Chip className={`self-start ${m.featured ? "bg-white/10" : ""}`}>{m.tag}</Chip>
                    <h3 className={cardTitle}>{m.title}</h3>
                    <p className={m.featured ? "text-white/60" : "text-muted"}>{m.body}</p>
                    <div className="mt-auto pt-4">
                      <p className={`text-sm label ${m.featured ? "text-white/60" : "text-muted"}`}>Starting at</p>
                      <p className="mt-1 flex items-baseline gap-1.5">
                        <span className={`serif text-[32px] leading-none ${models.pricePlaceholder ? "opacity-40" : ""}`}>{m.price}</span>
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

        {/* FAQ */}
        <section id="faq" className={section}>
          <Container className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:max-w-md lg:self-start">
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
                      <span>{t.name}<br /><span className="text-ink/60">{t.title}</span></span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
        )}

        {/* Contact and footer share one dark block. */}
        <section id="contact" className={`bg-dark text-white ${section}`}>
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

      <footer className="bg-dark text-white">
        <Container className="flex flex-col items-start gap-4 border-t border-line-dark py-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 rounded-ui border border-line-dark px-4 py-2 text-sm label transition hover:bg-white/10">
              LinkedIn
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
          <span className="text-[13px] text-white/60">{closing.footer}</span>
          <span className="text-[13px] text-white/60">© {new Date().getFullYear()} {site.name}</span>
        </Container>
      </footer>
    </>
  );
}
