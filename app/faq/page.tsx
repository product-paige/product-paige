import type { Metadata } from "next";
import { faq, site } from "@/content";
import { Faq } from "@/components/Faq";
import { InfoPage } from "@/components/InfoPage";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `${faq.label} · ${site.logo}`,
  description: faq.body,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      {/* The questions and answers, for search engines and AI assistants */}
      <JsonLd data={{ "@type": "FAQPage", mainEntity: faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <InfoPage current="faq" label={faq.label} heading={faq.heading} lede={faq.body}>
        <Faq items={faq.items.map((f) => ({ q: f.q, a: <p className="max-w-[65ch] leading-relaxed">{f.a}</p> }))} />
        <p className="mt-10">
          Something else? Email <a href={`mailto:${site.email}`} className="link">{site.email}</a>
        </p>
      </InfoPage>
    </>
  );
}
