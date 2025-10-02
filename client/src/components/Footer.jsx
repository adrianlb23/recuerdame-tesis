import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import api from "../services/api";
import LoginModal from "./LoginModal";
import "../styles/Footer.css";

export default function Footer() {
  const [isAuth, setIsAuth] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(Boolean(token));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    window.location.reload();
  };

  return (
    <>
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>
              <FaPhoneAlt className="icon" aria-hidden="true" /> +56 9 6547 2295
            </p>
            <p>
              <FaEnvelope className="icon" aria-hidden="true" /> perfumesrecuerdame@gmail.com
            </p>
            <p>
              <FaMapMarkerAlt className="icon" aria-hidden="true" /> Persa Víctor Manuel: Galería La Curtiembre
            </p>
          </div>

          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/perfumeriarecuerdame/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Perfumería Recuérdame"
              >
                <FaInstagram className="icon" />
              </a>
            </div>
          </div>

          {/* Sección de autenticación en el footer */}
          <div className="footer-section">
            <h4>Cuenta</h4>
            <div className="auth-section">
              {isAuth ? (
                <button
                  className="footer-logout-btn"
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <FaSignOutAlt className="icon" />
                  Cerrar sesión
                </button>
              ) : (
                <button
                  className="footer-login-btn"
                  onClick={() => setOpenLogin(true)}
                  title="Iniciar sesión"
                  aria-label="Iniciar sesión"
                >
                  <FaSignInAlt className="icon" />
                  Iniciar sesión
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Perfumería Recuérdame. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de login */}
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => setIsAuth(true)}
      />
    </>
  );
}