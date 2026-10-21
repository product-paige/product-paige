import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import Script from "next/script";
import { site } from "@/content";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal"],
  variable: "--font-newsreader",
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
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
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
