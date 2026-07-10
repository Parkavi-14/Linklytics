import API from "./axios";

// 1. Create a Short URL
export const createShortUrl = async (data) => {
  const res = await API.post("/url/create", data);
  return res.data;
};

// 2. Get My URLs
export const getMyUrls = async () => {
  const res = await API.get("/url/my-urls");
  return res.data;
};

// 3. Delete URL
export const deleteUrl = async (id) => {
  const res = await API.delete(`/url/delete/${id}`);
  return res.data;
};

// 4. Update URL
export const updateUrl = async (id, data) => {
  const res = await API.put(`/url/update/${id}`, data);
  return res.data;
};

// 5. Get Analytics for a Specific URL
export const getAnalytics = async (id) => {
  const res = await API.get(`/analytics/${id}`);
  return res.data.data;
};