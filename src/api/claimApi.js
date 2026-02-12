import { dummyClaims } from '../utils/dummyData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const USE_DUMMY_DATA = true;

let claims = [...dummyClaims];

export const claimApi = {
  // Get all claims (Admin)
  async getAllClaims() {
    if (USE_DUMMY_DATA) {
      await delay(500);
      return claims;
    }
    throw new Error('API not implemented');
  },

  // Get user claims
  async getUserClaims(userId) {
    if (USE_DUMMY_DATA) {
      await delay(500);
      return claims.filter(c => c.userId === userId);
    }
    throw new Error('API not implemented');
  },

  // Get claim by ID
  async getClaimById(id) {
    if (USE_DUMMY_DATA) {
      await delay(300);
      const claim = claims.find(c => c.id === id);
      if (!claim) throw new Error('Claim not found');
      return claim;
    }
    throw new Error('API not implemented');
  },

  // Submit new claim
  async submitClaim(data) {
    if (USE_DUMMY_DATA) {
      await delay(800);
      const newClaim = {
        id: `c${Date.now()}`,
        ...data,
        status: 'PENDING',
        submittedAt: new Date().toISOString(),
      };
      claims.push(newClaim);
      return newClaim;
    }
    throw new Error('API not implemented');
  },

  // Process claim (Admin - Approve/Reject)
  async processClaim(id, status) {
    if (USE_DUMMY_DATA) {
      await delay(500);
      const index = claims.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Claim not found');

      claims[index] = {
        ...claims[index],
        status,
        processedAt: new Date().toISOString(),
      };
      return claims[index];
    }
    throw new Error('API not implemented');
  },
};
