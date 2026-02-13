// import axiosInstance from './axiosInstance.js';
// import { dummyClaims } from '../utils/dummyData.js';

// const USE_DUMMY_DATA = true;
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// let claims = [...dummyClaims];

// export const claimApi = {
//   async getAllClaims() {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return claims;
//     }
    
//     const response = await axiosInstance.get('/api/claims');
//     return response.data;
//   },

//   async getUserClaims(userId) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return claims.filter(c => c.userId === userId);
//     }
    
//     const response = await axiosInstance.get(`/api/claims?userId=${userId}`);
//     return response.data;
//   },

//   async getClaimById(id) {
//     if (USE_DUMMY_DATA) {
//       await delay(300);
//       const claim = claims.find(c => c.id === id);
//       if (!claim) throw new Error('Claim not found');
//       return claim;
//     }
    
//     const response = await axiosInstance.get(`/api/claims/${id}`);
//     return response.data;
//   },

//   async submitClaim(data) {
//     if (USE_DUMMY_DATA) {
//       await delay(800);
//       const newClaim = {
//         id: `c${Date.now()}`,
//         ...data,
//         status: 'PENDING',
//         submittedAt: new Date().toISOString(),
//       };
//       claims.push(newClaim);
//       return newClaim;
//     }
    
//     const response = await axiosInstance.post('/api/claims', data);
//     return response.data;
//   },

//   async processClaim(id, status) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       const index = claims.findIndex(c => c.id === id);
//       if (index === -1) throw new Error('Claim not found');
      
//       claims[index] = {
//         ...claims[index],
//         status,
//         processedAt: new Date().toISOString(),
//       };
//       return claims[index];
//     }
    
//     const response = await axiosInstance.put(`/api/claims/${id}`, { status });
//     return response.data;
//   },
// };

// export default claimApi;

import axiosInstance from "./axiosInstance.js";

export const claimApi = {
  async getAllClaims() {
    const response = await axiosInstance.get("/api/claims");
    return response.data;
  },

  async getUserClaims(userId) {
    const response = await axiosInstance.get(
      `/api/claims?userId=${userId}`
    );
    return response.data;
  },

  async getClaimById(id) {
    const response = await axiosInstance.get(`/api/claims/${id}`);
    return response.data;
  },

  async submitClaim(data) {
    const response = await axiosInstance.post("/api/claims", data);
    return response.data;
  },

  async processClaim(id, status) {
    const response = await axiosInstance.put(`/api/claims/${id}`, {
      status,
    });
    return response.data;
  },
};

export default claimApi;
