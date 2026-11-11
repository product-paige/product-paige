import type { MetadataRoute } from "next";
import { blog, liveProjects, site } from "@/content";

/** Every page: the homepage, each project and post, and the legal pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified?: string) => ({ url: `${site.url}${path}`, ...(lastModified && { lastModified: new Date(lastModified) }) });
  return [
    page("/"),
    ...liveProjects.map((p) => page(`/projects/${p.slug}`)),
    ...blog.posts.map((p) => page(`/blog/${p.slug}`, p.date)),
    page("/privacy"),
    page("/terms"),
    page("/faq"),
  ];
}
