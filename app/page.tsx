import { Hero } from "./components/home/Hero";
import { Capabilities } from "./components/home/Capabilities";
import { RecentWork } from "./components/home/RecentWork";
import { WorkingStyle } from "./components/home/WorkingStyle";
import { BlogRow } from "./components/home/BlogRow";

/**
 * Homepage. Each section lives in its own component under
 * components/home. Only Capabilities and RecentWork hold state, so they
 * are the only client components — this page is a Server Component.
 */
export default function Home() {
  return (
    <div className="theme contents">
      <Hero />
      <Capabilities />
      <RecentWork />
      <WorkingStyle />
      <BlogRow />
    </div>
  );
}
