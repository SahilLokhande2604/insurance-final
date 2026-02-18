// import {
//   Bell,
//   CheckCircle,
//   AlertCircle,
//   Info,
//   AlertTriangle,
//   CheckCheck,
// } from 'lucide-react';
// import { useNotifications } from '../context/NotificationContext';
// import { cn } from '../utils/cn';
// import Navbar from '../components/NavbarNew.jsx';
// import Footer from '../components/FooterNew.jsx';

// function getNotificationIcon(type) {
//   switch (type) {
//     case 'success':
//       return <CheckCircle className="h-6 w-6 text-green-500" />;
//     case 'error':
//       return <AlertCircle className="h-6 w-6 text-red-500" />;
//     case 'warning':
//       return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
//     default:
//       return <Info className="h-6 w-6 text-blue-500" />;
//   }
// }

// function getNotificationBg(type) {
//   switch (type) {
//     case 'success':
//       return 'bg-green-50 border-green-100';
//     case 'error':
//       return 'bg-red-50 border-red-100';
//     case 'warning':
//       return 'bg-yellow-50 border-yellow-100';
//     default:
//       return 'bg-blue-50 border-blue-100';
//   }
// }

// export function Notifications() {
//   const { notifications, markAsRead, markAllAsRead, unreadCount } =
//     useNotifications();

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();

//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);

//     if (minutes < 1) return 'Just now';
//     if (minutes < 60)
//       return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     if (hours < 24)
//       return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//     if (days < 7)
//       return `${days} day${days > 1 ? 's' : ''} ago`;

//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="space-y-12 min-h-screen">
//       <Navbar />
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
//           <p className="text-gray-500">
//             {unreadCount > 0
//               ? `You have ${unreadCount} unread notification${
//                   unreadCount > 1 ? 's' : ''
//                 }`
//               : 'All caught up!'}
//           </p>
//         </div>

//         {unreadCount > 0 && (
//           <button
//             onClick={() => markAllAsRead()}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
//           >
//             <CheckCheck className="h-4 w-4" />
//             Mark All as Read
//           </button>
//         )}
//       </div>

//       {/* Notifications List */}
//       {notifications.length === 0 ? (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//           <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             No notifications
//           </h3>
//           <p className="text-gray-500">
//             You're all caught up! New notifications will appear here.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
     

// {notifications.map((notification) => (
//   <div
//     key={notification.id}
//     onClick={() =>
//       !notification.isRead && markAsRead(notification.id)
//     }
//     className={cn(
//       'bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all',
//       notification.isRead
//         ? 'border-gray-100 opacity-80'
//         : 'border-indigo-200 ring-1 ring-indigo-100'
//     )}
//   >
//     <div className="flex gap-4">
//       <div
//         className={cn(
//           'flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center border',
//           getNotificationBg(notification.type)
//         )}
//       >
//         {getNotificationIcon(notification.type)}
//       </div>

//       <div className="flex-1 min-w-0">
//         <div className="flex items-start justify-between gap-4 mb-1">
//           <h3
//             className={cn(
//               'font-semibold capitalize',
//               notification.isRead
//                 ? 'text-gray-600'
//                 : 'text-gray-900'
//             )}
//           >
//             {notification.eventType
//               ?.toLowerCase()
//               .replaceAll('_', ' ')}
//           </h3>

//           <div className="flex items-center gap-2 flex-shrink-0">
//             {!notification.isRead && (
//               <span className="h-2 w-2 bg-indigo-600 rounded-full" />
//             )}
//             <span className="text-xs text-gray-400">
//               {formatDate(notification.createdAt)}
//             </span>
//           </div>
//         </div>

//         <p
//           className={cn(
//             'text-sm',
//             notification.isRead
//               ? 'text-gray-500'
//               : 'text-gray-700'
//           )}
//         >
//           {notification.message}
//         </p>

//         <p className="text-xs text-gray-400 mt-2">
//           Status: {notification.status}
//         </p>
//       </div>
//     </div>
//   </div>
// ))}



//         </div>
//       )}
//       <Footer />
//     </div>
//   );
// }



import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  CheckCheck,
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Notifications
            </h1>
            <p className="text-gray-500">
              {unreadCount > 0
                ? `${unreadCount} unread`
                : 'All caught up!'}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              onClick={() =>
                !notification.isRead &&
                markAsRead(notification.id)
              }
              className={cn(
                'p-6 rounded-xl border shadow-sm cursor-pointer transition',
                notification.isRead
                  ? 'bg-white'
                  : 'bg-indigo-50 border-indigo-200'
              )}
            >
              <div className="flex gap-4">
                {getNotificationIcon(notification.type)}

                <div className="flex-1">
                  <h3 className="font-semibold capitalize">
                    {notification.eventType
                      ?.toLowerCase()
                      .replaceAll('_', ' ')}
                  </h3>

                  <p className="text-gray-600">
                    {notification.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Status: {notification.status}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
