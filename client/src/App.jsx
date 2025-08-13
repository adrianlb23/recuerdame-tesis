import React from "react";
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
      <Recomendador />
      <Footer />

    </>
  );
}
