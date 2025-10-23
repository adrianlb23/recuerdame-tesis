import { PerfumeHombre, PerfumeMujer } from "../models/normal.js";
import { PerfumeNicho } from "../models/nicho.js";

const registry = {
  hombre: PerfumeHombre,
  mujer:  PerfumeMujer,
  nicho:  PerfumeNicho,
};

// Campos permitidos por catálogo
const FIELDS = {
  hombre: ["numero", "nombre", "marca", "tipo", "tipo2", "url", "dispo"],
  mujer:  ["numero", "nombre", "marca", "tipo", "tipo2", "url", "dispo"],
  nicho:  [
    "numero", "nombre", "marca", "genero", "ocasion", "clima", "edad",
    "tipo", "tipo2", "url", "dispo"
  ],
};

// Posibles valores para campos selectivos de Nicho
const ENUMS_NICHO = {
  genero: ["hombre", "mujer", "unisex"],
  ocasion: ["diario", "formal", "citas", "fiestas"],
  edad: ["juvenil", "maduro", "ambos"],
  clima: ["frio", "calor", "versatil"],
};

//Función para seleccionar el modelo según el catálogo
function pickModel(catalogo) {
  const Model = registry[catalogo];
  if (!Model) {
    const err = new Error("Catálogo inválido (use: hombre | mujer | nicho)");
    err.status = 400;
    throw err;
  }
  return Model;
}

function sanitize(catalogo, obj = {}) {
  const allow = FIELDS[catalogo] || [];
  return Object.fromEntries(Object.entries(obj).filter(([k]) => allow.includes(k)));
}

//Función para normalizar y validar campos específicos de Nicho
function normalizeNicho(payload) {
  const out = { ...payload };

  if (out.genero) out.genero = String(out.genero).toLowerCase().trim();
  if (out.clima)  out.clima  = String(out.clima).toLowerCase().trim();
  if (out.edad)   out.edad   = String(out.edad).toLowerCase().trim();

  if (out.ocasion !== undefined) {
    const arr = Array.isArray(out.ocasion) ? out.ocasion : [out.ocasion];
    const norm = [...new Set(arr.map(v => String(v).toLowerCase().trim()))];
    out.ocasion = norm.filter(v => ENUMS_NICHO.ocasion.includes(v));
  }

  if (out.genero && !ENUMS_NICHO.genero.includes(out.genero)) {
    throwObject(400, "género inválido");
  }
  if (out.clima && !ENUMS_NICHO.clima.includes(out.clima)) {
    throwObject(400, "clima inválido");
  }
  if (out.edad && !ENUMS_NICHO.edad.includes(out.edad)) {
    throwObject(400, "edad inválida");
  }

  return out;
}

function throwObject(status, message) {
  const e = new Error(message);
  e.status = status;
  throw e;
}

//Controlador para crear perfume
export const crearPerfume = async (req, res) => {
  try {
    const { catalogo } = req.params;
    const Model = pickModel(catalogo);

    let payload = sanitize(catalogo, req.body);
    if (payload.numero == null) return res.status(400).json({ status: "error", mensaje: "numero es requerido" });
    payload.numero = Number(payload.numero);

    if (catalogo === "nicho") payload = normalizeNicho(payload);

    const existe = await Model.findOne({ numero: payload.numero }).lean();
    if (existe) return res.status(409).json({ status: "error", mensaje: "Ya existe ese número" });

    const doc = await Model.create(payload);
    return res.status(201).json({ status: "éxito", resultado: doc });
  } catch (e) {
    console.error(e);
    if (e?.code === 11000) {
      return res.status(409).json({ status: "error", mensaje: "Duplicado: número ya existe" });
    }
    return res.status(e.status || 500).json({ status: "error", mensaje: e.message || "Error al crear" });
  }
};

//Controlador para editar perfume
export const editarPerfume = async (req, res) => {
  try {
    const { catalogo } = req.params;
    const Model = pickModel(catalogo);

    const numero = Number(req.params.numero);
    if (Number.isNaN(numero)) return res.status(400).json({ status: "error", mensaje: "numero debe ser numérico" });

    let cambios = sanitize(catalogo, req.body);
    if ("numero" in cambios) cambios.numero = Number(cambios.numero);
    if (catalogo === "nicho") cambios = normalizeNicho(cambios);

    const actualizado = await Model.findOneAndUpdate({ numero }, { $set: cambios }, { new: true });
    if (!actualizado) return res.status(404).json({ status: "error", mensaje: "Perfume no encontrado" });

    return res.json({ status: "éxito", resultado: actualizado });
  } catch (e) {
    console.error(e);
    if (e?.code === 11000) {
      return res.status(409).json({ status: "error", mensaje: "Duplicado: número ya existe" });
    }
    return res.status(500).json({ status: "error", mensaje: "Error al editar" });
  }
};

//Controlador para borrar perfume utilizando el número
export const borrarPerfume = async (req, res) => {
  try {
    const Model = pickModel(req.params.catalogo);
    const numero = Number(req.params.numero);
    if (Number.isNaN(numero)) return res.status(400).json({ status: "error", mensaje: "numero debe ser numérico" });

    const eliminado = await Model.findOneAndDelete({ numero });
    if (!eliminado) return res.status(404).json({ status: "error", mensaje: "Perfume no encontrado" });

    return res.json({ status: "éxito", mensaje: "Perfume eliminado", resultado: eliminado });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", mensaje: "Error al borrar" });
  }
};
