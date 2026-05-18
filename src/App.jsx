import React from 'react'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrendingNews from "./components/TrendingNews";
import HighlightsSection from "./components/HighlightsSection";
import TweetsSection from "./components/TweetsSection";
import UpcomingMatches from "./components/UpcomingMatches";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import "./index.css";
const App = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <TrendingNews />
        <HighlightsSection />
        <TweetsSection />
        <UpcomingMatches />
        <Newsletter />
        <Footer />
    </div>
  )
}

export default App