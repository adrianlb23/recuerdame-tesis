import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Adjuntar token de autenticación si existe en localStorage
const saved = localStorage.getItem("token");
if (saved) api.defaults.headers.common.Authorization = `Bearer ${saved}`;

export default api;


