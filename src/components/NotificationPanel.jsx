// import {
//   CheckCheck,
//   X,
//   Bell,
//   AlertCircle,
//   CheckCircle,
//   Info,
//   AlertTriangle,
// } from 'lucide-react';
// import { useNotifications } from '../context/NotificationContext';
// import { cn } from '../utils/cn';



// function getNotificationIcon(type) {
//   switch (type) {
//     case 'policy':
//       return <Info className="h-6 w-6 text-blue-500" />;
//     case 'payment':
//       return <CheckCircle className="h-6 w-6 text-green-500" />;
//     case 'claim':
//       return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
//     case 'user':
//       return <Bell className="h-6 w-6 text-indigo-500" />;
//     default:
//       return <Info className="h-6 w-6 text-gray-500" />;
//   }
// }


// function formatTime(dateString) {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diff = now.getTime() - date.getTime();

//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(diff / 3600000);
//   const days = Math.floor(diff / 86400000);

//   if (minutes < 1) return 'Just now';
//   if (minutes < 60) return `${minutes}m ago`;
//   if (hours < 24) return `${hours}h ago`;
//   if (days < 7) return `${days}d ago`;
//   return date.toLocaleDateString();
// }

// export function NotificationPanel({ onClose }) {
//   const { notifications } = useNotifications();

//   return (
//     <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
      
//       <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
//         <h3 className="font-semibold text-gray-900">Notifications</h3>
//       </div>

//       <div className="max-h-96 overflow-y-auto">
//         {notifications.length === 0 ? (
//           <div className="p-8 text-center">
//             <p className="text-gray-500">No notifications yet</p>
//           </div>
//         ) : (
//           notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className="flex gap-3 p-4 border-b border-gray-100"
//             >
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-900">
//                   {notification.type?.toUpperCase()}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {notification.message}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Status: {notification.status}
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
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border z-50">
      <div className="px-4 py-3 border-b font-semibold">
        Notifications
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.slice(0, 5).map(notification => (
            <div
              key={notification.id}
              onClick={() =>
                !notification.isRead &&
                markAsRead(notification.id)
              }
              className={cn(
                'flex gap-3 p-4 border-b cursor-pointer',
                notification.isRead
                  ? 'bg-white'
                  : 'bg-indigo-50'
              )}
            >
              {getNotificationIcon(notification.type)}

              <div className="flex-1">
                <p className="text-sm font-medium capitalize">
                  {notification.eventType
                    ?.toLowerCase()
                    .replaceAll('_', ' ')}
                </p>

                <p className="text-sm text-gray-600">
                  {notification.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
