import { closing, nav, site } from "@/content";
import { Nav } from "./Nav";
import { ArrowUpRight, Button, Container } from "./ui";

/** The fixed page grid behind every page (see .page-rails). */
export function PageRails() {
  return <div aria-hidden className="page-rails"><i className="rails-inner" /></div>;
}

export function SiteHeader() {
  return (
    <header className="rails sticky top-0 z-10 border-b border-grid bg-white">
      <i aria-hidden className="rails-inner" />
      <Container tight className="grid h-[60px] grid-cols-[auto_1fr] items-center lg:h-[68px] lg:grid-cols-[1fr_auto_1fr]">
        <Nav items={nav} />
        <a href="/" className="serif text-[20px] leading-none whitespace-nowrap lg:text-center lg:text-[24px]">
          {site.logo}
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
        <span className="text-[13px] text-white/60">{closing.footer}</span>
        <span className="text-[13px] text-white/60">© {new Date().getFullYear()} {site.name}</span>
      </Container>
    </footer>
  );
}
