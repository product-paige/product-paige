import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a link, a screenshot, or the half-finished idea you can't see clearly yet. You'll hear back fast — without the consulting theatre.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact · Product Paige",
    description:
      "Send a link, a screenshot, or the half-finished idea you can't see clearly yet.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
