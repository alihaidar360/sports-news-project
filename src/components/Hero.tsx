import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSportFilter } from "../context/SportFilter";
import {
  articleImage,
  articlesQueryOptions,
  relativeTime,
} from "../lib/sanity.queries";

const heroFallback = "/hero-img.jpg";

const sportHeadings: Record<string, { title: string; subtitle: string }> = {
  all: {
    title: "Latest Sports Headlines",
    subtitle: "Breaking news, transfers, highlights and match coverage.",
  },
  football: {
    title: "Football News & Transfer Updates",
    subtitle: "Goals, transfers, UCL drama and breaking football stories.",
  },
  cricket: {
    title: "Cricket Match Updates",
    subtitle: "Live cricket news, series coverage and player stories.",
  },
  basketball: {
    title: "Basketball Highlights",
    subtitle: "NBA news, trades, playoffs and viral moments.",
  },
  tennis: {
    title: "Tennis Tour Headlines",
    subtitle: "Grand Slam stories and ATP/WTA updates.",
  },
  mma: {
    title: "MMA & UFC Coverage",
    subtitle: "Fight cards, knockouts and UFC breaking news.",
  },
  formula1: {
    title: "Formula 1 Racing News",
    subtitle: "Race weekends, standings and F1 drama.",
  },
  wwe: {
    title: "WWE & Wrestling Updates",
    subtitle: "SmackDown, Raw and wrestling highlights.",
  },
  esports: {
    title: "Esports & Gaming News",
    subtitle: "Tournaments, teams and gaming highlights.",
  },
};

export default function Hero() {
  const { sport } = useSportFilter();
  const { data, isLoading } = useQuery(articlesQueryOptions(sport));

  const list = data ?? [];
  const main = list[0];
  const trio = list.slice(1, 4);

  if (isLoading && !main) {
    return (
      <section className="container-wide pt-10 md:pt-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="h-4 w-24 bg-secondary rounded animate-pulse" />
            <div className="h-12 w-full bg-secondary rounded animate-pulse" />
            <div className="h-12 w-3/4 bg-secondary rounded animate-pulse" />
          </div>

          <div className="lg:col-span-6 aspect-[4/3] rounded-2xl bg-secondary animate-pulse" />
        </div>
      </section>
    );
  }

  if (!main) return null;

 const heroSrc = articleImage(main, 1200, 800)?? heroFallback;

  const currentHero =
    sportHeadings[sport] || sportHeadings["all"];

  return (
    <section className="container-wide pt-10 md:pt-16">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 fade-in">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {sport === "all"
                ? "Top story"
                : `${main.sport?.name} News`}
            </span>

            <span className="text-xs text-muted-foreground">
              · {main.sport?.name ?? "Sports"} ·{" "}
              {relativeTime(main.publishedAt)}
            </span>
          </div>

          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-4">
              {currentHero.title}
            </div>

            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              {main.title}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {currentHero.subtitle}
            </p>
          </div>

          {main.excerpt && (
            <p className="mt-5 text-lg text-muted-foreground max-w-xl text-balance">
              {main.excerpt}
            </p>
          )}

          <div className="mt-8 flex items-center gap-3">
            <Link
              to={`/${main.sport?.slug || "sports"}/${main.slug}`}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
            >
              Read article
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href="#highlights"
              className="inline-flex items-center h-11 px-5 rounded-md border border-border text-sm font-semibold hover:bg-secondary transition"
            >
              Watch highlights
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 fade-in">
          <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-2xl bg-surface">
           <img
             src={heroSrc}
             alt={main.title}
             width={1600}
             height={1200}
             className="h-full w-full object-cover"
             loading="eager"
             fetchPriority="high"
             decoding="async"
           />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-white/90 bg-accent px-2 py-1 rounded">
                Featured
              </span>

              <p className="mt-2 text-white font-semibold text-lg max-w-md text-balance">
                {main.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {trio.length > 0 && (
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {trio.map((a) => {
            const img = articleImage(a, 240, 180);

            return (
              <Link
                key={a._id}
                to={`/${a.sport?.slug || "sports"}/${a.slug}`}
                className="group flex gap-4 items-start p-4 rounded-xl border border-border hover-lift hover:border-foreground/20"
              >
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-md bg-surface">
                  {img && (
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {a.sport?.name ?? "Sports"} ·{" "}
                    {relativeTime(a.publishedAt)}
                  </div>

                  <h3 className="mt-1 text-sm font-semibold leading-snug line-clamp-2">
                    {a.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}