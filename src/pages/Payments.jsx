// import { useState, useEffect } from 'react';
// import {
//   CreditCard,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Loader2,
//   Calendar,
//   Receipt,
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { policyApi } from '../api/policyApi';
// import { cn } from '../utils/cn';
// import { dummyPolicies } from '../utils/dummyData';

// export function Payments() {
//   const { user } = useAuth();
//   const [payments, setPayments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [policies, setPolicies] = useState([]);
//   const username=localStorage.getItem("username") || user?.username || "default-user";  
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!username) return;

//       try {
//         const policyData = await policyApi.getAllPolicies();
//         setPolicies(policyData);
//         console.log('Fetched policies:', policyData);
//         const data = await policyApi.getUserPayments(username);
//         setPayments(data);
//       } catch (error) {
//         console.error('Failed to fetch payments:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [username]);

//   // const getPolicyName = (policyId) => {
//   //   const policy = dummyPolicies.find((p) => p.id === policyId);
//   //   return policy?.name || 'Unknown Policy';
//   // };

//   const getPolicyName = (policyId) => {
//     console.log('Looking up policy name for ID:', policyId);
//     const policy = policies.find((p) => p.id === policyId);
//     return policy ? (policy.name || policy.policyName || policy.PolicyName) : 'Unknown Policy';
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'SUCCESS':
//         return <CheckCircle className="h-5 w-5 text-green-600" />;
//       case 'FAILED':
//         return <XCircle className="h-5 w-5 text-red-600" />;
//       case 'PENDING':
//         return <Clock className="h-5 w-5 text-yellow-600" />;
//       default:
//         return null;
//     }
//   };

//   const totalPaid = payments
//     .filter((p) => p.status === 'SUCCESS')
//     .reduce((sum, p) => sum + p.amount, 0);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
//         <p className="text-gray-500">View your payment transactions</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//               <CreditCard className="h-6 w-6 text-indigo-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
//               <p className="text-sm text-gray-500">Total Transactions</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${totalPaid.toLocaleString()}
//               </p>
//               <p className="text-sm text-gray-500">Total Paid</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
//               <Receipt className="h-6 w-6 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {payments.filter((p) => p.status === 'SUCCESS').length}
//               </p>
//               <p className="text-sm text-gray-500">Successful Payments</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payments Table */}
//       {payments.length === 0 ? (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//           <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             No payments yet
//           </h3>
//           <p className="text-gray-500">
//             Your payment history will appear here
//           </p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-100">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Transaction ID
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Policy
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {payments.map((payment) => (
//                   <tr key={payment.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <span className="font-mono text-sm text-gray-600">
//                         {payment.orderId}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                       <p className="font-medium text-gray-900">
//                         {getPolicyName(payment.policyId)}
//                       </p>
//                     </td>

//                     <td className="px-6 py-4">
//                       <p className="font-semibold text-gray-900">
//                         ${payment.amount.toLocaleString()}
//                       </p>
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-1 text-sm text-gray-500">
//                         <Calendar className="h-4 w-4" />
//                         {new Date(payment.createdAt).toLocaleDateString()}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4">
//                       <span
//                         className={cn(
//                           'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full',
//                           payment.status === 'SUCCESS' &&
//                             'bg-green-100 text-green-700',
//                           payment.status === 'FAILED' &&
//                             'bg-red-100 text-red-700',
//                           payment.status === 'PENDING' &&
//                             'bg-yellow-100 text-yellow-700'
//                         )}
//                       >
//                         {getStatusIcon(payment.status)}
//                         {payment.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useMemo } from "react";
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Calendar,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { policyApi } from "../api/policyApi";
import { cn } from "../utils/cn";

export function Payments() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [policies, setPolicies] = useState([]);

  const username =
    localStorage.getItem("username") || user?.username || null;

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      try {
        const policyData = await policyApi.getAllPolicies();
        setPolicies(policyData || []);

        const data = await policyApi.getUserPayments(username);
        setPayments(data || []);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const getPolicyName = (policyId) => {
    const policy = policies.find((p) => p.id === policyId);
    return policy
      ? policy.name || policy.policyName || policy.PolicyName
      : "Unknown Policy";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="h-4 w-4" />;
      case "FAILED":
        return <XCircle className="h-4 w-4" />;
      case "PENDING":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // ===============================
  // Derived Analytics
  // ===============================

  const totalPaid = useMemo(
    () =>
      payments
        .filter((p) => p.status === "SUCCESS")
        .reduce((sum, p) => sum + (p.amount || 0), 0),
    [payments]
  );

  const successCount = payments.filter((p) => p.status === "SUCCESS").length;
  const failedCount = payments.filter((p) => p.status === "FAILED").length;
  const pendingCount = payments.filter((p) => p.status === "PENDING").length;

  const totalTransactions = payments.length;

  const successRate =
    totalTransactions > 0
      ? Math.round((successCount / totalTransactions) * 100)
      : 0;

  // Monthly spending
  const monthlySpending = useMemo(() => {
    const now = new Date();
    return payments
      .filter(
        (p) =>
          p.status === "SUCCESS" &&
          new Date(p.createdAt).getMonth() === now.getMonth() &&
          new Date(p.createdAt).getFullYear() === now.getFullYear()
      )
      .reduce((sum, p) => sum + (p.amount || 0), 0);
  }, [payments]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
        <p className="text-gray-500">
          Track your transactions and monitor spending
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <CreditCard className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalTransactions}</p>
              <p className="text-sm text-gray-500">Transactions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                ₹{totalPaid.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Total Paid</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                ₹{monthlySpending.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Receipt className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{successRate}%</p>
              <p className="text-sm text-gray-500">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* STATUS ANALYTICS */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-6">Payment Status Overview</h2>

        {[
          { label: "Successful", value: successCount, color: "bg-green-500" },
          { label: "Pending", value: pendingCount, color: "bg-yellow-500" },
          { label: "Failed", value: failedCount, color: "bg-red-500" },
        ].map((item) => {
          const percentage =
            totalTransactions > 0
              ? Math.round((item.value / totalTransactions) * 100)
              : 0;

          return (
            <div key={item.label} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full">
                <div
                  className={cn("h-3 rounded-full", item.color)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLE */}
      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">
            No payments yet
          </h3>
          <p className="text-gray-500">
            Your payment transactions will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Policy
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">
                      {payment.orderId}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {getPolicyName(payment.policyId)}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      ₹{payment.amount?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full",
                          payment.status === "SUCCESS" &&
                            "bg-green-100 text-green-700",
                          payment.status === "FAILED" &&
                            "bg-red-100 text-red-700",
                          payment.status === "PENDING" &&
                            "bg-yellow-100 text-yellow-700"
                        )}
                      >
                        {getStatusIcon(payment.status)}
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
