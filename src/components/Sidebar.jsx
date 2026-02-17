// import { Link, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Shield,
//   FileText,
//   CreditCard,
//   Bell,
//   Users,
//   Settings,
//   X,
//   ClipboardList,
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { cn } from '../utils/cn';

// const customerNavItems = [
//   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { name: 'Policies', href: '/policies', icon: Shield },
//   { name: 'My Policies', href: '/my-policies', icon: FileText },
//   { name: 'Claims', href: '/claims', icon: ClipboardList },
//   { name: 'Payments', href: '/payments', icon: CreditCard },
//   { name: 'Notifications', href: '/notifications', icon: Bell },
//   { name: 'Support', href: '/support', icon: ClipboardList },
// ];

// const adminNavItems = [
//   { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
//   { name: 'Users', href: '/admin/users', icon: Users },
//   { name: 'Policies', href: '/admin/policies', icon: Shield },
//   { name: 'Claims', href: '/admin/claims', icon: ClipboardList },
//   { name: 'Payments', href: '/admin/payments', icon: CreditCard },
//   { name: 'Notifications', href: '/admin/notifications', icon: Bell },
//   { name: 'Settings', href: '/admin/settings', icon: Settings },
// ];

// export function Sidebar({ isOpen, onClose }) {
//   const { user } = useAuth();
//   const location = useLocation();

//   const navItems =
//     user?.role === 'ROLE_ADMIN' ? adminNavItems : customerNavItems;

//   return (
//     <>
//       Mobile backdrop
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-50 bg-black/50 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//   className={cn(
//     "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-300 lg:translate-x-0",
//     isOpen ? "translate-x-0" : "-translate-x-full"
//   )}
// >
//   {/* Logo Section */}
//   <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
//     <Link to="/" className="flex items-center gap-3">
//       <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#1A73E8] to-[#34A853] flex items-center justify-center shadow-md">
//         <Shield className="h-5 w-5 text-white" />
//       </div>
//       <span className="text-lg font-bold bg-gradient-to-r from-[#1A73E8] to-[#34A853] bg-clip-text text-transparent">
//         SecureLife
//       </span>
//     </Link>

//     <button
//       onClick={onClose}
//       className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
//     >
//       <X className="h-6 w-6" />
//     </button>
//   </div>

//   {/* Navigation */}
//   <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//     {navItems.map((item) => {
//       const isActive = location.pathname === item.href;

//       return (
//         <Link
//           key={item.name}
//           to={item.href}
//           onClick={onClose}
//           className={cn(
//             "group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
//             isActive
//               ? "bg-gradient-to-r from-[#1A73E8]/10 to-[#34A853]/10 text-[#1A73E8] shadow-sm"
//               : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//           )}
//         >
//           <item.icon
//             className={cn(
//               "h-5 w-5 transition-colors",
//               isActive
//                 ? "text-[#1A73E8]"
//                 : "text-gray-400 group-hover:text-gray-600"
//             )}
//           />
//           {item.name}
//         </Link>
//       );
//     })}
//   </nav>

//   {/* Bottom User Card */}
//   <div className="p-4 border-t border-gray-100">
//     <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
//       <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#34A853] flex items-center justify-center shadow">
//         <span className="text-sm font-bold text-white">
//           {user?.name?.charAt(0).toUpperCase() || "?"}
//         </span>
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="text-sm font-semibold text-gray-900 truncate">
//           {user?.name}
//         </p>
//         <p className="text-xs text-gray-500 truncate">
//           {user?.username}
//         </p>
//       </div>
//     </div>
//   </div>
// </aside>

//     </>
//   );
// }

import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  FileText,
  CreditCard,
  Bell,
  Users,
  Settings,
  X,
  ClipboardList,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

const customerNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Policies', href: '/policies', icon: Shield },
  { name: 'My Policies', href: '/my-policies', icon: FileText },
  { name: 'Claims', href: '/claims', icon: ClipboardList },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Support', href: '/support', icon: ClipboardList },
];

const adminNavItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Policies', href: '/admin/policies', icon: Shield },
  { name: 'Claims', href: '/admin/claims', icon: ClipboardList },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  // 🔁 Replaced Settings
  { name: 'Customer Tickets Raise', href: '/admin/support/tickets', icon: ClipboardList },
];

export function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems =
    user?.role === 'ROLE_ADMIN' ? adminNavItems : customerNavItems;

  const handleLogout = () => {
    logout(); // clear token / context
    navigate('/login');
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#1A73E8] to-[#34A853] flex items-center justify-center shadow-md">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#1A73E8] to-[#34A853] bg-clip-text text-transparent">
              SecureLife
            </span>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#1A73E8]/10 to-[#34A853]/10 text-[#1A73E8] shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-[#1A73E8]"
                      : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100 space-y-3">

          {/* User Card */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#34A853] flex items-center justify-center shadow">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.username}
              </p>
            </div>
          </div>

          {/* 🚪 Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>

        </div>
      </aside>
    </>
  );
}
