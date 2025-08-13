import React, { useRef } from "react";
import "../styles/index.css"; // Ajusta la ruta si es necesario
import logo from "../assets/logo.png"; // Asegúrate de que la ruta sea correcta

export default function Navbar() {
  const navRef = useRef(null);

  const abrirMenu = () => {
    navRef.current.classList.add("visible");
  };

  const cerrarMenu = () => {
    navRef.current.classList.remove("visible");
  };

  return (
    <header className="modern-header">
      <div
        className="logo-container"
        onClick={() => (window.location.href = "/")}
        style={{ cursor: "pointer" }}
      >
        <img
          className="logo-img"
          src={logo}
          alt="Logo"
        />
        <h1>Perfumería Recuérdame</h1>
      </div>

      <button id="abrir" className="abrir-menu" onClick={abrirMenu}>
        <i className="fas fa-bars" />
      </button>

      <nav className="nav" id="nav" ref={navRef}>
        <button className="cerrar-menu" id="cerrar" onClick={cerrarMenu}>
          <i className="fas fa-times" />
        </button>
        <ul className="nav-list">
          <li><a href="/catalogos/hombre.html">Masculino</a></li>
          <li><a href="/catalogos/mujer.html">Femenino</a></li>
          <li><a href="/catalogos/nicho.html">Nicho</a></li>
          <li><a href="/precios/precios.html">Precios</a></li>
          <li><a href="/promociones/promociones.html">Novedades</a></li>
          <li><a href="">Recomendador</a></li>
        </ul>
      </nav>
    </header>
  );
}
