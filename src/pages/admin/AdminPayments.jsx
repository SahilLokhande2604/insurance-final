import { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Search,
  TrendingUp,
} from 'lucide-react';
import { policyApi } from '../../api/policyApi';
import { dummyPolicies, dummyUsers } from '../../utils/dummyData';
import { cn } from '../../utils/cn';

export function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await policyApi.getAllPayments();
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPolicyName = (policyId) => {
    const policy = dummyPolicies.find((p) => p.id === policyId);
    return policy ? policy.name : 'Unknown Policy';
  };

  const getUserName = (userId) => {
    const user = dummyUsers.find((u) => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const totalRevenue = payments
    .filter((p) => p.status === 'SUCCESS')
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter((payment) => {
    const userName = getUserName(payment.userId).toLowerCase();
    const policyName = getPolicyName(payment.policyId).toLowerCase();
    return (
      userName.includes(searchTerm.toLowerCase()) ||
      policyName.includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Payment History
        </h1>
        <p className="text-gray-500">
          View all payment transactions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {payments.length}
              </p>
              <p className="text-sm text-gray-500">
                Total Transactions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Total Revenue
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {(
                  (payments.filter((p) => p.status === 'SUCCESS').length /
                    payments.length) *
                    100 || 0
                ).toFixed(0)}
                %
              </p>
              <p className="text-sm text-gray-500">
                Success Rate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by user, policy, or transaction ID..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No payments found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Policy
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-mono text-sm text-gray-900">
                        {payment.transactionId}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {getUserName(payment.userId)
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900">
                          {getUserName(payment.userId)}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {getPolicyName(payment.policyId)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        ${payment.amount.toLocaleString()}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full',
                          payment.status === 'SUCCESS' &&
                            'bg-green-100 text-green-700',
                          payment.status === 'FAILED' &&
                            'bg-red-100 text-red-700',
                          payment.status === 'PENDING' &&
                            'bg-yellow-100 text-yellow-700'
                        )}
                      >
                        {payment.status === 'SUCCESS' && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        {payment.status === 'FAILED' && (
                          <XCircle className="h-3 w-3" />
                        )}
                        {payment.status === 'PENDING' && (
                          <Clock className="h-3 w-3" />
                        )}
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
