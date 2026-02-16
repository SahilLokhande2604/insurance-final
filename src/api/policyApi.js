// import { getUserFromToken } from "../utils/jwtUtils";
// import axiosInstance from "./axiosInstance.js";


// const token = localStorage.getItem("token");
// const loggedInUser = localStorage.getItem("username") || (token ? getUserFromToken(token).username : null);
// console.log("Logged in user in policyApi:", loggedInUser);

// export const policyApi = {

//   // =========================
//   // ADMIN POLICY APIs
//   // =========================

//   async getAllPolicies() {
//     const response = await axiosInstance.get("/api/policies");
//     return response.data;
//   },

//   async getPolicyById(id) {
//     const response = await axiosInstance.get(`/api/policies/${id}`);
//     return response.data;
//   },

//   async createPolicy(data) {
//     const response = await axiosInstance.post("/api/policies", data);
//     return response.data;
//   },

//   async updatePolicy(id, data) {
//     const response = await axiosInstance.put(`/api/policies/${id}`, data);
//     return response.data;
//   },

//   async deletePolicy(id) {
//     await axiosInstance.delete(`/api/policies/${id}`);
//   },

//   // =========================
//   // USER POLICY APIs (JWT BASED)
//   // =========================

// async getMyPolicies(username) {
//     if (!username) throw new Error("Username is required");

//     const response = await axiosInstance.get(
//       "http://localhost:8085/api/policies/my",
//       {
//         headers: {
//           "X-USERNAME": username, // send username from component
//         },
//       }
//     );

//     return response.data;
//   },



//   async purchasePolicy(policyId) {
//     const response = await axiosInstance.post(
//       `/api/user-policies/purchase?policyId=${policyId}`
//     );
//     return response.data;
//   },

//   // =========================
//   // PAYMENT SERVICE APIs
//   // =========================

//   async getAllPayments() {
//     const response = await axiosInstance.get("/api/payments");
//     return response.data;
//   },

//   async getUserPayments(username) {
//     const response = await axiosInstance.get(
//       `/api/payments/my-payments`,
//       {
//         headers: {
//           "X-USERNAME": username || "default-user",
//         },
//       }
//     );
//     return response.data;
//   },




// };

// export default policyApi;


import axiosInstance from "./axiosInstance";


export const policyApi = {

  async getAllPolicies() {
    const response = await axiosInstance.get("/api/policies");
    return response.data;
  },

  async getPolicyById(id) {
    const response = await axiosInstance.get(`/api/policies/${id}`);
    return response.data;
  },

  async createPolicy(data) {
    const response = await axiosInstance.post("/api/policies", data);
    return response.data;
  },

  async updatePolicy(id, data) {
    const response = await axiosInstance.put(`/api/policies/${id}`, data);
    return response.data;
  },

  async deletePolicy(id) {
    await axiosInstance.delete(`/api/policies/${id}`);
  },

  async getMyPolicies(username) {
    // const response = await axiosInstance.get("/api/policies/my");
    // return response.data;
        const response = await axiosInstance.get(
      "http://localhost:8085/api/policies/my",
      {
        headers: {
          "X-USERNAME": username, // send username from component
        },
      }
      
    );
    return response.data;
  },

  async purchasePolicy(policyId) {
    const response = await axiosInstance.post(
      `/api/user-policies/purchase?policyId=${policyId}`
    );
    return response.data;
  },

  async getAllPayments() {
    const response = await axiosInstance.get("/api/payments");
    return response.data;
  },

  async getUserPayments(username) {
       const response = await axiosInstance.get(
      `/api/payments/my-payments`,
      {
        headers: {
          "X-USERNAME": username || "default-user",
        },
      }
    );
    return response.data;
  },
};

export default policyApi;

