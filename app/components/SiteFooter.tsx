import { BtnIcons } from "./BtnIcons";

export function SiteFooter() {
  return (
    <footer
      data-section="site-footer"
      className="bg-[#1A191E] text-white p-10 pb-6 section-chamfer relative flex flex-col gap-10"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <h2 className="text-xl md:text-2xl font-display leading-[1.15] text-white max-w-[26ch]">
          Helping ecommerce teams ship products that feel obvious
        </h2>
        <form
          action="/api/subscribe"
          method="post"
          className="flex flex-col gap-2 shrink-0 self-start w-full md:w-auto"
        >
          <label
            htmlFor="footer-email"
            className="text-lg leading-[1.4] text-[#FBFAF6]"
          >
            Get notes in your inbox
          </label>
          <div className="flex items-stretch gap-2">
            {/* Low-opacity glassy input for the dark footer — reads as a
                subtle inset field on the ink plaque, not a bright block. */}
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              placeholder="you@domain.com"
              autoComplete="email"
              className="bg-white/15 border border-white/30 focus:border-white/70 focus:bg-white/25 px-3 py-2.5 text-base leading-[1.4] text-white placeholder:text-white/50 outline-none transition-colors min-w-0 w-full md:w-64"
            />
            <button type="submit" className="inline-flex btn shrink-0">
              <span className="btn-text bg-[#0E6BFF] text-white">Subscribe</span>
              <span className="btn-tab bg-[#0E6BFF] text-white">
                <BtnIcons />
              </span>
            </button>
          </div>
        </form>
      </div>
      <nav>
        <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-base">
          <li><a href="/" className="hover:opacity-60 transition-opacity">Home</a></li>
          <li><a href="/projects" className="hover:opacity-60 transition-opacity">Projects</a></li>
          <li><a href="/about" className="hover:opacity-60 transition-opacity">About</a></li>
          <li><a href="/blog" className="hover:opacity-60 transition-opacity">Notebook</a></li>
          <li><a href="/ask-paige" className="hover:opacity-60 transition-opacity">Ask Paige</a></li>
          <li><a href="/contact" className="hover:opacity-60 transition-opacity">Contact</a></li>
        </ul>
      </nav>
      {/* Legal / copyright strip — folded into the footer plaque. */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm opacity-70">
        <span>© {new Date().getFullYear()} Product Paige</span>
        <a href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</a>
        <a href="/terms" className="hover:opacity-60 transition-opacity">Terms</a>
      </div>
    </footer>
  );
}
