import type { Media } from "@/lib/tmdb";
import { MovieCard } from "./movie-card";

export function MovieGrid({ items, empty = "No results found." }: { items: Media[]; empty?: string }) {
  if (!items.length) {
    return <div className="px-4 sm:px-6 lg:px-10 py-20 text-center text-white/60">{empty}</div>;
  }
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center">
      {items.map((m, i) => <MovieCard key={`${m.media_type}-${m.id}`} media={m} index={i} />)}
    </div>
  );
}
