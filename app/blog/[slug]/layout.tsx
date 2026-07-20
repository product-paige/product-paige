import type { Metadata } from "next";
import { blogPosts, blogList } from "../data";

export function generateStaticParams() {
  return blogList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.kicker,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.kicker,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: ["Paige Eaton"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.kicker,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
