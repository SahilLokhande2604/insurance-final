// import axiosInstance from "./axiosInstance.js";

// export const claimApi = {
//   // get all claims for admin
//   async getAllClaims() {
//     const response = await axiosInstance.get("/api/claims/admin/all");
//     return response.data;
//   },

//   // submit new claim (user)
//   async submitClaim(claim) {
//     const response = await axiosInstance.post("/api/claims/add", claim,
//       {
//         headers: {
//           "X-USERNAME": username, // send username from component
//         },
//       });
//     return response.data;
//   },

//   // get user's claims
//   async getUserClaims(username) {
//     console.log("Logged in user in claimApi:", username);
//     const response = await axiosInstance.get(`/api/claims/user`,
//       {
//         headers: {
//           "X-USERNAME": username, // send username from component
//         },
//       });
//     return response.data;
//   },

//   // check claim status (user)
//   async getClaimStatus(claimId) {
//     const response = await axiosInstance.get(`/api/claims/user/status/${claimId}`);
//     return response.data;
//   },

//   // admin: review claim (approve/reject)
//   async processClaim(claimId, action) {
//     const response = await axiosInstance.post(
//       `/api/claims/admin/review/${claimId}`,
//       null,
//       { params: { action } }
//     );
//     return response.data;
//   },
// };

// export default claimApi;


import axiosInstance from "./axiosInstance";
import { STORAGE_KEYS } from "../utils/constants";

export const claimApi = {

  async getAllClaims() {
    const response = await axiosInstance.get("/api/claims/admin/all");
    return response.data;
  },

  async submitClaim(claim) {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));

    const response = await axiosInstance.post(
      "/api/claims/add",
      claim,
      {
        headers: {
          "X-USERNAME": user?.username,
        },
      }
    );

    return response.data;
  },

  async getUserClaims() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));

    const response = await axiosInstance.get(
      "/api/claims/user",
      {
        headers: {
          "X-USERNAME": user?.username,
        },
      }
    );

    return response.data;
  },

  async getClaimStatus(claimId) {
    const response = await axiosInstance.get(
      `/api/claims/user/status/${claimId}`
    );
    return response.data;
  },

  async processClaim(claimId, action) {
    const response = await axiosInstance.post(
      `/api/claims/admin/review/${claimId}`,
      null,
      { params: { action } }
    );
    return response.data;
  },
};

export default claimApi;
