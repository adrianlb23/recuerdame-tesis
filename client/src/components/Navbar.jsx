import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    navRef.current?.classList.toggle("visible");
    overlayRef.current?.classList.toggle("visible");
    document.body.classList.toggle("no-scroll");
  };

  const closeMenu = () => {
    navRef.current?.classList.remove("visible");
    overlayRef.current?.classList.remove("visible");
    document.body.classList.remove("no-scroll");
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__logo-container">
          <button
            className="navbar__brand"
            onClick={() => navigate("/")}
            aria-label="Ir al inicio"
          >
            <img className="navbar__logo-img" src={logo} alt="Logo" />
            <h1 className="navbar__title">Perfumería Recuérdame</h1>
          </button>

          <button
            className="navbar__hamburger"
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <div className="navbar__overlay" ref={overlayRef} onClick={closeMenu} />

        <nav className="navbar__menu" ref={navRef} aria-label="Navegación principal">
          <button className="navbar__close-btn" onClick={closeMenu} aria-label="Cerrar menú">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link to="/hombre" className="navbar__link" onClick={closeMenu}>
                Masculino
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/mujer" className="navbar__link" onClick={closeMenu}>
                Femenino
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/nicho" className="navbar__link" onClick={closeMenu}>
                Nicho
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/precios" className="navbar__link" onClick={closeMenu}>
                Precios
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/promociones" className="navbar__link" onClick={closeMenu}>
                Novedades
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/recomendador" className="navbar__link" onClick={closeMenu}>
                Recomendador
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}