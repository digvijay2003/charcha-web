import TrendingDiscussions from "@/components/home/TrendingDiscussions";
import AppShell from "@/components/layout/AppShell";

export default function Home() {
  return (
    <AppShell mode="charcha" stat="245 charchas started today · 12.4K people sharing perspectives this week">
      <TrendingDiscussions />
    </AppShell>
  );
}
