type Size = "banner" | "leaderboard" | "rectangle";

export function AdSlot({ size = "banner", label = "Advertisement" }: { size?: Size; label?: string }) {
  const h = size === "leaderboard" ? "h-24" : size === "rectangle" ? "h-64" : "h-20";
  return (
    <div className={`mx-4 sm:mx-6 lg:mx-10 my-6 ${h} glass rounded-xl border border-dashed border-white/10 flex items-center justify-center text-white/40 text-xs uppercase tracking-widest`}
      data-ad-slot={size}
      aria-label={label}
    >
      {label} · Google AdSense
    </div>
  );
}
