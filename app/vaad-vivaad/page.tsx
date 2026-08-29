import type { Metadata } from "next";
import { Scale } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import FeedToggle from "@/components/layout/FeedToggle";
import VivaadCard from "@/components/vivaad/VivaadCard";
import { sideLabels, vivaads } from "@/lib/vivaad-data";

export const metadata: Metadata = {
  title: "Vaad-Vivaad — Charcha",
  description:
    "Timed, two-sided debates. Pick a side, make your case, and see who actually changes minds.",
};

export default function VaadVivaadPage() {
  return (
    <AppShell>
      <section aria-labelledby="vivaad-heading">
        <FeedToggle active="vivaad" />

        <div className="mt-6 rounded-2xl border border-line bg-linear-to-r from-soft-pink via-surface to-soft-mint p-5 sm:p-6">
          <h1
            id="vivaad-heading"
            className="flex flex-wrap items-baseline gap-x-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            <span className="font-deva">वाद-विवाद</span>
            <span className="text-lg text-muted sm:text-xl">Vaad-Vivaad</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            A charcha is an open question. A vivaad is a motion with two sides
            and a closing bell &mdash;{" "}
            <span className="font-semibold text-accent-pink">
              <span className="font-deva">{sideLabels.paksh.deva}</span>{" "}
              {sideLabels.paksh.latin}
            </span>{" "}
            argues for,{" "}
            <span className="font-semibold text-accent-mint">
              <span className="font-deva">{sideLabels.vipaksh.deva}</span>{" "}
              {sideLabels.vipaksh.latin}
            </span>{" "}
            argues against.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1.5 text-xs font-medium text-muted">
            <Scale className="size-3.5 text-accent-purple" aria-hidden />
            Debates are scored on minds changed, not upvotes.
          </p>
        </div>

        <ul className="mt-6 flex flex-col gap-4">
          {vivaads.map((vivaad) => (
            <li key={vivaad.id}>
              <VivaadCard vivaad={vivaad} />
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
