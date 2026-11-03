import type { MetadataRoute } from "next";
import { site } from "@/content";

// While the site is hidden (site.hideFromSearch), crawlers are asked to stay out entirely.
export default function robots(): MetadataRoute.Robots {
  if (site.hideFromSearch) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
