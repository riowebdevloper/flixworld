import { createFileRoute, Link } from "@tanstack/react-router";
import { MOVIE_GENRES } from "@/lib/tmdb";

export const Route = createFileRoute("/genres")({
  head: () => ({
    meta: [
      { title: "Genres — FlixWorld.fun" },
      { name: "description", content: "Browse FlixWorld titles by genre." },
      { property: "og:title", content: "Browse by Genre — FlixWorld.fun" },
      { property: "og:url", content: "/genres" },
    ],
    links: [{ rel: "canonical", href: "/genres" }],
  }),
  component: () => (
    <div className="pt-6 px-4 sm:px-6 lg:px-10">
      <h1 className="text-display text-4xl sm:text-5xl font-bold text-white">Genres</h1>
      <p className="mt-2 text-white/60">Pick a vibe.</p>
      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {MOVIE_GENRES.map((g, i) => (
          <Link
            key={g.id}
            to="/search"
            search={{ q: "", genre: String(g.id), year: "", rating: "", language: "" }}
            className="group relative aspect-[16/10] overflow-hidden rounded-xl shadow-[var(--shadow-card)] glass"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-black/60 to-black/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-display text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">{g.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ),
});
