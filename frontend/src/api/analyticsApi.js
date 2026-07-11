import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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