import { createFileRoute } from "@tanstack/react-router";
import { MovieGrid } from "@/components/movie-grid";
import { getByCategory } from "@/lib/data";

export const Route = createFileRoute("/web-series")({
  head: () => ({
    meta: [
      { title: "Web Series — FlixWorld.fun" },
      { name: "description", content: "Stream popular web series across every genre on FlixWorld.fun." },
      { property: "og:title", content: "Web Series — FlixWorld.fun" },
      { property: "og:url", content: "/web-series" },
    ],
    links: [{ rel: "canonical", href: "/web-series" }],
  }),
  component: () => (
    <div className="pt-6">
      <h1 className="px-4 sm:px-6 lg:px-10 text-display text-4xl sm:text-5xl font-bold text-white">Web Series</h1>
      <p className="px-4 sm:px-6 lg:px-10 mt-2 text-white/60">Binge the most-talked-about series.</p>
      <MovieGrid movies={getByCategory("series")} />
    </div>
  ),
});
