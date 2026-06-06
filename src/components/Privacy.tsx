import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy — SportDesk";
    setMeta("description", "How SportDesk collects, uses and protects your information, including cookies, analytics, newsletter subscriptions, third-party services and your rights.");
    setCanonical("/privacy");
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900">
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="uppercase tracking-widest text-sm opacity-80">Privacy</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Your privacy, clearly explained.</h1>
            <p className="mt-4 text-lg opacity-90 max-w-3xl">What we collect, why we collect it, and the rights you have over your information.</p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
          <p><em>Last updated: January 2026.</em></p>
          <p>This Privacy Policy describes how SportDesk ("we", "us", "our") collects, uses and protects information when you visit our website, subscribe to our newsletter, or otherwise interact with our services.</p>

          <h2 className="text-2xl font-bold mt-8">Information we collect</h2>
          <p>We collect two broad categories of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Information you provide directly</strong> — such as your email address when subscribing to our newsletter, or the details you submit through our contact form.</li>
            <li><strong>Information collected automatically</strong> — such as device type, browser, approximate location (derived from IP), pages visited, referring URL and time spent on the site.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Newsletter subscriptions</h2>
          <p>When you subscribe to the SportDesk newsletter, we store your email address and basic engagement information (such as opens and clicks) to deliver the newsletter, measure performance and improve content. You can unsubscribe at any time using the link at the bottom of every newsletter.</p>

          <h2 className="text-2xl font-bold mt-8">Cookies</h2>
          <p>We use cookies and similar technologies to operate the site, remember preferences, measure audience behavior and serve relevant advertising. You can control cookies through your browser settings; disabling some cookies may affect site functionality.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential cookies</strong> — required for the site to function.</li>
            <li><strong>Analytics cookies</strong> — help us understand how the site is used.</li>
            <li><strong>Advertising cookies</strong> — used to deliver and measure ads.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Analytics</h2>
          <p>We use industry-standard analytics tools to understand how readers interact with our content. These tools may collect anonymized or pseudonymized data such as page views, device type, and referral source. We do not use analytics to identify you personally.</p>

          <h2 className="text-2xl font-bold mt-8">Third-party services</h2>
          <p>We work with trusted third parties for hosting, analytics, advertising, email delivery and content distribution. These providers process information only on our behalf and in line with their own privacy and security obligations. Advertising partners may use cookies to serve ads based on your prior visits to this and other sites.</p>

          <h2 className="text-2xl font-bold mt-8">How we protect your data</h2>
          <p>We use reasonable technical and organizational measures to protect the information we collect, including encryption in transit, access controls and limited data retention. No method of transmission over the internet is 100% secure, but we work to keep your data safe.</p>

          <h2 className="text-2xl font-bold mt-8">Your rights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction or deletion of your information.</li>
            <li>Opt out of marketing communications at any time.</li>
            <li>Object to or restrict certain processing of your information.</li>
          </ul>
          <p>To exercise any of these rights, contact us through the <Link to="/contact" className="text-red-600 hover:underline">Contact</Link> page.</p>

          <h2 className="text-2xl font-bold mt-8">Children's privacy</h2>
          <p>SportDesk is not directed to children under the age of 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can remove it.</p>

          <h2 className="text-2xl font-bold mt-8">Changes to this policy</h2>
          <p>We may update this Privacy Policy from time to time. Material changes will be noted at the top of the page with a revised "last updated" date.</p>

          <h2 className="text-2xl font-bold mt-8">Contact</h2>
          <p>Questions about this policy or your data can be sent to us through the <Link to="/contact" className="text-red-600 hover:underline">Contact</Link> page.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
  el.setAttribute("href", href);
}
