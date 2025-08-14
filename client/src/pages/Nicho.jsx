import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Catalogo.css";
import "../styles/index.css";

export default function Nicho() {
  return (
    <>
  <main className="modern-main">
    <section className="hero-section">
      <h1 className="modern-title">Catálogo Nicho</h1>
      <p className="hero-description">
        Descubre nuestras exclusivas fragancias de nicho inspiradas en las
        tendencias olfativas más selectas
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
            <input type="radio" name="aroma" defaultValue="Marino" />
            <span>Marino</span>
          </label>
          <label className="filter-tag">
            <input type="radio" name="aroma" defaultValue="Aromático" />
            <span>Aromático</span>
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
          <label className="filter-tag">
            <input type="radio" name="aroma" defaultValue="Tabaco" />
            <span>Tabaco</span>
          </label>
        </div>
        <button className="clear-filters" onclick="deseleccionarRadios()">
          <i className="fas fa-times" /> Limpiar filtros
        </button>
      </div>
    </section>
    <div className="action-buttons">
      <button className="btn-secondary">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="fas fa-home" /> Inicio
        </Link>
      </button>
      
      <button className="btn-primary">
        <Link to="/precios" style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="fas fa-tags" /> Ver precios
        </Link>
      </button>
    </div>
    <section className="perfume-grid" id="perfume-grid"></section>
    <div className="stock-notice">
      <p>
        <i className="fas fa-exclamation-circle" /> Los productos marcados en
        rojo están fuera de stock o próximos a llegar.
      </p>
    </div>
  </main>
</>
  );
}
