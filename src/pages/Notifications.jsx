import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  CheckCheck,
  Clock,
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { cn } from '../utils/cn';
import Navbar from '../components/NavbarNew.jsx';
import Footer from '../components/FooterNew.jsx';

function getNotificationIcon(type) {
  switch (type) {
    case 'policy':
      return <Info className="h-6 w-6 text-blue-500" />;
    case 'payment':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case 'claim':
      return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    case 'user':
      return <Bell className="h-6 w-6 text-indigo-500" />;
    default:
      return <Info className="h-6 w-6 text-gray-500" />;
  }
}

export function Notifications() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
  } = useNotifications();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-indigo-50/40">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Bell className="h-7 w-7 text-indigo-600" />
              Notifications
            </h1>

            <p className="text-gray-500 mt-1">
              {unreadCount > 0 ? (
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-indigo-600 rounded-full animate-pulse" />
                  {unreadCount} unread notifications
                </span>
              ) : (
                'All caught up 🎉'
              )}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.02]"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="text-center py-20 text-gray-400 flex flex-col items-center">
            <Bell className="h-12 w-12 mb-4 opacity-40" />
            <p className="text-lg font-medium">No notifications yet</p>
            <p className="text-sm mt-1">
              You’ll see updates about policies, claims, and payments here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-6">
  {notifications.map((notification) => (
    <div
      key={notification.id}
      onClick={() =>
        !notification.isRead &&
        markAsRead(notification.id)
      }
      className={cn(
        "relative p-7 rounded-2xl border transition-all duration-300 cursor-pointer bg-white shadow-sm hover:shadow-lg hover:-translate-y-1",
        notification.isRead
          ? "border-gray-200"
          : "border-indigo-300 shadow-md"
      )}
    >
      {/* Unread Pulse Dot */}
      {!notification.isRead && (
        <span className="absolute top-6 right-6 h-3 w-3 bg-indigo-600 rounded-full animate-pulse" />
      )}

      <div className="flex gap-6">
        {/* Icon */}
        <div className="mt-1">
          {getNotificationIcon(notification.type)}
        </div>

        <div className="flex-1 space-y-3">

          {/* Top Row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {notification.eventType
                ?.toLowerCase()
                .replaceAll('_', ' ')}
            </h3>

            {/* Status Badge */}
            <span
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-full",
                notification.status === "APPROVED" &&
                  "bg-green-100 text-green-700",
                notification.status === "PENDING" &&
                  "bg-yellow-100 text-yellow-700",
                notification.status === "REJECTED" &&
                  "bg-red-100 text-red-700",
                notification.status === "ACTIVE" &&
                  "bg-blue-100 text-blue-700"
              )}
            >
              {notification.status}
            </span>
          </div>

          {/* Username */}
          <p className="text-sm text-gray-500">
            User: <span className="font-medium">{notification.username}</span>
          </p>

          {/* Message */}
          <p className="text-gray-700 leading-relaxed text-base">
            {notification.message}
          </p>

          {/* Bottom Row */}
          <div className="flex justify-between text-xs text-gray-400 pt-3 border-t mt-3">
            <span>
              Created:{" "}
              {new Date(notification.createdAt).toLocaleString()}
            </span>

            <span>
              Updated:{" "}
              {new Date(notification.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
