import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export const registerUser = (data) =>
  axios.post(`${API_BASE}/auth/register/`, data);

export const loginUser = (data) =>
  axios.post(`${API_BASE}/auth/login/`, data);