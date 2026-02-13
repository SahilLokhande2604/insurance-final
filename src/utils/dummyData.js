// Dummy Users for authentication (matching backend DataSeeder)
export const dummyUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@insurance.com',
    password: 'password', // Matches backend DataSeeder
    name: 'Admin User',
    role: 'ROLE_ADMIN', // Matches backend role format
    phone: '+1-555-0100',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@insurance.com',
    password: '123456', // Matches backend DataSeeder
    name: 'John Doe',
    role: 'ROLE_USER', // Matches backend role format
    phone: '+1-555-0101',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    username: 'jane',
    email: 'jane@insurance.com',
    password: 'jane123',
    name: 'Jane Smith',
    role: 'ROLE_USER',
    phone: '+1-555-0102',
    createdAt: '2024-02-01T00:00:00Z',
  },
];

// Dummy Policies
export const dummyPolicies = [
  {
    id: 'p1',
    name: 'Basic Health Cover',
    type: 'Health Insurance',
    description: 'Essential health coverage for individuals and families. Covers hospitalization, surgeries, and medical treatments.',
    coverageAmount: 100000,
    premium: 299,
    duration: '1 Year',
    features: ['Hospital Coverage', 'Surgery Coverage', 'Prescription Drugs', '24/7 Support'],
    isActive: true,
  },
  {
    id: 'p2',
    name: 'Premium Health Plan',
    type: 'Health Insurance',
    description: 'Comprehensive health coverage with additional benefits including dental and vision care.',
    coverageAmount: 500000,
    premium: 599,
    duration: '1 Year',
    features: ['Full Hospital Coverage', 'Dental Care', 'Vision Care', 'Mental Health', 'Maternity Coverage', 'International Coverage'],
    isActive: true,
  },
  {
    id: 'p3',
    name: 'Term Life Insurance',
    type: 'Life Insurance',
    description: 'Affordable life insurance providing financial security for your loved ones.',
    coverageAmount: 1000000,
    premium: 199,
    duration: '20 Years',
    features: ['Death Benefit', 'Accidental Death Rider', 'Terminal Illness Benefit', 'Convertible to Permanent'],
    isActive: true,
  },
  {
    id: 'p4',
    name: 'Auto Shield Plus',
    type: 'Auto Insurance',
    description: 'Comprehensive auto insurance covering collisions, theft, and third-party damages.',
    coverageAmount: 75000,
    premium: 149,
    duration: '1 Year',
    features: ['Collision Coverage', 'Theft Protection', 'Third Party Liability', 'Roadside Assistance', 'Rental Car Coverage'],
    isActive: true,
  },
  {
    id: 'p5',
    name: 'Home Guard',
    type: 'Home Insurance',
    description: 'Protect your home and belongings from fire, theft, and natural disasters.',
    coverageAmount: 500000,
    premium: 249,
    duration: '1 Year',
    features: ['Fire Damage', 'Theft Coverage', 'Natural Disasters', 'Personal Liability', 'Temporary Housing'],
    isActive: true,
  },
  {
    id: 'p6',
    name: 'Global Travel Shield',
    type: 'Travel Insurance',
    description: 'Travel worry-free with comprehensive international travel insurance.',
    coverageAmount: 50000,
    premium: 49,
    duration: '30 Days',
    features: ['Medical Emergency', 'Trip Cancellation', 'Lost Baggage', 'Flight Delays', 'Emergency Evacuation'],
    isActive: true,
  },
];

// Dummy User Policies (purchased policies)
export const dummyUserPolicies = [
  {
    id: 'up1',
    policyId: 'p1',
    policy: dummyPolicies[0],
    userId: '2',
    purchaseDate: '2024-06-01T00:00:00Z',
    expiryDate: '2025-06-01T00:00:00Z',
    paymentStatus: 'SUCCESS',
    isActive: true,
  },
  {
    id: 'up2',
    policyId: 'p4',
    policy: dummyPolicies[3],
    userId: '2',
    purchaseDate: '2024-07-15T00:00:00Z',
    expiryDate: '2025-07-15T00:00:00Z',
    paymentStatus: 'SUCCESS',
    isActive: true,
  },
];

// Dummy Claims
export const dummyClaims = [
  {
    id: 'c1',
    userPolicyId: 'up1',
    userId: '2',
    userName: 'John Doe',
    policyName: 'Basic Health Cover',
    description: 'Hospital admission for appendix surgery. Required emergency operation and 3-day hospital stay.',
    amount: 15000,
    status: 'PENDING',
    submittedAt: '2024-11-01T10:30:00Z',
  },
  {
    id: 'c2',
    userPolicyId: 'up2',
    userId: '2',
    userName: 'John Doe',
    policyName: 'Auto Shield Plus',
    description: 'Minor collision damage to front bumper. Repair estimate attached.',
    amount: 2500,
    status: 'APPROVED',
    submittedAt: '2024-10-15T14:20:00Z',
    processedAt: '2024-10-18T09:00:00Z',
  },
  {
    id: 'c3',
    userPolicyId: 'up1',
    userId: '3',
    userName: 'Jane Smith',
    policyName: 'Premium Health Plan',
    description: 'Annual health checkup and dental treatment.',
    amount: 800,
    status: 'REJECTED',
    submittedAt: '2024-09-20T11:00:00Z',
    processedAt: '2024-09-25T16:30:00Z',
  },
];

// Dummy Notifications
export const dummyNotifications = [
  {
    id: 'n1',
    userId: '2',
    title: 'Claim Approved',
    message: 'Your claim for Auto Shield Plus has been approved. Amount $2,500 will be transferred shortly.',
    type: 'success',
    isRead: false,
    createdAt: '2024-10-18T09:00:00Z',
  },
  {
    id: 'n2',
    userId: '2',
    title: 'Policy Renewal Reminder',
    message: 'Your Basic Health Cover policy will expire in 30 days. Renew now to continue coverage.',
    type: 'warning',
    isRead: true,
    createdAt: '2024-10-01T08:00:00Z',
  },
  {
    id: 'n3',
    userId: '2',
    title: 'Welcome to SecureLife!',
    message: 'Thank you for choosing SecureLife Insurance. Explore our policies to find the best coverage for you.',
    type: 'info',
    isRead: true,
    createdAt: '2024-01-15T00:00:00Z',
  },
];

// Dummy Payments
export const dummyPayments = [
  {
    id: 'pay1',
    userId: '2',
    policyId: 'p1',
    amount: 299,
    status: 'SUCCESS',
    transactionId: 'TXN1234567890',
    createdAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'pay2',
    userId: '2',
    policyId: 'p4',
    amount: 149,
    status: 'SUCCESS',
    transactionId: 'TXN1234567891',
    createdAt: '2024-07-15T00:00:00Z',
  },
];

// All registered customers for admin view
export const dummyCustomers = dummyUsers
  .filter(u => u.role === 'ROLE_USER')
  .map(({ password, ...user }) => user);
