import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { policyApi } from '../api/policyApi';
import { claimApi } from '../api/claimApi';
import { cn } from '../utils/cn';

export function Dashboard() {
  const { user } = useAuth();
  const [userPolicies, setUserPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const [policiesData, claimsData] = await Promise.all([
          policyApi.getUserPolicies(user.id),
          claimApi.getUserClaims(user.id),
        ]);
        setUserPolicies(policiesData);
        setClaims(claimsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = [
    {
      name: 'Active Policies',
      value: userPolicies.filter((p) => p.isActive).length,
      icon: Shield,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
    },
    {
      name: 'Pending Claims',
      value: claims.filter((c) => c.status === 'PENDING').length,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Approved Claims',
      value: claims.filter((c) => c.status === 'APPROVED').length,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Total Coverage',
      value: `$${userPolicies
        .reduce((sum, p) => sum + p.policy.coverageAmount, 0)
        .toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
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
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-indigo-100">
          Manage your insurance policies, track claims, and stay protected.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={cn('p-2 rounded-lg', stat.bgColor)}>
                <stat.icon className={cn('h-6 w-6 text-white', stat.color.replace('bg-', 'text-').replace('-500', '-600'))} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Policies */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">My Policies</h2>
            <Link
              to="/my-policies"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-6">
            {userPolicies.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No policies yet</p>
                <Link
                  to="/policies"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                >
                  Browse Policies <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userPolicies.slice(0, 3).map((up) => (
                  <div
                    key={up.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{up.policy.name}</p>
                      <p className="text-sm text-gray-500">{up.policy.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-indigo-600">${up.policy.premium}/mo</p>
                      <p className="text-xs text-gray-500">
                        Expires: {new Date(up.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Claims */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Claims</h2>
            <Link
              to="/claims"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-6">
            {claims.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No claims submitted</p>
              </div>
            ) : (
              <div className="space-y-4">
                {claims.slice(0, 3).map((claim) => (
                  <div
                    key={claim.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className={cn(
                      'h-10 w-10 rounded-lg flex items-center justify-center',
                      claim.status === 'PENDING' && 'bg-yellow-100',
                      claim.status === 'APPROVED' && 'bg-green-100',
                      claim.status === 'REJECTED' && 'bg-red-100',
                    )}>
                      {claim.status === 'PENDING' && <Clock className="h-5 w-5 text-yellow-600" />}
                      {claim.status === 'APPROVED' && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {claim.status === 'REJECTED' && <XCircle className="h-5 w-5 text-red-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{claim.policyName}</p>
                      <p className="text-sm text-gray-500 truncate">{claim.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${claim.amount.toLocaleString()}</p>
                      <span className={cn(
                        'inline-block px-2 py-0.5 text-xs font-medium rounded-full',
                        claim.status === 'PENDING' && 'bg-yellow-100 text-yellow-700',
                        claim.status === 'APPROVED' && 'bg-green-100 text-green-700',
                        claim.status === 'REJECTED' && 'bg-red-100 text-red-700',
                      )}>
                        {claim.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/policies"
            className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Shield className="h-8 w-8 text-indigo-600" />
            <div>
              <p className="font-medium text-gray-900">Browse Policies</p>
              <p className="text-sm text-gray-500">Find new coverage</p>
            </div>
          </Link>
          <Link
            to="/claims"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FileText className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Submit Claim</p>
              <p className="text-sm text-gray-500">File a new claim</p>
            </div>
          </Link>
          <Link
            to="/payments"
            className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">View Payments</p>
              <p className="text-sm text-gray-500">Payment history</p>
            </div>
          </Link>
          <Link
            to="/notifications"
            className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="font-medium text-gray-900">Notifications</p>
              <p className="text-sm text-gray-500">Stay updated</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
