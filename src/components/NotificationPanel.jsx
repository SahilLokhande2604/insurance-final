// // import {
// //   CheckCheck,
// //   X,
// //   Bell,
// //   AlertCircle,
// //   CheckCircle,
// //   Info,
// //   AlertTriangle,
// // } from 'lucide-react';
// // import { useNotifications } from '../context/NotificationContext';
// // import { cn } from '../utils/cn';



// // function getNotificationIcon(type) {
// //   switch (type) {
// //     case 'policy':
// //       return <Info className="h-6 w-6 text-blue-500" />;
// //     case 'payment':
// //       return <CheckCircle className="h-6 w-6 text-green-500" />;
// //     case 'claim':
// //       return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
// //     case 'user':
// //       return <Bell className="h-6 w-6 text-indigo-500" />;
// //     default:
// //       return <Info className="h-6 w-6 text-gray-500" />;
// //   }
// // }


// // function formatTime(dateString) {
// //   const date = new Date(dateString);
// //   const now = new Date();
// //   const diff = now.getTime() - date.getTime();

// //   const minutes = Math.floor(diff / 60000);
// //   const hours = Math.floor(diff / 3600000);
// //   const days = Math.floor(diff / 86400000);

// //   if (minutes < 1) return 'Just now';
// //   if (minutes < 60) return `${minutes}m ago`;
// //   if (hours < 24) return `${hours}h ago`;
// //   if (days < 7) return `${days}d ago`;
// //   return date.toLocaleDateString();
// // }

// // export function NotificationPanel({ onClose }) {
// //   const { notifications } = useNotifications();

// //   return (
// //     <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
      
// //       <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
// //         <h3 className="font-semibold text-gray-900">Notifications</h3>
// //       </div>

// //       <div className="max-h-96 overflow-y-auto">
// //         {notifications.length === 0 ? (
// //           <div className="p-8 text-center">
// //             <p className="text-gray-500">No notifications yet</p>
// //           </div>
// //         ) : (
// //           notifications.map((notification) => (
// //             <div
// //               key={notification.id}
// //               className="flex gap-3 p-4 border-b border-gray-100"
// //             >
// //               <div className="flex-1">
// //                 <p className="text-sm font-medium text-gray-900">
// //                   {notification.type?.toUpperCase()}
// //                 </p>
// //                 <p className="text-sm text-gray-600">
// //                   {notification.message}
// //                 </p>
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   Status: {notification.status}
// //                 </p>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import {
//   Bell,
//   CheckCircle,
//   Info,
//   AlertTriangle,
// } from 'lucide-react';
// import { useNotifications } from '../context/NotificationContext';
// import { cn } from '../utils/cn';

// function getNotificationIcon(type) {
//   switch (type) {
//     case 'policy':
//       return <Info className="h-5 w-5 text-blue-500" />;
//     case 'payment':
//       return <CheckCircle className="h-5 w-5 text-green-500" />;
//     case 'claim':
//       return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
//     case 'user':
//       return <Bell className="h-5 w-5 text-indigo-500" />;
//     default:
//       return <Info className="h-5 w-5 text-gray-500" />;
//   }
// }

// export function NotificationPanel() {
//   const { notifications, markAsRead } = useNotifications();

//   return (
//     <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border z-50">
//       <div className="px-4 py-3 border-b font-semibold">
//         Notifications
//       </div>

//       <div className="max-h-96 overflow-y-auto">
//         {notifications.length === 0 ? (
//           <div className="p-6 text-center text-gray-500">
//             No notifications yet
//           </div>
//         ) : (
//           notifications.slice(0, 5).map(notification => (
//             <div
//               key={notification.id}
//               onClick={() =>
//                 !notification.isRead &&
//                 markAsRead(notification.id)
//               }
//               className={cn(
//                 'flex gap-3 p-4 border-b cursor-pointer',
//                 notification.isRead
//                   ? 'bg-white'
//                   : 'bg-indigo-50'
//               )}
//             >
//               {getNotificationIcon(notification.type)}

//               <div className="flex-1">
//                 <p className="text-sm font-medium capitalize">
//                   {notification.eventType
//                     ?.toLowerCase()
//                     .replaceAll('_', ' ')}
//                 </p>

//                 <p className="text-sm text-gray-600">
//                   {notification.message}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { cn } from '../utils/cn';

function getNotificationIcon(type) {
  switch (type) {
    case 'policy':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'payment':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'claim':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'user':
      return <Bell className="h-5 w-5 text-indigo-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
}

export function NotificationPanel() {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-white">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Bell className="h-5 w-5 text-indigo-600" />
          Notifications
        </h3>
        <span className="text-xs text-gray-500">
          {notifications.length} total
        </span>
      </div>

      {/* Body */}
      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {notifications.length === 0 ? (
          <div className="p-10 flex flex-col items-center text-gray-400">
            <Bell className="h-10 w-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">No notifications yet</p>
            <p className="text-xs mt-1">You're all caught up 🎉</p>
          </div>
        ) : (
          notifications.slice(0, 6).map((notification) => (
            <div
              key={notification.id}
              onClick={() =>
                !notification.isRead &&
                markAsRead(notification.id)
              }
              className={cn(
                "flex gap-4 px-5 py-4 transition-all duration-200 cursor-pointer group",
                notification.isRead
                  ? "bg-white hover:bg-gray-50"
                  : "bg-indigo-50/70 hover:bg-indigo-100"
              )}
            >
              {/* Icon */}
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {notification.eventType
                      ?.toLowerCase()
                      .replaceAll('_', ' ')}
                  </p>

                  {/* Unread dot */}
                  {!notification.isRead && (
                    <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                  )}
                </div>

                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {notification.message}
                </p>

                {/* Timestamp (optional if you have createdAt) */}
                {notification.createdAt && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {new Date(notification.createdAt).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 6 && (
        <div className="text-center py-3 border-t bg-gray-50 text-sm text-indigo-600 hover:bg-indigo-50 cursor-pointer transition">
          View all notifications
        </div>
      )}
    </div>
  );
}
