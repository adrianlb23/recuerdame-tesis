import { useState } from "react";
import "../styles/Recomendador.css";
import ModalRecomendacion from "../components/ModalRecomendacion";

// Estados para manejar IA, modal y carga
export default function Recomendador() {
  const [mensajeIA, setMensajeIA] = useState("");
  const [catalogoFiltrado, setCatalogoFiltrado] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  // Función que maneja el envío del formulario
  const handleRecomendacion = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Obtener valores de los campos
    const genero = document.getElementById("genero").value;
    const ocasion = document.getElementById("ocasion").value;
    const edad = document.getElementById("edad").value;
    const clima = document.getElementById("clima").value;
    const prompt = document.getElementById("prompt").value;

    // Validación simple
    if (!genero || !ocasion || !edad || !clima || !prompt) {
      alert("Por favor completa todos los campos antes de continuar.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/ia/recomendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genero, ocasion, clima, edad, prompt }),
      });

      const data = await response.json();

      // Guarda el texto de la IA
      if (data.recomendacionIA) {
        setMensajeIA(data.recomendacionIA);
      } else if (data.mensaje) {
        setMensajeIA(data.mensaje);
      }

      // Guarda el catálogo filtrado (aunque esté vacío)
      setCatalogoFiltrado(data.catalogoFiltrado || []);

      setShowModal(true);

    } catch (error) {
      console.error("Error al obtener la recomendación:", error);
      setMensajeIA("Ocurrió un error al conectarse con el servidor.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Cierra el modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <main className="modern-main">
        <div className="recomendador-container">
          <section className="hero-section">
            <h1 className="modern-title">Recomendador de Perfumes</h1>
            <p className="hero-description">
              Responde unas preguntas y cuéntanos tu estilo. Te sugeriremos
              fragancias según ocasión, clima y tu edad.
            </p>
          </section>

          {/* Formulario principal */}
          <section className="reco-wrapper">
            <div className="reco-card">
              <form id="form-recomendador" onSubmit={handleRecomendacion}>
                <div className="reco-grid">
                  {/* Género */}
                  <div className="reco-field">
                    <label htmlFor="genero">Género de la fragancia</label>
                    <select id="genero" name="genero" required>
                      <option value="">Seleccione...</option>
                      <option value="hombre">Hombre</option>
                      <option value="mujer">Mujer</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>

                  {/* Ocasión */}
                  <div className="reco-field">
                    <label htmlFor="ocasion">Ocasión</label>
                    <select id="ocasion" name="ocasion" required>
                      <option value="">Seleccione...</option>
                      <option value="diario">Diario</option>
                      <option value="formal">Formal</option>
                      <option value="citas">Citas</option>
                      <option value="fiestas">Fiestas</option>
                    </select>
                  </div>

                  {/* Edad */}
                  <div className="reco-field">
                    <label htmlFor="edad">Edad</label>
                    <select id="edad" name="edad" required>
                      <option value="">Seleccione...</option>
                      <option value="juvenil">Juvenil</option>
                      <option value="maduro">Maduro</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>

                  {/* Clima */}
                  <div className="reco-field">
                    <label htmlFor="clima">Clima</label>
                    <select id="clima" name="clima" required>
                      <option value="">Seleccione...</option>
                      <option value="frio">Frío</option>
                      <option value="calor">Calor</option>
                      <option value="versatil">Versátil</option>
                    </select>
                  </div>
                </div>

                {/* Prompt adicional */}
                <div className="reco-field">
                  <label htmlFor="prompt">
                    Descripción adicional (máx. 30 palabras)
                  </label>
                  <textarea
                    id="prompt"
                    name="prompt"
                    rows={3}
                    placeholder="Ej: Fresco, limpio, con toque dulce para citas..."
                  />
                </div>

                <button
                  className="reco-btn"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Consultando..." : "Obtener recomendación"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* Modal con la respuesta de la IA */}
      <ModalRecomendacion
        visible={showModal}
        onClose={handleCloseModal}
        mensaje={mensajeIA}
        catalogo={catalogoFiltrado}
      />

    </>
  );
}
