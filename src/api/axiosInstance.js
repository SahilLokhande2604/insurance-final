// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8085", // API Gateway
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Automatically attach JWT token if present
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;

import axios from "axios";
import { STORAGE_KEYS } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8085",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
