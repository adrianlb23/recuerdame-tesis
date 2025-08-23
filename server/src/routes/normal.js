// routes/normal.js
import { Router } from 'express';
import { listarCatalogo, obtenerPorNumero } from '../controllers/normal.js';

const router = Router();

router.get('/catalogo/:catalogo', listarCatalogo);
router.get('/catalogo/:catalogo/:numero', obtenerPorNumero);

export default router;
