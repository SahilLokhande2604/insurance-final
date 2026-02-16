// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Shield,
//   FileText,
//   Clock,
//   CheckCircle,
//   XCircle,
//   ArrowRight,
//   TrendingUp,
//   AlertCircle,
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { policyApi } from '../api/policyApi';
// import { claimApi } from '../api/claimApi';
// import { cn } from '../utils/cn';
// import { getUserFromToken } from "../utils/jwtUtils";

// export function Dashboard() {
//   const { user } = useAuth();
//   const [userPolicies, setUserPolicies] = useState([]);
//   const [claims, setClaims] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

// const token = localStorage.getItem("token");
// const loggedInUser = token ? getUserFromToken(token) : null;

//   useEffect(() => {
//   const fetchData = async () => {
//     if (!loggedInUser) return;

//     try {
//       const [policiesData, claimsData] = await Promise.all([
//         policyApi.getMyPolicies(loggedInUser.username),
//         claimApi.getUserClaims(loggedInUser.username),
//       ]);

//       setUserPolicies(policiesData);
//       setClaims(claimsData);
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchData();
// }, [loggedInUser]);


//   const stats = [
//   {
//     name: 'Active Policies',
//     value: userPolicies.filter((p) => p.status === 'ACTIVE').length,
//     icon: Shield,
//     color: 'bg-indigo-500',
//     bgColor: 'bg-indigo-50',
//   },
//   {
//     name: 'Pending Claims',
//     value: claims.filter((c) => c.status === 'PENDING').length,
//     icon: Clock,
//     color: 'bg-yellow-500',
//     bgColor: 'bg-yellow-50',
//   },
//   {
//     name: 'Approved Claims',
//     value: claims.filter((c) => c.status === 'APPROVED').length,
//     icon: CheckCircle,
//     color: 'bg-green-500',
//     bgColor: 'bg-green-50',
//   },
//   {
//     name: 'Total Coverage',
//     value: `₹${userPolicies
//       .reduce((sum, p) => sum + p.policy.coverageAmount, 0)
//       .toLocaleString()}`,
//     icon: TrendingUp,
//     color: 'bg-purple-500',
//     bgColor: 'bg-purple-50',
//   },
// ];


//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
//       </div>
//     );
//   }
//   if (!loggedInUser) {
//   return (
//     <div className="text-center py-20">
//       <p className="text-gray-500">No user logged in.</p>
//     </div>
//   );
// }


//   return (
//     <div className="space-y-6">
//        {/* Welcome Header */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
//         <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
//         <p className="text-indigo-100">
//           Manage your insurance policies, track claims, and stay protected.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat) => (
//           <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between mb-4">
//               <div className={cn('p-2 rounded-lg', stat.bgColor)}>
//                 <stat.icon className={cn('h-6 w-6 text-white', stat.color.replace('bg-', 'text-').replace('-500', '-600'))} />
//               </div>
//             </div>
//             <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//             <p className="text-sm text-gray-500">{stat.name}</p>
//           </div>
//         ))}
//       </div>

//       {/* Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* My Policies */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900">My Policies</h2>
//             <Link
//               to="/my-policies"
//               className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
//             >
//               View All <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//           <div className="p-6">
//             {userPolicies.length === 0 ? (
//               <div className="text-center py-8">
//                 <Shield className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500 mb-4">No policies yet</p>
//                 <Link
//                   to="/policies"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
//                 >
//                   Browse Policies <ArrowRight className="h-4 w-4" />
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {userPolicies.slice(0, 3).map((up) => (
//                   <div
//                     key={up.id}
//                     className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
//                   >
//                     <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                       <Shield className="h-5 w-5 text-indigo-600" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-gray-900 truncate">{up.policy.PolicyName}</p>
//                       <p className="text-sm text-gray-500">{up.policy.policyType}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold text-indigo-600">${up.policy.premiumAmount}/mo</p>
//                       <p className="text-xs text-gray-500">
//                         Expires: {new Date(up.expiryDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Recent Claims */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900">Recent Claims</h2>
//             <Link
//               to="/claims"
//               className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
//             >
//               View All <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//           <div className="p-6">
//             {claims.length === 0 ? (
//               <div className="text-center py-8">
//                 <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500">No claims submitted</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {claims.slice(0, 3).map((claim) => (
//                   <div
//                     key={claim.id}
//                     className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
//                   >
//                     <div className={cn(
//                       'h-10 w-10 rounded-lg flex items-center justify-center',
//                       claim.status === 'PENDING' && 'bg-yellow-100',
//                       claim.status === 'APPROVED' && 'bg-green-100',
//                       claim.status === 'REJECTED' && 'bg-red-100',
//                     )}>
//                       {claim.status === 'PENDING' && <Clock className="h-5 w-5 text-yellow-600" />}
//                       {claim.status === 'APPROVED' && <CheckCircle className="h-5 w-5 text-green-600" />}
//                       {claim.status === 'REJECTED' && <XCircle className="h-5 w-5 text-red-600" />}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-gray-900 truncate">{claim.claimType}</p>
//                       <p className="text-sm text-gray-500 truncate">{claim.description}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold text-gray-900">${claim.amount.toLocaleString()}</p>
//                       <span className={cn(
//                         'inline-block px-2 py-0.5 text-xs font-medium rounded-full',
//                         claim.status === 'PENDING' && 'bg-yellow-100 text-yellow-700',
//                         claim.status === 'APPROVED' && 'bg-green-100 text-green-700',
//                         claim.status === 'REJECTED' && 'bg-red-100 text-red-700',
//                       )}>
//                         {claim.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <Link
//             to="/policies"
//             className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
//           >
//             <Shield className="h-8 w-8 text-indigo-600" />
//             <div>
//               <p className="font-medium text-gray-900">Browse Policies</p>
//               <p className="text-sm text-gray-500">Find new coverage</p>
//             </div>
//           </Link>
//           <Link
//             to="/claims"
//             className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
//           >
//             <FileText className="h-8 w-8 text-green-600" />
//             <div>
//               <p className="font-medium text-gray-900">Submit Claim</p>
//               <p className="text-sm text-gray-500">File a new claim</p>
//             </div>
//           </Link>
//           <Link
//             to="/payments"
//             className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
//           >
//             <TrendingUp className="h-8 w-8 text-purple-600" />
//             <div>
//               <p className="font-medium text-gray-900">View Payments</p>
//               <p className="text-sm text-gray-500">Payment history</p>
//             </div>
//           </Link>
//           <Link
//             to="/notifications"
//             className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
//           >
//             <AlertCircle className="h-8 w-8 text-yellow-600" />
//             <div>
//               <p className="font-medium text-gray-900">Notifications</p>
//               <p className="text-sm text-gray-500">Stay updated</p>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { policyApi } from "../api/policyApi";
import { claimApi } from "../api/claimApi";
import { cn } from "../utils/cn";
import { getUserFromToken } from "../utils/jwtUtils";

export function Dashboard() {
  const { user } = useAuth();
  const [userPolicies, setUserPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const loggedInUser = token ? getUserFromToken(token) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedInUser) return;

      try {
        const [policiesData, claimsData] = await Promise.all([
          policyApi.getMyPolicies(loggedInUser.username),
          claimApi.getUserClaims(loggedInUser.username),
        ]);

        setUserPolicies(policiesData || []);
        setClaims(claimsData || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [loggedInUser]);

  // =========================
  // Derived Stats
  // =========================

  const totalCoverage = useMemo(
    () =>
      userPolicies.reduce(
        (sum, p) => sum + (p.policy?.coverageAmount || 0),
        0
      ),
    [userPolicies]
  );

  const totalClaimAmount = useMemo(
    () => claims.reduce((sum, c) => sum + (c.amount || 0), 0),
    [claims]
  );

  const approvedClaims = claims.filter((c) => c.status === "APPROVED").length;
  const pendingClaims = claims.filter((c) => c.status === "PENDING").length;
  const rejectedClaims = claims.filter((c) => c.status === "REJECTED").length;

  const totalClaims = claims.length;

  const approvalRate =
    totalClaims > 0 ? Math.round((approvedClaims / totalClaims) * 100) : 0;

  const coverageUtilization =
    totalCoverage > 0
      ? Math.min(Math.round((totalClaimAmount / totalCoverage) * 100), 100)
      : 0;

  const stats = [
    {
      name: "Active Policies",
      value: userPolicies.filter((p) => p.status === "ACTIVE").length,
      icon: Shield,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      name: "Pending Claims",
      value: pendingClaims,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      name: "Approved Claims",
      value: approvedClaims,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "Total Coverage",
      value: `₹${totalCoverage.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!loggedInUser) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || loggedInUser.username}! 👋
        </h1>
        <p className="text-indigo-100">
          Monitor your policies, track claims, and manage coverage effortlessly.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Claim Status Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Claim Status Overview</h2>

          <div className="space-y-4">
            {[
              { label: "Approved", value: approvedClaims, color: "bg-green-500" },
              { label: "Pending", value: pendingClaims, color: "bg-yellow-500" },
              { label: "Rejected", value: rejectedClaims, color: "bg-red-500" },
            ].map((item) => {
              const percentage =
                totalClaims > 0
                  ? Math.round((item.value / totalClaims) * 100)
                  : 0;

              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={cn("h-3 rounded-full", item.color)}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Approval Rate: <span className="font-semibold">{approvalRate}%</span>
          </p>
        </div>

        {/* Coverage Utilization */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Coverage Utilization</h2>

          <div className="text-4xl font-bold text-indigo-600 mb-2">
            {coverageUtilization}%
          </div>

          <div className="w-full bg-gray-100 rounded-full h-4 mb-4">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${coverageUtilization}%` }}
            />
          </div>

          <p className="text-sm text-gray-500">
            ₹{totalClaimAmount.toLocaleString()} claimed out of ₹
            {totalCoverage.toLocaleString()}
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/policies"
            className="group p-5 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition"
          >
            <Shield className="h-8 w-8 text-indigo-600 mb-3" />
            <p className="font-medium">Browse Policies</p>
          </Link>

          <Link
            to="/claims"
            className="group p-5 rounded-xl bg-green-50 hover:bg-green-100 transition"
          >
            <FileText className="h-8 w-8 text-green-600 mb-3" />
            <p className="font-medium">Submit Claim</p>
          </Link>

          <Link
            to="/payments"
            className="group p-5 rounded-xl bg-purple-50 hover:bg-purple-100 transition"
          >
            <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
            <p className="font-medium">View Payments</p>
          </Link>

          <Link
            to="/notifications"
            className="group p-5 rounded-xl bg-yellow-50 hover:bg-yellow-100 transition"
          >
            <AlertCircle className="h-8 w-8 text-yellow-600 mb-3" />
            <p className="font-medium">Notifications</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

