import { useEffect, useState } from "react";
import { X, Zap, Newspaper, PlayCircle, CalendarDays } from "lucide-react";

const KEY = "pitch.intro.seen.v1";

export default function InfoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(KEY);
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const close = (explore: boolean) => {
    localStorage.setItem(KEY, "1");
    setOpen(false);
    if (explore) {
      document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-md fade-in"
      onClick={() => close(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass relative w-full max-w-lg rounded-3xl p-7 md:p-9 shadow-2xl"
      >
        <button
          aria-label="Close"
          onClick={() => close(false)}
          className="absolute top-4 right-4 h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          <Zap className="h-3.5 w-3.5" /> Welcome
        </span>
        <h3 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-balance">
          Fast sports news, without the distractions.
        </h3>
        <p className="mt-3 text-muted-foreground text-balance">
          Follow trending news, live highlights, verified social updates and
          upcoming matches in one clean and modern platform built for sports fans.
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          <Row icon={<Newspaper className="h-4 w-4" />} text="Top 10 trending stories, refreshed daily" />
          <Row icon={<PlayCircle className="h-4 w-4" />} text="Match highlights ready to watch in seconds" />
          <Row icon={<CalendarDays className="h-4 w-4" />} text="Upcoming fixtures with live countdowns" />
        </ul>

        <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={() => close(false)}
            className="h-10 px-4 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          >
            Continue later
          </button>
          <button
            onClick={() => close(true)}
            className="h-10 px-5 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 transition"
          >
            Explore platform
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-foreground">
        {icon}
      </span>
      <span className="text-foreground/90">{text}</span>
    </li>
  );
}
