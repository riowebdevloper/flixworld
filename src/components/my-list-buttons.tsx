import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck, Heart, HeartOff, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { addToList, removeFromList, getMyLists } from "@/lib/user-lists.functions";
import { year, type MediaDetail } from "@/lib/tmdb";

type ListKind = "watchlist" | "favorite";

export function MyListButtons({ media }: { media: MediaDetail }) {
  const { user, loading } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const lists = useQuery({
    queryKey: ["my-lists"],
    queryFn: () => getMyLists(),
    enabled: !!user,
    staleTime: 1000 * 30,
  });

  const isIn = (kind: ListKind) =>
    (lists.data ?? []).some(
      (r) => r.list_kind === kind && r.media_type === media.media_type && r.media_id === media.id,
    );

  const toggle = useMutation({
    mutationFn: async (kind: ListKind) => {
      if (isIn(kind)) {
        return removeFromList({ data: { list_kind: kind, media_type: media.media_type, media_id: media.id } });
      }
      return addToList({
        data: {
          list_kind: kind,
          media_type: media.media_type,
          media_id: media.id,
          title: media.title,
          poster_path: media.poster_path,
          backdrop_path: media.backdrop_path,
          release_year: year(media.release_date),
          rating: media.vote_average,
        },
      });
    },
    onSuccess: (_, kind) => {
      qc.invalidateQueries({ queryKey: ["my-lists"] });
      qc.invalidateQueries({ queryKey: ["list", kind] });
      toast.success(isIn(kind) ? `Removed from ${kind}` : `Added to ${kind}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const requireAuth = (fn: () => void) => {
    if (loading) return;
    if (!user) {
      toast("Sign in to save titles", {
        action: { label: "Sign in", onClick: () => navigate({ to: "/auth" }) },
      });
      return;
    }
    fn();
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title: media.title, url });
      else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
    } catch {/* user cancelled */}
  };

  const inWatch = isIn("watchlist");
  const inFav = isIn("favorite");

  return (
    <>
      <button
        onClick={() => requireAuth(() => toggle.mutate("watchlist"))}
        className="inline-flex items-center gap-2 rounded-lg glass px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
      >
        {inWatch ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
        {inWatch ? "In Watchlist" : "Watchlist"}
      </button>
      <button
        onClick={() => requireAuth(() => toggle.mutate("favorite"))}
        className="inline-flex items-center gap-2 rounded-lg glass px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
      >
        {inFav ? <HeartOff className="h-5 w-5 text-primary" /> : <Heart className="h-5 w-5" />}
        {inFav ? "Favorited" : "Favorite"}
      </button>
      <button onClick={share} className="inline-flex items-center gap-2 rounded-lg glass px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
        <Share2 className="h-5 w-5" /> Share
      </button>
    </>
  );
}
