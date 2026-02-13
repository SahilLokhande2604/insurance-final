import axiosInstance from './axiosInstance.js';
import { dummyUsers } from '../utils/dummyData.js';
import { getUserFromToken } from '../utils/jwtUtils.js';

const USE_DUMMY_DATA = true;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Use named export to match your import style
export const authApi = {
  async login(username, password) {
    if (USE_DUMMY_DATA) {
      await delay(800);
      
      const user = dummyUsers.find(
        u => (u.email === username || u.username === username) && u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      const userData = {
        username: user.username || user.email.split('@')[0],
        role: user.role === 'ADMIN' ? 'ROLE_ADMIN' : 'ROLE_USER',
        name: user.name,
        email: user.email,
      };
      
      return {
        user: userData,
        token: `dummy-jwt-token-${Date.now()}`,
      };
    }
    
    const response = await axiosInstance.post('/api/users/login', {
      username,
      password,
    });
    
    const token = response.data;
    
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid response from server');
    }
    
    const userInfo = getUserFromToken(token);
    
    if (!userInfo) {
      throw new Error('Invalid token received');
    }
    
    return {
      user: {
        username: userInfo.username,
        role: userInfo.role,
        name: userInfo.username,
      },
      token,
    };
  },

  async register(data) {
    if (USE_DUMMY_DATA) {
      await delay(800);
      
      const exists = dummyUsers.some(
        u => u.email === data.username || u.username === data.username
      );
      
      if (exists) {
        throw new Error('Username already exists');
      }
      
      return {
        success: true,
        message: 'User registered successfully',
      };
    }
    
    const response = await axiosInstance.post('/api/users/register', {
      username: data.username,
      password: data.password,
    });
    
    return {
      success: true,
      message: response.data || 'User registered successfully',
    };
  },

  async logout() {
    await delay(200);
    return;
  },

  async getAllUsers() {
    if (USE_DUMMY_DATA) {
      await delay(500);
      return dummyUsers
        .filter(u => u.role === 'CUSTOMER' || u.role === 'ROLE_USER')
        .map(({ password, ...user }) => user);
    }
    
    console.warn('getAllUsers: Backend endpoint not implemented yet');
    return [];
  },
};

// Also export as default for compatibility
export default authApi;