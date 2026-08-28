import BottomBanner from "@/components/home/BottomBanner";
import Hero from "@/components/home/Hero";
import TrendingDiscussions from "@/components/home/TrendingDiscussions";
import MobileNav from "@/components/layout/MobileNav";
import RightRail from "@/components/layout/RightRail";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import WidgetStack from "@/components/widgets/WidgetStack";

export default function Home() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1500px] items-start">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Topbar />

          <main className="px-4 pt-6 pb-28 sm:px-6 lg:px-8 lg:pb-14">
            <div className="mx-auto flex max-w-4xl flex-col gap-12 xl:max-w-none">
              <Hero />
              <TrendingDiscussions />

              {/* The rail is hidden below xl, so its widgets fold into the feed. */}
              <div className="grid items-start gap-4 sm:grid-cols-2 xl:hidden">
                <WidgetStack idSuffix="-inline" />
              </div>

              <BottomBanner />
            </div>
          </main>
        </div>

        <RightRail />
      </div>

      <MobileNav />
    </>
  );
}
