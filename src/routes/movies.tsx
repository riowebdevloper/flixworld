import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { MovieGrid } from "@/components/movie-grid";
import { fetchCategory } from "@/lib/tmdb.functions";

const q = queryOptions({
  queryKey: ["category", "popular_movies"],
  queryFn: () => fetchCategory({ data: { kind: "popular_movies", page: 1 } }),
  staleTime: 1000 * 60 * 30,
});

export const Route = createFileRoute("/movies")({
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  head: () => ({
    meta: [
      { title: "Movies — FlixWorld.fun" },
      { name: "description", content: "Browse popular movies streaming now on FlixWorld.fun." },
      { property: "og:title", content: "Movies — FlixWorld.fun" },
      { property: "og:url", content: "/movies" },
    ],
    links: [{ rel: "canonical", href: "/movies" }],
  }),
  component: Page,
});

function Page() {
  const { data } = useSuspenseQuery(q);
  return (
    <div className="pt-6">
      <h1 className="px-4 sm:px-6 lg:px-10 text-display text-4xl sm:text-5xl font-bold text-white">Movies</h1>
      <p className="px-4 sm:px-6 lg:px-10 mt-2 text-white/60">The latest blockbusters and timeless classics.</p>
      <MovieGrid items={data.results} />
    </div>
  );
}
