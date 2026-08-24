import { Hero } from "./components/home/Hero";
import { Capabilities } from "./components/home/Capabilities";
import { RecentWork } from "./components/home/RecentWork";
import { WorkingStyle } from "./components/home/WorkingStyle";
import { ClosingCTA } from "./components/ClosingCTA";

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
      {/* The blog row used to close the page; without it the homepage had
          no call to action at the end. */}
      <ClosingCTA
        title="Have something you're shipping?"
        body="Tell me what you're working on and where it's getting stuck. I'll come back with what stands out and where to start."
      />
    </div>
  );
}
