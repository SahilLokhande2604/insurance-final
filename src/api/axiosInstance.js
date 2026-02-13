// import axiosInstance from './axiosInstance.js';
// import { dummyPolicies, dummyUserPolicies, dummyPayments } from '../utils/dummyData.js';

// const USE_DUMMY_DATA = true;
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// let userPolicies = [...dummyUserPolicies];
// let policies = [...dummyPolicies];
// let payments = [...dummyPayments];

// const policyApi = {
//   async getAllPolicies() {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return policies.filter(p => p.isActive);
//     }
    
//     const response = await axiosInstance.get('/api/policies');
//     return response.data;
//   },

//   async getPolicyById(id) {
//     if (USE_DUMMY_DATA) {
//       await delay(300);
//       const policy = policies.find(p => p.id === id);
//       if (!policy) throw new Error('Policy not found');
//       return policy;
//     }
    
//     const response = await axiosInstance.get(`/api/policies/${id}`);
//     return response.data;
//   },

//   async createPolicy(data) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       const newPolicy = {
//         ...data,
//         id: `p${Date.now()}`,
//       };
//       policies.push(newPolicy);
//       return newPolicy;
//     }
    
//     const response = await axiosInstance.post('/api/policies', data);
//     return response.data;
//   },

//   async updatePolicy(id, data) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       const index = policies.findIndex(p => p.id === id);
//       if (index === -1) throw new Error('Policy not found');
//       policies[index] = { ...policies[index], ...data };
//       return policies[index];
//     }
    
//     const response = await axiosInstance.put(`/api/policies/${id}`, data);
//     return response.data;
//   },

//   async deletePolicy(id) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       const index = policies.findIndex(p => p.id === id);
//       if (index === -1) throw new Error('Policy not found');
//       policies[index].isActive = false;
//       return;
//     }
    
//     await axiosInstance.delete(`/api/policies/${id}`);
//   },

//   async getUserPolicies(userId) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return userPolicies.filter(up => up.userId === userId);
//     }
    
//     const response = await axiosInstance.get(`/api/policies/user/${userId}`);
//     return response.data;
//   },

//   async purchasePolicy(userId, policyId) {
//     if (USE_DUMMY_DATA) {
//       await delay(1500);
      
//       const policy = policies.find(p => p.id === policyId);
//       if (!policy) throw new Error('Policy not found');
      
//       const paymentSuccess = Math.random() > 0.3;
//       const paymentStatus = paymentSuccess ? 'SUCCESS' : 'FAILED';
      
//       const payment = {
//         id: `pay${Date.now()}`,
//         userId,
//         policyId,
//         amount: policy.premium,
//         status: paymentStatus,
//         transactionId: `TXN${Date.now()}`,
//         createdAt: new Date().toISOString(),
//       };
//       payments.push(payment);
      
//       if (!paymentSuccess) {
//         throw new Error('Payment failed. Please try again.');
//       }
      
//       const purchaseDate = new Date();
//       const expiryDate = new Date();
//       expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      
//       const userPolicy = {
//         id: `up${Date.now()}`,
//         policyId,
//         policy,
//         userId,
//         purchaseDate: purchaseDate.toISOString(),
//         expiryDate: expiryDate.toISOString(),
//         paymentStatus: 'SUCCESS',
//         isActive: true,
//       };
//       userPolicies.push(userPolicy);
      
//       return { userPolicy, payment };
//     }
    
//     const response = await axiosInstance.post('/api/payments/initiate', {
//       userId,
//       policyNumber: policyId,
//       amount: policy.premium,
//     });
//     return response.data;
//   },

//   async getAllPayments() {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return payments;
//     }
    
//     const response = await axiosInstance.get('/api/payments');
//     return response.data;
//   },

//   async getUserPayments(userId) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return payments.filter(p => p.userId === userId);
//     }
    
//     const response = await axiosInstance.get(`/api/payments/user/${userId}`);
//     return response.data;
//   },
// };

// export default policyApi;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8085", // API Gateway
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token if present
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
