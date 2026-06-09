import EditorialPage from "./EditorialPage";

export default function EditorialPolicyPage() {
  return (
    <EditorialPage
      eyebrow="Editorial Policy"
      title="How PZMIR reports, verifies and corrects sports news"
      lede="Sports journalism is only useful when it is accurate. This is the editorial standard every PZMIR writer and editor operates under, every day."
      updated="June 4, 2026"
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Fact-checking standards</h2>
        <p className="mt-3">
          Every story on PZMIR is fact-checked by a second editor before publication.
          Statistics are verified against primary sources — official league data,
          governing-body releases and on-the-record interviews — not aggregator sites.
          Quotes are checked against original audio or video wherever possible.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">News verification process</h2>
        <p className="mt-3">
          Breaking sports news is held until at least two independent, reliable sources
          confirm it, or until a primary source (the club, league, federation or
          athlete) makes an on-the-record statement. We label single-source reporting
          clearly and credit the original outlet.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Source transparency</h2>
        <p className="mt-3">
          We name sources whenever it is safe and possible to do so. When a source
          must be anonymous — for example, a club staffer not authorised to speak
          publicly — we explain why and describe the source's position so readers can
          assess credibility for themselves.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Corrections policy</h2>
        <p className="mt-3">
          If we publish something inaccurate, we correct it openly. Material
          corrections are appended to the bottom of the article with a timestamp and a
          short explanation of what changed and why. Headlines or URLs are never
          quietly edited.
        </p>
        <p className="mt-3">
          To request a correction, email{" "}
          <a href="mailto:pzmirsports@gmail.com" className="text-accent underline-offset-4 hover:underline">
              pzmirsports@gmail.com
          </a>{" "}
          or use our <a href="/contact" className="text-accent underline-offset-4 hover:underline">contact form</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Editorial independence</h2>
        <p className="mt-3">
          PZMIR's editorial team is structurally separate from our commercial team.
          Advertisers, sponsors and partners do not see articles before publication,
          do not influence what we cover, and cannot kill stories. Sponsored content
          is always clearly labelled as such.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Content update procedures</h2>
        <p className="mt-3">
          Live stories are updated continuously as new information emerges. Each
          update carries a timestamp. When a developing story matures into a final
          report, we leave the live timeline intact so readers can audit how the
          reporting evolved.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Ethical reporting guidelines</h2>
        <p className="mt-3">
          PZMIR journalists do not accept gifts, hospitality or paid travel that could
          compromise their independence. We protect the privacy of minors, treat
          athletes' mental health with care, and report on personal matters only when
          there is a clear public-interest justification.
        </p>
      </section>
    </EditorialPage>
  );
}