import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { Row } from "@/components/row";
import {
  latestMovies, trending, getByCategory, topRated, recentlyAdded,
} from "@/lib/data";

export const Route = createFileRoute("/")({
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
  return (
    <>
      <Hero />
      <Row title="Latest Movies" movies={latestMovies} accent />
      <Row title="Trending Now" movies={trending} />
      <Row title="Popular Web Series" movies={getByCategory("series")} />
      <Row title="Anime Spotlight" movies={getByCategory("anime")} />
      <Row title="K-Drama Picks" movies={getByCategory("kdrama")} />
      <Row title="Top Rated" movies={topRated} />
      <Row title="Recently Added" movies={recentlyAdded} />
    </>
  );
}
