
import axios from "axios";

// ✨ UNCONDITIONAL PRODUCTION FIX: Checks hostname dynamically so production doesn't hit localhost!
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const DETERMINED_BASE_URL = isLocal 
  ? "http://localhost:5000/api" 
  : "https://linklytics-4r2v.onrender.com/api";

const API = axios.create({
  baseURL: DETERMINED_BASE_URL,
});

export const getPublicStats = async (shortCode) => {
  const res = await API.get(`/public/${shortCode}`);
  
  // ✨ DEFENSIVE PAYLOAD UNWRAPPING: Handles both raw data and nested structures safely
  return res.data && res.data.data ? res.data.data : res.data;
};