import { Tweet } from "react-tweet";
import { useQuery } from "@tanstack/react-query";
import { useSportFilter } from "../context/SportFilter";
import { tweetsQueryOptions } from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

function getTweetId(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}

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
        {list.map((tweet) => {
          const tweetId = getTweetId(tweet.url);
          return (
            <div key={tweet._id} className="flex justify-center">
              {tweetId ? (
                <Tweet id={tweetId} />
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