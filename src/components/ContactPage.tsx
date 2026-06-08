import { useState } from "react";
import EditorialPage from "./EditorialPage";

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
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

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
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true); // Button ko loading par daal dein

            try {
              const response = await fetch("https://sports-news-backend-nnl3.onrender.com/api/contact/", {
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

              if (response.ok) {
                alert("Message sent successfully! 🎉");
                // Form ko reset karein
                setName("");
                setEmail("");
                setMessage("");
                setTopic("editorial");
              } else {
                alert("Something went wrong on the server. Please try again.");
              }
            } catch (error) {
              console.error("Network Error:", error);
              alert("Network error! Please check if your backend is running.");
            } finally {
              setIsSubmitting(false); // Loading khatam
            }
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium">Your name</span>
              <input
                required
                disabled={isSubmitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input
                required
                type="email"
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium">Topic</span>
            <select
              value={topic}
              disabled={isSubmitting}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1.5 w-full h-11 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
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
              disabled={isSubmitting}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center h-11 px-5 rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 transition w-fit disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
          <p className="text-xs text-muted-foreground">
            Submitting saves your message directly to our dashboard.
          </p>
        </form>
      </section>

      {/* Direct Contacts Section */}
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

      {/* Response Times Section */}
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