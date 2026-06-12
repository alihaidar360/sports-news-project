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
  {/* Homepage */}
  <Route path="/" element={<HomePage />} />

  {/* Sport pages */}
  <Route path="/:sport" element={<SportPage />} />

  {/* Article pages */}
  <Route path="/:sport/:slug" element={<ArticlePage />} />



      {/* 1. Homepage — Sabse pehle */}
      <Route path="/" element={<HomePage />} />

      {/* 2. Static Pages — Inhe hamesha dynamic params se UPAR hona chahiye */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/advertise" element={<AdvertisePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/editorial-policy" element={<EditorialPolicyPage />} /> 
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="/terms-and-conditions" element={<TermsPage />} />
      
      {/* 3. Dynamic Pages — Yeh sabse NEECHE aayenge taake pehle static pages check ho sakein */}
      <Route path="/:sport" element={<SportPage />} />
      <Route path="/:sport/:slug" element={<ArticlePage />} />
      
      
</Routes>

  );
};

export default App;