import type { Metadata, Viewport } from "next";
import { Funnel_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { SiteBottomBar } from "./components/SiteBottomBar";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const tiempos = localFont({
  variable: "--font-tiempos",
  src: [
    {
      path: "./fonts/tiempos-text-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  src: [
    {
      path: "./fonts/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://productpaige.com"),
  title: {
    default: "Product Paige — Product marketing + UX design for Shopify teams",
    template: "%s · Product Paige",
  },
  description:
    "13 years inside the Shopify and ecommerce ecosystem. I help app makers, DTC brands, and ecommerce SaaS sharpen positioning, fix onboarding, and ship product people actually understand.",
  keywords: [
    "Shopify app design",
    "ecommerce UX",
    "product marketing",
    "Shopify product strategy",
    "DTC product design",
    "onboarding design",
    "positioning",
    "product narrative",
  ],
  authors: [{ name: "Paige Harris", url: "https://productpaige.com" }],
  creator: "Paige Harris",
  publisher: "Product Paige",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://productpaige.com",
    siteName: "Product Paige",
    title: "Product Paige — Product marketing + UX design for Shopify teams",
    description:
      "Sharper positioning and a story buyers can repeat. The product lands in eight seconds — to merchants, not just to you.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Product Paige",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Paige — Product marketing + UX design for Shopify teams",
    description:
      "13 years inside the Shopify and ecommerce ecosystem. Sharper positioning, cleaner onboarding, product people actually understand.",
    images: ["/og-image.webp"],
    creator: "@productpaige",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "design",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A191E",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${funnelSans.variable} ${tiempos.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        {/* JSON-LD structured data — Person + Website for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://productpaige.com/#paige",
                  name: "Paige Harris",
                  url: "https://productpaige.com",
                  jobTitle: "Product Marketer & UX Designer",
                  description:
                    "Product-led marketer and UX designer with 13 years inside the Shopify and ecommerce ecosystem.",
                  knowsAbout: [
                    "Shopify",
                    "ecommerce",
                    "product marketing",
                    "UX design",
                    "onboarding",
                    "positioning",
                  ],
                  sameAs: ["https://productpaige.com"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://productpaige.com/#website",
                  url: "https://productpaige.com",
                  name: "Product Paige",
                  description:
                    "Product marketing + UX design for Shopify and ecommerce teams.",
                  publisher: { "@id": "https://productpaige.com/#paige" },
                },
              ],
            }),
          }}
        />
        <div
          data-layer="page-wrapper"
          className="text-ink mx-auto max-w-[1440px] p-3 md:p-6"
        >
          <div
            data-layer="content-frame"
            className="bg-[#fbfaf6] page-content-frame"
          >
            <div data-layer="site-header-wrap" className="section-border-b">
              <SiteHeader />
            </div>
            <main data-layer="page-content">{children}</main>
            <div data-layer="site-footer-wrap" className="section-border-b">
              <SiteFooter />
            </div>
            <SiteBottomBar />
          </div>
        </div>
      </body>
    </html>
  );
}
