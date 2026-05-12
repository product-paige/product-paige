import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en" className={`${funnelSans.variable} ${tiempos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
