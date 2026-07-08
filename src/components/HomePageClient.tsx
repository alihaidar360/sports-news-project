"use client";
import InfoModal from "./InfoModal";
import Navbar from "./Navbar";
import Hero from "./Hero";
import TrendingNews from "./TrendingNews";
import HighlightsSection from "./HighlightsSection";
import TweetsSection from "./TweetsSection";
import UpcomingMatches  from "./UpcomingMatches";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

import type {
  Article, Highlight, Tweet, Match, Sport,
} from "../lib/sanity.queries";

interface Props {
  articles: Article[];
  highlights: Highlight[];
  tweets: Tweet[];
  matches: Match[];
  sports: Sport[];
  currentSport: string;
}

export default function HomePageClient({
  articles, highlights, tweets, matches, sports, currentSport,
}: Props) {
  return ( 
     <> 
       {<InfoModal />} 
       <Navbar sports={sports} currentSport={currentSport} />
       {<Hero articles={articles} currentSport={currentSport} />} 
       <TrendingNews articles={articles} /> 
       <HighlightsSection highlights={highlights} /> 
       <TweetsSection tweets={tweets} /> 
       <UpcomingMatches matches={matches}/> 
       <Newsletter /> <Footer />  
    </> 
);
}



