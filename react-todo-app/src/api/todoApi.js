import axios from "axios";
import { getToken } from "../utils/auth";

const API_BASE = process.env.REACT_APP_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getTodos = () => api.get("/todos/");
export const createTodo = (data) => api.post("/todos/", data);
export const updateTodo = (id, data) => api.patch(`/todos/${id}/`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}/`);