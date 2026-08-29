import Hero from "@/components/home/Hero";
import TrendingDiscussions from "@/components/home/TrendingDiscussions";
import AppShell from "@/components/layout/AppShell";
import FeedToggle from "@/components/layout/FeedToggle";

export default function Home() {
  return (
    <AppShell>
      <Hero />

      <div>
        <FeedToggle active="charcha" />
        <div className="mt-6">
          <TrendingDiscussions />
        </div>
      </div>
    </AppShell>
  );
}
