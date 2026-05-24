import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSportFilter } from "../context/SportFilter";
import { tweetsQueryOptions } from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

function TweetEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const anchor = document.createElement("a");
    anchor.className = "twitter-tweet";
    anchor.href = url;
    ref.current.appendChild(anchor);

    const tryLoad = () => {
      if ((window as any).twttr?.widgets) {
        (window as any).twttr.widgets.load(ref.current!);
      } else {
        setTimeout(tryLoad, 300);
      }
    };
    tryLoad();
  }, [url]);

  return <div ref={ref} className="flex justify-center min-h-[200px]" />;
}

export default function TweetsSection() {
  const { sport } = useSportFilter();
  const { data, isLoading } = useQuery(tweetsQueryOptions(sport));
  const list = data ?? [];

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  return (
    <section className="container-wide mt-24">
      <SectionHeader
        eyebrow="Live on X"
        title="What people are posting"
        sub="Verified updates from official accounts and trusted reporters."
      />
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((tweet) => (
          <div
            key={tweet._id}
            className="rounded-2xl overflow-hidden border border-border bg-white"
          >
            {tweet.url ? (
              <TweetEmbed url={tweet.url} />
            ) : (
              <div className="p-5 text-sm text-muted-foreground">
                Tweet not available
              </div>
            )}
          </div>
        ))}
        {!isLoading && list.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}