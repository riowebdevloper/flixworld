import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Media } from "@/lib/tmdb";
import { MovieCard } from "./movie-card";

export function Row({ title, items, accent }: { title: string; items: Media[]; accent?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 600, behavior: "smooth" });

  if (!items.length) return null;

  return (
    <section className="relative py-6 group/row">
      <div className="px-4 sm:px-6 lg:px-10 mb-3 flex items-end justify-between">
        <h2 className={`text-display text-2xl sm:text-3xl font-bold ${accent ? "gradient-text-accent" : "text-white"}`}>
          {title}
        </h2>
      </div>
      <div className="relative">
        <button onClick={() => scroll(-1)} aria-label="Scroll left"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 glass rounded-full p-2 opacity-0 group-hover/row:opacity-100 transition hover:bg-white/10">
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <div ref={ref} className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-10 pb-2">
          {items.map((m, i) => <MovieCard key={`${m.media_type}-${m.id}`} media={m} index={i} />)}
        </div>
        <button onClick={() => scroll(1)} aria-label="Scroll right"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 glass rounded-full p-2 opacity-0 group-hover/row:opacity-100 transition hover:bg-white/10">
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </section>
  );
}
