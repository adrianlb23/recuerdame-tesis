// server/scripts/testAdminLogin.js
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../src/models/user.js';

const { MONGODB_URI } = process.env;

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    const email = 'admin@recuerdame.com';
    const plain = '1234';

    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      throw new Error('Admin no encontrado');
    }

    const ok = await bcrypt.compare(plain, user.passwordHash);
    console.log(ok ? '✅ Password correcto' : '❌ Password incorrecto');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await mongoose.disconnect();
  }
})();
