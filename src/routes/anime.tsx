import { createFileRoute } from "@tanstack/react-router";
import { MovieGrid } from "@/components/movie-grid";
import { getByCategory } from "@/lib/data";

export const Route = createFileRoute("/anime")({
  head: () => ({
    meta: [
      { title: "Anime — FlixWorld.fun" },
      { name: "description", content: "Stream subbed and dubbed anime, from shōnen to seinen." },
      { property: "og:title", content: "Anime — FlixWorld.fun" },
      { property: "og:url", content: "/anime" },
    ],
    links: [{ rel: "canonical", href: "/anime" }],
  }),
  component: () => (
    <div className="pt-6">
      <h1 className="px-4 sm:px-6 lg:px-10 text-display text-4xl sm:text-5xl font-bold text-white">Anime</h1>
      <p className="px-4 sm:px-6 lg:px-10 mt-2 text-white/60">From shōnen battles to slice-of-life favorites.</p>
      <MovieGrid movies={getByCategory("anime")} />
    </div>
  ),
});
