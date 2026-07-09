import API from "./axios";

// Register

export const registerUser = async (data) => {
  const response = await API.post("/auth/signup", data);
  return response.data;
};

// Login

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};