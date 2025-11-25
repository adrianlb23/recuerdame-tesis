// src/components/ModalRecomendacion.jsx
import "../styles/ModalRecomendacion.css";

export default function ModalRecomendacion({ visible, onClose, mensaje, catalogo = [] }) {
  if (!visible) return null;

  // Buscar el perfume coincidente por nombre dentro del mensaje
  const perfumeCoincidente = catalogo.find((p) =>
    mensaje?.toLowerCase().includes(p.nombre.toLowerCase())
  );

  const urlPerfume = perfumeCoincidente?.url;

  // Formatear el mensaje para poner "Nombre - Marca" en negrita
  let mensajeFormateado = mensaje;

  if (perfumeCoincidente) {
    const etiqueta = `${perfumeCoincidente.nombre} - ${perfumeCoincidente.marca}`;
    // Si la IA no pone el " - Marca", igual intentamos con solo el nombre
    const posiblesFrases = [
      etiqueta,
      perfumeCoincidente.nombre, // fallback
    ];

    for (const frase of posiblesFrases) {
      if (mensajeFormateado.includes(frase)) {
        const resaltado = `<strong>${frase}</strong>`;
        mensajeFormateado = mensajeFormateado.replace(frase, resaltado);
        break;
      }
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2 className="modal-title">
          <span className="sparkle-icon">✨</span> Asistente Recuerdín
        </h2>

        <p
          className="modal-text"
          dangerouslySetInnerHTML={{ __html: mensajeFormateado }}
        />

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
