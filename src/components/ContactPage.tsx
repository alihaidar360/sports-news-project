import { useMemo, useState } from "react";
import EditorialPage from "./EditorialPage";

const TOPICS = [
  { value: "editorial", label: "Editorial tip / news story", email: "pzmirsports@gmail.com" },
  { value: "corrections", label: "Correction request", email: "pzmirsports@gmail.com" },
  { value: "advertise", label: "Advertising inquiry", email: "pzmirsports@gmail.com" },
  { value: "partnerships", label: "Business partnership", email: "pzmirsports@gmail.com" },
  { value: "support", label: "General support", email: "pzmirsports@gmail.com" },
];

export default function ContactPage() {
  const [topic, setTopic] = useState("editorial");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <EditorialPage
      eyebrow="Contact"
      title="Get in touch with the PZMIR team"
      lede="Whether you have a tip on a breaking sports story, a correction, an advertising brief or a partnership idea — we'd love to hear from you."
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Send us a message</h2>
        <form
          className="mt-5 grid gap-4"
         onSubmit={async (e) => {
         e.preventDefault();

        await fetch("https://sports-news-backend-nnl3.onrender.com/api/contact/", {
         method: "POST",
         headers: {
        "Content-Type": "application/json",
        },
          body: JSON.stringify({
          name,
          email,
          topic,
          message,
    }),
  });

  alert("Message sent successfully!");
}}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium">Your name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium">Topic</span>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1.5 w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium">Message</span>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center h-11 px-5 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 transition w-fit"
          >
            Send message
          </button>
          <p className="text-xs text-muted-foreground">
            Submitting opens your email client pre-filled with the correct PZMIR desk.
          </p>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Direct contacts</h2>
        <dl className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
          {TOPICS.map((t) => (
            <div key={t.value} className="rounded-lg border border-border p-4">
              <dt className="font-semibold">{t.label}</dt>
              <dd className="mt-1 text-muted-foreground">
                <a href={`mailto:${t.email}`} className="text-accent underline-offset-4 hover:underline">
                  {t.email}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Response times</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1.5">
          <li>Breaking news tips: typically within an hour, 24/7 during major events</li>
          <li>Editorial and corrections: within one business day</li>
          <li>Advertising and partnerships: within two business days</li>
          <li>General support: within three business days</li>
        </ul>
      </section>
    </EditorialPage>
  );
}