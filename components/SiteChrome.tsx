import { closing, infoPages, livePosts, nav, site } from "@/content";
import { Nav } from "./Nav";
import { SlideHeader } from "./SlideHeader";
import { Button, Container } from "./ui";

/** The logo as an icon: the 3D block P in the accent blue (darker blue on its sides), cropped tight to its shape so it sits centred in the
    header (app/icon.svg is the same). */
function LogoMark() {
  return (
    <svg aria-hidden viewBox="49 0 202 300" className="h-9 w-auto shrink-0 lg:h-10">
      <path d="M49.5303 61.9189L178.237 1.50586L224.203 27.7724V59.4866L250.47 47.5134V136.32L224.203 150V178.989L136.21 221.016V278.618L95.2762 300L49.5308 274.678L49.5303 61.9189Z" fill="#2450e0"/><path d="M49.5303 60.6055L178.893 0L224.203 27.7723L95.1878 89.683V299.815L49.5303 274.862V60.6055Z" fill="#142e8a"/><path d="M224.203 32.6357L250.469 47.4727L224.203 59.5081L224.203 32.6357Z" fill="#142e8a"/><path d="M206.466 73.8267V147.373L136.867 180.294L136.867 106.66L206.466 73.8267Z" fill="#142e8a"/><path d="M136.867 106.776L161.82 94.9557V120.618L136.868 132.464L136.867 106.776Z" fill="#fff"/>
    </svg>
  );
}

/** A small maple leaf, beside where I'm based in the footer, in the text colour. */
function MapleLeaf({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="10 4 80 76" className={`shrink-0 ${className}`}>
      <polygon points="50,4 56,16 63,12 60,34 72,22 74,29 87,26 83,39 90,43 71,57 74,65 53,61 52,62 52,80 48,80 48,62 47,61 26,65 29,57 10,43 17,39 13,26 26,29 28,22 40,34 37,12 44,16" fill="currentColor" />
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
            {/* A cell of its own, the full height of the header: from xl, where the rails and the rule
                show, the same 20px either side as the menu items, so the P sits centred between them */}
            <a href="/" aria-label={site.logo} className="flex items-center self-stretch xl:px-5">
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
 * columns of links under mono headings, split by a full-height divider, then a bottom bar with the copyright
 * and a row of link cells.
 */
export function SiteFooter() {
  const elsewhere = [
    // Opens the subscribe pop-up (see SubscribePopup)
    { label: closing.newsletter.label, href: "#subscribe" },
    ...(site.linkedin ? [{ label: "LinkedIn", href: site.linkedin }] : []),
  ];
  const columns = [
    { heading: closing.pagesHeading, links: [...nav.map((n) => ({ ...n, href: `/${n.href}` })), { label: "Contact", href: site.bookingUrl }] },
    ...(livePosts.length ? [{ heading: closing.postsHeading, links: livePosts.slice(0, 3).map((p) => ({ label: p.title, href: `/blog/${p.slug}` })) }] : []),
    { heading: closing.elsewhereHeading, links: elsewhere },
  ];
  const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

  return (
    <footer className="folded rails on-dark relative mt-6 bg-accent text-white [--fold-color:rgb(255_255_255/0.16)]">
      {/* The inner side lines, as on the page */}
      <i aria-hidden className="rails-inner" />
      {/* Name and tagline, then the link columns */}
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="border-b border-grid px-4 py-10 sm:px-6 md:px-12 lg:border-r lg:border-b-0 lg:pt-14 lg:pb-10 lg:pr-12 lg:pl-20">
          {/* The name as a small mono label, then the tagline as the big line */}
          <p className="mono flex items-center gap-3 text-white/80"><i aria-hidden className="size-3 rounded-full bg-white" />{site.logo}</p>
          <p className="serif mt-5 max-w-sm text-[clamp(32px,3.2vw,44px)] leading-[1.05] tracking-[-0.04em] text-balance">{closing.tagline}</p>
        </div>
        <div className="grid gap-10 px-4 py-10 sm:grid-cols-3 sm:px-6 md:px-12 lg:pt-14 lg:pb-10 lg:pr-20 lg:pl-12">
          {columns.map((c) => (
            <nav key={c.heading} aria-label={c.heading}>
              <p className="mono text-white/50">{c.heading}</p>
              <ul className="mt-6 space-y-4">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="copy transition-colors hover:text-white/60" {...external(l.href)}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar, on the same two columns as above (from lg) so its divider is the column line: the
          copyright and where I'm based on the left, split by a full-height divider (stacked at lg, side
          by side from 1440px, where both fit before the column line), and the link cells on the right. Stacked on phones. */}
      <div className="grid border-t border-grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col text-[14px] text-white/60 sm:flex-row lg:flex-col lg:border-r lg:border-grid min-[90rem]:flex-row min-[90rem]:text-[13px]">
          <p className="flex items-center border-grid px-4 py-5 whitespace-nowrap sm:border-r sm:px-6 md:pl-12 lg:border-r-0 lg:pl-20 min-[90rem]:border-r">© {new Date().getFullYear()} {site.name}</p>
          <p className="flex flex-1 items-center gap-2 border-t border-grid px-4 py-5 sm:border-t-0 sm:border-r sm:px-6 lg:border-t lg:border-r-0 lg:pl-20 min-[90rem]:border-t-0 min-[90rem]:pl-6"><MapleLeaf className="size-3.5 shrink-0 text-white/80" />{closing.footer}</p>
        </div>
        {/* Right padding the size of the folded corner, so the last link sits clear of the cut */}
        <div className="flex border-t border-grid pr-[var(--fold)] lg:justify-end lg:border-t-0">
          {infoPages.map((l) => (
            <a key={l.label} href={l.href} className="mono grid flex-1 place-items-center border-grid px-4 py-5 transition-colors sm:px-8 not-first:border-l last:border-r hover:bg-white/5 lg:flex-none lg:border-l lg:px-10">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
