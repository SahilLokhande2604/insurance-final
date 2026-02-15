import axiosInstance from "./axiosInstance.js";
import { getUserFromToken } from "../utils/jwtUtils.js";

export const authApi = {
  async login(username, password) {
    const response = await axiosInstance.post("/api/users/login", {
      username,
      password,
    });

    
    const token = response.data;

    if (!token) {
      throw new Error("Invalid response from server");
    }

    localStorage.setItem("token", token);

     const userInfo = getUserFromToken(token);

  // **Save username in localStorage**
  localStorage.setItem("username", userInfo.username);

    return {
      user: {
        username: userInfo.username,
        role: userInfo.role,
      },
      token,
    };
  },

  async register(data) {
    const response = await axiosInstance.post("/api/users/register", {
      username: data.username,
      password: data.password,
      name: data.name,
      phone: data.phone,
    });

    return {
      success: true,
      message: response.data,
    };
  },

  async logout() {
    // console.log(loggedInUser);
    console.log(localStorage.getItem("username"));
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("username");
    console.log("username: ", localStorage.getItem("username"));
    // localStorage.removeItem("username");
    localStorage.removeItem("token");
  },

  async getAllUsers() {
    const response = await axiosInstance.get("/api/users");
    return response.data;
  },
};

export default authApi;
