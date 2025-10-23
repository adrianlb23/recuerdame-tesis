// src/components/ModalRecomendacion.jsx
import "../styles/ModalRecomendacion.css";

export default function ModalRecomendacion({ visible, onClose, mensaje, catalogo = [] }) {
  if (!visible) return null;

  // Buscar el perfume en el catálogo por coincidencia directa del nombre
  // Ejemplo de texto IA: "La fragancia ideal para tu caso es Irish Leather - Memo París..."
  const perfumeCoincidente = catalogo.find((p) =>
    mensaje.includes(p.nombre)
  );

  const urlPerfume = perfumeCoincidente?.url;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2 className="modal-title">
          <span className="sparkle-icon">✨</span> Asistente Recuerdín
        </h2>

        <p className="modal-text">{mensaje}</p>

        {urlPerfume ? (
          <a
            href={urlPerfume}
            target="_blank"
            rel="noopener noreferrer"
            className="fragrantica-button"
          >
            Ver Perfume
          </a>
        ) : (
          <p className="modal-text" style={{ marginTop: "0.75rem" }}>
            No se encontró un enlace para esta fragancia.
          </p>
        )}
      </div>
    </div>
  );
}
