import type { Metadata } from "next";
import { Azeret_Mono, Manrope } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content";
import "./globals.css";
import { ContactDrawer } from "@/components/ContactDrawer";
import { SubscribePopup } from "@/components/SubscribePopup";

// Tiempos Text (Klim), licensed by Paige.
const serif = localFont({
  // Subset to Latin and common punctuation as woff2 (41KB, from the 300KB .otf). No italic: the
  // site sets none, so it isn't preloaded on every page.
  src: [{ path: "./fonts/TiemposText-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-tiempos",
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

// The business name first, then who runs it, so the tab and search results lead with Product Paige
const title = `${site.logo} — ${site.name}, ${site.role.toLowerCase()}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.metaDescription,
  alternates: { canonical: "/" },
  openGraph: { title, description: site.metaDescription, type: "website", siteName: site.logo, locale: "en_CA" },
  twitter: { card: "summary_large_image", title, description: site.metaDescription },
  robots: site.hideFromSearch ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      {/* Browser extensions (Grammarly and the like) add attributes to <body> before React loads;
          ignore them rather than report a hydration mismatch */}
      <body suppressHydrationWarning>
        {/* Set before hydration so scroll-reveal content doesn't flash. Without JS, nothing is hidden. */}
        <Script id="reveal-ready" strategy="beforeInteractive">
          {"document.documentElement.classList.add('reveal-ready')"}
        </Script>
        {/* The site is a sheet of paper on a gridded ground, with the dark footer as its own
            sheet below it (see .page-frame and SiteFooter). */}
        <div className="mx-auto max-w-[1440px] p-3 md:p-6">{children}</div>
        {/* The contact form, opened by any #contact link */}
        <ContactDrawer />
        {/* The newsletter sign-up, opened by any #subscribe link */}
        <SubscribePopup />
        {/* Vercel Web Analytics: cookieless page views, shown in the project's Analytics tab */}
        <Analytics />
        {/* Google Analytics, on the live site only, so local previews don't count as visits */}
        {site.gaId && process.env.NODE_ENV === "production" && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
