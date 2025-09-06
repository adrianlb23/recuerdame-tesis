import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Catalogo.css";
import "../styles/index.css";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import AdminAddPerfume from "../components/AdminAdd";
import AdminEditPerfume from "../components/AdminEdit";

export default function Nicho() {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [aroma, setAroma] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setIsAuth(false);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        await api.get("/api/auth/me");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/catalogo/nicho");
        const lista = Array.isArray(data?.resultado) ? data.resultado : [];
        lista.sort((a, b) => (a?.numero ?? 0) - (b?.numero ?? 0));
        setPerfumes(lista);
      } catch (e) {
        console.error(e);
        setError("No se pudo cargar el catálogo.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const norm = (s) =>
    (s || "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

  const filtrados = useMemo(() => {
    let list = perfumes;
    const q = norm(search);
    if (q) {
      list = list.filter((p) => {
        const fields = [p.nombre, p.marca, p.tipo, p.tipo2].map(norm);
        return fields.some((f) => f.includes(q));
      });
    }
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

  const handleDelete = async (numero) => {
    const ok = window.confirm(`¿Borrar el perfume #${numero}?`);
    if (!ok) return;
    try {
      await api.delete(`/api/admin/catalogo/nicho/${numero}`);
      setPerfumes((prev) => prev.filter((p) => p.numero !== numero));
    } catch (e) {
      console.error(e);
      alert("No se pudo borrar. Verifica autenticación y backend.");
    }
  };

  const handleEditOpen = (perf) => {
    setSelected(perf);
    setOpenEdit(true);
  };

  const handleAddOpen = () => setOpenAdd(true);

  const classGenero = (g) => {
    const val = (g || "").toLowerCase();
    return `perfume-gender ${val === "hombre" ? "hombre" : val === "mujer" ? "mujer" : "unisex"}`;
  };

  return (
    <main className="modern-main">
      <section className="hero-section">
        <h1 className="modern-title">Catálogo Nicho</h1>
        <p className="hero-description">
          Descubre nuestras exclusivas fragancias de nicho inspiradas en las tendencias más selectas
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
      </section>

      <div className="filter-options-container" id="filter-options">
        <div className="filter-grid">
          {[
            "Verde","Frutal","Citrico","Amaderado","Floral","Marino",
            "Aromatico","Dulce","Avainillado","Fresco especiado",
            "Calido especiado","Ambarado","Tabaco",
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
                {opt === "Citrico" ? "Cítrico"
                  : opt === "Aromatico" ? "Aromático"
                  : opt === "Calido especiado" ? "Cálido especiado"
                  : opt}
              </span>
            </label>
          ))}
        </div>
        <button className="clear-filters" type="button" onClick={clearFilters}>
          <i className="fas fa-times" /> Limpiar filtros
        </button>
      </div>

      {/* Navegación secundaria */}
      <div className="action-buttons">
        <button className="btn-secondary" type="button">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <i className="fas fa-home" /> Inicio
          </Link>
        </button>
        <button className="btn-primary" type="button">
          <Link to="/precios" style={{ textDecoration: "none", color: "inherit" }}>
            <i className="fas fa-tags" /> Ver precios
          </Link>
        </button>
      </div>

      {/* Estados */}
      {loading && <p style={{ textAlign: "center" }}>Cargando catálogo...</p>}
      {error && !loading && <p style={{ textAlign: "center", color: "crimson" }}>{error}</p>}
      {!loading && !error && filtrados.length === 0 && (
        <p style={{ textAlign: "center" }}>No hay perfumes para mostrar.</p>
      )}

      {/* 🔐 Admin: Agregar */}
      {isAuth && (
        <div className="admin-toolbar">
          <button className="admin-add-btn" type="button" onClick={handleAddOpen}>
            <FaPlus /> Agregar perfume
          </button>
        </div>
      )}

      {/* Grid */}
      <section className="perfume-grid" id="perfume-grid">
        {filtrados.map((p) => (
          <article className="perfume-card" key={p._id || p.numero}>
            <div className="card-header">
              <div className="perfume-number">{p.numero ?? "—"}</div>
              <h3 className="perfume-name" title={p.nombre ?? "Sin nombre"}>
                {p.nombre ?? "Sin nombre"}
              </h3>

              {/* Chip de género */}
              {p.genero && (
                <span className={classGenero(p.genero)}>
                  {(p.genero || "").toUpperCase()}
                </span>
              )}
            </div>

            <div className="perfume-house" title={p.marca ?? "—"}>
              {p.marca ?? "—"}
            </div>

            <div className="perfume-notes">
              <span className="note-tag" title={p.tipo ?? "—"}>{p.tipo ?? "—"}</span>
              {p.tipo2 && <span className="note-tag" title={p.tipo2}>{p.tipo2}</span>}
            </div>

            <div className="card-divider"></div>

            <div className="card-footer">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="details-btn"
                  title={`Ver ${p.nombre} en Fragrantica`}
                >
                  <i className="fas fa-external-link-alt"></i>
                  Ver detalles
                </a>
              ) : (
                <button className="details-btn" disabled>
                  <i className="fas fa-ban"></i>
                  Sin enlace
                </button>
              )}
            </div>

            {isAuth && (
              <div className="card-admin-actions">
                <button
                  type="button"
                  className="admin-icon-btn edit"
                  title="Editar"
                  onClick={() => { setSelected(p); setOpenEdit(true); }}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="admin-icon-btn delete"
                  title="Borrar"
                  onClick={() => handleDelete(p.numero)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Modales */}
      <AdminAddPerfume
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        catalog="nicho"
        onCreated={(nuevo) =>
          setPerfumes((prev) => [...prev, nuevo].sort((a, b) => a.numero - b.numero))
        }
      />

      <AdminEditPerfume
        open={openEdit}
        onClose={() => { setOpenEdit(false); setSelected(null); }}
        catalog="nicho"
        perfume={selected}
        onUpdated={(upd) =>
          setPerfumes((prev) =>
            prev.map((p) => (p.numero === upd.numero ? upd : p)).sort((a, b) => a.numero - b.numero)
          )
        }
      />
    </main>
  );
}
