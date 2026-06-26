import type { Metadata } from "next";
import { playbooks, playbookList } from "../data";

export function generateStaticParams() {
  return playbookList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const playbook = playbooks[slug];
  if (!playbook) return { title: "Playbook not found" };
  return {
    title: playbook.title,
    description: playbook.kicker,
    alternates: { canonical: `/playbooks/${slug}` },
    openGraph: {
      type: "article",
      title: playbook.title,
      description: playbook.kicker,
      url: `/playbooks/${slug}`,
      publishedTime: playbook.date,
      authors: ["Paige Harris"],
    },
    twitter: {
      card: "summary_large_image",
      title: playbook.title,
      description: playbook.kicker,
    },
  };
}

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
