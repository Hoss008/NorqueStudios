import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Loading from "./components/Loading";
import Service from "./components/Service";

function App() {
  return (
    <>
      <Loading />
      <SpeedInsights />
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </>
  );
}

export default App;
