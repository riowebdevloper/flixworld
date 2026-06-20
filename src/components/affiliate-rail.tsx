import { ExternalLink } from "lucide-react";

const PARTNERS = [
  { name: "ExpressVPN", desc: "Stream geo-locked titles safely", href: "#" },
  { name: "NordVPN", desc: "Fastest VPN for 4K streaming", href: "#" },
  { name: "Surfshark", desc: "Unlimited devices, one account", href: "#" },
];

export function AffiliateRail() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10">
      <h2 className="text-display text-2xl sm:text-3xl font-bold text-white">Recommended for streamers</h2>
      <p className="text-sm text-white/50 mt-1">Affiliate partners — we may earn a commission.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {PARTNERS.map((p) => (
          <a key={p.name} href={p.href} target="_blank" rel="sponsored noopener noreferrer"
            className="group glass rounded-xl p-5 hover:bg-white/10 transition flex items-start justify-between gap-3">
            <div>
              <div className="text-white font-semibold">{p.name}</div>
              <div className="text-sm text-white/60 mt-1">{p.desc}</div>
            </div>
            <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-primary" />
          </a>
        ))}
      </div>
    </section>
  );
}
