// import { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { notificationApi } from '../api/notificationApi';
// import { useAuth } from '../context/AuthContext';

// const NotificationContext = createContext(undefined);

// export function NotificationProvider({ children }) {
//   const { user, isAuthenticated } = useAuth();
//   const [notifications, setNotifications] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   const refreshNotifications = useCallback(async () => {
//     if (!user) return;

//     setIsLoading(true);
//     try {
//       const data = await notificationApi.getUserNotifications(user.id);
//       setNotifications(data);
//     } catch (error) {
//       console.error('Failed to fetch notifications:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       refreshNotifications();
//     } else {
//       setNotifications([]);
//     }
//   }, [isAuthenticated, user, refreshNotifications]);

//   const addNotification = async (data) => {
//     if (!user) return;

//     try {
//       const newNotification = await notificationApi.createNotification({
//         userId: user.id,
//         ...data,
//       });
//       setNotifications(prev => [newNotification, ...prev]);
//     } catch (error) {
//       console.error('Failed to add notification:', error);
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       await notificationApi.markAsRead(id);
//       setNotifications(prev =>
//         prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
//       );
//     } catch (error) {
//       console.error('Failed to mark as read:', error);
//     }
//   };

//   const markAllAsRead = async () => {
//     if (!user) return;

//     try {
//       await notificationApi.markAllAsRead(user.id);
//       setNotifications(prev =>
//         prev.map(n => ({ ...n, isRead: true }))
//       );
//     } catch (error) {
//       console.error('Failed to mark all as read:', error);
//     }
//   };

//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         unreadCount,
//         isLoading,
//         addNotification,
//         markAsRead,
//         markAllAsRead,
//         refreshNotifications,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// }

// export function useNotifications() {
//   const context = useContext(NotificationContext);
//   if (context === undefined) {
//     throw new Error('useNotifications must be used within a NotificationProvider');
//   }
//   return context;
// }


import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { notificationApi } from '../api/notificationApi';
import { useAuth } from '../context/AuthContext';

const NotificationContext = createContext(undefined);

export function NotificationProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Safe unread count (avoid crash if undefined)
  const unreadCount = notifications?.filter(n => !n.isRead)?.length || 0;

  const refreshNotifications = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const response = await notificationApi.getUserNotifications(user.id);

      // ✅ Handle multiple backend response formats
      const data =
        response?.data ||
        response?.content ||
        response ||
        [];

      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      refreshNotifications();
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated, user?.id, refreshNotifications]);

  const addNotification = async (data) => {
    if (!user?.id) return;

    try {
      const response = await notificationApi.createNotification({
        userId: user.id,
        ...data,
      });

      const newNotification = response?.data || response;

      if (newNotification) {
        setNotifications(prev => [newNotification, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add notification:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);

      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user?.id) return;

    try {
      await notificationApi.markAllAsRead(user.id);

      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        addNotification,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }

  return context;
}
