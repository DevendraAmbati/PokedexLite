import {BrowserRouter, Routes, Route } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";

function App({ url }) {
  const isServer = typeof window === "undefined";

  const Router = isServer ? StaticRouter : BrowserRouter;
  return (
    <Router location={url}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;