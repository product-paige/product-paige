export function SiteFooter() {
  return (
    <footer
      data-section="site-footer"
      className="px-6 md:px-10 pt-12 md:pt-16 pb-6 md:pb-8 mx-3 md:mx-6"
    >
      <div className="pt-6">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <p className="eyebrow opacity-60 mb-3">Colophon</p>
            <p className="font-display text-lg leading-[1.3] mb-3 max-w-[320px]">
              Product strategy + UX for small teams.
            </p>
            <p className="text-sm leading-[1.55] opacity-80 max-w-[320px]">
              Tools change. Clear thinking stays.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-6">
            <p className="eyebrow opacity-60 mb-3">Sections</p>
            <ul className="space-y-1">
              <li>
                <a href="/#work" className="hover:opacity-60">
                  Selected work
                </a>
              </li>
              <li>
                <a href="/#playbooks" className="hover:opacity-60">
                  Playbooks
                </a>
              </li>
              <li>
                <a href="/#capabilities" className="hover:opacity-60">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:opacity-60">
                  On the practice
                </a>
              </li>
              <li>
                <a href="/ask-paige" className="hover:opacity-60">
                  Ask Paige
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <p className="eyebrow opacity-60 mb-3">Elsewhere</p>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://productpaige.com/compass"
                  className="hover:opacity-60"
                >
                  The compass
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/productpaige"
                  className="hover:opacity-60"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/productpaige"
                  className="hover:opacity-60"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
