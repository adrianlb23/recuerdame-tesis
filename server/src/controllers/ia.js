import { GoogleGenerativeAI } from "@google/generative-ai";
import { PerfumeNicho } from "../models/nicho.js"; // Sólo funciona con catálogo de nicho

//Conexión con la API de Gemini para recomendar perfumes
export async function recomendarPerfumeIA(req, res) {
  try {
    const { genero, ocasion, clima, edad, prompt } = req.body;

    // Validar que los selectores y el prompt estén presentes
    if (!genero || !ocasion || !clima || !edad || !prompt) {
      return res.status(400).json({
        error: "Debes enviar los campos: genero, ocasion, clima, edad y prompt.",
      });
    }

    // Filtrar el catálogo de perfumes según los selectores genero, ocasion, clima.
    const filtro = { genero, ocasion, clima };

    // Si edad NO es "ambos", se incluye en la variable de filtro, si es "ambos" se omite.
    if (edad !== "ambos") {
      filtro.edad = edad;
    }
    
    // Se realiza la búsqueda filtrada y se limita a 10 resultados máximo.
    const perfumesFiltrados = await PerfumeNicho.find(
      filtro,
      { _id: 0, nombre: 1, marca: 1, tipo1: 1, tipo2: 1, url: 1 }
    ).limit(10);


    // Validar posible listado filtrado vacío
    if (!perfumesFiltrados.length) {
      return res.status(200).json({
        mensaje:
          "No se encontraron fragancias que coincidan con los filtros seleccionados. Prueba ajustando las opciones o el tipo de fragancia.",
        resultados: [],
        recomendacionIA: null,
      });
    }

    // Generar listado breve de perfumes para incluir como contexto en el prompt
    const listaPerfumes = perfumesFiltrados
      .map((p) => `${p.nombre} de ${p.marca} (${p.tipo1}, ${p.tipo2})`)
      .join("; ");

    // Prompt final para la IA (Considera instrucciones base, listado filtrado y prompt del usuario)
    const promptFinal = `
Eres un experto en perfumería y recomendaciones olfativas.
Tu tarea es analizar la siguiente lista de perfumes disponibles y sugerir una fragancia ideal según las preferencias del usuario.

Catálogo filtrado disponible:
${listaPerfumes}

Instrucciones:
- Responde únicamente sobre temas relacionados con perfumes, fragancias, aromas o recomendaciones olfativas.
- Si el prompt del usuario no tiene relación con perfumes, responde exactamente:
  "Por favor ingresa una consulta relacionada con perfumes o fragancias para poder ayudarte."
- Elige solo **una fragancia** del catálogo anterior, la que consideres más apropiada.
- La respuesta debe comenzar con el formato:
  "La fragancia ideal para tu caso es [nombre - marca]."
- Luego añade una breve explicación de **máximo dos oraciones**, destacando el motivo de la elección (ejemplo: tipo de aroma, ocasión o clima).
- No inventes perfumes ni menciones marcas o nombres que no estén en el catálogo listado.
- Evita responder listas, párrafos extensos o información no solicitada.
- Mantén un tono amable, experto y conciso.
- No utilices números al hablar de duración o concentración si es que lo comentas.

Prompt del usuario:
"${prompt}"
`;

    // Conectar con la API de Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(promptFinal);

    // Enviar respuesta final al client
    res.status(200).json({
      filtros: { genero, ocasion, clima, edad },
      cantidadResultados: perfumesFiltrados.length,
      catalogoFiltrado: perfumesFiltrados,
      recomendacionIA: result.response.text(),
    });
  } catch (error) {
    console.error("Error en recomendarPerfumeIA:", error);
    res.status(500).json({
      error: "Error al generar recomendación con IA.",
      detalles: error.message,
    });
  }
}