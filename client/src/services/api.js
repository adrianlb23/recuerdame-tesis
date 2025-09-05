import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const saved = localStorage.getItem("token");
if (saved) api.defaults.headers.common.Authorization = `Bearer ${saved}`;

export default api;