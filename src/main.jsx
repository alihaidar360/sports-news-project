import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SportFilterProvider } from "./context/SportFilter";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SportFilterProvider>
          <App />
        </SportFilterProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);