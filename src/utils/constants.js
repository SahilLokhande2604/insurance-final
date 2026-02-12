// API Base URL - Change this when connecting to real backend
export const API_BASE_URL = 'http://localhost:8080/api';

// User Roles
export const ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
};

// Claim Status
export const CLAIM_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

// Payment Status
export const PAYMENT_STATUS = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
};

// Policy Types
export const POLICY_TYPES = {
  HEALTH: 'Health Insurance',
  LIFE: 'Life Insurance',
  AUTO: 'Auto Insurance',
  HOME: 'Home Insurance',
  TRAVEL: 'Travel Insurance',
};

// Storage Keys
export const STORAGE_KEYS = {
  USER: 'insurance_user',
  TOKEN: 'insurance_token',
};
