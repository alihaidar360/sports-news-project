import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useSportFilter } from "../context/SportFilter";

import {
  articleImage,
  articlesQueryOptions,
  relativeTime,
} from "../lib/sanity.queries";

export default function TrendingNews() {
  const { sport } = useSportFilter();
  const { data, isLoading } = useQuery(articlesQueryOptions(sport));

  const list = data ?? [];

  return (
    <section id="trending" className="container-wide mt-24">
      <SectionHeader
        eyebrow="Trending"
        title="Top 10 today"
        sub="The stories sports fans are reading right now."
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <div className="aspect-[16/10] bg-secondary animate-pulse" />

                <div className="p-5 space-y-3">
                  <div className="h-4 w-3/4 bg-secondary rounded animate-pulse" />
                  <div className="h-3 w-full bg-secondary rounded animate-pulse" />
                </div>
              </div>
            ))
          : list.map((a, i) => {
              const img = articleImage(a, 800, 500);

              return (
                <Link
                  key={a._id}
                  to={`/${a.sport?.slug || "sports"}/${a.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover-lift hover:border-foreground/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    {img && (
                      <img
                        src={img}
                        alt={a.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    )}

                    <span className="absolute top-3 left-3 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur px-2 py-1 rounded">
                      {a.sport?.name ?? "Sports"}
                    </span>

                    <span className="absolute top-3 right-3 inline-flex items-center justify-center h-7 w-7 text-xs font-bold text-white bg-accent rounded-full">
                      {i + 1}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display font-bold text-lg leading-snug text-balance">
                      {a.title}
                    </h3>

                    {a.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {a.excerpt}
                      </p>
                    )}

                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <span>{relativeTime(a.publishedAt)}</span>

                      <span className="text-foreground font-medium group-hover:text-accent transition">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

        {!isLoading && list.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </div>

        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>

        {sub && (
          <p className="mt-2 text-muted-foreground max-w-xl">
            {sub}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="col-span-full py-16 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
      No content for this sport yet.
    </div>
  );
}