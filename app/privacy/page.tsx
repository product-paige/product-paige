import type { Metadata } from "next";
import { legal, site } from "@/content";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `${legal.privacy.label} · ${site.logo}`,
  description: legal.privacy.lede,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage doc={legal.privacy} />;
}
