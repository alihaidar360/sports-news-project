"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SPORTS = [
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "MMA",
  "Formula 1",
  "WWE",
  "Esports",
];

interface Props {
  eyebrow: string;
  title: string;
  lede: string;
  updated?: string;
  children: ReactNode;
}

export default function EditorialLayout({ eyebrow, title, lede, updated, children }: Props) {
  return (
    <article className="container-wide pt-10 md:pt-14 pb-20">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Link href="/" className="hover:text-foreground transition">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{eyebrow}</span>
      </nav>

      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
        <h1 className="mt-4 text-balance text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground text-balance">{lede}</p>
        {updated && (
          <p className="mt-3 text-xs text-muted-foreground">Last updated {updated}</p>
        )}
      </header>

      <div className="mt-12 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 prose-editorial space-y-8 text-base leading-relaxed text-foreground/90">
          {children}
        </div>
        <aside className="lg:col-span-4 space-y-8">
          <div className="rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Sports we cover
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-1.5 text-sm">
              {SPORTS.map((s) => (
                <li key={s}>
                  <Link href="/" className="hover:text-accent transition">
                    {s} news
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick links
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition">About PZMIR</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-accent transition">Editorial policy</Link></li>
              <li><Link href="/advertise" className="hover:text-accent transition">Advertise with us</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition">Privacy policy</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact us</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}

export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sport-news-project.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `https://sport-news-project.vercel.app${path}`,
      },
    ],
  };
}
