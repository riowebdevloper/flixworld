import { Link } from "@tanstack/react-router";
import { Home, Film, Tv, Search, Bookmark } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home, exact: true, search: undefined },
  { to: "/movies", label: "Movies", icon: Film, exact: false, search: undefined },
  { to: "/web-series", label: "Series", icon: Tv, exact: false, search: undefined },
  { to: "/search", label: "Search", icon: Search, exact: false, search: { q: "", genre: "", year: "", rating: "", language: "" } },
  { to: "/my-list", label: "My List", icon: Bookmark, exact: false, search: undefined },
] as const;

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              search={it.search as never}
              activeOptions={{ exact: it.exact }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-white/60" }}
              className="flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium"
            >
              <Icon className="h-5 w-5" />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
