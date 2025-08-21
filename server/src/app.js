import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import health from './routes/health.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', health);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
