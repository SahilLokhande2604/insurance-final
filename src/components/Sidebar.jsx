import { Link, useLocation } from 'react-router-dom';
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
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const location = useLocation();

  const navItems =
    user?.role === 'ROLE_ADMIN' ? adminNavItems : customerNavItems;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
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
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-indigo-600' : 'text-gray-400'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.username}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
