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