import type { Metadata } from "next";
import { EyeOff } from "lucide-react";

import GuptCard from "@/components/gupt/GuptCard";
import PrivacyNotice from "@/components/gupt/PrivacyNotice";
import SupportNote from "@/components/gupt/SupportNote";
import AppShell from "@/components/layout/AppShell";
import FeedToggle from "@/components/layout/FeedToggle";
import { guptPosts } from "@/lib/gupt-data";

export const metadata: Metadata = {
  title: "Gupt-Charcha — Charcha",
  description:
    "Say what you cannot say under your own name. Thread-scoped anonymity, no profiles, no followers.",
};

export default function GuptCharchaPage() {
  return (
    <AppShell>
      <section aria-labelledby="gupt-heading">
        <FeedToggle active="gupt" />

        {/* No brand colour here by design: anonymity as the absence of identity. */}
        <div className="mt-6 rounded-2xl border border-line bg-surface-2 p-5 sm:p-6">
          <h1
            id="gupt-heading"
            className="flex flex-wrap items-baseline gap-x-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            <span className="font-deva">गुप्त-चर्चा</span>
            <span className="text-lg text-muted sm:text-xl">Gupt-Charcha</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Express without fear, but not without responsibility. Your handle is
            generated per thread, so nothing you write here can be linked to
            anything else you write.
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {[
              "No profiles",
              "No followers",
              "New handle every thread",
              "Threads expire",
            ].map((rule) => (
              <li
                key={rule}
                className="inline-flex items-center gap-1.5 rounded-full bg-soft-gupt px-3 py-1.5 text-xs font-medium text-gupt"
              >
                <EyeOff className="size-3" aria-hidden />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <SupportNote />
        </div>

        <ul className="mt-6 flex flex-col gap-4">
          {guptPosts.map((post) => (
            <li key={post.id}>
              <GuptCard post={post} />
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <PrivacyNotice />
        </div>
      </section>
    </AppShell>
  );
}
