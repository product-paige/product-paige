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
          <li><a href="/#work" className="hover:opacity-60 transition-opacity">Projects</a></li>
          <li><a href="/about" className="hover:opacity-60 transition-opacity">About</a></li>
          <li><a href="/blog" className="hover:opacity-60 transition-opacity">Notebook</a></li>
          <li><a href="/ask-paige" className="hover:opacity-60 transition-opacity">Ask Paige</a></li>
          <li><a href="/contact" className="hover:opacity-60 transition-opacity">Contact</a></li>
        </ul>
      </nav>
      {/* Legal / copyright strip — © + legal on the left, social icons
          floated to the right of the same row. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-sm">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 opacity-70">
          <span>© {new Date().getFullYear()} Product Paige</span>
          <a href="/privacy" className="hover:opacity-60 transition-opacity">Privacy</a>
          <a href="/terms" className="hover:opacity-60 transition-opacity">Terms</a>
        </div>
        <ul className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="block text-white/70 hover:text-white transition-colors"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

const SOCIALS: Array<{ name: string; href: string; icon: React.ReactNode }> = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/paigeaharris/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/product-paige",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@productpaige",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M232,84v40a12,12,0,0,1-12,12,108.62,108.62,0,0,1-52-13.19V168A76,76,0,1,1,80,93.34V136a12,12,0,0,1-16,11.3A20,20,0,1,0,92,166V32a12,12,0,0,1,12-12h40a12,12,0,0,1,12,12,52.06,52.06,0,0,0,52,52A12,12,0,0,1,220,96v-4A56.06,56.06,0,0,1,168,36V32h-32V166a44,44,0,1,1-56-42.32V104A52,52,0,0,0,104,208a52.06,52.06,0,0,0,52-52V96a12,12,0,0,1,19.2-9.6A84.53,84.53,0,0,0,220,108.65V104A76.08,76.08,0,0,1,168,32V28H144V166a20,20,0,1,1-20-20,12,12,0,0,1,0,24,4,4,0,1,0,4-4V32a4,4,0,0,0-4-4H104a4,4,0,0,0-4,4v134a68,68,0,1,0,68-68,12,12,0,0,1,0-24A92.14,92.14,0,0,0,220,120a4,4,0,0,0,4-4V88a4,4,0,0,0-4-4A60.07,60.07,0,0,1,160,24V20a4,4,0,0,0-4-4H120a4,4,0,0,0-4,4V178a28,28,0,1,1-28-28,12,12,0,0,1,0,24,4,4,0,1,0,4-4V88a4,4,0,0,0-4-4A76.08,76.08,0,0,0,12,160a76.08,76.08,0,0,0,76,76,76.09,76.09,0,0,0,76-76V115.05A122.66,122.66,0,0,0,220,128a12,12,0,0,0,12-12V84Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/pa1ge",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.29l62.6,98.38L42.08,210.62a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
      </svg>
    ),
  },
];
