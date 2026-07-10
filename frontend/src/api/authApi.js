import API from "./axios";

// 1. Register User
export const registerUser = async (data) => {
  try {
    const response = await API.post("/auth/signup", data);
    return response.data;
  } catch (err) {
    console.error("Register Error:", err.response?.data);
    throw err;
  }
};

// 2. Login User (Fixes your current build crash)
export const loginUser = async (data) => {
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (err) {
    console.error("Login Error:", err.response?.data);
    throw err;
  }
};

// 3. Forgot Password 
export const forgotPassword = async (emailData) => {
  try {
    const response = await API.post("/auth/forgot-password", emailData);
    return response.data;
  } catch (err) {
    console.error("Forgot Password Error:", err.response?.data);
    throw err;
  }
};