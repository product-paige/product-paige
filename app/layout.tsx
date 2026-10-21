import type { Metadata } from "next";
import { Azeret_Mono, Manrope } from "next/font/google";
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

// Dates and small labels on the scrapbook and project cards.
const mono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
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
