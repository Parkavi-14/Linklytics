import API from "./axios";

// Login

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

// Register

export const registerUser = async (data) => {
  const response = await API.post("/auth/signup", data);
  return response.data;
};

// Forgot Password

export const forgotPassword = async (email) => {
  const response = await API.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};