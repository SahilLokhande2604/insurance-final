import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Shield,
  FileText,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { authApi } from '../../api/authApi';
import { policyApi } from '../../api/policyApi';
import { claimApi } from '../../api/claimApi';
import { cn } from '../../utils/cn';

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, policiesData, claimsData, paymentsData] =
          await Promise.all([
            authApi.getAllUsers(),
            policyApi.getAllPolicies(),
            claimApi.getAllClaims(),
            policyApi.getAllPayments(),
          ]);

        setUsers(usersData);
        setPolicies(policiesData);
        setClaims(claimsData);
        setPayments(paymentsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      name: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      link: '/admin/users',
    },
    {
      name: 'Active Policies',
      value: policies.length,
      icon: Shield,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      link: '/admin/policies',
    },
    {
      name: 'Pending Claims',
      value: claims.filter((c) => c.status === 'PENDING').length,
      icon: FileText,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      link: '/admin/claims',
    },
    {
      name: 'Total Revenue',
      value: `$${payments
        .filter((p) => p.status === 'SUCCESS')
        .reduce((sum, p) => sum + p.amount, 0)
        .toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      link: '/admin/payments',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard 🎛️</h1>
        <p className="text-indigo-100">
          Manage users, policies, claims, and monitor system performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn('p-2 rounded-lg', stat.bgColor)}>
                <stat.icon
                  className={cn(
                    'h-6 w-6',
                    stat.color.replace('bg-', 'text-').replace('-500', '-600')
                  )}
                />
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </Link>
        ))}
      </div>

      {/* Recent Claims */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Claims
          </h2>
          <Link
            to="/admin/claims"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="p-6 space-y-4">
          {claims.slice(0, 4).map((claim) => (
            <div
              key={claim.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div
                className={cn(
                  'h-10 w-10 rounded-lg flex items-center justify-center',
                  claim.status === 'PENDING' && 'bg-yellow-100',
                  claim.status === 'APPROVED' && 'bg-green-100',
                  claim.status === 'REJECTED' && 'bg-red-100'
                )}
              >
                {claim.status === 'PENDING' && (
                  <Clock className="h-5 w-5 text-yellow-600" />
                )}
                {claim.status === 'APPROVED' && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                {claim.status === 'REJECTED' && (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {claim.userName}
                </p>
                <p className="text-sm text-gray-500">
                  {claim.policyName}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${claim.amount.toLocaleString()}
                </p>
                <span
                  className={cn(
                    'inline-block px-2 py-0.5 text-xs font-medium rounded-full',
                    claim.status === 'PENDING' &&
                      'bg-yellow-100 text-yellow-700',
                    claim.status === 'APPROVED' &&
                      'bg-green-100 text-green-700',
                    claim.status === 'REJECTED' &&
                      'bg-red-100 text-red-700'
                  )}
                >
                  {claim.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
