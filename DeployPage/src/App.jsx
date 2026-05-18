import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/about/About";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
