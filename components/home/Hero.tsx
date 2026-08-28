import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import HeroIllustration from "@/components/home/HeroIllustration";
import Avatar from "@/components/ui/Avatar";
import { activeNow } from "@/lib/mock-data";

export default function Hero() {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted">
          <Sparkles className="size-3.5 text-accent-purple" aria-hidden />
          245 new charchas started today
        </p>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[2.4rem] lg:leading-[1.12] xl:text-[2.5rem] 2xl:text-[3rem]">
          Share Thoughts.
          <br />
          <span className="charcha-gradient-text">Shape Perspectives.</span>
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          Charcha is a space for meaningful discussions, deeper understanding,
          and better arguments.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/new"
            className="charcha-gradient inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 sm:w-auto text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgb(109_61_245/0.75)] transition-all hover:-translate-y-0.5 hover:brightness-105"
          >
            <Sparkles className="size-4" aria-hidden />
            Start a Charcha
          </Link>
          <Link
            href="/explore"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 sm:w-auto text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card"
          >
            Explore Discussions
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2" aria-hidden>
            {activeNow.people.slice(0, 4).map((name) => (
              <Avatar key={name} name={name} size="sm" ring decorative />
            ))}
          </div>
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">12.4K people</span> sharing
            perspectives this week
          </p>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <HeroIllustration />
      </div>
    </section>
  );
}
