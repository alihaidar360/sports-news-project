"use client";

import EditorialLayout from "./EditorialLayout";


export default function AboutPage() {
  return (
    <EditorialLayout
      eyebrow="About"
      title="A reader-first sports newsroom built for speed and trust"
      lede="PZMIR is an independent sports media publication covering breaking sports news, live match updates, video highlights 
      and long-form analysis across every major sport in the world."
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Our mission</h2>
        <p className="mt-3">
          We believe sports fans deserve a single, fast, trustworthy place to follow the
          stories that matter — without ads that get in the way, clickbait headlines or
          recycled wire copy. PZMIR exists to deliver clear, well-sourced sports
          journalism the moment news breaks.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Why readers trust us</h2>
        <p className="mt-3">
          Every story published on PZMIR is reviewed by a human editor before it goes
          live. We name our sources, link to primary documents whenever possible, and
          publish visible corrections when we get something wrong. Our editorial team
          operates independently from our commercial team.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Sports we cover</h2>
        <p className="mt-3">
          We provide breaking sports news and analysis across{" "}
          <strong>football news</strong>, <strong>cricket news</strong>,{" "}
          <strong>basketball news</strong>, tennis, mixed martial arts (MMA),
          Formula 1, WWE and the fast-growing world of esports. Every category gets the
          same editorial standard: verified, sourced, and contextualised.
        </p>
        <h3 className="mt-6 text-lg font-semibold">Our core beats</h3>
        <ul className="mt-3 list-disc pl-5 space-y-1.5">
          <li>Football — Premier League, La Liga, Serie A, Bundesliga, MLS and international</li>
          <li>Cricket — Test, ODI, T20I, IPL, BBL and The Hundred</li>
          <li>Basketball — NBA, EuroLeague and FIBA tournaments</li>
          <li>Tennis — ATP, WTA and the four Grand Slams</li>
          <li>MMA — UFC, PFL, Bellator and Asian promotions</li>
          <li>Formula 1 — race weekends, paddock news and driver moves</li>
          <li>WWE — Raw, SmackDown, NXT and premium live events</li>
          <li>Esports — League of Legends, Valorant, CS2, Dota 2 and more</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Editorial standards</h2>
        <p className="mt-3">
          PZMIR follows a clear set of editorial standards covering accuracy, fairness
          and independence. Read the full{" "}
          <a href="/editorial-policy" className="text-accent underline-offset-4 hover:underline">
            editorial policy
          </a>{" "}
          for our fact-checking, sourcing and corrections processes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Commitment to accuracy</h2>
        <p className="mt-3">
          When a story changes, we update it transparently — every meaningful
          correction is timestamped and explained at the foot of the article. We never
          quietly delete or rewrite published reporting.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Fast sports reporting, global coverage</h2>
        <p className="mt-3">
          Our editors operate across time zones so that live sports updates, match
          reports and breaking sports news are published within minutes of an event.
          PZMIR covers competitions on every continent, in every major league.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Reader-first journalism</h2>
        <p className="mt-3">
          We don't sell your data, we don't write for the algorithm, and we don't pad
          articles to hit a word count. Every story on PZMIR is written for the reader
          first. If you ever feel we've fallen short of that, please{" "}
          <a href="/contact" className="text-accent underline-offset-4 hover:underline">
            contact us
          </a>
          .
        </p>
      </section>
    </EditorialLayout>
  );
}