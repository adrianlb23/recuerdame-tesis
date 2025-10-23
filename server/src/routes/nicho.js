import { Router } from 'express';
import { listarCatalogo, obtenerPorNumero } from '../controllers/nicho.js';

const router = Router();

router.get('/catalogo/nicho', listarCatalogo);
router.get('/catalogo/nicho/:numero', obtenerPorNumero);

export default router;
