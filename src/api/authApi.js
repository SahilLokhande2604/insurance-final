import { dummyUsers } from '../utils/dummyData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Flag to switch between dummy and real API
const USE_DUMMY_DATA = true;

export const authApi = {
  // Login
  async login(email, password) {
    if (USE_DUMMY_DATA) {
      await delay(800);
      const user = dummyUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userData } = user;
      return {
        user: userData,
        token: `dummy-jwt-token-${user.id}-${Date.now()}`,
      };
    }

    // Real API call (uncomment when backend is ready)
    // const response = await axiosInstance.post('/auth/login', { email, password });
    // return response.data;
    throw new Error('API not implemented');
  },

  // Register
  async register(data) {
    if (USE_DUMMY_DATA) {
      await delay(800);

      // Check if email already exists
      if (dummyUsers.some((u) => u.email === data.email)) {
        throw new Error('Email already registered');
      }

      const newUser = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: 'CUSTOMER',
        phone: data.phone,
        createdAt: new Date().toISOString(),
      };

      return {
        user: newUser,
        token: `dummy-jwt-token-${newUser.id}`,
      };
    }

    // Real API call
    // const response = await axiosInstance.post('/auth/register', data);
    // return response.data;
    throw new Error('API not implemented');
  },

  // Get current user
  async getCurrentUser(token) {
    if (USE_DUMMY_DATA) {
      await delay(300);
      const userId = token.split('-')[3];
      const user = dummyUsers.find((u) => u.id === userId);

      if (!user) {
        throw new Error('User not found');
      }

      const { password: _, ...userData } = user;
      return userData;
    }

    // Real API call
    // const response = await axiosInstance.get('/auth/me');
    // return response.data;
    throw new Error('API not implemented');
  },

  // Logout
  async logout() {
    if (USE_DUMMY_DATA) {
      await delay(200);
      return;
    }

    // Real API call
    // await axiosInstance.post('/auth/logout');
  },

  // Get all users (Admin only)
  async getAllUsers() {
    if (USE_DUMMY_DATA) {
      await delay(500);
      return dummyUsers
        .filter((u) => u.role === 'CUSTOMER')
        .map(({ password: _, ...user }) => user);
    }

    // Real API call
    // const response = await axiosInstance.get('/admin/users');
    // return response.data;
    throw new Error('API not implemented');
  },
};
