import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getPublicStats = async (shortCode) => {
  const res = await API.get(`/public/${shortCode}`);
  
  // Changed from res.data.data to res.data because the backend payload is no longer nested
  return res.data;
};