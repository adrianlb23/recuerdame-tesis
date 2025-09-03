import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ status: "error", mensaje: "Faltan credenciales" });
    }

    // Buscar admin
    const user = await User.findOne({ email: email.toLowerCase().trim(), activo: true })
                           .select("+passwordHash");
    if (!user) return res.status(401).json({ status: "error", mensaje: "Credenciales inválidas" });

    // Comparar contraseña
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ status: "error", mensaje: "Credenciales inválidas" });

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({ status: "éxito", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", mensaje: "Error en login" });
  }
};

// POST /api/auth/logout
export const logout = (_req, res) => {
  // Con JWT “stateless”, el logout es client-side (descartar token).
  return res.json({ status: "éxito", mensaje: "Sesión cerrada" });
};

// GET /api/auth/me
export const me = (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
      return res.status(401).json({ status: "error", mensaje: "Token requerido" });
    }
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ status: "éxito", usuario: decoded });
  } catch {
    return res.status(401).json({ status: "error", mensaje: "Token inválido o expirado" });
  }
};
