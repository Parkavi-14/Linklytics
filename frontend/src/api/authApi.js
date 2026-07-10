import API from "./axios";

export const registerUser = async (data) => {
  try {
    const response = await API.post("/auth/signup", data);
    return response.data;
  } catch (err) {
    console.log("Register Error:", err.response?.data);
    console.log("Status:", err.response?.status);
    console.log(err);

    throw err;
  }
};
// Add this missing export:
export const forgotPassword = async (emailData) => {
  try {
    const response = await API.post("/auth/forgot-password", emailData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};