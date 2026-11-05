import type { ReactNode } from "react";
import { infoPages } from "@/content";
import { PageRails, SiteFooter, SiteHeader } from "./SiteChrome";
import { Container, Eyebrow, Reveal, Rich, section, sectionHeading } from "./ui";

type Key = (typeof infoPages)[number]["key"];

/**
 * Privacy, Terms and FAQs: a full-width hero (eyebrow, heading, intro and an optional note),
 * then the content beside a left rail that links between the three, the current one marked.
 * The rail stays put while you scroll on desktop and becomes a row of links on phones.
 */
export function InfoPage({ current, label, heading, lede, note, children }: { current: Key; label: string; heading: string; lede: string; note?: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="page-frame">
      <PageRails />
      <main>
        {/* No top rule: the sticky header above already draws one */}
        <section className={`${section} border-t-0`}>
          <Container>
            <Reveal>
              <Eyebrow>{label}</Eyebrow>
              <h1 className={`${sectionHeading} max-w-5xl`}><Rich text={heading} /></h1>
              <p className="lede mt-6 max-w-3xl">{lede}</p>
              {note && <p className="mono mt-8 text-muted">{note}</p>}
            </Reveal>
          </Container>
        </section>
        <section className={section}>
          <Container className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
            <nav aria-label="Policies and FAQs" className="lg:sticky lg:top-24 lg:self-start">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:block lg:border-l lg:border-line">
                {infoPages.map((p) => {
                  const on = p.key === current;
                  return (
                    <li key={p.key}>
                      <a
                        href={p.href}
                        aria-current={on ? "page" : undefined}
                        className={`flex items-center gap-2.5 py-1 text-[15px] transition-colors lg:-ml-px lg:border-l-2 lg:px-4 lg:py-2 ${on ? "font-medium text-ink lg:border-accent" : "text-muted hover:text-ink lg:border-transparent"}`}
                      >
                        {on && <i aria-hidden className="size-2 rounded-full bg-accent lg:hidden" />}
                        {p.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="max-w-3xl">{children}</div>
          </Container>
        </section>
      </main>
      </div>
      <SiteFooter />
    </>
  );
}
