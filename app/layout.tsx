import type { Metadata } from "next";
import { Azeret_Mono, Caveat, Manrope } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { site } from "@/content";
import "./globals.css";
import { PaletteSwitcher } from "@/components/PaletteSwitcher";

// Tiempos Text (Klim), licensed by Paige.
const serif = localFont({
  src: [
    { path: "./fonts/TiemposText-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/TiemposText-RegularItalic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-tiempos",
});

// Handwriting, for the note on the About photo.
const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

// Mono, uppercase and tracked: nav, buttons and small labels.
const mono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.metaDescription,
  openGraph: { title, description: site.metaDescription, type: "website" },
  robots: site.hideFromSearch ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${hand.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* Set before hydration so scroll-reveal content doesn't flash. Without JS, nothing is hidden. */}
        <Script id="reveal-ready" strategy="beforeInteractive">
          {"document.documentElement.classList.add('reveal-ready')"}
        </Script>
        {/* The site is a sheet of paper on a gridded ground, with the dark footer as its own
            sheet below it (see .page-frame and SiteFooter). */}
        <div className="mx-auto max-w-[1440px] p-3 md:p-6">{children}</div>
        {/* Temporary: try the colour palettes */}
        <PaletteSwitcher />
      </body>
    </html>
  );
}
