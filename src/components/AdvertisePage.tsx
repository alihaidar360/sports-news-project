import { createFileRoute } from "@tanstack/react-router";
import EditorialPage, { breadcrumbJsonLd } from "./EditorialPage";




export default function AdvertisePage() {
  return (
    <EditorialPage
      eyebrow="Advertise"
      title="Reach a global, high-intent sports audience"
      lede="PZMIR puts your brand in front of fans who actively follow breaking sports news, match highlights and live updates across every major sport."
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Our audience</h2>
        <p className="mt-3">
          PZMIR readers are passionate, mobile-first sports fans who come to us for
          fast, accurate coverage of football, cricket, basketball, tennis, MMA,
          Formula 1, WWE and esports. They read multiple stories per session, return
          daily during live events, and engage heavily with video highlights.
        </p>
        <ul className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
          <li className="rounded-lg border border-border p-4">
            <div className="text-2xl font-bold">Global</div>
            <div className="text-muted-foreground mt-1">Coverage across every major league and federation</div>
          </li>
          <li className="rounded-lg border border-border p-4">
            <div className="text-2xl font-bold">Mobile-first</div>
            <div className="text-muted-foreground mt-1">Fast pages built for live event traffic spikes</div>
          </li>
          <li className="rounded-lg border border-border p-4">
            <div className="text-2xl font-bold">Engaged</div>
            <div className="text-muted-foreground mt-1">Newsletter and direct-traffic dominant audience</div>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Display advertising</h2>
        <p className="mt-3">
          High-viewability display placements across our homepage, sport category
          pages and article pages. We support standard IAB sizes, programmatic
          partners and direct insertion orders.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Sponsored content</h2>
        <p className="mt-3">
          Branded articles, sponsored match previews and partner-produced video — all
          clearly labelled as sponsored in line with our{" "}
          <a href="/editorial-policy" className="text-accent underline-offset-4 hover:underline">
            editorial policy
          </a>
          . Our team can produce the creative or run your existing assets.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Newsletter sponsorship</h2>
        <p className="mt-3">
          Place your brand inside our daily sports digest, which lands in inboxes
          before the morning's biggest stories break. Exclusive sponsorships and
          embedded native units are both available.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Brand partnerships</h2>
        <p className="mt-3">
          Long-term partnerships for broadcasters, betting operators, kit
          manufacturers and consumer brands looking to integrate with a trusted sports
          media platform. We co-create season-long content series, podcasts and live
          event coverage.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Media inquiries</h2>
        <p className="mt-3">
          For press releases, interview requests, embargoed news and media kits,
          please reach our editorial desk via the{" "}
          <a href="/contact" className="text-accent underline-offset-4 hover:underline">
            contact page
          </a>
          .
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/40 p-6">
        <h2 className="text-xl font-bold tracking-tight">Talk to our commercial team</h2>
        <p className="mt-2 text-muted-foreground">
          Email{" "}
          <a href="mailto:pzmirsports@gmail.com" className="text-accent underline-offset-4 hover:underline">
             pzmirsports@gmail.com
          </a>{" "}
          with your campaign goals, timing and target markets. We respond to advertiser
          enquiries within two business days.
        </p>
      </section>
    </EditorialPage>
  );
}
