import { ShieldCheck } from "lucide-react";

/**
 * Their blueprint warns that a post may contain identifying details. Showing
 * the exact redaction instead of a generic warning is the difference between
 * a scary dialog people dismiss and one they act on.
 */
export default function PrivacyNotice() {
  return (
    <section
      aria-labelledby="privacy-demo"
      className="rounded-2xl border border-line bg-surface p-5 shadow-card"
    >
      <h2
        id="privacy-demo"
        className="flex items-center gap-2 text-sm font-bold text-ink"
      >
        <ShieldCheck className="size-4 text-gupt" aria-hidden />
        Privacy check runs before anything is posted
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">
        Names, employers and locations are found and shown to you as an exact
        redaction. Nothing is published until you choose.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-canvas p-3">
          <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
            You wrote
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            My manager{" "}
            <mark className="rounded bg-soft-orange px-1 text-accent-orange">
              Rahul Sharma
            </mark>{" "}
            at{" "}
            <mark className="rounded bg-soft-orange px-1 text-accent-orange">
              Vertex Systems, Pune
            </mark>{" "}
            keeps taking credit for my work.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-canvas p-3">
          <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
            Will be posted as
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            My manager{" "}
            <span className="rounded bg-soft-gupt px-1 text-gupt">
              [my manager]
            </span>{" "}
            at{" "}
            <span className="rounded bg-soft-gupt px-1 text-gupt">
              [my company]
            </span>{" "}
            keeps taking credit for my work.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-lg bg-soft-gupt px-3 py-1.5 text-xs font-semibold text-gupt">
          Post redacted version
        </span>
        <span className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted">
          Edit myself
        </span>
        <span className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted">
          Post as written
        </span>
      </div>
    </section>
  );
}
