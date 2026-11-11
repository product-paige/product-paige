import { about, approachPage, blog, liveProjects, projects, services, site } from "@/content";

// A plain-text summary of the site for AI assistants (the llms.txt convention), built from
// the same copy as the pages so it never drifts.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.logo}`,
    "",
    `> ${site.metaDescription}`,
    "",
    about.body,
    "",
    `## ${services.eyebrow}`,
    ...approachPage.phases.map((p) => `- ${p.title}: ${p.body}`),
    "",
    `## ${projects.eyebrow}`,
    ...liveProjects.map((p) => `- [${p.client}](${site.url}/projects/${p.slug}): ${p.summary}`),
    "",
    `## ${blog.eyebrow}`,
    ...blog.posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.standfirst ?? p.excerpt}`),
    "",
    "## Contact",
    `- Email: ${site.email}`,
    `- Based in ${site.location}, working remotely`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
