import { Sparkles } from "lucide-react";

export default function BottomBanner() {
  return (
    <section className="rounded-2xl border border-line bg-linear-to-r from-soft-purple via-soft-pink to-soft-orange px-6 py-9 text-center">
      <Sparkles className="mx-auto size-5 text-accent-purple" aria-hidden />
      <p className="charcha-gradient-text mx-auto mt-3 max-w-md text-xl font-bold tracking-tight text-balance sm:text-2xl">
        Different opinions. Better understanding. Stronger minds.
      </p>
    </section>
  );
}
