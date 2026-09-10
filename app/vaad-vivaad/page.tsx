import type { Metadata } from "next";

import AppShell from "@/components/layout/AppShell";
import VivaadCard from "@/components/vivaad/VivaadCard";
import { vivaads } from "@/lib/vivaad-data";

export const metadata: Metadata = {
  title: "Vaad-Vivaad — Charcha",
  description:
    "Timed, two-sided debates. Pick a side, make your case, and see who actually changes minds.",
};

export default function VaadVivaadPage() {
  return (
    <AppShell
      mode="vivaad"
      stat={`${vivaads.length} debates open · pick a side, then make your case`}
    >
      <section aria-labelledby="open-debates">
        <h2 id="open-debates" className="sr-only">
          Open debates
        </h2>
        <ul className="flex flex-col gap-4">
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
