import { BtnIcons } from "./BtnIcons";
import { SocialLinks } from "./SocialLinks";

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
        {/* The newsletter signup posted to /api/subscribe, which does not
            exist — it 404'd on every page. Removed alongside the blog;
            restore both together with a real endpoint behind it. */}
        <a href="/contact" className="inline-flex btn shrink-0 self-start">
          <span className="btn-text bg-[#0E6BFF] text-white">Let&rsquo;s talk</span>
          <span className="btn-tab bg-[#0E6BFF] text-white">
            <BtnIcons />
          </span>
        </a>
      </div>
      <nav>
        <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-base">
          <li><a href="/" className="hover:opacity-60 transition-opacity">Home</a></li>
          <li><a href="/#work" className="hover:opacity-60 transition-opacity">Projects</a></li>
          <li><a href="/services" className="hover:opacity-60 transition-opacity">Services</a></li>
          <li><a href="/about" className="hover:opacity-60 transition-opacity">About</a></li>
          <li><a href="/ask-paige" className="hover:opacity-60 transition-opacity">Ask Paige</a></li>
          <li><a href="/contact" className="hover:opacity-60 transition-opacity">Contact</a></li>
        </ul>
      </nav>
      {/* Legal / copyright strip — © + legal on the left, socials
          floated to the far right on the same baseline. Extra right
          padding keeps the icons clear of the section-chamfer corner
          cut so nothing sits under the diagonal. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-sm pr-6 md:pr-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 opacity-70">
          <span>© {new Date().getFullYear()} Product Paige</span>
          <a href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</a>
          <a href="/terms" className="hover:opacity-60 transition-opacity">Terms</a>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
