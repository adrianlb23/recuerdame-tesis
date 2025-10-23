import { Router } from "express";
import { login, logout, me } from "../controllers/auth.js";

const router = Router();

// Iniciar sesión
router.post("/login", login);

// Cerrar sesión
router.post("/logout", logout);

// Obtener información del usuario autenticado
router.get("/me", me);

export default router;
