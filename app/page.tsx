import FeedTabs from "@/components/home/FeedTabs";
import TrendingDiscussions from "@/components/home/TrendingDiscussions";
import AppShell from "@/components/layout/AppShell";

export default function Home() {
  return (
    <AppShell mode="charcha" stat="245 charchas started today · 12.4K people sharing perspectives this week">
      <div className="flex flex-col gap-5">
        <FeedTabs />
        <TrendingDiscussions />
      </div>
    </AppShell>
  );
}
