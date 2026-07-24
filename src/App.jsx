import { Routes, Route } from "react-router-dom";
import TestSupabase from "./pages/TestSupabase";
import Background from "./components/common/Background";
import Navbar from "./components/common/Navbar";
import Hero from "./components/builder/Hero";

import Builder from "./pages/Builder";
import PublicReveal from "./pages/PublicReveal";

function Landing() {
  return (
    <>
      <Background />
      <Navbar />
      <Hero />
    </>
  );
}

export default function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/builder"
        element={<Builder />}
      />

      <Route
        path="/wish/:websiteId"
        element={<PublicReveal />}
      />

<Route
  path="/test"
  element={<TestSupabase />}
/>
    </Routes>
  );
}