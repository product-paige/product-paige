import type { Metadata } from "next";
import { legal, site } from "@/content";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `${legal.terms.label} · ${site.name}`,
  description: legal.terms.lede,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage doc={legal.terms} />;
}
