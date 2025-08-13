import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import "../styles/index.css";

export default function Footer() {
  return (
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
      </div>

      <div className="footer-bottom">
        <p>© 2025 Perfumería Recuérdame. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
