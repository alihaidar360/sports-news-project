import "./globals.css";
import type { Metadata } from "next";
import { SportFilterProvider } from "../src/context/SportFilter";

export const metadata: Metadata = {
  title: {
    default: "PZMIR — Premium Sports News",
    template: "%s | PZMIR Sports",
  },
  description:
    "Premium sports news, live scores, and expert analysis across cricket, football, MMA, basketball, tennis, esports, F1, and WWE.",
  metadataBase: new URL("https://sports-news-project.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "PZMIR Sports",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "soTh6Yb_UjwjERu4YCMG5HVvY_I42vzJmpNUFqoksYk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SportFilterProvider>
          {children}
        </SportFilterProvider>
      </body>
    </html>
  );
}