import { useState } from "react";
import "../styles/LoginModal.css";
import api from "../services/api";

export default function LoginModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      const token = data?.token;
      if (!token) throw new Error("Respuesta inválida del servidor");

      sessionStorage.setItem("token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      onSuccess?.({ email });
      onClose();
    } catch (err) {
      setError("Credenciales inválidas o error de servidor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={close} aria-hidden>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h3>Inicio de sesión (Admin)</h3>
          <button className="modal-close" onClick={close} aria-label="Cerrar">
            ×
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <label className="modal-label">
            Correo
            <input
              type="email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@recuerdame.com"
              required
            />
          </label>

          <label className="modal-label">
            Contraseña
            <input
              type="password"
              className="modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />
          </label>

          {error && <p className="modal-error">{error}</p>}

          <button className="modal-submit" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="modal-hint">Acceso restringido para administración.</p>
      </div>
    </div>
  );
}
