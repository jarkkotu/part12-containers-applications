import axios from "axios";

const apiClient = axios.create({
  //baseURL: import.meta.env.VITE_BACKEND_URL,
  baseURL: "http://localhost:8080/api",
});

export default apiClient;
