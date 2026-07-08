"use client";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  highlightThumbnail,
  type Highlight,
} from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

function relativeTime(date?: string) {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "";
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

interface Props {
  highlights: Highlight[];
}

export default function HighlightsSection({ highlights }: Props) {
  const list = highlights ?? [];
  const [active, setActive] = useState<Highlight | null>(null);

  return (
    <section id="highlights" className="container-wide mt-24">
      <SectionHeader
        eyebrow="Watch"
        title="Match highlights"
        sub="Skip the wait — the moments that mattered, in under three minutes."
      />

      <div className="mt-10 -mx-5 md:mx-0">
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth px-5 md:px-0 pb-2">
          {list.map((h) => {
            const thumbnail = highlightThumbnail(h);
            return (
              <button
                key={h._id}
                onClick={() => setActive(h)}
                className="group text-left shrink-0 w-[85%] sm:w-[60%] md:w-auto snap-start rounded-2xl overflow-hidden border border-border bg-card hover-lift hover:border-foreground/20"
              >
                <div className="relative aspect-video overflow-hidden bg-surface">
                  <img
                    src={thumbnail}
                    alt={h.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                    <span className="h-14 w-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <Play className="h-6 w-6 ml-0.5 fill-current" />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/70 backdrop-blur px-2 py-1 rounded-md">
                      {h.sport?.name ?? "Sports"}
                    </span>
                    {h.publishedAt && (
                      <span className="text-[11px] font-medium text-white bg-black/80 backdrop-blur px-2 py-1 rounded-md shadow-md">
                        {relativeTime(h.publishedAt)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-base leading-snug">
                    {h.title}
                  </h3>
                  {h.description && (
                    <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                      {h.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
          {list.length === 0 && <EmptyState />}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute -top-12 right-0 text-white hover:text-accent transition inline-flex items-center gap-2 text-sm"
            >
              Close <X className="h-4 w-4" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
              title="Match highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}