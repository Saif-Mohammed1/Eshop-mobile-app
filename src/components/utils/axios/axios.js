import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const api = axios.create({
  baseURL: "https://797a-154-182-86-128.ngrok-free.app/api",
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const token = await getData();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/auth"; // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default api;
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("Token");
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // throw new Error(error);
    return null;
  }
};
