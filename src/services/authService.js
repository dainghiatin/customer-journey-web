import axios from "axios";

// Base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337/api";

// Authentication service functions
const login = async (cccd, password) => {
    const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          "cccd": cccd,
          "password": password
        }
      );
    return response;
};

const getMe = async (token) => {
    const response = await axios.get(
        `${API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return response;
}

export { login, getMe };