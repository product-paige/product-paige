import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteMasthead } from "./components/SiteMasthead";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { SiteBottomBar } from "./components/SiteBottomBar";
import { SectionDivider } from "./components/SectionDivider";

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
  title: "Product Paige — Product strategy for founders in the age of AI",
  description:
    "I'm Paige, a product strategist helping founders ship real products in the age of AI. Strategy, coaching, and operating frameworks for technical founders.",
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
      <body>
        <div className="page-grid" aria-hidden="true" />
        <div className="page-borders" aria-hidden="true">
          <span className="page-border page-border-left" />
          <span className="page-border page-border-right" />
        </div>
        <div className="text-[#1a1a1a]">
          <SiteMasthead />
          <SectionDivider />
          <SiteHeader />
          <SectionDivider />
          {children}
          <SectionDivider />
          <SiteFooter />
          <SectionDivider />
          <SiteBottomBar />
        </div>
      </body>
    </html>
  );
}
