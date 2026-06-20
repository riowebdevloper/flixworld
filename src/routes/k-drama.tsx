import { createFileRoute } from "@tanstack/react-router";
import { MovieGrid } from "@/components/movie-grid";
import { getByCategory } from "@/lib/data";

export const Route = createFileRoute("/k-drama")({
  head: () => ({
    meta: [
      { title: "K-Drama — FlixWorld.fun" },
      { name: "description", content: "The best Korean dramas streaming in HD & 4K." },
      { property: "og:title", content: "K-Drama — FlixWorld.fun" },
      { property: "og:url", content: "/k-drama" },
    ],
    links: [{ rel: "canonical", href: "/k-drama" }],
  }),
  component: () => (
    <div className="pt-6">
      <h1 className="px-4 sm:px-6 lg:px-10 text-display text-4xl sm:text-5xl font-bold text-white">K-Drama</h1>
      <p className="px-4 sm:px-6 lg:px-10 mt-2 text-white/60">Hand-picked Korean drama for every mood.</p>
      <MovieGrid movies={getByCategory("kdrama")} />
    </div>
  ),
});
