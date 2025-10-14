import "../styles/ModalRecomendacion.css";

// Modal para mostrar recomendaciones, sólo se muestra si 'visible' es true
export default function ModalRecomendacion({ visible, onClose, mensaje }) {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">Asistente Recuerdín</h2>
        <p className="modal-text">{mensaje}</p>
      </div>
    </div>
  );
}
