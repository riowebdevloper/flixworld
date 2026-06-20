import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, Sparkles } from "lucide-react";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "FlixWorld Premium — Ad-free 4K Streaming" },
      { name: "description", content: "Go Premium for ad-free streaming, 4K HDR quality, offline downloads, and early access on FlixWorld.fun." },
      { property: "og:title", content: "FlixWorld Premium — Ad-free 4K Streaming" },
      { property: "og:description", content: "Unlock 4K HDR, offline downloads, and an ad-free experience." },
      { property: "og:url", content: "/premium" },
    ],
    links: [{ rel: "canonical", href: "/premium" }],
  }),
  component: PremiumPage,
});

const TIERS = [
  {
    name: "Basic",
    price: "Free",
    sub: "Forever",
    perks: ["HD streaming", "Watchlist & favorites", "All categories", "Ads included"],
    cta: "Current plan",
    href: "/",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$7.99",
    sub: "/month",
    perks: ["Everything in Basic", "4K HDR streaming", "Ad-free experience", "Offline downloads", "2 simultaneous screens"],
    cta: "Upgrade to Premium",
    href: "/auth",
    highlight: true,
  },
  {
    name: "Family",
    price: "$14.99",
    sub: "/month",
    perks: ["Everything in Premium", "Up to 5 profiles", "4 simultaneous screens", "Kids mode", "Priority support"],
    cta: "Go Family",
    href: "/auth",
    highlight: false,
  },
];

function PremiumPage() {
  return (
    <div className="pt-6 px-4 sm:px-6 lg:px-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-primary font-bold">
          <Crown className="h-3.5 w-3.5" /> FlixWorld Premium
        </span>
        <h1 className="mt-4 text-display text-5xl sm:text-6xl font-bold text-white">
          Stream <span className="gradient-text-accent">without limits</span>.
        </h1>
        <p className="mt-4 text-white/70 text-lg">
          Ad-free, 4K HDR, and downloadable. The full FlixWorld, the way it was meant to be watched.
        </p>
      </div>

      <div className="mt-12 grid gap-6 max-w-5xl mx-auto md:grid-cols-3">
        {TIERS.map((t) => (
          <div key={t.name} className={`relative glass rounded-2xl p-6 ${t.highlight ? "ring-2 ring-primary shadow-[var(--shadow-glow)]" : ""}`}>
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Most popular
              </span>
            )}
            <h2 className="text-display text-2xl font-bold text-white">{t.name}</h2>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{t.price}</span>
              <span className="text-white/60 text-sm">{t.sub}</span>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
            <Link to={t.href} className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition ${
              t.highlight ? "bg-primary text-white shadow-[var(--shadow-glow)] hover:scale-[1.02]"
                          : "glass text-white hover:bg-white/10"
            }`}>{t.cta}</Link>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-white/40 mt-10">Cancel anytime. Taxes may apply. Demo pricing — no charges processed.</p>
    </div>
  );
}
