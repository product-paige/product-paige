import { closing, legal, nav, site } from "@/content";
import { Nav } from "./Nav";
import { ArrowUpRight, Button, Container } from "./ui";

/** The fixed page grid behind every page (see .page-rails). */
export function PageRails() {
  return <div aria-hidden className="page-rails"><i className="rails-inner" /></div>;
}

/** A slim dark bar above the header with the booking line. Scrolls away; the header stays.
 * The header button is the call to action, so the bar doesn't repeat it. */
function AnnouncementBar() {
  if (!site.availability) return null;
  return (
    <div className="rails on-dark relative bg-dark text-white">
      <i aria-hidden className="rails-inner" />
      <Container className="flex h-9 items-center justify-center gap-2 text-[14px]">
        <i className="pulse-dot size-[7px] shrink-0 rounded-full bg-live" aria-hidden />
        <span>{site.availability}</span>
      </Container>
    </div>
  );
}

export function SiteHeader() {
  return (
    <>
      <AnnouncementBar />
      <header className="rails sticky top-0 z-10 border-b border-grid bg-paper">
        <i aria-hidden className="rails-inner" />
        <Container tight className="grid h-[60px] grid-cols-[auto_1fr] items-center lg:h-[68px] xl:grid-cols-[1fr_auto_1fr]">
          <Nav items={nav} />
          <a href="/" className="serif text-[20px] leading-none whitespace-nowrap lg:text-[24px] xl:text-center">
            {site.logo}
          </a>
          <div className="flex items-center justify-end">
            <Button href={site.bookingUrl}>Book an intro call</Button>
          </div>
        </Container>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="rails on-dark relative border-t border-grid bg-dark text-white">
      <i aria-hidden className="rails-inner" />
      <Container className="flex flex-col items-start gap-4 py-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {site.linkedin && (
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 rounded-ui border border-line-dark px-4 py-2 text-sm label transition hover:bg-white/10">
            LinkedIn
            <ArrowUpRight className="size-3.5" />
          </a>
        )}
        <span className="text-[14px] text-white/60">{closing.footer}</span>
        <span className="flex flex-wrap items-center gap-5 text-[14px] text-white/60">
          <a href="/privacy" className="link">{legal.privacy.label}</a>
          <a href="/terms" className="link">{legal.terms.label}</a>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </span>
      </Container>
    </footer>
  );
}
