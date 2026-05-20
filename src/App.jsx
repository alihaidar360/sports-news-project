// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import TrendingNews from "./components/TrendingNews";
// import HighlightsSection from "./components/HighlightsSection";
// import TweetsSection from "./components/TweetsSection";
// import UpcomingMatches from "./components/UpcomingMatches";
// import Newsletter from "./components/Newsletter";
// import Footer from "./components/Footer";

// import ArticlePage from "./pages/ArticlePage";

// import "./index.css";

// function HomePage() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <TrendingNews />
//       <HighlightsSection />
//       <TweetsSection />
//       <UpcomingMatches />
//       <Newsletter />
//       <Footer />
//     </>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/:sport/:slug" element={<ArticlePage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



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
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* Sport pages */}
      <Route
        path="/:sport"
        element={<SportPage />}
      />

      {/* Article pages */}
      <Route
        path="/:sport/:slug"
        element={<ArticlePage />}
      />
    </Routes>
  );
};

export default App;