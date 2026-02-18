// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Users,
//   Shield,
//   FileText,
//   CreditCard,
//   TrendingUp,
//   ArrowRight,
//   Clock,
//   CheckCircle,
//   XCircle,
// } from 'lucide-react';
// import { authApi } from '../../api/authApi';
// import { policyApi } from '../../api/policyApi';
// import { claimApi } from '../../api/claimApi';
// import { cn } from '../../utils/cn';

// export function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [claims, setClaims] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [usersData, policiesData, claimsData, paymentsData] =
//           await Promise.all([
//             authApi.getAllUsers(),
//             policyApi.getAllPolicies(),
//             claimApi.getAllClaims(),
//             policyApi.getAllPayments(),
//           ]);

//         setUsers(usersData);
//         setPolicies(policiesData);
//         setClaims(claimsData);
//         setPayments(paymentsData);
//       } catch (error) {
//         console.error('Failed to fetch dashboard data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const stats = [
//     {
//       name: 'Total Users',
//       value: users.length,
//       icon: Users,
//       color: 'bg-blue-500',
//       bgColor: 'bg-blue-50',
//       link: '/admin/users',
//     },
//     {
//       name: 'Active Policies',
//       value: policies.length,
//       icon: Shield,
//       color: 'bg-indigo-500',
//       bgColor: 'bg-indigo-50',
//       link: '/admin/policies',
//     },
//     {
//       name: 'Pending Claims',
//       value: claims.filter((c) => c.status === 'PENDING').length,
//       icon: FileText,
//       color: 'bg-yellow-500',
//       bgColor: 'bg-yellow-50',
//       link: '/admin/claims',
//     },
//     {
//       name: 'Total Revenue',
//       value: `$${payments
//         .filter((p) => p.status === 'SUCCESS')
//         .reduce((sum, p) => sum + p.amount, 0)
//         .toLocaleString()}`,
//       icon: TrendingUp,
//       color: 'bg-green-500',
//       bgColor: 'bg-green-50',
//       link: '/admin/payments',
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
//         <h1 className="text-2xl font-bold mb-2">Admin Dashboard 🎛️</h1>
//         <p className="text-indigo-100">
//           Manage users, policies, claims, and monitor system performance.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat) => (
//           <Link
//             key={stat.name}
//             to={stat.link}
//             className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={cn('p-2 rounded-lg', stat.bgColor)}>
//                 <stat.icon
//                   className={cn(
//                     'h-6 w-6',
//                     stat.color.replace('bg-', 'text-').replace('-500', '-600')
//                   )}
//                 />
//               </div>
//               <ArrowRight className="h-4 w-4 text-gray-400" />
//             </div>
//             <p className="text-2xl font-bold text-gray-900">
//               {stat.value}
//             </p>
//             <p className="text-sm text-gray-500">{stat.name}</p>
//           </Link>
//         ))}
//       </div>

//       {/* Recent Claims */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//         <div className="flex items-center justify-between p-6 border-b border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Recent Claims
//           </h2>
//           <Link
//             to="/admin/claims"
//             className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
//           >
//             View All <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="p-6 space-y-4">
//           {claims.slice(0, 4).map((claim) => (
//             <div
//               key={claim.id}
//               className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
//             >
//               <div
//                 className={cn(
//                   'h-10 w-10 rounded-lg flex items-center justify-center',
//                   claim.status === 'PENDING' && 'bg-yellow-100',
//                   claim.status === 'APPROVED' && 'bg-green-100',
//                   claim.status === 'REJECTED' && 'bg-red-100'
//                 )}
//               >
//                 {claim.status === 'PENDING' && (
//                   <Clock className="h-5 w-5 text-yellow-600" />
//                 )}
//                 {claim.status === 'APPROVED' && (
//                   <CheckCircle className="h-5 w-5 text-green-600" />
//                 )}
//                 {claim.status === 'REJECTED' && (
//                   <XCircle className="h-5 w-5 text-red-600" />
//                 )}
//               </div>

//               <div className="flex-1 min-w-0">
//                 <p className="font-medium text-gray-900 truncate">
//                   {claim.userName}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {claim.policyName}
//                 </p>
//               </div>

//               <div className="text-right">
//                 <p className="font-semibold text-gray-900">
//                   ${claim.amount.toLocaleString()}
//                 </p>
//                 <span
//                   className={cn(
//                     'inline-block px-2 py-0.5 text-xs font-medium rounded-full',
//                     claim.status === 'PENDING' &&
//                       'bg-yellow-100 text-yellow-700',
//                     claim.status === 'APPROVED' &&
//                       'bg-green-100 text-green-700',
//                     claim.status === 'REJECTED' &&
//                       'bg-red-100 text-red-700'
//                   )}
//                 >
//                   {claim.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Shield,
  FileText,
  TrendingUp,
  ArrowRight,
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
import { authApi } from "../../api/authApi";
import { policyApi } from "../../api/policyApi";
import { claimApi } from "../../api/claimApi";

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, p, c, pay] = await Promise.all([
          authApi.getAllUsers(),
          policyApi.getAllPolicies(),
          claimApi.getAllClaims(),
          policyApi.getAllPayments(),
        ]);
        setUsers(u);
        setPolicies(p);
        setClaims(c);
        setPayments(pay);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [revenueFilter, setRevenueFilter] = useState("monthly"); 
// options: daily | monthly | yearly

  const totalRevenue = useMemo(() => {
    return payments
      .filter((p) => p.status === "SUCCESS")
      .reduce((sum, p) => sum + p.amount, 0);
  }, [payments]);

  const claimsChartData = [
    {
      name: "Pending",
      value: claims.filter((c) => c.status === "PENDING").length,
    },
    {
      name: "Approved",
      value: claims.filter((c) => c.status === "APPROVED").length,
    },
    {
      name: "Rejected",
      value: claims.filter((c) => c.status === "REJECTED").length,
    },
  ];

  // const revenueChartData = payments
  //   .filter((p) => p.status === "SUCCESS")
  //   .slice(0, 6)
  //   .map((p, i) => ({
  //     name: `P${i + 1}`,
  //     revenue: p.amount,
  //   }));
const revenueChartData = useMemo(() => {
  const groupedRevenue = {};

  payments
    .filter((p) => p.status === "SUCCESS")
    .forEach((p) => {
      const date = new Date(p.paymentDate || p.createdAt);

      let key;

      if (revenueFilter === "daily") {
        key = date.toLocaleDateString(); // 16/2/2026
      }

      if (revenueFilter === "monthly") {
        key = date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }); // Feb 2026
      }

      if (revenueFilter === "yearly") {
        key = date.getFullYear().toString(); // 2026
      }

      if (!groupedRevenue[key]) {
        groupedRevenue[key] = 0;
      }

      groupedRevenue[key] += p.amount;
    });

  return Object.keys(groupedRevenue)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((key) => ({
      name: key,
      revenue: groupedRevenue[key],
    }));
}, [payments, revenueFilter]);



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-[#1A73E8] border-t-transparent rounded-full" />
      </div>
    );
  }

  // useEffect(() => {
  // const fetchAdminNotifications = async () => {
  //   const data = await notificationApi.getAdminNotifications();
  //   setNotifications(data);
  // };

  // fetchAdminNotifications();
// }, []);


  return (
    // <div className="space-y-8">
<div className="max-w-7xl mx-auto space-y-8">
  
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1A73E8] to-[#34A853] rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Admin Analytics Dashboard</h1>
        <p className="opacity-90">
          Monitor performance, revenue, claims, and customer growth.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Total Users",
            value: users.length,
            icon: Users,
            link: "/admin/users",
          },
          {
            name: "Policies",
            value: policies.length,
            icon: Shield,
            link: "/admin/policies",
          },
          {
            name: "Pending Claims",
            value: claims.filter((c) => c.status === "PENDING").length,
            icon: FileText,
            link: "/admin/claims",
          },
          {
            name: "Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
            link: "/admin/payments",
          },
        ].map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-7 w-7 text-[#1A73E8]" />
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </Link>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Revenue Overview
          </h2>
          <div className="flex justify-between items-center mb-4">
  <h2 className="text-lg font-semibold text-gray-800">
    Revenue Overview
  </h2>

  <select
    value={revenueFilter}
    onChange={(e) => setRevenueFilter(e.target.value)}
    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
  >
    <option value="daily">Daily</option>
    <option value="monthly">Monthly</option>
    <option value="yearly">Yearly</option>
  </select>
</div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#1A73E8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Claims Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Claims Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={claimsChartData}
                dataKey="value"
                outerRadius={80}
                label
              >
                <Cell fill="#FACC15" />
                <Cell fill="#22C55E" />
                <Cell fill="#EF4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
