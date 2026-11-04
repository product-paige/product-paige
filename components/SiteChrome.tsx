import { blog, closing, legal, nav, site } from "@/content";
import { Nav } from "./Nav";
import { SlideHeader } from "./SlideHeader";
import { Button, Container } from "./ui";

/** The logo as an icon: a blocky, cut-corner P in the accent red, no background (app/icon.svg is the same). */
function LogoMark() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className="size-9 shrink-0 text-accent">
      <path fill="currentColor" d="M7 6h13v4h-7v16H7zM20 10h5v8l-3 3h-7l2.5-4H20z" />
    </svg>
  );
}

/** The fixed page grid behind every page (see .page-rails). */
export function PageRails() {
  return <div aria-hidden className="page-rails"><i className="rails-inner" /></div>;
}

export function SiteHeader() {
  return (
    <>
      {/* Outside .page-frame so it stays stuck over the footer sheet too; draws the sheet's top and sides
          itself. Slides up out of view while scrolling down (see SlideHeader). */}
      <SlideHeader className="rails sticky top-0 z-10 border border-grid bg-paper">
        <i aria-hidden className="rails-inner" />
        <Container tight className="grid h-[52px] grid-cols-[auto_1fr] items-center lg:h-[56px]">
          {/* The logo mark on the left, then the menu (from xl) after a full-height rule */}
          <div className="flex items-center self-stretch">
            <a href="/" aria-label={site.logo} className="flex items-center xl:pr-5">
              <LogoMark />
            </a>
            <span aria-hidden className="hidden w-px self-stretch bg-grid xl:block" />
            <Nav items={nav} />
          </div>
          {/* The button, with a full-height rule on its left (from xl, where the menu shows) and
              the same 20px either side of it as the menu items have. */}
          <div className="flex items-center justify-end self-stretch">
            <span aria-hidden className="hidden w-px self-stretch bg-grid xl:block" />
            <div className="xl:px-5">
              <Button href={site.bookingUrl} accent>Let’s talk</Button>
            </div>
          </div>
        </Container>
      </SlideHeader>
    </>
  );
}

/**
 * The dark footer as its own sheet, 24px below the page on the ground, with a cut bottom-right
 * corner and the page's inner side lines: the name and tagline beside
 * columns of mono links, split by a full-height divider, then a bottom bar with the copyright
 * and a row of link cells.
 */
export function SiteFooter() {
  const elsewhere = [
    // Opens the subscribe pop-up (see SubscribePopup)
    { label: closing.newsletter.label, href: "#subscribe" },
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
      {/* Name and tagline, then the link columns */}
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="border-b border-grid px-4 py-10 sm:px-6 md:px-12 lg:border-r lg:border-b-0 lg:pt-14 lg:pb-10 lg:pr-12 lg:pl-20">
          <p className="serif text-[36px] leading-none tracking-[-0.04em]">{site.logo}</p>
          <p className="mt-3 max-w-xs text-white/70">{closing.tagline}</p>
        </div>
        <div className="grid gap-10 px-4 py-10 sm:grid-cols-3 sm:px-6 md:px-12 lg:pt-14 lg:pb-10 lg:pr-20 lg:pl-12">
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
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-5 text-[14px] text-white/60 sm:px-6 md:px-12 lg:pl-20">© {new Date().getFullYear()} {site.name}<i aria-hidden className="size-1.5 rounded-full bg-white/50" />{closing.footer}</p>
        <div className="flex border-t border-grid sm:border-t-0">
          {[{ label: legal.privacy.label, href: "/privacy" }, { label: legal.terms.label, href: "/terms" }].map((l) => (
            <a key={l.label} href={l.href} className="mono grid flex-1 place-items-center border-grid px-8 py-5 transition-colors not-first:border-l hover:bg-white/5 sm:border-l lg:px-10">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
