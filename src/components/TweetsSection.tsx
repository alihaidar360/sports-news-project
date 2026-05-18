import { useQuery } from "@tanstack/react-query";
import { Heart, MessageCircle, Repeat2, ExternalLink, BadgeCheck } from "lucide-react";
import { useSportFilter } from "../context/SportFilter";
import { tweetAvatar, tweetsQueryOptions } from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

export default function TweetsSection() {
  const { sport } = useSportFilter();
  const { data, isLoading } = useQuery(tweetsQueryOptions(sport));
  const list = data ?? [];

  return (
    <section className="container-wide mt-24">
      <SectionHeader
        eyebrow="Live on X"
        title="What people are posting"
        sub="Verified updates from official accounts and trusted reporters."
      />

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((t) => {
          const avatar = tweetAvatar(t);
          return (
            <a
              key={t._id}
              href={t.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 rounded-2xl border border-border bg-card hover-lift hover:border-foreground/20"
            >
              <div className="flex items-start gap-3">
                {avatar && (
                  <img
                    src={avatar}
                    alt={t.author}
                    loading="lazy"
                    className="h-11 w-11 rounded-full bg-surface"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold truncate">{t.author}</span>
                    {t.verified && <BadgeCheck className="h-4 w-4 text-accent fill-accent/20" />}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    @{t.handle}
                    {t.time ? ` · ${t.time}` : ""}
                  </div>
                </div>
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817L4.99 21.75H1.68l7.73-8.836L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.16 17.52h1.832L7.084 4.126H5.118l11.966 15.644Z"
                  />
                </svg>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                {t.content}
              </p>

              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" /> {t.replies ?? "—"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Repeat2 className="h-4 w-4" /> {t.reposts ?? "—"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="h-4 w-4" /> {t.likes ?? "—"}
                </span>
                <span className="inline-flex items-center gap-1 text-foreground font-medium group-hover:text-accent transition">
                  View on X <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          );
        })}
        {!isLoading && list.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}