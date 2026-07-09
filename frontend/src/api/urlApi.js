import API from "./axios";

// Create URL
export const createShortUrl = async (data) => {
  const res = await API.post("/url", data);
  return res.data;
};

// Get My URLs
export const getMyUrls = async () => {
  const res = await API.get("/url");
  return res.data;
};

// Delete URL
export const deleteUrl = async (id) => {
  const res = await API.delete(`/url/${id}`);
  return res.data;
};

// Update URL
export const updateUrl = async (id, data) => {
  const res = await API.put(`/url/${id}`, data);
  return res.data;
};

// Analytics
export const getAnalytics = async (id) => {
  const res = await API.get(`/analytics/${id}`);
  return res.data.data;
};