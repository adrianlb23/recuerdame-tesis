// pages/Nicho.jsx
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Catalogo.css";
import "../styles/index.css";

export default function Nicho() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI
  const [search, setSearch] = useState("");
  const [aroma, setAroma] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // Puedes usar ?ultimos=10 si quieres limitar: /api/catalogo/nicho?ultimos=10
        const { data } = await api.get("/api/catalogo/nicho");
        // El backend ya ordena por numero; mostramos solo campos públicos
        setPerfumes(Array.isArray(data?.resultado) ? data.resultado : []);
      } catch (e) {
        console.error(e);
        setError("No se pudo cargar el catálogo.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const norm = (s) =>
    (s || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  const filtrados = useMemo(() => {
    let list = perfumes;

    // Búsqueda por nombre / marca / tipo / tipo2
    const q = norm(search);
    if (q) {
      list = list.filter((p) => {
        const fields = [p.nombre, p.marca, p.tipo, p.tipo2].map(norm);
        return fields.some((f) => f.includes(q));
      });
    }

    // Radio por familia olfativa (tipo/tipo2)
    const sel = norm(aroma);
    if (sel) {
      list = list.filter((p) => norm(p.tipo) === sel || norm(p.tipo2) === sel);
    }

    return list;
  }, [perfumes, search, aroma]);

  const clearFilters = () => {
    setSearch("");
    setAroma("");
  };

  return (
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

      {/* Búsqueda */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <i className="fas fa-search search-icon" />
            <input
              type="text"
              id="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, marca o notas olfativas..."
            />
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="filter-section">
        <div className="filter-header">
          <h3>Filtrar por familia olfativa</h3>
          <button className="filter-toggle" id="filter-toggle" type="button">
            <i className="fas fa-sliders-h" /> Filtros
          </button>
        </div>

        <div className="filter-options-container" id="filter-options">
          <div className="filter-grid">
            {[
              "Verde",
              "Frutal",
              "Citrico",
              "Amaderado",
              "Floral",
              "Marino",
              "Aromatico",
              "Dulce",
              "Avainillado",
              "Fresco especiado",
              "Calido especiado",
              "Ambarado",
              "Tabaco",
            ].map((opt) => (
              <label className="filter-tag" key={opt}>
                <input
                  type="radio"
                  name="aroma"
                  value={opt}
                  checked={aroma === opt}
                  onChange={(e) => setAroma(e.target.value)}
                />
                <span>
                  {opt === "Citrico"
                    ? "Cítrico"
                    : opt === "Aromatico"
                    ? "Aromático"
                    : opt === "Calido especiado"
                    ? "Cálido especiado"
                    : opt}
                </span>
              </label>
            ))}
          </div>

          <button
            className="clear-filters"
            type="button"
            onClick={clearFilters}
          >
            <i className="fas fa-times" /> Limpiar filtros
          </button>
        </div>
      </section>

      <div className="action-buttons">
        <button className="btn-secondary" type="button">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <i className="fas fa-home" /> Inicio
          </Link>
        </button>
        <button className="btn-primary" type="button">
          <Link
            to="/precios"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <i className="fas fa-tags" /> Ver precios
          </Link>
        </button>
      </div>

      {/* Estados */}
      {loading && <p style={{ textAlign: "center" }}>Cargando catálogo...</p>}
      {error && !loading && (
        <p style={{ textAlign: "center", color: "crimson" }}>{error}</p>
      )}
      {!loading && !error && filtrados.length === 0 && (
        <p style={{ textAlign: "center" }}>No hay perfumes para mostrar.</p>
      )}

      {/* Grid de tarjetas */}
      <section className="perfume-grid" id="perfume-grid">
        {filtrados.map((p) => (
          <article className="perfume-card" key={p._id || p.numero}>
            {/* HEADER */}
            <div className="card-header">
              <div className="perfume-number">{p.numero ?? "—"}</div>
              <h3 className="perfume-name" title={p.nombre ?? "Sin nombre"}>
                {p.nombre ?? "Sin nombre"}
              </h3>
              {/* Clase extra para género (Hombre/Mujer/Unisex) */}
              {p.genero && (
                <span className={`perfume-gender ${p.genero.toLowerCase()}`}>
                  {p.genero}
                </span>
              )}
            </div>

            {/* BODY */}
            <div className="card-body">
              <p className="perfume-house" title={p.marca ?? "—"}>
                {p.marca ?? "—"}
              </p>
              <div className="perfume-notes">
                <span className="note-tag" title={p.tipo ?? "—"}>
                  {p.tipo ?? "—"}
                </span>
                {p.tipo2 && (
                  <span className="note-tag" title={p.tipo2}>
                    {p.tipo2}
                  </span>
                )}
              </div>
            </div>

            <div className="card-divider"></div>
            
            {/* FOOTER */}
            <div className="card-footer">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="details-btn"
                  title={`Ver ${p.nombre} en Fragrantica`}
                >
                  <i
                    className="fas fa-external-link-alt"
                    style={{ marginRight: 8 }}
                  />
                  Ver detalles
                </a>
              ) : (
                <button className="details-btn" disabled>
                  <i className="fas fa-ban" style={{ marginRight: 8 }} />
                  Sin enlace
                </button>
              )}
            </div>
          </article>
        ))}
      </section>

      <div className="stock-notice">
        <p>
          <i className="fas fa-exclamation-circle" /> Los productos marcados en
          rojo están fuera de stock o próximos a llegar.
        </p>
      </div>
    </main>
  );
}
