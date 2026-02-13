/**
 * JWT Utility functions
 * Decode JWT token to extract user information
 * Note: This only decodes, does NOT verify signature (verification is done by backend)
 */

/**
 * Decode a JWT token payload
 * @param {string} token - The JWT token string
 * @returns {object|null} - Decoded payload or null if invalid
 */
export function decodeToken(token) {
  try {
    if (!token) return null;
    
    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode the payload (second part)
    const payload = parts[1];
    
    // Base64Url decode
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Get username from JWT token
 * @param {string} token - The JWT token string
 * @returns {string|null} - Username or null
 */
export function getUsernameFromToken(token) {
  const payload = decodeToken(token);
  return payload?.sub || null; // 'sub' is the subject (username) in JWT
}

/**
 * Get role from JWT token
 * @param {string} token - The JWT token string
 * @returns {string|null} - Role or null
 */
export function getRoleFromToken(token) {
  const payload = decodeToken(token);
  return payload?.role || null;
}

/**
 * Check if token is expired
 * @param {string} token - The JWT token string
 * @returns {boolean} - True if expired
 */
export function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  const expirationTime = payload.exp * 1000;
  return Date.now() >= expirationTime;
}

/**
 * Get expiration time from token
 * @param {string} token - The JWT token string
 * @returns {Date|null} - Expiration date or null
 */
export function getTokenExpiration(token) {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return null;
  
  return new Date(payload.exp * 1000);
}

/**
 * Extract user info from JWT token
 * @param {string} token - The JWT token string
 * @returns {object|null} - User object or null
 */
export function getUserFromToken(token) {
  const payload = decodeToken(token);
  if (!payload) return null;
  
  return {
    username: payload.sub,
    role: payload.role,
    issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
    expiresAt: payload.exp ? new Date(payload.exp * 1000) : null,
  };
}
