import React from "react";
import {
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrendingNews from "./components/TrendingNews";
import HighlightsSection from "./components/HighlightsSection";
import TweetsSection from "./components/TweetsSection";
import UpcomingMatches from "./components/UpcomingMatches";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ArticlePage from "./pages/ArticlePage";
import { useSportFilter } from "./context/SportFilter";

import EditorialPolicyPage from "./components/EditorialPolicyPage";
import PrivacyPage from "./components/PrivacyPage";
import ContactPage from "./components/ContactPage";
import AdvertisePage from "./components/AdvertisePage";
import EditorialPage from "./components/EditorialPage";
import AboutPage from "./components/AboutPage";
import DisclaimerPage from "./components/DisclaimerPage";
import TermsPage from "./components/Terms-and-conditionPage";

import "./index.css";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingNews />
      <HighlightsSection />
      <TweetsSection />
      <UpcomingMatches />
      <Newsletter />
      <Footer />
    </>
  );
}

function SportPage() {
  const { sport } = useParams();

  const { setSport } = useSportFilter();

  React.useEffect(() => {
    if (sport) {
      setSport(sport);
    }
  }, [sport]);

  return <HomePage />;
}

const App = () => {
  return (
   <Routes>
  <Route path="/" element={<HomePage />} />

  <Route path="/privacy" element={<PrivacyPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/advertise" element={<AdvertisePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
  <Route path="/disclaimer" element={<DisclaimerPage />} />
  <Route path="/terms-and-conditions" element={<TermsPage />} />

  <Route path="/:sport" element={<SportPage />} />
  <Route path="/:sport/:slug" element={<ArticlePage />} />
</Routes>

  );
};

export default App;