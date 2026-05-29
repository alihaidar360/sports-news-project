import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSportFilter } from "../context/SportFilter";
import { tweetsQueryOptions } from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

// Twitter/X widgets.js — loads once, then auto-renders any
// <blockquote class="twitter-tweet"> on the page. Fully free, no API key.
const TWITTER_WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (el?: HTMLElement | null) => void;
      };
    };
  }
}

function ensureTwitterWidgets(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.twttr?.widgets) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${TWITTER_WIDGETS_SRC}"]`,
  );
  if (existing) {
    return new Promise((resolve) => existing.addEventListener("load", () => resolve()));
  }
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = TWITTER_WIDGETS_SRC;
    s.async = true;
    s.charset = "utf-8";
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

export default function TweetsSection() {
  const { sport } = useSportFilter();
  const { data, isLoading } = useQuery(tweetsQueryOptions(sport));
  const list = data ?? [];
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (list.length === 0) return;
    let cancelled = false;
    ensureTwitterWidgets().then(() => {
      if (cancelled) return;
      window.twttr?.widgets?.load(gridRef.current);
    });
    return () => {
      cancelled = true;
    };
  }, [list]);

  return (
    <section className="container-wide mt-24">
      <SectionHeader
        eyebrow="Loading..."
        title="What people are posting"
        sub="Real embedded posts — likes, replies and reposts update automatically."
      />

      <div
        ref={gridRef}
        className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
      >
        {list.map((t) => (
          <div
            key={t._id}
            className="rounded-2xl border border-border bg-card overflow-hidden p-2 [&_.twitter-tweet]:!mx-auto"
          >
            <blockquote
              className="twitter-tweet"
              data-dnt="true"
              data-theme="light"
            >
              <a href={t.url}>Loading...</a>
            </blockquote>
          </div>
        ))}
        {!isLoading && list.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}
