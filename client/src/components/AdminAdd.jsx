import { useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../services/api";
import "../styles/AdminForms.css";

const ENUMS = {
  genero: ["hombre", "mujer", "unisex"],
  ocasion: ["diario", "formal", "citas", "fiestas"],
  clima: ["frio", "calor", "versatil"],
  edad: ["juvenil", "maduro", "ambos"],
};

// Tipos por catálogo
const TIPOS_POR_CATALOGO = {
  hombre: [
    "Verde", "Frutal", "Cítrico", "Amaderado", "Floral", "Marino", 
    "Aromático", "Dulce", "Avainillado", "Fresco especiado", 
    "Cálido especiado", "Ambarado"
  ],
  mujer: [
    "Verde", "Frutal", "Cítrico", "Amaderado", "Floral", "Floral blanco", 
    "Atalcado", "Dulce", "Avainillado", "Fresco especiado", 
    "Cálido especiado", "Ambarado"
  ],
  nicho: [
    "Verde", "Frutal", "Cítrico", "Amaderado", "Floral", "Marino", 
    "Aromático", "Dulce", "Avainillado", "Fresco especiado", 
    "Cálido especiado", "Ambarado", "Tabaco"
  ]
};

export default function AdminAddPerfume({ open, onClose, catalog = "hombre", onCreated }) {
  const isNicho = catalog === "nicho";

  const [form, setForm] = useState({
    numero: "",
    nombre: "",
    marca: "",
    tipo: "",
    tipo2: "",
    url: "",
    dispo: true,
    // extras Nicho:
    genero: "unisex",
    ocasion: [],
    clima: "versatil",
    edad: "ambos",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Obtener tipos disponibles según el catálogo
  const tiposDisponibles = useMemo(() => {
    return TIPOS_POR_CATALOGO[catalog] || TIPOS_POR_CATALOGO.hombre;
  }, [catalog]);

  // Filtrar opciones para tipo2 (excluir el tipo seleccionado)
  const opcionesTipo2 = useMemo(() => {
    return tiposDisponibles.filter(tipo => tipo !== form.tipo);
  }, [tiposDisponibles, form.tipo]);

  useEffect(() => {
    if (!open) {
      // limpiar al cerrar
      setForm((f) => ({
        ...f,
        numero: "",
        nombre: "",
        marca: "",
        tipo: "",
        tipo2: "",
        url: "",
        dispo: true,
        genero: "unisex",
        ocasion: [],
        clima: "versatil",
        edad: "ambos",
      }));
      setErr("");
      setLoading(false);
    }
  }, [open]);

  const canSubmit = useMemo(() => {
    if (!form.numero || !form.nombre || !form.marca) return false;
    if (isNicho) {
      if (!form.genero || !form.clima || !form.edad) return false;
    }
    return true;
  }, [form, isNicho]);

  if (!open) return null;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "dispo") {
      setForm((f) => ({ ...f, dispo: checked }));
    } else {
      setForm((f) => ({ 
        ...f, 
        [name]: value,
        // Reset tipo2 si se cambia el tipo principal
        ...(name === 'tipo' && { tipo2: '' })
      }));
    }
  };

  const toggleOcasion = (value) => {
    setForm((f) => {
      const set = new Set(f.ocasion || []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...f, ocasion: Array.from(set) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!canSubmit) return;

    try {
      setLoading(true);
      const payload = {
        numero: Number(form.numero),
        nombre: form.nombre.trim(),
        marca: form.marca.trim(),
        tipo: form.tipo.trim(),
        tipo2: form.tipo2.trim(),
        url: form.url.trim(),
        dispo: !!form.dispo,
        ...(isNicho && {
          genero: (form.genero || "").toLowerCase(),
          ocasion: Array.isArray(form.ocasion) ? form.ocasion : [],
          clima: (form.clima || "").toLowerCase(),
          edad: (form.edad || "").toLowerCase(),
        }),
      };

      const { data } = await api.post(`/api/admin/catalogo/${catalog}`, payload);
      onCreated?.(data?.resultado || null);
      onClose?.();
    } catch (e) {
      console.error(e);
      setErr("No se pudo crear el perfume. Verifica los campos y/o que estés autenticado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-hidden>
      <div className="form-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="form-header">
          <h3>Agregar perfume ({catalog})</h3>
          <button className="form-close" onClick={onClose} aria-label="Cerrar">
            <FaTimes />
          </button>
        </div>

        <form className="form-body" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-field">
              <span>Número *</span>
              <input
                type="number"
                name="numero"
                value={form.numero}
                onChange={onChange}
                required
                min={1}
                placeholder="Ej: 173"
              />
            </label>

            <label className="form-field">
              <span>Nombre *</span>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                required
                placeholder="Ej: Layton"
              />
            </label>

            <label className="form-field">
              <span>Marca *</span>
              <input
                type="text"
                name="marca"
                value={form.marca}
                onChange={onChange}
                required
                placeholder="Ej: Parfums de Marly"
              />
            </label>

            <label className="form-field">
              <span>Tipo *</span>
              <select
                name="tipo"
                value={form.tipo}
                onChange={onChange}
                required
              >
                <option value="">Seleccionar tipo</option>
                {tiposDisponibles.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Tipo 2</span>
              <select
                name="tipo2"
                value={form.tipo2}
                onChange={onChange}
              >
                <option value="">Ninguno</option>
                {opcionesTipo2.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>URL (Fragrantica)</span>
              <input
                type="url"
                name="url"
                value={form.url}
                onChange={onChange}
                placeholder="https://..."
              />
            </label>

            <label className="form-field checkbox">
              <input
                type="checkbox"
                name="dispo"
                checked={form.dispo}
                onChange={onChange}
              />
              <span>Disponible</span>
            </label>

            {isNicho && (
              <>
                <label className="form-field">
                  <span>Género *</span>
                  <select name="genero" value={form.genero} onChange={onChange} required>
                    {ENUMS.genero.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  <span>Clima *</span>
                  <select name="clima" value={form.clima} onChange={onChange} required>
                    {ENUMS.clima.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  <span>Edad *</span>
                  <select name="edad" value={form.edad} onChange={onChange} required>
                    {ENUMS.edad.map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </label>

                <fieldset className="form-field -full">
                  <legend>Ocasión</legend>
                  <div className="chips">
                    {ENUMS.ocasion.map((o) => {
                      const active = form.ocasion.includes(o);
                      return (
                        <button
                          key={o}
                          type="button"
                          className={`chip ${active ? "active" : ""}`}
                          onClick={() => toggleOcasion(o)}
                          aria-pressed={active}
                        >
                          {o}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </>
            )}
          </div>

          {err && <p className="form-error">{err}</p>}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={!canSubmit || loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}