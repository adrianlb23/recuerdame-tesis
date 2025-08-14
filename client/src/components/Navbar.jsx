import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import logo from "../assets/logo.png";

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
          <li><Link to="/hombre">Masculino</Link></li>
          <li><Link to="/mujer">Femenino</Link></li>
          <li><Link to="/nicho">Nicho</Link></li>
          <li><Link to="/precios">Precios</Link></li>
          <li><Link to="/promociones">Novedades</Link></li>
          <li><Link to="/recomendador">Recomendador</Link></li>
        </ul>
      </nav>
    </header>
  );
}