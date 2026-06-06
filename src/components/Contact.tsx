import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const departments = [
  { title: "Editorial inquiries", desc: "Story tips, corrections, interview requests and reporting feedback for our newsroom." },
  { title: "Business inquiries", desc: "Strategic conversations, content licensing and general business development." },
  { title: "Advertising inquiries", desc: "Display, sponsored content, newsletter sponsorships and media kit requests." },
  { title: "Partnership requests", desc: "Co-publishing, league and federation partnerships, and rights-holder collaborations." },
  { title: "General support", desc: "Site issues, account or newsletter questions, and everything in between." },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact SportDesk — Editorial, Business & Advertising";
    setMeta("description", "Get in touch with SportDesk for editorial tips, advertising inquiries, partnership requests and general support.");
    setCanonical("/contact");
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900">
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <p className="uppercase tracking-widest text-sm opacity-80">Contact</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Reach the SportDesk team.</h1>
            <p className="mt-4 text-lg opacity-90 max-w-3xl">Editorial tips, advertising inquiries, partnership requests and reader support — start here and we'll route your message to the right desk.</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto grid gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr]">
          <section>
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-gray-600">Verified inquiries typically receive a response within two business days.</p>
            {submitted ? (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="font-bold">Thanks — your message is in.</h3>
                <p className="mt-1 text-sm text-gray-600">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Inquiry type</label>
                  <select className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    {departments.map((d) => <option key={d.title}>{d.title}</option>)}
                  </select>
                </div>
                <Field label="Subject" name="subject" required />
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea required rows={6} className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <button className="rounded-md bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Send message</button>
              </form>
            )}
          </section>
          <aside>
            <h2 className="text-2xl font-bold">Departments</h2>
            <p className="mt-2 text-gray-600">Pick the team that fits your question.</p>
            <ul className="mt-5 space-y-4">
              {departments.map((d) => (
                <li key={d.title} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="font-bold">{d.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{d.desc}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              <strong className="text-gray-900">Response expectations:</strong> Editorial tips are triaged daily. Business, advertising and partnership inquiries typically receive a response within two business days.
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input id={name} name={name} type={type} required={required}
        className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
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
