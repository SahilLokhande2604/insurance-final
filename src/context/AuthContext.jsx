import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, ROLES } from '../utils/constants.js';
import { authApi } from '../api/authApi.js';
import { isTokenExpired, getUserFromToken } from '../utils/jwtUtils.js';

// Create Auth Context
const AuthContext = createContext(undefined);

/**
 * Auth Provider Component
 * Manages authentication state across the app
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        
        if (storedUser && token) {
          // Check if token is expired
          if (isTokenExpired(token)) {
            console.warn('Token expired, clearing auth data');
            localStorage.removeItem(STORAGE_KEYS.USER);
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            setUser(null);
          } else {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  /**
   * Login function
   * @param {string} username - Username
   * @param {string} password - Password
   */
  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(username, password);
      
      // Store user and token
      setUser(response.user);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register function
   * @param {object} data - Registration data { username, password }
   */
  const register = async (data) => {
    setIsLoading(true);
    try {
      // Register the user
      await authApi.register(data);
      
      // After successful registration, automatically log in
      const loginResponse = await authApi.login(data.username, data.password);
      
      // Store user and token
      setUser(loginResponse.user);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(loginResponse.user));
      localStorage.setItem(STORAGE_KEYS.TOKEN, loginResponse.token);
      // localStorage.setItem("username", loginResponse.user.username);
      
      return loginResponse;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      setIsLoading(false);
    }
  };

  /**
   * Check if user has admin role
   */
  const isAdmin = () => {
    return user?.role === ROLES.ADMIN;
  };

  /**
   * Check if user has user role
   */
  const isUser = () => {
    return user?.role === ROLES.USER;
  };

  /**
   * Get display role (formatted for UI)
   */
  const getDisplayRole = () => {
    if (user?.role === ROLES.ADMIN) return 'Admin';
    if (user?.role === ROLES.USER) return 'Customer';
    return 'Unknown';
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isAdmin,
    isUser,
    getDisplayRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
