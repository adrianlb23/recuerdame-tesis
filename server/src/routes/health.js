import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'api', time: new Date().toISOString() });
});

router.get('/db-status', (_req, res) => {
  const states = ['disconnected','connected','connecting','disconnecting'];
  res.json({ mongo: states[mongoose.connection.readyState] ?? 'unknown' });
});

export default router;
