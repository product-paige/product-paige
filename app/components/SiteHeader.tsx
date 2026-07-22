import { BtnIcons } from "./BtnIcons";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header
      data-section="site-header"
      className="h-[60px] flex items-stretch"
    >
      {/* Logo — always visible (acts as Home) */}
      <a
        href="/"
        className="px-6 flex items-center"
        aria-label="Product Paige — home"
      >
        <span
          className="text-[15px] text-ink whitespace-nowrap leading-none uppercase"
          style={{ fontFamily: "var(--font-press-start)" }}
        >
          Product Paige
        </span>
      </a>

      {/* Primary nav — ordered to match the homepage narrative
          (what → how → projects → who → subscribe). */}
      <ul className="hidden md:flex flex-1 items-stretch">
        <li className="flex">
          <a
            href="/services"
            className="text-base divider-indent-left px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            Services
          </a>
        </li>
        <li className="flex">
          <a
            href="/#working-style"
            className="text-base divider-indent-left px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            Process
          </a>
        </li>
        <li className="flex">
          <a
            href="/#work"
            className="text-base divider-indent-left px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            Projects
          </a>
        </li>
        <li className="flex">
          <a
            href="/blog"
            className="text-base divider-indent-left px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            Notes
          </a>
        </li>
        <li className="flex">
          <a
            href="/#about"
            className="text-base divider-indent-left divider-indent-right px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            About
          </a>
        </li>
      </ul>

      {/* Right group — secondary text link + primary pill */}
      <div className="flex items-stretch ml-auto">
        <a
          href="/ask-paige"
          className="hidden md:flex text-base divider-indent-left px-6 items-center hover:opacity-60 transition-opacity"
        >
          Ask Paige
        </a>
        <div className="hidden md:flex divider-indent-left items-center px-4">
          <a
            href="/contact"
            className="inline-flex btn"
          >
            <span className="btn-text bg-[#0E6BFF] text-white">
              Let's talk
            </span>
            <span className="btn-tab bg-[#0E6BFF] text-white">
              <BtnIcons />
            </span>
          </a>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
