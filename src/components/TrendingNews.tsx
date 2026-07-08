"use client";
import Link from "next/link";
import {
  articleImage,
  relativeTime,
  type Article,
} from "../lib/sanity.queries";

interface Props {
  articles: Article[];
}

export default function TrendingNews({ articles }: Props) {
  const list = articles ?? [];

  return (
    <section id="trending" className="container-wide mt-24">
      <SectionHeader
        eyebrow="Trending"
        title="Top 10 today"
        sub="The stories sports fans are reading right now."
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((a, i) => {
          const img = articleImage(a, 500, 300);
          return (
            <Link
              key={a._id}
              href={`/${a.sport?.slug || "sports"}/${typeof a.slug === "string" ? a.slug : a.slug?.current}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover-lift hover:border-foreground/20"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                {img && (
                  <img
                    src={img}
                    alt={a.title}
                    loading="lazy"
                    decoding="async"
                    width="500"
                    height="300"
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
        {list.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow, title, sub, action,
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
          <p className="mt-2 text-muted-foreground max-w-xl">{sub}</p>
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