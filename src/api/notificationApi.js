// import axiosInstance from './axiosInstance.js';
// import { dummyNotifications } from '../utils/dummyData.js';

// const USE_DUMMY_DATA = true;
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// let notifications = [...dummyNotifications];

// export const notificationApi = {
//   async getUserNotifications(userId) {
//     if (USE_DUMMY_DATA) {
//       await delay(300);
//       return notifications
//         .filter(n => n.userId === userId)
//         .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//     }
    
//     const response = await axiosInstance.get(`/api/notifications/user/${userId}`);
//     return response.data;
//   },

//   async markAsRead(id) {
//     if (USE_DUMMY_DATA) {
//       await delay(200);
//       const index = notifications.findIndex(n => n.id === id);
//       if (index === -1) throw new Error('Notification not found');
//       notifications[index].isRead = true;
//       return notifications[index];
//     }
    
//     console.warn('markAsRead: Backend endpoint not implemented');
//     return null;
//   },

//   async markAllAsRead(userId) {
//     if (USE_DUMMY_DATA) {
//       await delay(200);
//       notifications = notifications.map(n => 
//         n.userId === userId ? { ...n, isRead: true } : n
//       );
//       return;
//     }
    
//     console.warn('markAllAsRead: Backend endpoint not implemented');
//   },

//   async createNotification(data) {
//     if (USE_DUMMY_DATA) {
//       await delay(200);
//       const newNotification = {
//         id: `n${Date.now()}`,
//         ...data,
//         isRead: false,
//         createdAt: new Date().toISOString(),
//       };
//       notifications.unshift(newNotification);
//       return newNotification;
//     }
    
//     const response = await axiosInstance.post('/api/notifications/send', {
//       userId: data.userId,
//       message: data.message,
//       type: data.type || 'in-app',
//       status: 'sent',
//     });
//     return response.data;
//   },

//   async sendNotification(data) {
//     return this.createNotification(data);
//   },

//   async getUnreadCount(userId) {
//     if (USE_DUMMY_DATA) {
//       await delay(100);
//       return notifications.filter(n => n.userId === userId && !n.isRead).length;
//     }
    
//     const response = await axiosInstance.get(`/api/notifications/user/${userId}`);
//     const notifications = response.data;
//     return notifications.filter(n => n.status !== 'read').length;
//   },
// };

// export default notificationApi;

import axiosInstance from "./axiosInstance.js";

export const notificationApi = {
  async getUserNotifications(userId) {
    const response = await axiosInstance.get(
      `/api/notifications/user/${userId}`
    );
    return response.data;
  },

  async markAsRead(id) {
    const response = await axiosInstance.put(
      `/api/notifications/${id}/read`
    );
    return response.data;
  },

  async markAllAsRead(userId) {
    await axiosInstance.put(
      `/api/notifications/user/${userId}/read-all`
    );
  },

  async createNotification(data) {
    const response = await axiosInstance.post(
      "/api/notifications/send",
      data
    );
    return response.data;
  },

  async getUnreadCount(userId) {
    const response = await axiosInstance.get(
      `/api/notifications/user/${userId}`
    );
    const notifications = response.data;
    return notifications.filter((n) => !n.isRead).length;
  },
};

export default notificationApi;
