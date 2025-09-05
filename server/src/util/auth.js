import jwt from "jsonwebtoken";

//Función para proteger rutas que requieren autenticación de administrador
export function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
      return res.status(401).json({ status: "error", mensaje: "Token requerido" });
    }
    const token = auth.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ status: "error", mensaje: "Token inválido o expirado" });
  }
}
