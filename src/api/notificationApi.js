import { dummyNotifications } from '../utils/dummyData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const USE_DUMMY_DATA = true;

let notifications = [...dummyNotifications];

export const notificationApi = {
  // Get user notifications
  async getUserNotifications(userId) {
    if (USE_DUMMY_DATA) {
      await delay(300);
      return notifications
        .filter(n => n.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    throw new Error('API not implemented');
  },

  // Mark notification as read
  async markAsRead(id) {
    if (USE_DUMMY_DATA) {
      await delay(200);
      const index = notifications.findIndex(n => n.id === id);
      if (index === -1) throw new Error('Notification not found');
      notifications[index].isRead = true;
      return notifications[index];
    }
    throw new Error('API not implemented');
  },

  // Mark all as read
  async markAllAsRead(userId) {
    if (USE_DUMMY_DATA) {
      await delay(200);
      notifications = notifications.map(n =>
        n.userId === userId ? { ...n, isRead: true } : n
      );
    }
  },

  // Create notification
  async createNotification(data) {
    if (USE_DUMMY_DATA) {
      await delay(200);
      const newNotification = {
        id: `n${Date.now()}`,
        ...data,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      notifications.unshift(newNotification);
      return newNotification;
    }
    throw new Error('API not implemented');
  },

  // Send notification to user (Admin)
  async sendNotification(data) {
    return this.createNotification(data);
  },

  // Get unread count
  async getUnreadCount(userId) {
    if (USE_DUMMY_DATA) {
      await delay(100);
      return notifications.filter(
        n => n.userId === userId && !n.isRead
      ).length;
    }
    throw new Error('API not implemented');
  },
};
