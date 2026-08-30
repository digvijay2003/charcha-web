import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Users } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import ArgumentCard from "@/components/vivaad/ArgumentCard";
import SplitBar from "@/components/vivaad/SplitBar";
import StageIndicator from "@/components/vivaad/StageIndicator";
import { formatCount } from "@/lib/format";
import {
  getVivaad,
  shift,
  sideLabels,
  vivaads,
  type Side,
} from "@/lib/vivaad-data";

// Prerender every debate at build time; the data is static.
export function generateStaticParams() {
  return vivaads.map((v) => ({ id: v.id }));
}

export async function generateMetadata(
  props: PageProps<"/vaad-vivaad/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const vivaad = getVivaad(id);

  return {
    title: vivaad ? `${vivaad.motion} — Vaad-Vivaad` : "Vaad-Vivaad",
    description: vivaad?.context,
  };
}

const columns: { side: Side; heading: string; accent: string }[] = [
  { side: "paksh", heading: "arguing for", accent: "text-accent-pink" },
  { side: "vipaksh", heading: "arguing against", accent: "text-accent-mint" },
];

export default async function VivaadArenaPage(
  props: PageProps<"/vaad-vivaad/[id]">,
) {
  // params is a promise in Next 16 (async request APIs).
  const { id } = await props.params;
  const vivaad = getVivaad(id);

  if (!vivaad) notFound();

  const byId = new Map(vivaad.args.map((a) => [a.id, a]));

  return (
    <AppShell>
      <article>
        <Link
          href="/vaad-vivaad"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          All debates
        </Link>

        <header className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-deva text-xs font-semibold text-accent-purple">
              वाद-विवाद
            </span>
            <StageIndicator stage={vivaad.stage} />
          </div>

          <h1 className="mt-3 text-xl leading-snug font-bold tracking-tight text-balance text-ink sm:text-2xl">
            {vivaad.motion}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {vivaad.context}
          </p>

          <div className="mt-5 max-w-lg">
            <SplitBar
              paksh={vivaad.currentSplit}
              shift={shift(vivaad)}
              size="lg"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" aria-hidden />
              <span className="font-semibold text-ink">
                {formatCount(vivaad.participants)}
              </span>{" "}
              arguing
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              {vivaad.closesIn}
            </span>

            <div className="ml-auto flex flex-wrap gap-2">
              <Link
                href={`/vaad-vivaad/${vivaad.id}/argue?side=paksh`}
                className="rounded-lg bg-soft-pink px-3 py-2 text-xs font-semibold text-accent-pink transition-colors hover:brightness-95"
              >
                Argue for <span className="font-deva">पक्ष</span>
              </Link>
              <Link
                href={`/vaad-vivaad/${vivaad.id}/argue?side=vipaksh`}
                className="rounded-lg bg-soft-mint px-3 py-2 text-xs font-semibold text-accent-mint transition-colors hover:brightness-95"
              >
                Argue for <span className="font-deva">विपक्ष</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Mirrored columns keep both sides on visibly equal footing. */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {columns.map(({ side, heading, accent }) => {
            const args = vivaad.args.filter((a) => a.side === side);

            return (
              <section key={side} aria-labelledby={`col-${side}`}>
                <h2
                  id={`col-${side}`}
                  className={`mb-3 text-sm font-bold ${accent}`}
                >
                  <span className="font-deva">{sideLabels[side].deva}</span>{" "}
                  {sideLabels[side].latin}
                  <span className="font-medium text-muted"> — {heading}</span>
                </h2>

                <ul className="flex flex-col gap-3">
                  {args.map((argument) => (
                    <li key={argument.id}>
                      <ArgumentCard
                        argument={argument}
                        rebutted={
                          argument.rebuts ? byId.get(argument.rebuts) : undefined
                        }
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </article>
    </AppShell>
  );
}
