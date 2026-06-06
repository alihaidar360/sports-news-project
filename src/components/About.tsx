import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function About() {
  useEffect(() => {
    document.title = "About SportDesk — Our Mission, Newsroom & Coverage";
    setMeta("description", "SportDesk is a modern sports media publication covering football, cricket, basketball, tennis, MMA, Formula 1, WWE and esports with reporting you can trust.");
    setMeta("og:title", "About SportDesk", true);
    setMeta("og:description", "Our mission, newsroom and coverage areas.", true);
    setCanonical("/about");
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900">
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="uppercase tracking-widest text-sm opacity-80">About</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Sports journalism, built for fans who want more than the score.</h1>
            <p className="mt-4 text-lg opacity-90 max-w-3xl">SportDesk is a modern sports media publication covering the leagues, athletes and storylines that define global sport.</p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-lg">
          <h2 className="text-2xl font-bold mt-8">Our mission</h2>
          <p>SportDesk exists to give sports fans clear, accurate and contextual reporting — fast on breaking news, thoughtful on the bigger story, and honest about what we know and what we don't. We cover football, cricket, basketball, tennis, MMA, Formula 1, WWE and esports with the same standards we'd want as readers ourselves.</p>

          <h2 className="text-2xl font-bold mt-8">What we cover</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Football</strong> — Premier League, La Liga, Serie A, Bundesliga, Champions League, international tournaments and transfer windows.</li>
            <li><strong>Cricket</strong> — Test, ODI and T20 cricket across ICC events, IPL, BBL and domestic competitions.</li>
            <li><strong>Basketball</strong> — NBA, EuroLeague, FIBA international competitions and college basketball.</li>
            <li><strong>Tennis</strong> — All four Grand Slams, ATP, WTA tours and Davis/Billie Jean King Cup.</li>
            <li><strong>MMA</strong> — UFC, Bellator, ONE Championship and the wider combat-sports calendar.</li>
            <li><strong>Formula 1</strong> — Race weekends, driver markets, technical regulations and championship narratives.</li>
            <li><strong>WWE</strong> — Premium live events, weekly programming and pro-wrestling storylines.</li>
            <li><strong>Esports</strong> — League of Legends, Counter-Strike, Dota 2, Valorant and major tournament circuits.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">How we work</h2>
          <p>Every story is reported by a person, reviewed by an editor and held to a written set of standards. Our full process — fact-checking, sourcing, corrections and editorial independence — is published on our <Link to="/editorial-policy" className="text-red-600 hover:underline">Editorial Policy</Link> page.</p>

          <h2 className="text-2xl font-bold mt-8">Independence and funding</h2>
          <p>SportDesk's newsroom operates independently of our commercial team. We fund the publication through advertising, sponsorships and partnerships — none of which influence what we report. Sponsored content, when it exists, is clearly labeled.</p>

          <h2 className="text-2xl font-bold mt-8">Get in touch</h2>
          <p>Story tips, corrections, advertising inquiries and partnership requests are all welcome through our <Link to="/contact" className="text-red-600 hover:underline">Contact</Link> page.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
  el.setAttribute("href", href);
}
