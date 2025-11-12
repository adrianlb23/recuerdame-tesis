import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Adjuntar token de autenticación si existe en localStorage
const saved = localStorage.getItem("token");
if (saved) api.defaults.headers.common.Authorization = `Bearer ${saved}`;

export default api;
