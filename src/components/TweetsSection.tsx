import { useQuery } from "@tanstack/react-query";
import { useSportFilter } from "../context/SportFilter";
import { tweetsQueryOptions } from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

function getTweetEmbedUrl(url: string | undefined) {
  if (!url) return null;

  return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
}

export default function TweetsSection() {
  const { sport } = useSportFilter();

  const { data, isLoading } = useQuery(
    tweetsQueryOptions(sport)
  );

  const list = data ?? [];

  return (
    <section className="container-wide mt-24">
      <SectionHeader
        eyebrow="Live on X"
        title="What people are posting"
        sub="Verified updates from official accounts and trusted reporters."
      />

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((tweet) => {
          const embedUrl = getTweetEmbedUrl(tweet.url);

          return (
            <div
              key={tweet._id}
              className="rounded-2xl overflow-hidden border border-border bg-card hover:border-foreground/20 transition bg-white"
            >
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  className="w-full"
                  title="Embedded Tweet"
                />
              ) : (
                <div className="p-5 text-sm text-muted-foreground">
                  Tweet not available
                </div>
              )}
            </div>
          );
        })}

        {!isLoading && list.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}