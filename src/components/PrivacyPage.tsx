import EditorialPage, { breadcrumbJsonLd } from "./EditorialPage";


export default function PrivacyPage() {
  return (
    <EditorialPage
      eyebrow="Privacy"
      title="Privacy policy"
      lede="This policy explains what data PITCH collects when you read, subscribe or interact with our site — and the choices you have about that data."
      updated="June 4, 2026"
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Newsletter data collection</h2>
        <p className="mt-3">
          When you subscribe to the PZMIR newsletter we collect your email address.
          We use it only to send you the newsletter you signed up for. You can
          unsubscribe at any time using the link at the foot of every email.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Cookies</h2>
        <p className="mt-3">
          PZMIR uses cookies and similar technologies to remember your preferences
          (such as theme and selected sport), measure how the site is used, and serve
          relevant advertising. You can disable cookies in your browser at any time,
          though some site features may stop working.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Google Analytics</h2>
        <p className="mt-3">
          We use Google Analytics to understand which articles and sports our readers
          care about, in aggregate. Google Analytics may set cookies on your device.
          We do not pass personally identifying information to Google.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Third-party services</h2>
        <p className="mt-3">
          Some features on PZMIR are powered by third parties — embedded posts from
          X/Twitter, video from YouTube and our content management system. These
          services may set their own cookies subject to their own privacy policies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Advertising and tracking</h2>
        <p className="mt-3">
          PZMIR may show advertising served by third-party networks, including Google
          AdSense. These networks may use cookies or device identifiers to serve ads
          based on your visit to this and other websites. You can opt out of
          personalised advertising via your Google account settings, or via the
          ad-industry opt-out pages at{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            aboutads.info/choices
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Data protection</h2>
        <p className="mt-3">
          We store reader data on secure, encrypted infrastructure. We never sell
          personal data to third parties. Access to subscriber data inside PZMIR is
          limited to the editorial and product staff who need it to operate the
          newsletter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Your rights</h2>
        <p className="mt-3">
          Wherever you are, you can request a copy of the data we hold about you,
          ask us to correct it, or ask us to delete it. Email{" "}
          <a href="mailto:pzmirsports@gmail.com" className="text-accent underline-offset-4 hover:underline">
            pzmirsports@gmail.com
          </a>{" "}
          and we will respond within 30 days.
        </p>
      </section>
    </EditorialPage>
  );
}
