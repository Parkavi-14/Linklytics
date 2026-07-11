import axios from "axios";

// ✨ DYNAMIC ROUTING FIX: Matches the same live production host context evaluation
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const DETERMINED_BASE_URL = isLocal 
  ? "http://localhost:5000/api" 
  : "https://linklytics-4r2v.onrender.com/api";

const API = axios.create({
  baseURL: DETERMINED_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* Get analytics for ONE URL */
export const getAnalytics = async (id) => {
  const res = await API.get(`/analytics/${id}`);
  return res.data.data;
};

/* Get ALL URLs for Analytics page */
export const getAnalyticsUrls = async () => {
  const res = await API.get("/analytics");
  return res.data.data;
};