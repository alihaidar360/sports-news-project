import { getArticles, getHighlights, getTweets, getMatches, getSports } from "../src/lib/sanity.queries";
import HomePageClient from "../src/components/HomePageClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [articles, highlights, tweets, matches, sports] = await Promise.all([
    getArticles("all"),
    getHighlights("all"),
    getTweets("all"),
    getMatches("all"),
    getSports(),
  ]);

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
