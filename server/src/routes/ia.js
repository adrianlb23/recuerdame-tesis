import { Router } from "express";
import { recomendarPerfumeIA } from "../controllers/ia.js";

const router = Router();

// Endpoint principal del sistema de recomendación
router.post("/recomendar", recomendarPerfumeIA);

export default router;
