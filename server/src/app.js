import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import health from './routes/health.js';
import normalRoutes from './routes/normal.js';
import nichoRoutes from './routes/nicho.js';
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import iaRoutes from "./routes/ia.js";

const app = express();

// Seguridad (Helmet con ajustes para permitir CORS y front)
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS: Luego cambia esto por tu dominio Netlify
app.use(
  cors({
    origin: "*", // → Cuando tengas tu URL de Netlify cambia: "https://tusitio.netlify.app"
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Middlewares básicos
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api', nichoRoutes);
app.use('/api', normalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ia', iaRoutes);

app.use('/', health);

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
