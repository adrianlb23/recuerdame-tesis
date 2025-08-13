import { useEffect, useRef, useState } from "react";
import "../styles/Catalogo.css";
import "../styles/index.css";

export default function Mujer() {
  return (
    <>
  <main className="modern-main">
    <section className="hero-section">
      <h1 className="modern-title">Catálogo Femenino</h1>
      <p className="hero-description">
        Descubre las más exquisitas fragancias femeninas inspiradas en las
        tendencias olfativas más elegantes
      </p>
    </section>
    <div className="disclaimer-box">
      <p>
        <strong>Nota importante:</strong> NUESTRA MARCA NO ESTÁ ASOCIADA A
        NINGUNA CASA DE PERFUMES INTERNACIONAL. UTILIZAMOS LOS NOMBRES DE LAS
        FRAGANCIAS SOLO PARA INDICAR LA TENDENCIA OLFATIVA.
      </p>
    </div>
    <section className="search-section">
      <div className="search-container">
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon" />
          <input
            type="text"
            id="search-input"
            placeholder="Buscar por nombre, marca o notas olfativas..."
          />
        </div>
      </div>
    </section>
    <section className="filter-section">
      <div className="filter-header">
        <h3>Filtrar por familia olfativa</h3>
        <button className="filter-toggle" id="filter-toggle">
          <i className="fas fa-sliders-h" /> Filtros
        </button>
      </div>
    </section>
    <div className="filter-options-container" id="filter-options">
      <div className="filter-grid">
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Verde" />
          <span>Verde</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Frutal" />
          <span>Frutal</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Citrico" />
          <span>Cítrico</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Amaderado" />
          <span>Amaderado</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Floral" />
          <span>Floral</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Floral blanco" />
          <span>Floral blanco</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Atalcado" />
          <span>Atalcado</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Dulce" />
          <span>Dulce</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Avainillado" />
          <span>Avainillado</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Fresco especiado" />
          <span>Fresco especiado</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Calido especiado" />
          <span>Cálido especiado</span>
        </label>
        <label className="filter-tag">
          <input type="radio" name="aroma" defaultValue="Ambarado" />
          <span>Ambarado</span>
        </label>
      </div>
      <button className="clear-filters" onclick="deseleccionarRadios()">
        <i className="fas fa-times" /> Limpiar filtros
      </button>
    </div>
    <div className="action-buttons">
      <button className="btn-secondary" onclick="location.href='/index.html'">
        <i className="fas fa-home" /> Inicio
      </button>
      <button
        className="btn-primary"
        onclick="location.href='../precios/precios.html'"
      >
        <i className="fas fa-tags" /> Ver precios
      </button>
    </div>
    <section className="perfume-grid" id="perfume-grid">
      {/* Las tarjetas de perfume se insertarán aquí dinámicamente */}
    </section>
  </main>
</>
  );
}
