import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");
    setErrorMsg(null);

    try {
      const response = await fetch(
        "https://sports-news-backend-nnl3.onrender.com/api/subscribe/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setStatus("done");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="newsletter" className="container-wide mt-24">
      <div className="relative overflow-hidden rounded-3xl bg-foreground text-background px-6 py-14 md:px-14 md:py-20">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-accent">
              Newsletter
            </span>

            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              Never miss important sports updates.
            </h2>

            <p className="mt-4 text-base md:text-lg opacity-70 max-w-xl text-balance">
              Trending news, match highlights, transfer updates and upcoming
              fixtures — sent to your inbox three times a week. No spam.
            </p>
          </div>

          <form onSubmit={submit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-background/5 border border-background/10">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={status === "loading"}
                className="flex-1 bg-transparent px-4 py-3 text-base outline-none placeholder:text-background/40"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {status === "done" ? (
                  <>
                    Subscribed <Check className="h-4 w-4" />
                  </>
                ) : status === "loading" ? (
                  <>
                    Subscribing <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 text-xs opacity-60">
              {status === "error" && errorMsg
                ? errorMsg
                : "By subscribing you agree to our terms and privacy policy."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}