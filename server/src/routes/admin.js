// src/routes/admin.js
import { Router } from "express";
import { requireAuth } from "../util/auth.js";
import { crearPerfume, editarPerfume, borrarPerfume } from "../controllers/adminCatalogo.js";

const router = Router();

// Crear
router.post("/catalogo/:catalogo", requireAuth, crearPerfume);

// Editar
router.put("/catalogo/:catalogo/:numero", requireAuth, editarPerfume);

// Borrar
router.delete("/catalogo/:catalogo/:numero", requireAuth, borrarPerfume);

export default router;
