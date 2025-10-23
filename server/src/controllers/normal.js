import { PerfumeHombre, PerfumeMujer } from '../models/normal.js';


const registry = {
  hombre: PerfumeHombre,
  mujer:  PerfumeMujer
};

// Difiere el modelo según el catálogo solicitado (página html dónde está el usuario)
function pickModel(catalogo) {
  const Model = registry[catalogo];
  if (!Model) {
    const err = new Error('Catálogo inválido (use: hombre | mujer)');
    err.status = 400;
    throw err;
  }
  return Model;
}

// Endpoint para listar catálogo diseñador hombre o mujer
export const listarCatalogo = async (req, res) => {
  try {
    const Model = pickModel(req.params.catalogo);

    let consulta = Model.find({}).sort({ numero: 1 });
    const ultimos = Number(req.query.ultimos);
    if (!Number.isNaN(ultimos) && ultimos > 0) {
      consulta = consulta.sort({ _id: -1 }).limit(ultimos);
    }

    const resultado = await consulta.exec();

    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ status: 'error', mensaje: 'No se han encontrado perfumes' });
    }

    return res.status(200).json({ status: 'éxito', contador: resultado.length, resultado });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      status: 'error',
      mensaje: error.message || 'Error al listar perfumes'
    });
  }
};

// GET por número específico (útil para pruebas internas)
export const obtenerPorNumero = async (req, res) => {
  try {
    const Model = pickModel(req.params.catalogo);
    const numero = Number(req.params.numero);
    if (Number.isNaN(numero)) {
      return res.status(400).json({ status: 'error', mensaje: 'numero debe ser numérico' });
    }

    const resultado = await Model.findOne({ numero }).exec();
    if (!resultado) {
      return res.status(404).json({ status: 'error', mensaje: 'No se ha encontrado el perfume solicitado' });
    }

    return res.status(200).json({ status: 'éxito', resultado });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      status: 'error',
      mensaje: error.message || 'Error al obtener perfume'
    });
  }
};
