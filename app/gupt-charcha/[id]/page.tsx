import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import AnonHandle from "@/components/gupt/AnonHandle";
import BeenThereButton from "@/components/gupt/BeenThereButton";
import SupportNote from "@/components/gupt/SupportNote";
import AppShell from "@/components/layout/AppShell";
import { getGuptPost, guptCategories, guptPosts } from "@/lib/gupt-data";

export function generateStaticParams() {
  return guptPosts.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/gupt-charcha/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const post = getGuptPost(id);
  return {
    title: post ? `${post.title} — Gupt-Charcha` : "Gupt-Charcha",
  };
}

export default async function GuptThreadPage(
  props: PageProps<"/gupt-charcha/[id]">,
) {
  const { id } = await props.params;
  const post = getGuptPost(id);

  if (!post) notFound();

  const { label, icon: Icon } = guptCategories[post.category];

  return (
    <AppShell mode="gupt" showRoomHeader={false}>
      <article>
        <Link
          href="/gupt-charcha"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          All threads
        </Link>

        <header className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <AnonHandle handle={post.handle} size="md" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-gupt px-2.5 py-1 text-[11px] font-semibold text-gupt">
              <Icon className="size-3" aria-hidden />
              {label}
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-muted">
              <Clock className="size-3" aria-hidden />
              {post.expiresIn}
            </span>
          </div>

          <h1 className="mt-4 text-xl leading-snug font-bold tracking-tight text-balance text-ink sm:text-2xl">
            {post.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/85">
            {post.body}
          </p>

          <div className="mt-5 border-t border-line pt-4">
            <BeenThereButton count={post.beenThere} />
          </div>
        </header>

        {/* Replies are experiences, not advice. The heading sets that norm
            before anyone starts typing. */}
        <section aria-labelledby="perspectives" className="mt-8">
          <h2
            id="perspectives"
            className="text-sm font-bold tracking-tight text-ink"
          >
            What happened to other people
          </h2>
          <p className="mt-1 text-xs text-muted">
            Not advice. {post.perspectiveCount} people shared their own
            experience.
          </p>

          <ul className="mt-4 flex flex-col gap-3">
            {post.perspectives.map((p) => (
              <li key={p.id}>
                <article className="rounded-2xl border border-line bg-surface p-4 shadow-card">
                  <AnonHandle handle={p.handle} />
                  <p className="mt-3 text-sm leading-relaxed text-ink/90">
                    {p.body}
                  </p>
                  <div className="mt-3">
                    <BeenThereButton count={p.beenThere} compact />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6">
          <SupportNote />
        </div>
      </article>
    </AppShell>
  );
}
