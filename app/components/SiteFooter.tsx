export function SiteFooter() {
  return (
    <footer
      data-section="site-footer"
      className="p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
    >
      <p className="text-xl font-display leading-[1.1] text-ink">
        Helping ecommerce teams ship products that feel obvious.
      </p>
      <nav>
        <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-base md:justify-end">
          <li><a href="/" className="hover:opacity-60">Home</a></li>
          <li><a href="/services" className="hover:opacity-60">Services</a></li>
          <li><a href="/#work" className="hover:opacity-60">Projects</a></li>
          <li><a href="/blog" className="hover:opacity-60">Notes</a></li>
          <li><a href="/#about" className="hover:opacity-60">About</a></li>
          <li><a href="/ask-paige" className="hover:opacity-60">Ask Paige</a></li>
          <li><a href="/contact" className="hover:opacity-60">Contact</a></li>
        </ul>
      </nav>
    </footer>
  );
}
