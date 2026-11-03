import { blog, closing, legal, nav, site } from "@/content";
import { Nav } from "./Nav";
import { NewsletterForm } from "./NewsletterForm";
import { Button, Container } from "./ui";

/** The fixed page grid behind every page (see .page-rails). */
export function PageRails() {
  return <div aria-hidden className="page-rails"><i className="rails-inner" /></div>;
}

export function SiteHeader() {
  return (
    <>
      {/* Outside .page-frame so it stays stuck over the footer sheet too; draws the sheet's top and sides itself */}
      <header className="rails sticky top-0 z-10 border border-grid bg-paper">
        <i aria-hidden className="rails-inner" />
        <Container tight className="grid h-[52px] grid-cols-[auto_1fr] items-center lg:h-[56px] xl:grid-cols-[1fr_auto_1fr]">
          <Nav items={nav} />
          <a href="/" className="serif text-[20px] leading-none whitespace-nowrap lg:text-[24px] xl:text-center">
            {site.logo}
          </a>
          {/* The button, with a full-height rule on its left (from xl, where the menu shows) and
              the same 20px either side of it as the menu items have. */}
          <div className="flex items-center justify-end self-stretch">
            <span aria-hidden className="hidden w-px self-stretch bg-grid xl:block" />
            <div className="xl:px-5">
              <Button href={site.bookingUrl} accent>Let’s talk</Button>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}

/**
 * The dark footer as its own sheet, 24px below the page on the ground, with a cut bottom-right
 * corner and the page's inner side lines: the name, tagline and newsletter sign-up beside
 * columns of mono links, split by a full-height divider, then a bottom bar with the copyright
 * and a row of link cells.
 */
export function SiteFooter() {
  const elsewhere = [
    { label: "Email", href: `mailto:${site.email}` },
    ...(site.linkedin ? [{ label: "LinkedIn", href: site.linkedin }] : []),
  ];
  const columns = [
    { heading: closing.pagesHeading, links: [...nav, { label: "Contact", href: site.bookingUrl }] },
    { heading: closing.postsHeading, links: blog.posts.slice(0, 3).map((p) => ({ label: p.title, href: `/blog/${p.slug}` })) },
    { heading: closing.elsewhereHeading, links: elsewhere },
  ];
  const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

  return (
    <footer className="folded rails on-dark relative mt-6 bg-dark text-white [--fold-color:rgb(255_255_255/0.16)]">
      {/* The inner side lines, as on the page */}
      <i aria-hidden className="rails-inner" />
      {/* Name and newsletter, then the link columns */}
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="border-b border-grid px-4 py-10 sm:px-6 md:px-12 lg:border-r lg:border-b-0 lg:py-14 lg:pr-12 lg:pl-20">
          <p className="serif text-[36px] leading-none tracking-[-0.04em]">{site.logo}</p>
          <p className="mt-3 max-w-xs text-white/70">{closing.tagline}</p>
          <p className="serif mt-10 text-[22px] leading-[1.1]">{closing.newsletter.heading}</p>
          <p className="mt-2 mb-4 text-[15px] text-white/70">{closing.newsletter.body}</p>
          <NewsletterForm endpoint={site.newsletterEndpoint} email={site.email} label={closing.newsletter.label} success={closing.newsletter.success} />
        </div>
        <div className="grid gap-10 px-4 py-10 sm:grid-cols-3 sm:px-6 md:px-12 lg:py-14 lg:pr-20 lg:pl-12">
          {columns.map((c) => (
            <nav key={c.heading} aria-label={c.heading}>
              <p className="mono text-white/50">{c.heading}</p>
              <ul className="mt-6 space-y-4">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="mono leading-snug transition-colors hover:text-white/60" {...external(l.href)}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar: the copyright, then link cells split by dividers */}
      <div className="flex flex-col border-t border-grid sm:flex-row sm:items-stretch sm:justify-between">
        <p className="px-4 py-5 text-[14px] text-white/60 sm:px-6 md:px-12 lg:pl-20">© {new Date().getFullYear()} {site.name} · {closing.footer}</p>
        <div className="flex border-t border-grid sm:border-t-0">
          {[{ label: legal.privacy.label, href: "/privacy" }, { label: legal.terms.label, href: "/terms" }].map((l) => (
            <a key={l.label} href={l.href} className="mono grid flex-1 place-items-center border-grid px-8 py-5 transition-colors not-first:border-l hover:bg-white/5 sm:border-l lg:px-10">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
