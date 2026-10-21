import type { Metadata } from "next";
import { Caveat, Manrope } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { site } from "@/content";
import "./globals.css";

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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${hand.variable}`} suppressHydrationWarning>
      <body>
        {/* Set before hydration so scroll-reveal content doesn't flash. Without JS, nothing is hidden. */}
        <Script id="reveal-ready" strategy="beforeInteractive">
          {"document.documentElement.classList.add('reveal-ready')"}
        </Script>
        {children}
      </body>
    </html>
  );
}
