import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Positioning, ecommerce UX, AI content design, and product strategy for Shopify and ecommerce teams. Two-week sprints, real artifacts, no consulting theatre.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Services · Product Paige",
    description:
      "Positioning, ecommerce UX, AI content design, and product strategy for Shopify and ecommerce teams.",
    url: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
