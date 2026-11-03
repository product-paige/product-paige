import { closing, legal, nav, site } from "@/content";
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
              <Button href={site.bookingUrl} accent>Start a project</Button>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}

/**
 * The dark footer as its own sheet, 24px below the page on the ground, with a cut bottom-right
 * corner: the name and a tagline in the serif beside a newsletter sign-up, the menu as mono links, then a bottom bar with the small print.
 */
export function SiteFooter() {
  return (
    <footer className="folded rails on-dark relative mt-6 bg-dark text-white [--fold-color:rgb(255_255_255/0.16)]">
      <i aria-hidden className="rails-inner" />
      <Container className="pt-10 lg:pt-16">
        {/* The name and tagline on the left, the newsletter sign-up on the right */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-end lg:gap-16">
          <div>
            <p aria-hidden className="serif text-[clamp(48px,7.4vw,104px)] leading-[0.95] tracking-[-0.05em] whitespace-nowrap">{site.logo}</p>
            <p className="lede mt-4 max-w-md text-white/80">{closing.tagline}</p>
          </div>
          <div>
            <p className="serif text-[clamp(22px,2vw,28px)] leading-[1.1]">{closing.newsletter.heading}</p>
            <p className="mt-2 mb-5 text-white/70">{closing.newsletter.body}</p>
            <NewsletterForm endpoint={site.newsletterEndpoint} email={site.email} label={closing.newsletter.label} success={closing.newsletter.success} />
          </div>
        </div>
        <nav aria-label="Footer" className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 lg:mt-14">
          {[...nav, ...(site.linkedin ? [{ label: "LinkedIn", href: site.linkedin }] : []), { label: "Contact", href: site.bookingUrl }].map((n) => (
            <a key={n.label} href={n.href} className="mono transition-colors hover:text-white/60" {...(n.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{n.label}</a>
          ))}
        </nav>
      </Container>
      <div className="mt-10 border-t border-grid lg:mt-14">
        <Container className="flex flex-col gap-3 py-5 text-[14px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name} · {closing.footer}</span>
          <span className="flex gap-5">
            <a href="/privacy" className="link">{legal.privacy.label}</a>
            <a href="/terms" className="link">{legal.terms.label}</a>
          </span>
        </Container>
      </div>
    </footer>
  );
}
