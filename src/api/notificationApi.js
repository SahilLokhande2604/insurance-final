// // // import axiosInstance from "./axiosInstance.js";

// // // export const notificationApi = {
// // //   async getUserNotifications(userId) {
// // //     const response = await axiosInstance.get(
// // //       `/api/notifications/user/${userId}`
// // //     );
// // //     return response.data;
// // //   },

// // //   async markAsRead(id) {
// // //     const response = await axiosInstance.put(
// // //       `/api/notifications/${id}/read`
// // //     );
// // //     return response.data;
// // //   },

// // //   async markAllAsRead(userId) {
// // //     await axiosInstance.put(
// // //       `/api/notifications/user/${userId}/read-all`
// // //     );
// // //   },

// // //   async createNotification(data) {
// // //     const response = await axiosInstance.post(
// // //       "/api/notifications/send",
// // //       data
// // //     );
// // //     return response.data;
// // //   },

// // //   async getUnreadCount(userId) {
// // //     const response = await axiosInstance.get(
// // //       `/api/notifications/user/${userId}`
// // //     );
// // //     const notifications = response.data;
// // //     return notifications.filter((n) => !n.isRead).length;
// // //   },
// // // };

// // // export default notificationApi;


// // import axiosInstance from "./axiosInstance.js";

// // export const notificationApi = {

// //   async getUserNotifications(userId) {
// //     const response = await axiosInstance.get(
// //       `/api/notifications/user/${userId}`
// //     );
// //     return response.data;
// //   },

// //   async createNotification(data) {
// //     const response = await axiosInstance.post(
// //       "/api/notifications/send",
// //       data
// //     );
// //     return response.data;
// //   },

// //   async getAllNotifications() {
// //     const response = await axiosInstance.get(
// //       "/api/notifications"
// //     );
// //     return response.data;
// //   }

// // };

// // export default notificationApi;


// import axiosInstance from "./axiosInstance.js";

// export const notificationApi = {

//  async getUserNotifications(username) {
//   const response = await axiosInstance.get(
//     `/api/notifications/user`,
//     {
//       headers: {
//         "X-USERNAME": username
//       }
//     }
//   );
//   return response.data;
// },


//   // POST /api/notifications/send
//   async createNotification(data) {
//     const response = await axiosInstance.post(
//       "/api/notifications/send",
//       data
//     );
//     return response.data;
//   },

//   // GET all
//   async getAllNotifications() {
//     const response = await axiosInstance.get(
//       "/api/notifications"
//     );
//     return response.data;
//   },

//   // PUT /{id}/read
//   async markAsRead(id) {
//     const response = await axiosInstance.put(
//       `/api/notifications/${id}/read`
//     );
//     return response.data;
//   },

//   // PUT /user/{username}/read-all
//   async markAllAsRead(username) {
//     await axiosInstance.put(
//       `/api/notifications/user/${username}/read-all`
//     );
//   }
// };

// export default notificationApi;


import axiosInstance from "./axiosInstance.js";

export const notificationApi = {

  async getUserNotifications(username) {
    const response = await axiosInstance.get(
      "/api/notifications/user",
      {
        headers: {
          "X-USERNAME": username
        }
      }
    );
    return response.data;
  },

  async createNotification(data) {
    const response = await axiosInstance.post(
      "/api/notifications/send",
      data
    );
    return response.data;
  },

  async getAllNotifications() {
    const response = await axiosInstance.get(
      "/api/notifications"
    );
    return response.data;
  },

  async markAsRead(id) {
    const response = await axiosInstance.put(
      `/api/notifications/${id}/read`
    );
    return response.data;
  },

  async markAllAsRead(username) {
    await axiosInstance.put(
      `/api/notifications/user/read-all`,
      null,
      {
        headers: {
          "X-USERNAME": username
        }
      }
    );
  },

  async sendNotificationToUser(username, data) {
  const response = await axiosInstance.post(
    `/api/admin/notifications/send-to-user?username=${username}`,
    data
  );
  return response.data;
},

async getAdminNotifications() {
  const response = await axiosInstance.get(
    "/api/admin/notifications"
  );
  return response.data;
},

};

export default notificationApi;
