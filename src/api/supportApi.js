// // import axiosInstance from './axiosInstance.js';

// // // Flag to switch between dummy data and real API
// // const USE_DUMMY_DATA = true;

// // // Simulate API delay
// // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // // Dummy data for development
// // let dummyTickets = [
// //   {
// //     id: 1,
// //     raisedBy: 'user',
// //     policyId: 1,
// //     type: 'ISSUE',
// //     subject: 'Claim processing delay',
// //     description: 'My claim has been pending for 2 weeks',
// //     createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
// //     updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
// //   },
// //   {
// //     id: 2,
// //     raisedBy: 'user',
// //     policyId: 2,
// //     type: 'POLICY_CHANGE',
// //     subject: 'Policy change: ADDRESS_UPDATE',
// //     description: 'Need to update my address to new location',
// //     createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
// //     updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
// //   },
// // ];

// // /**
// //  * Customer Support API Service
// //  * Handles all customer support related API calls
// //  */
// // export const supportApi = {
  
// //   /**
// //    * Get all policies (from Policy Service)
// //    * Backend: GET /api/support/policies
// //    * 
// //    * @param {number} userId - Optional user ID to filter
// //    * @returns {Promise<Array>} List of policies
// //    */
// //   async getPolicies(userId = null) {
// //     if (USE_DUMMY_DATA) {
// //       await delay(500);
// //       // Return dummy policies - you can use existing policyApi
// //       return [];
// //     }
    
// //     // Real API call
// //     const url = userId 
// //       ? `/api/support/policies?userId=${userId}`
// //       : '/api/support/policies';
    
// //     const response = await axiosInstance.get(url);
// //     return response.data;
// //   },

// //   /**
// //    * Get policy by ID (from Policy Service)
// //    * Backend: GET /api/support/policies/{id}
// //    * 
// //    * @param {number} id - Policy ID
// //    * @returns {Promise<object>} Policy details
// //    */
// //   async getPolicyById(id) {
// //     if (USE_DUMMY_DATA) {
// //       await delay(300);
// //       return null;
// //     }
    
// //     const response = await axiosInstance.get(`/api/support/policies/${id}`);
// //     return response.data;
// //   },

// //   /**
// //    * Raise an issue ticket
// //    * Backend: POST /api/support/tickets/issue
// //    * Headers: X-User (username)
// //    * Params: policyId, subject, description
// //    * 
// //    * @param {object} data - Ticket data
// //    * @param {string} data.subject - Ticket subject
// //    * @param {string} data.description - Ticket description
// //    * @param {number} data.policyId - Optional policy ID
// //    * @param {string} username - User raising the ticket
// //    * @returns {Promise<object>} Created ticket
// //    */
// //   async raiseIssue(data, username) {
// //     if (USE_DUMMY_DATA) {
// //       await delay(800);
      
// //       const newTicket = {
// //         id: dummyTickets.length + 1,
// //         raisedBy: username || 'anonymous',
// //         policyId: data.policyId || null,
// //         type: 'ISSUE',
// //         subject: data.subject,
// //         description: data.description,
// //         createdAt: new Date().toISOString(),
// //         updatedAt: new Date().toISOString(),
// //       };
      
// //       dummyTickets.push(newTicket);
// //       return newTicket;
// //     }
    
// //     // Real API call
// //     // Build query params
// //     const params = new URLSearchParams();
// //     params.append('subject', data.subject);
// //     params.append('description', data.description);
// //     if (data.policyId) {
// //       params.append('policyId', data.policyId);
// //     }
    
// //     const response = await axiosInstance.post(
// //       `/api/support/tickets/issue?${params.toString()}`,
// //       null,
// //       {
// //         headers: {
// //           'X-User': username || 'anonymous',
// //         },
// //       }
// //     );
    
// //     return response.data;
// //   },

// //   /**
// //    * Request policy change
// //    * Backend: POST /api/support/tickets/policy-change
// //    * Headers: X-User (username)
// //    * Body: { policyId, changeType, details }
// //    * 
// //    * @param {object} data - Policy change request
// //    * @param {number} data.policyId - Policy ID
// //    * @param {string} data.changeType - Type of change (e.g., "ADDRESS_UPDATE")
// //    * @param {string} data.details - Details of change
// //    * @param {string} username - User requesting change
// //    * @returns {Promise<object>} API response with created ticket
// //    */
// //   async requestPolicyChange(data, username) {
// //     if (USE_DUMMY_DATA) {
// //       await delay(800);
      
// //       const newTicket = {
// //         id: dummyTickets.length + 1,
// //         raisedBy: username || 'anonymous',
// //         policyId: data.policyId,
// //         type: 'POLICY_CHANGE',
// //         subject: `Policy change: ${data.changeType}`,
// //         description: data.details,
// //         createdAt: new Date().toISOString(),
// //         updatedAt: new Date().toISOString(),
// //       };
      
// //       dummyTickets.push(newTicket);
      
// //       return {
// //         message: 'Policy change request submitted',
// //         data: newTicket,
// //       };
// //     }
    
// //     // Real API call
// //     const response = await axiosInstance.post(
// //       '/api/support/tickets/policy-change',
// //       {
// //         policyId: data.policyId,
// //         changeType: data.changeType,
// //         details: data.details,
// //       },
// //       {
// //         headers: {
// //           'X-User': username || 'anonymous',
// //         },
// //       }
// //     );
    
// //     return response.data;
// //   },

// //   /**
// //    * Get ticket by ID
// //    * Backend: GET /api/support/tickets/{id}
// //    * 
// //    * @param {number} id - Ticket ID
// //    * @returns {Promise<object>} Ticket details
// //    */
// //   async getTicketById(id) {
// //     if (USE_DUMMY_DATA) {
// //       await delay(300);
// //       const ticket = dummyTickets.find(t => t.id === id);
// //       if (!ticket) {
// //         throw new Error('Ticket not found');
// //       }
// //       return ticket;
// //     }
    
// //     const response = await axiosInstance.get(`/api/support/tickets/${id}`);
// //     return response.data;
// //   },

// //   /**
// //    * Get tickets by user
// //    * Backend: GET /api/support/tickets?raisedBy={username}
// //    * 
// //    * @param {string} username - Username
// //    * @returns {Promise<Array>} List of tickets
// //    */
// //   async getTicketsByUser(username) {
// //     if (USE_DUMMY_DATA) {
// //       await delay(500);
// //       return dummyTickets.filter(t => t.raisedBy === username);
// //     }
    
// //     const response = await axiosInstance.get(
// //       `/api/support/tickets?raisedBy=${username}`
// //     );
// //     return response.data;
// //   },

// //   /**
// //    * Get tickets by policy
// //    * Backend: GET /api/support/tickets?policyId={policyId}
// //    * 
// //    * @param {number} policyId - Policy ID
// //    * @returns {Promise<Array>} List of tickets
// //    */
// //   async getTicketsByPolicy(policyId) {
// //     if (USE_DUMMY_DATA) {
// //       await delay(500);
// //       return dummyTickets.filter(t => t.policyId === policyId);
// //     }
    
// //     const response = await axiosInstance.get(
// //       `/api/support/tickets?policyId=${policyId}`
// //     );
// //     return response.data;
// //   },

// //   /**
// //    * Get all tickets (Admin only)
// //    * 
// //    * @returns {Promise<Array>} List of all tickets
// //    */
// //   async getAllTickets() {
// //     if (USE_DUMMY_DATA) {
// //       await delay(500);
// //       return dummyTickets;
// //     }
    
// //     // Backend doesn't have this endpoint, so we'll return empty
// //     // Or you can call getTicketsByUser for admin
// //     return [];
// //   },
// // };

// // export default supportApi;


// import axiosInstance from './axiosInstance.js';

// // Set to false for real backend
// const USE_DUMMY_DATA = false;

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// let dummyTickets = [];


// export const supportApi = {

//   // -------------------------
//   // POLICIES
//   // -------------------------

//   async getPolicies(userId = null) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return [];
//     }

//     const url = userId
//       ? `/api/support/policies?userId=${userId}`
//       : `/api/support/policies`;

//     const response = await axiosInstance.get(url);
//     return response.data;
//   },

//   async getPolicyById(id) {
//     if (USE_DUMMY_DATA) {
//       await delay(300);
//       return null;
//     }

//     const response = await axiosInstance.get(
//       `/api/support/policies/${id}`
//     );
//     return response.data;
//   },

//   // -------------------------
//   // ISSUE TICKET
//   // -------------------------

//   async raiseIssue(data, username) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return {};
//     }

//     const params = new URLSearchParams();
//     params.append('subject', data.subject);
//     params.append('description', data.description);

//     if (data.policyId) {
//       params.append('policyId', data.policyId);
//     }

//     const response = await axiosInstance.post(
//       `/api/support/tickets/issue?${params.toString()}`,
//       null,
//       {
//         headers: {
//           'X-User': username || 'anonymous',
//         },
//       }
//     );

//     return response.data; // returns Ticket directly
//   },

//   // -------------------------
//   // POLICY CHANGE
//   // -------------------------

//   async requestPolicyChange(data, username) {
//     if (USE_DUMMY_DATA) {
//       await delay(500);
//       return {};
//     }

//     const response = await axiosInstance.post(
//       `/api/support/tickets/policy-change`,
//       {
//         policyId: data.policyId,
//         changeType: data.changeType,
//         details: data.details,
//       },
//       {
//         headers: {
//           'X-User': username || 'anonymous',
//         },
//       }
//     );

//     // Backend returns:
//     // { message: "...", data: Ticket }

//     return response.data.data; // return Ticket only
//   },

//   // -------------------------
//   // GET SINGLE TICKET
//   // -------------------------

//   async getTicketById(id) {
//     if (USE_DUMMY_DATA) {
//       await delay(300);
//       return null;
//     }

//     const response = await axiosInstance.get(
//       `/api/support/tickets/${id}`
//     );
//     return response.data;
//   },

//   // -------------------------
//   // GET BY USER
//   // -------------------------

//   async getTicketsByUser(username) {
//     if (USE_DUMMY_DATA) {
//       await delay(300);
//       return [];
//     }

//     const response = await axiosInstance.get(
//       `/api/support/tickets?raisedBy=${username}`
//     );
//     return response.data;
//   },

//   // -------------------------
//   // GET BY POLICY
//   // -------------------------

//   async getTicketsByPolicy(policyId) {
//     if (USE_DUMMY_DATA) {
//       await delay(300);
//       return [];
//     }

//     const response = await axiosInstance.get(
//       `/api/support/tickets?policyId=${policyId}`
//     );
//     return response.data;
//   },

//   async getAllTickets() {
//   const response = await axiosInstance.get(
//     `/api/support/tickets/all`
//   );
//   return response.data;
// }

// };

// export default supportApi;


import axiosInstance from './axiosInstance';

export const supportApi = {

  // -------------------------
  // RAISE ISSUE (MATCHES POSTMAN)
  // -------------------------

  async raiseIssue(data, username) {
    const params = new URLSearchParams();

    params.append('subject', data.subject);
    params.append('description', data.description);

    if (data.policyId) {
      params.append('policyId', data.policyId);
    }

    const response = await axiosInstance.post(
      `/api/support/tickets/issue?${params.toString()}`,
      null,
      {
        headers: {
          'X-USERNAME': username || 'anonymous'
        }
      }
    );

    return response.data;
  },

  // -------------------------
  // POLICY CHANGE
  // -------------------------

  async requestPolicyChange(data, username) {
    const response = await axiosInstance.post(
      `/api/support/tickets/policy-change`,
      {
        policyId: data.policyId,
        changeType: data.changeType,
        details: data.details,
      },
      {
        headers: {
          'X-USERNAME': username || 'anonymous'
        }
      }
    );

    return response.data;   // 🔥 FIXED
  },

  // -------------------------
  // GET SINGLE TICKET
  // -------------------------

  async getTicketById(id) {
    const response = await axiosInstance.get(
      `/api/support/tickets/${id}`
    );
    return response.data;
  },

  // -------------------------
  // GET BY USER
  // -------------------------

  async getTicketsByUser(username) {
    if (!username) return [];

    const response = await axiosInstance.get(
      `/api/support/tickets`,
      {
        params: { raisedBy: username }
      }
    );

    return response.data;
  },

  // -------------------------
  // GET BY POLICY
  // -------------------------

  async getTicketsByPolicy(policyId) {
    const response = await axiosInstance.get(
      `/api/support/tickets`,
      {
        params: { policyId }
      }
    );

    return response.data;
  },

  // -------------------------
  // ADMIN - GET ALL
  // -------------------------

  async getAllTickets() {
    const response = await axiosInstance.get(
      `/api/admin/support/tickets`
    );
    return response.data;
  },

  // -------------------------
  // ADMIN - TAKE ACTION
  // -------------------------

  async takeAdminAction(ticketId, actionData, adminUsername) {
    const response = await axiosInstance.put(
      `/api/admin/support/tickets/${ticketId}/action`,
      {
        status: actionData.status,
        adminRemarks: actionData.adminRemarks
      },
      {
        headers: {
          'X-USERNAME': adminUsername   // 🔥 FIXED header
        }
      }
    );

    return response.data;
  }

};

export default supportApi;
