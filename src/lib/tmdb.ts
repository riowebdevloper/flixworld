// Client-safe TMDB types and helpers (no secrets).
export type MediaType = "movie" | "tv";

export type Media = {
  id: number;
  media_type: MediaType;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string | null;
  vote_average: number;
  original_language?: string;
};

export type Video = {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
  official?: boolean;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type MediaDetail = Media & {
  genres: { id: number; name: string }[];
  runtime: number | null;
  number_of_seasons?: number;
  number_of_episodes?: number;
  tagline?: string;
  videos: Video[];
  cast: CastMember[];
  similar: Media[];
};

export type PagedMedia = { page: number; total_pages: number; results: Media[] };

const IMG = "https://image.tmdb.org/t/p";

export const posterUrl = (path: string | null, size: "w185" | "w342" | "w500" = "w500") =>
  path ? `${IMG}/${size}${path}` : `https://placehold.co/342x513/0a0a0a/666?text=No+Image`;

export const backdropUrl = (path: string | null, size: "w780" | "w1280" | "original" = "w1280") =>
  path ? `${IMG}/${size}${path}` : `https://placehold.co/1280x720/0a0a0a/666?text=No+Image`;

export const profileUrl = (path: string | null) =>
  path ? `${IMG}/w185${path}` : `https://placehold.co/185x278/0a0a0a/666?text=?`;

export const year = (date: string | null) => (date ? new Date(date).getFullYear() : null);

export const officialTrailer = (videos: Video[]): Video | null => {
  if (!videos || videos.length === 0) return null;
  const yt = videos.filter((v) => v.site === "YouTube");
  return (
    yt.find((v) => v.type === "Trailer" && v.official) ??
    yt.find((v) => v.type === "Trailer") ??
    yt.find((v) => v.type === "Teaser") ??
    yt[0] ??
    null
  );
};

export const detailPath = (m: Pick<Media, "media_type" | "id">) =>
  m.media_type === "tv" ? (`/tv/${m.id}` as const) : (`/movie/${m.id}` as const);

export type CategoryKey =
  | "trending"
  | "popular_movies"
  | "now_playing"
  | "top_rated"
  | "popular_tv"
  | "anime"
  | "kdrama"
  | "web_series"
  | "upcoming";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  trending: "Trending Now",
  popular_movies: "Popular Movies",
  now_playing: "New Releases",
  top_rated: "Top Rated",
  popular_tv: "Popular TV Shows",
  anime: "Anime Collection",
  kdrama: "K-Drama Collection",
  web_series: "Latest Web Series",
  upcoming: "Coming Soon",
};

// TMDB genre IDs (static map — TMDB rarely changes these)
export const MOVIE_GENRES: { id: number; name: string }[] = [
  { id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" }, { id: 10751, name: "Family" }, { id: 14, name: "Fantasy" },
  { id: 36, name: "History" }, { id: 27, name: "Horror" }, { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" }, { id: 10749, name: "Romance" }, { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" }, { id: 10752, name: "War" }, { id: 37, name: "Western" },
];

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
];
