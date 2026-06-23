export function SiteFooter() {
  return (
    <footer
      data-section="site-footer"
      className="p-12 mx-3 md:mx-6 grid md:grid-cols-12 gap-6"
    >
      <div className="md:col-span-4 flex flex-col gap-3">
        <p className="eyebrow opacity-60">Colophon</p>
        <p className="font-display text-lg leading-[1.3] max-w-[320px]">
          Product strategy + UX for small teams.
        </p>
        <p className="text-sm leading-[1.55] opacity-80 max-w-[320px]">
          Tools change. Clear thinking stays.
        </p>
      </div>
      <nav className="md:col-span-3 md:col-start-6 flex flex-col gap-3">
        <p className="eyebrow opacity-60">Sections</p>
        <ul className="flex flex-col gap-1">
          <li><a href="/#work" className="hover:opacity-60">Selected work</a></li>
          <li><a href="/#blog" className="hover:opacity-60">Blog</a></li>
          <li><a href="/#capabilities" className="hover:opacity-60">Capabilities</a></li>
          <li><a href="/ask-paige" className="hover:opacity-60">Ask Paige</a></li>
        </ul>
      </nav>
      <nav className="md:col-span-3 md:col-start-10 flex flex-col gap-3">
        <p className="eyebrow opacity-60">Elsewhere</p>
        <ul className="flex flex-col gap-1">
          <li><a href="https://productpaige.com/compass" className="hover:opacity-60">The compass</a></li>
          <li><a href="https://twitter.com/productpaige" className="hover:opacity-60">Twitter</a></li>
          <li><a href="https://linkedin.com/in/productpaige" className="hover:opacity-60">LinkedIn</a></li>
        </ul>
      </nav>
    </footer>
  );
}
