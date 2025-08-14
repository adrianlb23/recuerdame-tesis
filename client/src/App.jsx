import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
/*Catálogos */
import Hombre from "./pages/Hombre";
import Mujer from "./pages/Mujer";
import Nicho from "./pages/Nicho";
/*Otras páginas */
import Precios from "./pages/Precios";
import Promociones from "./pages/Promociones";
import Recomendador from "./pages/Recomendador";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hombre" element={<Hombre />} />
        <Route path="/mujer" element={<Mujer />} />
        <Route path="/nicho" element={<Nicho />} />
        <Route path="/precios" element={<Precios />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/recomendador" element={<Recomendador />} />
      </Routes>
      <Footer />
    </>
  );
}