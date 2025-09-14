import axios from "axios";

const API_BASE_URL = "http://localhost:5070";

export async function registerUser(username, email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
