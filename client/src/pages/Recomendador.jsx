import { useEffect } from "react";
import "../styles/Recomendador.css";
import "../styles/index.css";

export default function Recomendador() {
  

  return (
    <>
  <main className="modern-main">
    <div className="recomendador-container">
      <section className="hero-section">
        <h1 className="modern-title">Recomendador de Perfumes por IA</h1>
        <p className="hero-description">
          Responde unas preguntas y cuéntanos tu estilo. Te sugeriremos
          fragancias según ocasión, clima y edad.
        </p>
      </section>
      {/* Tarjeta con el formulario */}
      <section className="reco-wrapper">
        <div className="reco-card">
          <form id="form-recomendador" noValidate="">
            <div className="reco-grid">
              {/* Género */}
              <div className="reco-field">
                <label htmlFor="genero">Género de la fragancia</label>
                <select id="genero" name="genero" required="">
                  <option value="">Seleccione...</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              {/* Ocasión */}
              <div className="reco-field">
                <label htmlFor="ocasion">Ocasión</label>
                <select id="ocasion" name="ocasion" required="">
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
                <select id="edad" name="edad" required="">
                  <option value="">Seleccione...</option>
                  <option value="juvenil">Juvenil</option>
                  <option value="maduro">Maduro</option>
                  <option value="ambos">Ambos</option>
                </select>
              </div>
              {/* Clima */}
              <div className="reco-field">
                <label htmlFor="clima">Clima</label>
                <select id="clima" name="clima" required="">
                  <option value="">Seleccione...</option>
                  <option value="frio">Frío</option>
                  <option value="calor">Calor</option>
                  <option value="versatil">Versátil</option>
                </select>
              </div>
            </div>
            {/* Prompt libre (limitado) */}
            <div className="reco-field">
              <label htmlFor="prompt">
                Descripción adicional (máx. 30 palabras)
              </label>
              <textarea
                id="prompt"
                name="prompt"
                rows={3}
                placeholder="Ej: Fresco, limpio, con toque dulce para citas..."
                defaultValue={""}
              />
              <div className="reco-help">
                <span id="word-count">0</span>/30 palabras
              </div>
            </div>
            <button className="reco-btn" type="submit">
              <i className="fas fa-magic" /> Obtener recomendación
            </button>
          </form>
        </div>
        {/* Respuesta (estática por ahora) */}
        <div className="reco-response" id="respuesta">
          <h3>
            <i className="fas fa-sparkles" /> Recomendación de la IA
          </h3>
          <p>Ingresa los valores...</p>
        </div>
      </section>
    </div>
  </main>
</>

  );
}