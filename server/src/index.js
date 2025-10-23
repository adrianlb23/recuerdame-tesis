import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

// Variables de entorno
const { PORT = 3000, MONGODB_URI } = process.env;

// Conexión a la base de datos y arranque del servidor
(async () => {
  try {
    await connectDB(MONGODB_URI);
    console.log('✅ MongoDB conectado');
    app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
})();
