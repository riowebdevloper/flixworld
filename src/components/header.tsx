import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Search, Menu, X, Film, User, Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/web-series", label: "Web Series" },
  { to: "/anime", label: "Anime" },
  { to: "/k-drama", label: "K-Drama" },
  { to: "/genres", label: "Genres" },
  { to: "/trending", label: "Trending" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/search", search: { q, genre: "", year: "", rating: "", language: "" } });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-10 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary shadow-[var(--shadow-glow)]">
            <Film className="h-4 w-4 text-white" />
          </div>
          <span className="text-display text-xl sm:text-2xl font-bold text-white tracking-wider">
            FLIX<span className="text-primary">WORLD</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-white bg-white/10" }}
              inactiveProps={{ className: "text-white/70 hover:text-white hover:bg-white/5" }}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-1.5 text-sm font-medium transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submit} className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search movies, shows..."
              className="glass rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-primary w-48 lg:w-64"
            />
          </div>
          <Link to="/search" search={{ q: "", genre: "", year: "", rating: "", language: "" }}
            className="md:hidden glass rounded-full p-2" aria-label="Search">
            <Search className="h-5 w-5 text-white" />
          </Link>
          <Link to="/premium" className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/40 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/25 transition">
            <Crown className="h-3.5 w-3.5" /> Premium
          </Link>
          {user ? (
            <Link to="/my-list" className="glass rounded-full p-2" aria-label="My account">
              <User className="h-5 w-5 text-white" />
            </Link>
          ) : (
            <Link to="/auth" className="hidden sm:inline-flex items-center rounded-full bg-white text-gray-900 px-4 py-1.5 text-sm font-semibold hover:bg-white/90 transition">
              Sign in
            </Link>
          )}
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden glass rounded-full p-2" aria-label="Menu">
            {open ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </form>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-white bg-white/10" }}
              inactiveProps={{ className: "text-white/70" }}
              className="rounded-md px-3 py-2 text-sm font-medium">
              {n.label}
            </Link>
          ))}
          <Link to="/premium" className="rounded-md px-3 py-2 text-sm font-medium text-primary">Premium</Link>
          {!user && (
            <Link to="/auth" className="rounded-md px-3 py-2 text-sm font-medium text-white bg-primary text-center">Sign in</Link>
          )}
        </div>
      )}
    </header>
  );
}
