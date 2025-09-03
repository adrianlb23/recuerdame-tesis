import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import health from './routes/health.js';
import normalRoutes from './routes/normal.js';
import nichoRoutes from './routes/nicho.js';
import authRoutes from "./routes/auth.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', nichoRoutes);
app.use('/api', normalRoutes);
app.use('/api/auth', authRoutes);

app.use('/', health);

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
