import type { Metadata } from "next";
import { EyeOff } from "lucide-react";

import GuptCard from "@/components/gupt/GuptCard";
import PrivacyNotice from "@/components/gupt/PrivacyNotice";
import SupportNote from "@/components/gupt/SupportNote";
import AppShell from "@/components/layout/AppShell";
import { guptPosts } from "@/lib/gupt-data";

export const metadata: Metadata = {
  title: "Gupt-Charcha — Charcha",
  description:
    "Say what you cannot say under your own name. Thread-scoped anonymity, no profiles, no followers.",
};

export default function GuptCharchaPage() {
  return (
    <AppShell mode="gupt" stat="38 threads today · nothing here is linked to your account">
      <section aria-labelledby="gupt-threads">
        <h2 id="gupt-threads" className="sr-only">
          Anonymous threads
        </h2>

        <ul className="flex flex-wrap gap-2">
          {["No profiles", "No followers", "New handle every thread", "Threads expire"].map(
            (rule) => (
              <li
                key={rule}
                className="inline-flex items-center gap-1.5 rounded-full bg-soft-gupt px-3 py-1.5 text-xs font-medium text-gupt"
              >
                <EyeOff className="size-3" aria-hidden />
                {rule}
              </li>
            ),
          )}
        </ul>

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
