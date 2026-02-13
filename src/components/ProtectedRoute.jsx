import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Loader2 } from 'lucide-react';
import { ROLES } from '../utils/constants.js';

/**
 * Protected Route Component
 * Guards routes based on authentication and role
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {Array<string>} props.allowedRoles - Roles allowed to access this route
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && user) {
    // Map frontend role names to backend role names for comparison
    const userRole = user.role;
    
    // Check if user's role is in allowed roles
    // Handle both frontend naming (ADMIN, CUSTOMER) and backend naming (ROLE_ADMIN, ROLE_USER)
    const hasAccess = allowedRoles.some(allowedRole => {
      // Direct match
      if (userRole === allowedRole) return true;
      
      // Map ADMIN -> ROLE_ADMIN
      if (allowedRole === 'ADMIN' && userRole === ROLES.ADMIN) return true;
      
      // Map CUSTOMER -> ROLE_USER
      if (allowedRole === 'CUSTOMER' && userRole === ROLES.USER) return true;
      
      // Map USER -> ROLE_USER
      if (allowedRole === 'USER' && userRole === ROLES.USER) return true;
      
      return false;
    });

    if (!hasAccess) {
      // Redirect to appropriate dashboard based on role
      let redirectPath = '/dashboard';
      
      if (userRole === ROLES.ADMIN) {
        redirectPath = '/admin/dashboard';
      } else if (userRole === ROLES.USER) {
        redirectPath = '/dashboard';
      }
      
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;
