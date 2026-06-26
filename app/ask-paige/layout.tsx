import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Paige — One focused session for product clarity",
  description:
    "A $250 session for product feedback, UX review, homepage critique, or AI product strategy. Async + live + a short prioritized list. No consulting theatre.",
  alternates: { canonical: "/ask-paige" },
  openGraph: {
    type: "website",
    title: "Ask Paige — One focused session for product clarity",
    description:
      "Send what you're working on. Get honest, product-minded feedback fast — without the consulting theatre.",
    url: "/ask-paige",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask Paige — One focused session for product clarity",
    description:
      "$250 / one session. Async review + live conversation + a short prioritized list.",
  },
};

export default function AskPaigeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
