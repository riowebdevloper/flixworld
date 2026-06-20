import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Bookmark, Heart, Clock, LogOut } from "lucide-react";
import { getList } from "@/lib/user-lists.functions";
import { posterUrl, detailPath, type MediaType } from "@/lib/tmdb";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";

type Tab = "watchlist" | "favorite" | "recent";

const TABS: { key: Tab; label: string; icon: typeof Bookmark }[] = [
  { key: "watchlist", label: "Watchlist", icon: Bookmark },
  { key: "favorite", label: "Favorites", icon: Heart },
  { key: "recent", label: "Recently Viewed", icon: Clock },
];

export const Route = createFileRoute("/_authenticated/my-list")({
  head: () => ({
    meta: [
      { title: "My List — FlixWorld.fun" },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/my-list" },
    ],
    links: [{ rel: "canonical", href: "/my-list" }],
  }),
  component: MyListPage,
});

function MyListPage() {
  const [tab, setTab] = useState<Tab>("watchlist");
  const navigate = useNavigate();
  const list = useQuery({
    queryKey: ["list", tab],
    queryFn: () => getList({ data: { list_kind: tab } }),
    staleTime: 1000 * 30,
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="pt-6 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-display text-4xl sm:text-5xl font-bold text-white">My List</h1>
          <p className="mt-2 text-white/60">Everything you've saved.</p>
        </div>
        <button onClick={signOut} className="inline-flex items-center gap-2 glass rounded-lg px-4 py-2 text-sm text-white hover:bg-white/10">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mt-6 flex gap-2 border-b border-white/10 overflow-x-auto">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
                active ? "border-primary text-white" : "border-transparent text-white/60 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {list.isLoading ? (
        <div className="py-20 text-center text-white/60">Loading…</div>
      ) : (list.data ?? []).length === 0 ? (
        <div className="py-20 text-center text-white/60">
          Nothing here yet. <Link to="/" className="text-primary hover:underline">Browse titles</Link>
        </div>
      ) : (
        <div className="py-6 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center">
          {list.data!.map((r) => (
            <Link
              key={r.id}
              to={detailPath({ media_type: r.media_type as MediaType, id: r.media_id })}
              className="block relative w-[150px] sm:w-[180px] aspect-[2/3] overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-card)] group"
            >
              <img src={posterUrl(r.poster_path)} alt={r.title} loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-[var(--gradient-card)]">
                <h3 className="text-sm font-semibold text-white line-clamp-2">{r.title}</h3>
                {r.release_year && <p className="text-xs text-white/60 mt-0.5">{r.release_year}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
