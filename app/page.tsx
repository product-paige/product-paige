import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming soon",
  description:
    "Product Paige is being redesigned. Back shortly. In the meantime, reach me at hello@productpaige.com.",
  robots: { index: false, follow: false },
};

/**
 * Temporary coming-soon homepage while the site is being redesigned.
 *
 * The `coming-soon` class on the wrapper hides the masthead, nav and
 * footer via a rule in globals.css, so the page stands alone without
 * touching the root layout.
 *
 * To restore the real homepage: git checkout HEAD~1 -- app/page.tsx
 * (and remove the body:has(.coming-soon) block in globals.css).
 */
export default function ComingSoon() {
  return (
    <div className="theme coming-soon">
      <section
        data-section="coming-soon"
        className="min-h-[calc(100vh-48px)] flex items-center justify-center p-6 md:p-10"
        style={{
          backgroundColor: "#0E6BFF",
          backgroundImage: [
            "linear-gradient(to right, rgba(255,255,255,0.55) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgba(255,255,255,0.55) 1px, transparent 1px)",
            "linear-gradient(to right, rgba(255,255,255,0.18) 0.5px, transparent 0.5px)",
            "linear-gradient(to bottom, rgba(255,255,255,0.18) 0.5px, transparent 0.5px)",
          ].join(","),
          backgroundSize: "30px 30px, 30px 30px, 6px 6px, 6px 6px",
        }}
      >
        {/* Paper card with the site's chamfered cutout corner, sitting on
            the blueprint grid. */}
        <div className="section-chamfer bg-[#FBFAF6] w-full max-w-[760px] p-10 md:p-16 flex flex-col gap-8">
          <span className="type-eyebrow">Product Paige</span>

          <div className="flex flex-col gap-5">
            <h1 className="text-display font-display text-ink max-w-[16ch]">
              Coming soon
            </h1>
            <p className="text-lg leading-[1.5] opacity-80 max-w-[52ch]">
              I&rsquo;m in the middle of a redesign. The site will be back
              shortly with new work and a few things I&rsquo;ve been meaning
              to write down.
            </p>
          </div>

          <a
            href="mailto:hello@productpaige.com"
            className="text-lg text-ink underline underline-offset-4 decoration-[#0E6BFF] decoration-2 hover:opacity-70 transition-opacity self-start"
          >
            hello@productpaige.com
          </a>
        </div>
      </section>
    </div>
  );
}
