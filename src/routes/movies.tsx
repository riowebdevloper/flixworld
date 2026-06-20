import { createFileRoute } from "@tanstack/react-router";
import { MovieGrid } from "@/components/movie-grid";
import { getByCategory } from "@/lib/data";

export const Route = createFileRoute("/movies")({
  head: () => ({
    meta: [
      { title: "Movies — FlixWorld.fun" },
      { name: "description", content: "Browse the latest HD & 4K movies on FlixWorld.fun." },
      { property: "og:title", content: "Movies — FlixWorld.fun" },
      { property: "og:url", content: "/movies" },
    ],
    links: [{ rel: "canonical", href: "/movies" }],
  }),
  component: () => (
    <div className="pt-6">
      <h1 className="px-4 sm:px-6 lg:px-10 text-display text-4xl sm:text-5xl font-bold text-white">Movies</h1>
      <p className="px-4 sm:px-6 lg:px-10 mt-2 text-white/60">The latest blockbusters and timeless classics.</p>
      <MovieGrid movies={getByCategory("movie")} />
    </div>
  ),
});
