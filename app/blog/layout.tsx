import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on product clarity, positioning, ecommerce UX, and AI content design. Short reads for founders and product teams shipping fast.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog · Product Paige",
    description:
      "Notes on product clarity, positioning, ecommerce UX, and AI content design.",
    url: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
