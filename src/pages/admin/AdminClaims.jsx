import { useState, useEffect } from 'react';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  Filter,
} from 'lucide-react';
import { claimApi } from '../../api/claimApi';
import { policyApi } from '../../api/policyApi';
import { notificationApi } from '../../api/notificationApi';
import { cn } from '../../utils/cn';

export function AdminClaims() {
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [claimsData, policiesData] = await Promise.all([
          claimApi.getAllClaims(),
          policyApi.getAllPolicies(),
        ]);
        setClaims(claimsData);
        setPolicies(policiesData);
      } catch (error) {
        console.error('Failed to fetch claims or policies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProcessClaim = async (claimId, status) => {
  setProcessingId(claimId);
  try {
    const updatedClaim = await claimApi.processClaim(claimId, status);

    setClaims((prev) =>
      prev.map((c) => (c.claimId === claimId ? updatedClaim : c))
    );

    await notificationApi.sendNotification({
      userId: updatedClaim.customerId,
      title:
        status === "APPROVED"
          ? "Claim Approved! 🎉"
          : "Claim Rejected",
      message:
        status === "APPROVED"
          ? `Your claim for ${updatedClaim.policyName} has been approved. Amount $${updatedClaim.amount.toLocaleString()} will be processed.`
          : `Your claim for ${updatedClaim.policyName} has been rejected. Please contact support for more info.`,
      type: status === "APPROVED" ? "success" : "error",
    });
  } catch (error) {
    console.error("Failed to process claim:", error);
  } finally {
    setProcessingId(null);
  }
};


  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.customerUserName
        ||
      claim.policyId
        
       ;

    const matchesStatus =
      statusFilter === 'all' || claim.status === statusFilter;

    return matchesSearch && matchesStatus;
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
          Claims Management
        </h1>
        <p className="text-gray-500">
          Review and process insurance claims
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-700">
                {claims.filter((c) => c.status === 'PENDING').length}
              </p>
              <p className="text-sm text-yellow-600">
                Pending Review
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-700">
                {claims.filter((c) => c.status === 'APPROVED').length}
              </p>
              <p className="text-sm text-green-600">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center gap-3">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-700">
                {claims.filter((c) => c.status === 'REJECTED').length}
              </p>
              <p className="text-sm text-red-600">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by user or policy..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      {filteredClaims.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No claims found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredClaims.map((claim) => (
                  <tr key={claim.claimId} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                          {/* <span className="text-sm font-bold text-white">
                            {claim.customerUserName
                              .charAt(0)
                              .toUpperCase()}
                          </span> */}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {claim.customerUsername}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              claim.submittedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {(() => {
                            const policy = policies.find(p => p.id === claim.policyId);
                            return policy ? (policy.name || policy.PolicyName || policy.policyName) : claim.policyId;
                          })()}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                          {claim.description}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        ${claim.amount.toLocaleString()}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full',
                          claim.status === 'PENDING' &&
                            'bg-yellow-100 text-yellow-700',
                          claim.status === 'APPROVED' &&
                            'bg-green-100 text-green-700',
                          claim.status === 'REJECTED' &&
                            'bg-red-100 text-red-700'
                        )}
                      >
                        {claim.status === 'PENDING' && (
                          <Clock className="h-3 w-3" />
                        )}
                        {claim.status === 'APPROVED' && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        {claim.status === 'REJECTED' && (
                          <XCircle className="h-3 w-3" />
                        )}
                        {claim.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {claim.status === 'PENDING' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleProcessClaim(
                                claim.claimId,
                                'APPROVED'
                              )
                            }
                            disabled={
                              processingId === claim.id
                            }
                            className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
                          >
                            {processingId === claim.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <CheckCircle className="h-3 w-3" />
                            )}
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleProcessClaim(
                                claim.claimId,
                                'REJECTED'
                              )
                            }
                            disabled={
                              processingId === claim.id
                            }
                            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
                          >
                            <XCircle className="h-3 w-3" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Action Taken{' '}
                          {/* {new Date(
                            claim.processedAt
                          ).toLocaleDateString()} */}
                        </span>
                      )}
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
