import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function EditorialPolicy() {
  useEffect(() => {
    document.title = "Editorial Policy — SportDesk Standards & Ethics";
    setMeta("description", "How SportDesk reports the news: fact-checking, sourcing, corrections, editorial independence and ethical standards for sports journalism.");
    setCanonical("/editorial-policy");
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900">
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="uppercase tracking-widest text-sm opacity-80">Editorial policy</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">The standards behind every SportDesk story.</h1>
            <p className="mt-4 text-lg opacity-90 max-w-3xl">How we report, source, verify and correct the sports news we publish.</p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
          <p>This Editorial Policy explains how SportDesk reports and publishes news. It applies to every reporter, editor and contributor working under the SportDesk masthead. We publish it openly because readers deserve to know how the journalism they read is made.</p>

          <h2 className="text-2xl font-bold mt-8">Fact-checking</h2>
          <p>Every news story is fact-checked before publication. Names, statistics, quotes, scores, dates, contract figures and historical claims are verified against primary sources where possible — official league communications, governing-body releases, on-the-record interviews, court filings and credentialed reporting. Where a fact cannot be independently confirmed, we say so in the story.</p>

          <h2 className="text-2xl font-bold mt-8">Source verification</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We prefer named, on-the-record sources for all reporting.</li>
            <li>Anonymous sources are used only when the information is in the public interest and cannot be obtained another way. The reason for anonymity is explained to the reader.</li>
            <li>Every anonymous source is known to at least one editor.</li>
            <li>Social-media posts are verified before being treated as news, and clearly attributed when used as the basis for a story.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Content review process</h2>
          <p>No article is published without an editor's review. Breaking news is reviewed by a duty editor before going live. Long-form pieces and investigations go through a multi-stage review including a second-read for accuracy, tone and legal risk. Headlines and social copy are reviewed alongside the article — we don't publish a headline that the story can't support.</p>

          <h2 className="text-2xl font-bold mt-8">Corrections and updates</h2>
          <p>If we get something wrong, we fix it transparently. Material corrections appear at the bottom of the story with a timestamp and a short note describing what changed. Minor typographical fixes are made silently. Updates that add new information are labeled as updates rather than rewriting the original record. Readers who spot an error can contact us through the <Link to="/contact" className="text-red-600 hover:underline">Contact</Link> page.</p>

          <h2 className="text-2xl font-bold mt-8">Editorial independence</h2>
          <p>SportDesk's editorial team operates independently of commercial, advertising and partnership functions. No advertiser, sponsor or commercial partner has approval rights over our reporting. Sponsored content is clearly labeled and produced by a separate team. Our journalists do not accept gifts, paid travel or hospitality that could compromise independent reporting.</p>

          <h2 className="text-2xl font-bold mt-8">Ethical reporting</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We treat subjects of reporting fairly and offer the right of reply on significant claims.</li>
            <li>We minimize harm — especially in coverage of injuries, mental health, abuse, and matters involving minors.</li>
            <li>We do not publish private personal information without a clear public-interest justification.</li>
            <li>We disclose conflicts of interest, including any prior relationship between a reporter and a story subject.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Content quality</h2>
          <p>We expect clear writing, accurate reporting and original analysis. We do not publish AI-generated articles as if they were written by a human reporter. Where AI tools are used to assist research, transcription or data work, the underlying journalism is still produced and verified by people.</p>

          <h2 className="text-2xl font-bold mt-8">Plagiarism and attribution</h2>
          <p>Reporting from other outlets is credited clearly and linked where possible. Original quotes, statistics and scoops are attributed to the publication that broke them. Plagiarism is a firing offense.</p>

          <h2 className="text-2xl font-bold mt-8">Transparency</h2>
          <p>Our masthead, ownership, funding model and editorial leadership are documented on the <Link to="/about" className="text-red-600 hover:underline">About</Link> page. Questions about a specific story, our standards, or this policy can be sent through the <Link to="/contact" className="text-red-600 hover:underline">Contact</Link> page and will receive a response from an editor.</p>
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
