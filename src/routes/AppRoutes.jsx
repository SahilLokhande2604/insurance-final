import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';
import { Sidebar } from '../components/Sidebar';
import { ProtectedRoute } from '../components/ProtectedRoute';

// Public Pages
import { Login } from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import About from '../pages/About';

// Customer Pages
import { Dashboard } from '../pages/Dashboard';
import { Policies } from '../pages/Policies';
import { MyPolicies } from '../pages/MyPolicies';
import { Claims } from '../pages/Claims';
import { Payments } from '../pages/Payments';
import { Notifications } from '../pages/Notifications';
import Support from '../pages/Support';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminPolicies } from '../pages/admin/AdminPolicies';
import { AdminClaims } from '../pages/admin/AdminClaims';
import { AdminPayments } from '../pages/admin/AdminPayments';
import { AdminNotifications } from '../pages/admin/AdminNotifications';

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
        <p className="text-gray-600 mb-4">
          You don't have permission to access this page.
        </p>
        <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Go back home
        </a>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-4">Page not found.</p>
        <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Go back home
        </a>
      </div>
    </div>
  );
}



export function AppRoutes() {
  return (
    <Routes>
      {/* Public Home page */}
      <Route path="/" element={<Home />} />

      {/* Public routes */}
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/support" element={<Support />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Customer routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/policies" element={<Policies />} /> */}
        <Route path="/my-policies" element={<MyPolicies />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/payments" element={<Payments />} />
        {/* <Route path="/notifications" element={<Notifications />} /> */}
        {/* <Route path="/support" element={<Support />} /> */}
      </Route>

      {/* Admin routes */}
      {/* <Route
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <div className="min-h-screen bg-gray-50 flex">
              <Sidebar isOpen={true} onClose={() => {}} />
              <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <Outlet />
              </main>
            </div>
          </ProtectedRoute>
        }
      > */}

      <Route
  element={
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={true} onClose={() => {}} />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="p-6 lg:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  }
>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/policies" element={<AdminPolicies />} />
        <Route path="/admin/claims" element={<AdminClaims />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
