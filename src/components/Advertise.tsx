import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const formats = [
  { title: "Display advertising", desc: "Premium IAB-standard placements across article, category and homepage templates with viewability-optimized layouts." },
  { title: "Sponsored content", desc: "Editorially-supervised branded stories clearly labeled as sponsored, written to match the quality of our newsroom." },
  { title: "Newsletter sponsorships", desc: "Dedicated and inline placements inside our daily and weekly newsletters, reaching an opted-in sports audience." },
  { title: "Custom partnerships", desc: "Series sponsorships, live-event coverage, podcasts, video integrations and rights-holder activations." },
];

export default function Advertise() {
  useEffect(() => {
    document.title = "Advertise with SportDesk — Reach Engaged Sports Fans";
    setMeta("description", "Partner with SportDesk to reach engaged fans across football, cricket, basketball, tennis, MMA, F1, WWE and esports through display, sponsored content and newsletter sponsorships.");
    setCanonical("/advertise");
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900">
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="uppercase tracking-widest text-sm opacity-80">Advertise</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Reach engaged sports fans, in context.</h1>
            <p className="mt-4 text-lg opacity-90 max-w-3xl">SportDesk partners with brands that want to show up where committed fans actually spend time — alongside the reporting, analysis and highlights they come back for every day.</p>
            <Link to="/contact" className="inline-block mt-6 rounded-md bg-white text-red-700 px-5 py-3 text-sm font-semibold hover:bg-gray-100">Request media kit</Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold">Why partner with SportDesk</h2>
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <Stat label="Editorial-first environment" value="Brand-safe context next to original reporting." />
            <Stat label="Cross-sport reach" value="Football, cricket, basketball, tennis, MMA, F1, WWE & esports." />
            <Stat label="Engaged audience" value="Readers who return for in-depth coverage, not just scores." />
          </div>
        </section>

        <section className="bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold">Advertising formats</h2>
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              {formats.map((f) => (
                <div key={f.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold">Editorial integrity, every campaign</h2>
          <p className="mt-3 text-gray-700 max-w-3xl">Our newsroom operates independently of our commercial team. Sponsored content is clearly labeled and produced separately from editorial. Advertisers do not see, influence or approve our reporting.</p>

          <h2 className="text-2xl md:text-3xl font-bold mt-12">Get the media kit</h2>
          <p className="mt-3 text-gray-700 max-w-3xl">Tell us about your campaign goals, target audience and timing. We'll respond with audience data, available formats and recommended packages.</p>
          <Link to="/contact" className="inline-block mt-5 rounded-md bg-red-600 text-white px-5 py-3 text-sm font-semibold hover:bg-red-700">Contact our partnerships team</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-gray-800">{value}</p>
    </div>
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
