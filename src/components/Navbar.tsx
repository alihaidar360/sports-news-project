import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Menu, X, Moon, Sun } from "lucide-react";
import { sportsQueryOptions, type Sport } from "../lib/sanity.queries";
import { useSportFilter } from "../context/SportFilter";
import { cn } from "../lib/utils";

const ALL: Sport = { _id: "all", name: "All Sports", slug: "all" };

export default function Navbar() {
  const { sport, setSport } = useSportFilter();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { data } = useQuery(sportsQueryOptions());
  const sports = [ALL, ...(data ?? [])];

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const pick = (s: string) => {
  setSport(s);

  if (s === "all") {
    navigate("/");
  } else {
    navigate(`/${s}`);
  }

  setOpen(false);
};

  return (
    <header className="sticky top-0 z-40 nav-blur border-b border-border">
      <div className="container-wide flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setSport("all")}>
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-lg font-extrabold tracking-tight">PITCH</span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
            / sports
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {sports.map((s) => {
            const active = sport === s.slug;
            return (
              <button
                key={s.slug}
                onClick={() => pick(s.slug)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s.name}
                {active && (
                  <span className="absolute -bottom-[17px] left-2 right-2 h-[2px] bg-accent rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 ml-auto lg:ml-0">
          <button
            aria-label="Search"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#newsletter"
            className="hidden sm:inline-flex items-center h-9 px-4 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
          >
            Subscribe
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-md text-foreground hover:bg-secondary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-wide py-3 grid grid-cols-2 gap-1">
            {sports.map((s) => {
              const active = sport === s.slug;
              return (
                <button
                  key={s.slug}
                  onClick={() => pick(s.slug)}
                  className={cn(
                    "text-left px-3 py-2.5 rounded-md text-sm font-medium",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}