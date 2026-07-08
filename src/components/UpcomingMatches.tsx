"use client";
import { useEffect, useState } from "react";
import { MapPin, Trophy } from "lucide-react";
import {
  teamLogo,
  type Match,
} from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

function useCountdown(iso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(iso).getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function MatchRow({ match }: { match: Match }) {
  const c = useCountdown(match.date);
  const date = new Date(match.date);
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: "short", month: "short", day: "numeric",
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-5 rounded-2xl border border-border bg-card hover:border-foreground/20 transition">
      <div className="md:col-span-2">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{dateStr}</div>
        <div className="text-2xl font-display font-bold tracking-tight">{timeStr}</div>
      </div>

      <div className="md:col-span-5 flex items-center gap-4">
        <Team logo={teamLogo(match.team1Logo)} name={match.team1} />
        <span className="text-sm font-semibold text-muted-foreground px-2">vs</span>
        <Team logo={teamLogo(match.team2Logo)} name={match.team2} />
      </div>

      <div className="md:col-span-3 text-sm text-muted-foreground space-y-1">
        {match.tournament && (
          <div className="inline-flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5" /> {match.tournament}
          </div>
        )}
        {match.stadium && (
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {match.stadium}
          </div>
        )}
      </div>

      <div className="md:col-span-2 flex md:justify-end">
        <div className="inline-flex items-center gap-2 text-xs font-mono tabular-nums px-3 py-1.5 rounded-md bg-secondary text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          {c.d}d {String(c.h).padStart(2, "0")}h {String(c.m).padStart(2, "0")}m {String(c.s).padStart(2, "0")}s
        </div>
      </div>
    </div>
  );
}

function Team({ logo, name }: { logo?: string; name: string }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center overflow-hidden">
        {logo ? (
          <img src={logo} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs font-bold">{name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <span className="font-semibold truncate">{name}</span>
    </div>
  );
}

interface Props {
  matches: Match[];
}

export default function UpcomingMatches({ matches }: Props) {
  const list = matches ?? [];

  return (
    <section className="container-wide mt-24">
      <SectionHeader
        eyebrow="Schedule"
        title="Upcoming this week"
        sub="The next seven days of fixtures across all sports."
      />
      <div className="mt-10 space-y-3">
        {list.map((m) => (
          <MatchRow key={m._id} match={m} />
        ))}
        {list.length === 0 && (
          <div className="grid">
            <EmptyState />
          </div>
        )}
      </div>
    </section>
  );
}