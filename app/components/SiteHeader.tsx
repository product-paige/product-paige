import { BtnIcons } from "./BtnIcons";

export function SiteHeader() {
  return (
    <header
      data-section="site-header"
      className="h-12 flex items-stretch mx-3 md:mx-6"
    >
      {/* Logo — always visible */}
      <a
        href="/"
        className="px-4 sm:px-6 md:px-10 flex items-center font-display text-xl md:text-2xl leading-none whitespace-nowrap"
      >
        Product Paige
      </a>

      {/* Primary nav — hidden on small screens */}
      <ul className="hidden md:flex flex-1 items-stretch">
        <li className="flex">
          <a
            href="/#work"
            className="nav-link divider-indent-left px-4 lg:px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            
            Projects
          </a>
        </li>
        <li className="flex">
          <a
            href="/#services"
            className="nav-link divider-indent-left px-4 lg:px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            
            Services
          </a>
        </li>
        <li className="flex">
          <a
            href="/#about"
            className="nav-link divider-indent-left px-4 lg:px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            
            About
          </a>
        </li>
        <li className="flex">
          <a
            href="https://productpaige.com/playbooks"
            className="nav-link divider-indent-left divider-indent-right px-4 lg:px-6 flex items-center hover:opacity-60 transition-opacity"
          >
            
            Playbooks
          </a>
        </li>
      </ul>

      {/* Right group — secondary text link + primary pill */}
      <div className="flex items-stretch ml-auto">
        <a
          href="/ask-paige"
          className="hidden md:flex nav-link divider-indent-left px-4 lg:px-6 items-center hover:opacity-60 transition-opacity"
        >
          
          Ask Paige
        </a>
        <div className="divider-indent-left flex items-center pl-3 pr-3 md:pl-4 md:pr-6">
          <a
            href="mailto:hello@productpaige.com?subject=Start%20a%20project"
            className="inline-flex btn"
          >
            <span className="btn-text bg-[#e8252d] text-white">
              Start a project
            </span>
            <span className="btn-tab bg-[#e8252d] text-white">
              <BtnIcons />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
