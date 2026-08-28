import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

import DiscussionCard from "@/components/home/DiscussionCard";
import { discussions } from "@/lib/mock-data";

export default function TrendingDiscussions() {
  return (
    <section aria-labelledby="trending-heading">
      <div className="mb-4 flex items-center gap-3">
        <h2
          id="trending-heading"
          className="flex items-center gap-2 text-base font-bold tracking-tight text-ink sm:text-lg"
        >
          <Flame className="size-5 text-accent-orange" aria-hidden />
          Trending Discussions
        </h2>
        <Link
          href="/explore"
          className="group ml-auto inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent-purple transition-colors hover:text-brand"
        >
          View all
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>

      <ul className="flex flex-col gap-4">
        {discussions.map((discussion) => (
          <li key={discussion.id}>
            <DiscussionCard discussion={discussion} />
          </li>
        ))}
      </ul>
    </section>
  );
}
