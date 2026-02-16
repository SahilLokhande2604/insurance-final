// import { useState, useEffect } from 'react';
// import {
//   CreditCard,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Loader2,
//   Search,
//   TrendingUp,
// } from 'lucide-react';
// import { policyApi } from '../../api/policyApi';
// import { dummyPolicies, dummyUsers } from '../../utils/dummyData';
// import { cn } from '../../utils/cn';

// export function AdminPayments() {
//   const [payments, setPayments] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [paymentsData, policiesData] = await Promise.all([
//           policyApi.getAllPayments(),
//           policyApi.getAllPolicies(),
//         ]);
//         setPayments(paymentsData);
//         setPolicies(policiesData);
//       } catch (error) {
//         console.error('Failed to fetch payments or policies:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const getPolicyName = (policyId) => {
//     const policy = policies.find((p) => p.id === policyId);
//     return policy ? (policy.name || policy.policyName || policy.PolicyName) : 'Unknown Policy';
//   };

//   const getUserName = (userId) => {
//     const user = dummyUsers.find((u) => u.id === userId);
//     return user ? user.name : 'Unknown User';
//   };

//   const totalRevenue = payments
//     .filter((p) => p.status === 'SUCCESS')
//     .reduce((sum, p) => sum + p.amount, 0);

//   const filteredPayments = payments.filter((payment) => {
//     const userName = payment.username.toLowerCase();
//     const policyName = getPolicyName(payment.policyId);
//     return (
//       userName.includes(searchTerm.toLowerCase()) ||
//       policyName.includes(searchTerm.toLowerCase()) ||
//       payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

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
//         <h1 className="text-2xl font-bold text-gray-900">
//           Payment History
//         </h1>
//         <p className="text-gray-500">
//           View all payment transactions
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//               <CreditCard className="h-6 w-6 text-indigo-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {payments.length}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Total Transactions
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
//               <TrendingUp className="h-6 w-6 text-green-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${totalRevenue.toLocaleString()}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Total Revenue
//               </p>
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
//                 {(
//                   (payments.filter((p) => p.status === 'SUCCESS').length /
//                     payments.length) *
//                     100 || 0
//                 ).toFixed(0)}
//                 %
//               </p>
//               <p className="text-sm text-gray-500">
//                 Success Rate
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by user, policy, or transaction ID..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//           />
//         </div>
//       </div>

//       {/* Payments Table */}
//       {filteredPayments.length === 0 ? (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//           <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             No payments found
//           </h3>
//           <p className="text-gray-500">
//             Try adjusting your search criteria
//           </p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-100">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Transaction
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Policy
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {filteredPayments.map((payment) => (
//                   <tr key={payment.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <p className="font-mono text-sm text-gray-900">
//                         {payment.orderId}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {new Date(payment.createdAt).toLocaleDateString()}
//                       </p>
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
//                           <span className="text-xs font-bold text-white">
//                             {payment.username
//                               .charAt(0)
//                               .toUpperCase()}
//                           </span>
//                         </div>
//                         <p className="font-medium text-gray-900">
//                           {payment.username}
//                         </p>
//                       </div>
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
//                         {payment.status === 'SUCCESS' && (
//                           <CheckCircle className="h-3 w-3" />
//                         )}
//                         {payment.status === 'FAILED' && (
//                           <XCircle className="h-3 w-3" />
//                         )}
//                         {payment.status === 'PENDING' && (
//                           <Clock className="h-3 w-3" />
//                         )}
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
  Search,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
// import { policyApi } from "../../api/policyApi";
import { cn } from "../../utils/cn";
import policyApi from "../../api/policyApi";

export function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsData, policiesData] = await Promise.all([
          policyApi.getAllPayments(),
          policyApi.getAllPolicies(),
        ]);
        setPayments(paymentsData);
        setPolicies(policiesData);
      } catch (error) {
        console.error("Payments fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getPolicyName = (policyId) => {
  const policy = policies.find((p) => p.id === policyId);
  return policy?.policyName || "Unknown";
};


  /* ================= FILTERING ================= */

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.orderId
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesPolicy =
        selectedPolicy === "ALL" ||
        payment.policyId === Number(selectedPolicy);

      const matchesStatus =
        selectedStatus === "ALL" ||
        payment.status === selectedStatus;

      return matchesSearch && matchesPolicy && matchesStatus;
    });
  }, [payments, searchTerm, selectedPolicy, selectedStatus]);

  /* ================= KPI STATS ================= */

  const totalRevenue = useMemo(() => {
    return filteredPayments
      .filter((p) => p.status === "SUCCESS")
      .reduce((sum, p) => sum + p.amount, 0);
  }, [filteredPayments]);

  const successCount = filteredPayments.filter(
    (p) => p.status === "SUCCESS"
  ).length;

  const failedCount = filteredPayments.filter(
    (p) => p.status === "FAILED"
  ).length;

  const pendingCount = filteredPayments.filter(
    (p) => p.status === "PENDING"
  ).length;

  const successRate =
    filteredPayments.length === 0
      ? 0
      : ((successCount / filteredPayments.length) * 100).toFixed(0);

  /* ================= CHART DATA ================= */

  const revenueByPolicy = policies.map((policy) => {
    const revenue = filteredPayments
      .filter(
        (p) =>
          p.policyId === policy.id && p.status === "SUCCESS"
      )
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      name: getPolicyName(policy.id),
      revenue,
    };
  });

  const statusChartData = [
    { name: "Success", value: successCount },
    { name: "Failed", value: failedCount },
    { name: "Pending", value: pendingCount },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-[#1A73E8] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1A73E8] to-[#34A853] rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Payment Analytics
        </h1>
        <p className="opacity-90">
          Monitor transactions, revenue trends & policy insights
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Total Transactions",
            value: filteredPayments.length,
            icon: CreditCard,
          },
          {
            name: "Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
          },
          {
            name: "Success Rate",
            value: `${successRate}%`,
            icon: CheckCircle,
          },
          {
            name: "Pending",
            value: pendingCount,
            icon: Clock,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <stat.icon className="h-7 w-7 text-[#1A73E8] mb-3" />
            <p className="text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by user or order ID..."
          className="border rounded-lg px-4 py-2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2"
          onChange={(e) => setSelectedPolicy(e.target.value)}
        >
          <option value="ALL">All Policies</option>
          {policies.map((p) => (
            <option key={p.id} value={p.id}>
              {p.policyName}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue by Policy */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h2 className="font-semibold mb-4">
            Revenue by Policy
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByPolicy}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#1A73E8"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h2 className="font-semibold mb-4">
            Payment Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                dataKey="value"
                outerRadius={90}
                label
              >
                <Cell fill="#22C55E" />
                <Cell fill="#EF4444" />
                <Cell fill="#FACC15" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* ================= PAYMENTS TABLE ================= */}

<div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
  
  {/* Table Header */}
  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
    <div>
      <h2 className="text-lg font-semibold text-gray-800">
        Payment Transactions
      </h2>
      <p className="text-sm text-gray-500">
        Detailed list of filtered transactions
      </p>
    </div>
    <span className="text-sm text-gray-500">
      {filteredPayments.length} Results
    </span>
  </div>

  {filteredPayments.length === 0 ? (
    <div className="p-12 text-center">
      <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">
        No payments found
      </h3>
      <p className="text-gray-500 text-sm">
        Try adjusting your filters or search criteria.
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        
        {/* Table Head */}
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Order ID</th>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Policy</th>
            <th className="px-6 py-4 text-left">Amount</th>
            <th className="px-6 py-4 text-left">Date</th>
            <th className="px-6 py-4 text-left">Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-100">
          {filteredPayments.map((payment) => (
            <tr
              key={payment.id}
              className="hover:bg-gray-50 transition duration-200"
            >
              {/* Order */}
              <td className="px-6 py-4 font-mono text-gray-800">
                {payment.orderId}
              </td>

              {/* Customer */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#1A73E8] flex items-center justify-center text-white text-xs font-bold">
                    {payment.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-900">
                    {payment.username}
                  </span>
                </div>
              </td>

              {/* Policy */}
              <td className="px-6 py-4 font-medium text-gray-800">
                {getPolicyName(payment.policyId)}
              </td>

              {/* Amount */}
              <td className="px-6 py-4 font-semibold text-gray-900">
                ₹{payment.amount.toLocaleString()}
              </td>

              {/* Date */}
              <td className="px-6 py-4 text-gray-500">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full",
                    payment.status === "SUCCESS" &&
                      "bg-green-100 text-green-700",
                    payment.status === "FAILED" &&
                      "bg-red-100 text-red-700",
                    payment.status === "PENDING" &&
                      "bg-yellow-100 text-yellow-700"
                  )}
                >
                  {payment.status === "SUCCESS" && (
                    <CheckCircle className="h-3 w-3" />
                  )}
                  {payment.status === "FAILED" && (
                    <XCircle className="h-3 w-3" />
                  )}
                  {payment.status === "PENDING" && (
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
  )}
</div>

    </div>
  );
}
