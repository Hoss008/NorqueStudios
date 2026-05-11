import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/about/About";
import Layout from "./components/Layout";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
