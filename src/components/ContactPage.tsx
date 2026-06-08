import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import EditorialPage, { breadcrumbJsonLd } from "./EditorialPage";

const TOPICS = [
  { value: "editorial", label: "Editorial tip / news story", email: "editorial@pitch.example" },
  { value: "corrections", label: "Correction request", email: "corrections@pitch.example" },
  { value: "advertise", label: "Advertising inquiry", email: "advertise@pitch.example" },
  { value: "partnerships", label: "Business partnership", email: "partnerships@pitch.example" },
  { value: "support", label: "General support", email: "hello@pitch.example" },
];

export default function ContactPage() {
  const [topic, setTopic] = useState("editorial");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const t = TOPICS.find((x) => x.value === topic) ?? TOPICS[0];
    const subject = encodeURIComponent(`[${t.label}] from ${name || "PITCH reader"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    return `mailto:${t.email}?subject=${subject}&body=${body}`;
  }, [topic, name, email, message]);

  return (
    <EditorialPage
      eyebrow="Contact"
      title="Get in touch with the PITCH team"
      lede="Whether you have a tip on a breaking sports story, a correction, an advertising brief or a partnership idea — we'd love to hear from you."
    >
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Send us a message</h2>
        <form
          className="mt-5 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
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
            Submitting opens your email client pre-filled with the correct PITCH desk.
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
