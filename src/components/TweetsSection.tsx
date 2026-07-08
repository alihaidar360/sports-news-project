"use client";
import {
  tweetsQuery,
  tweetAvatar,
  tweetImage,
  relativeTime,
  type Tweet,
} from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

function TweetCard({ t }: { t: Tweet }) {
  const avatar = tweetAvatar(t.avatar);
  const image = tweetImage(t.image);
  const when = relativeTime(t.tweetDate);
  const date = t.tweetDate ? new Date(t.tweetDate).toLocaleDateString() : "";

  return (
    <article className="group rounded-3xl border border-border bg-card p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl animate-fadeInUp">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-black/10">
          {avatar ? (
            <img src={avatar} alt={t.authorName} className="h-full w-full object-cover" loading="lazy" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 leading-tight">
            <h3 className="font-semibold text-foreground truncate">{t.authorName}</h3>
            {t.verified ? (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-white text-[11px]">✓</span>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground truncate">{t.handle}</p>
          <p className="mt-2 text-[15px] leading-6 text-foreground whitespace-pre-wrap">{t.content}</p>
        </div>
      </div>

      {image ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <img src={image} alt="Tweet media" className="w-full object-cover transition duration-500 group-hover:scale-[1.02]" loading="lazy" />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <div>
          <span>{when}</span>
          {date ? <span className="ml-2">• {date}</span> : null}
        </div>
        <a
          href={t.tweetUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-black/5 transition"
        >
          Open Tweet
        </a>
      </div>

      <div className="mt-4 flex items-center gap-5 border-t border-border pt-3 text-sm text-muted-foreground">
        <span>💬 {t.replies ?? 0}</span>
        <span>🔁 {t.reposts ?? 0}</span>
        <span>♥ {t.likes ?? 0}</span>
      </div>
    </article>
  );
}

interface Props {
  tweets: Tweet[];
}

export default function TweetsSection({ tweets }: Props) {
  const list = tweets ?? [];

  return (
    <section className="container-wide mt-24">
      <SectionHeader
        eyebrow="Social buzz"
        title="What people are posting"
        sub="Curated sports tweets, rendered as fast custom cards for a smoother experience."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((t, i) => (
          <div key={t._id} style={{ animationDelay: `${i * 60}ms` }}>
            <TweetCard t={t} />
          </div>
        ))}
        {list.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}