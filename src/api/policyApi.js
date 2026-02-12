import { dummyPolicies, dummyUserPolicies, dummyPayments } from '../utils/dummyData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const USE_DUMMY_DATA = true;

// In-memory storage for demo
let userPolicies = [...dummyUserPolicies];
let policies = [...dummyPolicies];
let payments = [...dummyPayments];

export const policyApi = {
  // Get all policies
  async getAllPolicies() {
    if (USE_DUMMY_DATA) {
      await delay(500);
      return policies.filter(p => p.isActive);
    }
    throw new Error('API not implemented');
  },

  // Get policy by ID
  async getPolicyById(id) {
    if (USE_DUMMY_DATA) {
      await delay(300);
      const policy = policies.find(p => p.id === id);
      if (!policy) throw new Error('Policy not found');
      return policy;
    }
    throw new Error('API not implemented');
  },

  // Create new policy (Admin)
  async createPolicy(data) {
    if (USE_DUMMY_DATA) {
      await delay(500);
      const newPolicy = {
        ...data,
        id: `p${Date.now()}`,
      };
      policies.push(newPolicy);
      return newPolicy;
    }
    throw new Error('API not implemented');
  },

  // Update policy (Admin)
  async updatePolicy(id, data) {
    if (USE_DUMMY_DATA) {
      await delay(500);
      const index = policies.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Policy not found');
      policies[index] = { ...policies[index], ...data };
      return policies[index];
    }
    throw new Error('API not implemented');
  },

  // Delete policy (Admin)
  async deletePolicy(id) {
    if (USE_DUMMY_DATA) {
      await delay(500);
      const index = policies.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Policy not found');
      policies[index].isActive = false;
    }
  },

  // Get user's purchased policies
  async getUserPolicies(userId) {
    if (USE_DUMMY_DATA) {
      await delay(500);
      return userPolicies.filter(up => up.userId === userId);
    }
    throw new Error('API not implemented');
  },

  // Purchase policy (simulates payment)
  async purchasePolicy(userId, policyId) {
    if (USE_DUMMY_DATA) {
      await delay(1500); // Simulate payment processing

      const policy = policies.find(p => p.id === policyId);
      if (!policy) throw new Error('Policy not found');

      // Random payment result (70% success rate)
      const paymentSuccess = Math.random() > 0.3;
      const paymentStatus = paymentSuccess ? 'SUCCESS' : 'FAILED';

      const payment = {
        id: `pay${Date.now()}`,
        userId,
        policyId,
        amount: policy.premium,
        status: paymentStatus,
        transactionId: `TXN${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      payments.push(payment);

      if (!paymentSuccess) {
        throw new Error('Payment failed. Please try again.');
      }

      const purchaseDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      const userPolicy = {
        id: `up${Date.now()}`,
        policyId,
        policy,
        userId,
        purchaseDate: purchaseDate.toISOString(),
        expiryDate: expiryDate.toISOString(),
        paymentStatus: 'SUCCESS',
        isActive: true,
      };
      userPolicies.push(userPolicy);

      return { userPolicy, payment };
    }
    throw new Error('API not implemented');
  },

  // Get all payments (Admin)
  async getAllPayments() {
    if (USE_DUMMY_DATA) {
      await delay(500);
      return payments;
    }
    throw new Error('API not implemented');
  },

  // Get user payments
  async getUserPayments(userId) {
    if (USE_DUMMY_DATA) {
      await delay(500);
      return payments.filter(p => p.userId === userId);
    }
    throw new Error('API not implemented');
  },
};
