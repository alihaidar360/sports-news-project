import { getArticles, getHighlights, getTweets, getMatches, getSports } from "../../src/lib/sanity.queries";
import HomePageClient from "../../src/components/HomePageClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: { sport: string };
}

// Static pages — these are NOT sport pages
const STATIC_ROUTES = [
  "privacy", "contact", "about", "advertise",
  "disclaimer", "terms-and-conditions", "editorial-policy", "editorial"
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sport = params.sport;
  const sportLabel = sport.charAt(0).toUpperCase() + sport.slice(1);
  return {
    title: `${sportLabel} News`,
    description: `Latest ${sportLabel} news, scores, and analysis on PZMIR Sports.`,
  };
}

export default async function SportPage({ params }: Props) {
  const { sport } = params;

  // Skip static routes — they have their own pages
  if (STATIC_ROUTES.includes(sport)) {
    notFound();
  }

  const [articles, highlights, tweets, matches, sports] = await Promise.all([
    getArticles(sport),
    getHighlights(sport),
    getTweets(sport),
    getMatches(sport),
    getSports(),
  ]);

  // Verify this sport exists in Sanity
  const sportExists = sports.some((s) => s.slug === sport);
  if (!sportExists) notFound();

 return ( 
   <HomePageClient
    articles={articles} 
    highlights={highlights}
    tweets={tweets} 
    matches={matches} 
    sports={sports} 
    currentSport="all" /> 
);
}
