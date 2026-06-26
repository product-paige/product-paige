export function SiteFooter() {
  return (
    <footer
      data-section="site-footer"
      className="p-10 flex flex-col gap-8"
    >
      <p className="type-card-title max-w-[420px]">
        Product-led marketing + UX design for Shopify and ecommerce teams.
      </p>
      <div className="flex flex-wrap items-baseline justify-between gap-4 pt-6 border-t border-[#1a1a1a]/20">
        <nav>
          <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 type-body-sm">
            <li><a href="/" className="hover:opacity-60">Home</a></li>
            <li><a href="/services" className="hover:opacity-60">Services</a></li>
            <li><a href="/#work" className="hover:opacity-60">Projects</a></li>
            <li><a href="/#about" className="hover:opacity-60">About</a></li>
            <li><a href="/ask-paige" className="hover:opacity-60">Ask Paige</a></li>
            <li><a href="/contact" className="hover:opacity-60">Contact</a></li>
            <li><a href="/privacy" className="hover:opacity-60 opacity-60">Privacy</a></li>
            <li><a href="/terms" className="hover:opacity-60 opacity-60">Terms</a></li>
          </ul>
        </nav>
        <p className="type-body-sm opacity-60">© Product Paige</p>
      </div>
    </footer>
  );
}
