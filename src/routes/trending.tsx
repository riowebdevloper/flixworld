import { createFileRoute } from "@tanstack/react-router";
import { MovieGrid } from "@/components/movie-grid";
import { trending } from "@/lib/data";

export const Route = createFileRoute("/trending")({
  head: () => ({
    meta: [
      { title: "Trending — FlixWorld.fun" },
      { name: "description", content: "What everyone is watching right now on FlixWorld.fun." },
      { property: "og:title", content: "Trending Now — FlixWorld.fun" },
      { property: "og:url", content: "/trending" },
    ],
    links: [{ rel: "canonical", href: "/trending" }],
  }),
  component: () => (
    <div className="pt-6">
      <h1 className="px-4 sm:px-6 lg:px-10 text-display text-4xl sm:text-5xl font-bold gradient-text-accent">Trending Now</h1>
      <p className="px-4 sm:px-6 lg:px-10 mt-2 text-white/60">The hottest titles people can't stop watching.</p>
      <MovieGrid movies={trending} />
    </div>
  ),
});
