import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQueries } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { Hero } from "@/components/hero";
import { Row } from "@/components/row";
import { AdSlot } from "@/components/ad-slot";
import { AffiliateRail } from "@/components/affiliate-rail";
import { fetchCategory } from "@/lib/tmdb.functions";
import { CATEGORY_LABELS, type CategoryKey } from "@/lib/tmdb";

const catQ = (kind: CategoryKey) =>
  queryOptions({
    queryKey: ["category", kind],
    queryFn: () => fetchCategory({ data: { kind, page: 1 } }),
    staleTime: 1000 * 60 * 30,
  });

const ROWS: CategoryKey[] = [
  "now_playing", "popular_movies", "popular_tv",
  "web_series", "anime", "kdrama", "top_rated", "upcoming",
];

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    Promise.all([catQ("trending"), ...ROWS.map(catQ)].map((q) => context.queryClient.ensureQueryData(q))),
  head: () => ({
    meta: [
      { title: "FlixWorld.fun — Stream Movies, Web Series, Anime & K-Drama" },
      { name: "description", content: "Watch the latest movies, trending web series, anime and K-drama in HD and 4K on FlixWorld.fun." },
      { property: "og:title", content: "FlixWorld.fun — Stream Everything Entertainment" },
      { property: "og:description", content: "Movies, web series, anime, K-drama. All in one premium player." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const queries = useSuspenseQueries({
    queries: [catQ("trending"), ...ROWS.map(catQ)],
  });
  const trending = queries[0].data.results;
  const rowData = ROWS.map((k, i) => ({ kind: k, items: queries[i + 1].data.results }));

  return (
    <>
      <Hero slides={trending} />
      <Row title={CATEGORY_LABELS.trending} items={trending} accent />
      {rowData.slice(0, 3).map(({ kind, items }) => (
        <Row key={kind} title={CATEGORY_LABELS[kind]} items={items} />
      ))}
      <AdSlot size="leaderboard" />
      {rowData.slice(3, 6).map(({ kind, items }) => (
        <Row key={kind} title={CATEGORY_LABELS[kind]} items={items} />
      ))}
      <AffiliateRail />
      {rowData.slice(6).map(({ kind, items }) => (
        <Row key={kind} title={CATEGORY_LABELS[kind]} items={items} />
      ))}
      <AdSlot size="banner" />
    </>
  );
}
