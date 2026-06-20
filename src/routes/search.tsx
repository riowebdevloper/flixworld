import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { MovieGrid } from "@/components/movie-grid";
import { searchMedia, discoverMedia } from "@/lib/tmdb.functions";
import { MOVIE_GENRES, LANGUAGES } from "@/lib/tmdb";

const searchSchema = z.object({
  q: z.string().optional().default(""),
  genre: z.string().optional().default(""),
  year: z.string().optional().default(""),
  rating: z.string().optional().default(""),
  language: z.string().optional().default(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search — FlixWorld.fun" },
      { name: "description", content: "Find movies, web series, anime and K-drama on FlixWorld.fun." },
      { property: "og:title", content: "Search — FlixWorld.fun" },
      { property: "og:url", content: "/search" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const sp = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(sp.q);

  // Debounce URL update for q
  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== sp.q) navigate({ search: (p: typeof sp) => ({ ...p, q }) });
    }, 350);
    return () => clearTimeout(t);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasQuery = sp.q.trim().length > 0;

  const query = useQuery({
    queryKey: ["search", sp],
    queryFn: () =>
      hasQuery
        ? searchMedia({ data: { q: sp.q, year: sp.year || undefined } })
        : discoverMedia({
            data: {
              type: "movie",
              genre: sp.genre || undefined,
              year: sp.year || undefined,
              language: sp.language || undefined,
              rating: sp.rating || undefined,
            },
          }),
    staleTime: 1000 * 60 * 5,
  });

  // Client-side filter when q is set (TMDB search ignores genre/lang/rating)
  const results = (query.data?.results ?? []).filter((m) => {
    if (sp.rating && m.vote_average < parseFloat(sp.rating)) return false;
    if (sp.language && m.original_language !== sp.language) return false;
    return true;
  });

  const update = (patch: Partial<typeof sp>) =>
    navigate({ search: (prev: typeof sp) => ({ ...prev, ...patch }) });

  return (
    <div className="pt-6">
      <div className="px-4 sm:px-6 lg:px-10">
        <h1 className="text-display text-4xl sm:text-5xl font-bold text-white">Search</h1>
        <div className="mt-6 relative max-w-2xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for movies, series, anime..."
            className="w-full glass rounded-full pl-12 pr-4 py-3 text-base text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Select label="Genre" value={sp.genre} onChange={(v) => update({ genre: v })}
            options={MOVIE_GENRES.map((g) => ({ value: String(g.id), label: g.name }))} />
          <Select label="Year" value={sp.year} onChange={(v) => update({ year: v })}
            options={yearOptions()} />
          <Select label="Min Rating" value={sp.rating} onChange={(v) => update({ rating: v })}
            options={["7", "7.5", "8", "8.5", "9"].map((r) => ({ value: r, label: r }))} />
          <Select label="Language" value={sp.language} onChange={(v) => update({ language: v })}
            options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))} />
          {(sp.genre || sp.year || sp.rating || sp.language) && (
            <button
              onClick={() => update({ genre: "", year: "", rating: "", language: "" })}
              className="rounded-full px-4 py-1.5 text-sm text-primary hover:bg-primary/10 transition"
            >Clear filters</button>
          )}
        </div>
        <p className="mt-4 text-sm text-white/60 flex items-center gap-2">
          {query.isFetching && <Loader2 className="h-3 w-3 animate-spin" />}
          {results.length} result{results.length === 1 ? "" : "s"}
        </p>
      </div>
      <MovieGrid items={results} empty={hasQuery ? "No matches. Try different keywords." : "Pick a filter or type a query."} />
    </div>
  );
}

function yearOptions() {
  const now = new Date().getFullYear();
  const ys: { value: string; label: string }[] = [];
  for (let y = now; y >= 1970; y--) ys.push({ value: String(y), label: String(y) });
  return ys;
}

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="glass rounded-full px-4 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
    >
      <option value="" className="bg-card">{label}: All</option>
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-card">{label}: {o.label}</option>
      ))}
    </select>
  );
}
