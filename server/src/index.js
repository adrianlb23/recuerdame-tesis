import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

// Env vars
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ ERROR: falta MONGODB_URI en variables de entorno");
  process.exit(1);
}

(async () => {
  try {
    await connectDB(MONGODB_URI);
    console.log('✅ MongoDB conectado');

    app.listen(PORT, () => {
      console.log(`🚀 Server listo en puerto ${PORT}`);
      console.log(`🌐 URL producción: ${process.env.RAILWAY_STATIC_URL || "Localhost"}`);
    });
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
})();
