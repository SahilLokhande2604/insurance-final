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
