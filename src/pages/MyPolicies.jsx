// // // import { useState, useEffect } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { Shield, Calendar, CheckCircle, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
// // // import { useAuth } from '../context/AuthContext.jsx';
// // // import { policyApi } from '../api/policyApi.js';
// // // import { cn } from '../utils/cn.js';
// // // import { getUserFromToken } from "../utils/jwtUtils";

// // // export function MyPolicies() {
// // //   const { user } = useAuth();
// // //   const [userPolicies, setUserPolicies] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   const token = localStorage.getItem("token");
// // // const userId = token ? getUserFromToken(token) : null;


// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const data = await policyApi.getMyPolicies();
// // //         setUserPolicies(data);
// // //       } catch (error) {
// // //         console.error('Failed to fetch policies:', error);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [userId]);
  
  
// // // // React.useEffect(() => {
// // // //   const fetchData = async () => {
// // // //     try {
// // // //       // Get userId first
// // // //       const userId = localStorage.getItem("userId") || 
// // // //                      await userApi.getUserIdByUsername(currentUser.username);

// // // //       // Fetch claims using userId
// // // //       const claims = await claimApi.getUserClaims(userId);
// // // //       setClaims(claims);

// // // //       // Fetch policies using userId
// // // //       const policies = await policyApi.getUserPolicies(userId);
// // // //       setPolicies(policies);

// // // //     } catch (error) {
// // // //       console.error("Failed to fetch data:", error);
// // // //     }
// // // //   };

// // // //   if(currentUser?.username) fetchData();
// // // // }, [currentUser]);


// // //   const isExpiringSoon = (expiryDate) => {
// // //     const expiry = new Date(expiryDate);
// // //     const now = new Date();
// // //     const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
// // //     return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex items-center justify-center h-64">
// // //         <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Header */}
// // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-gray-900">My Policies</h1>
// // //           <p className="text-gray-500">Manage your purchased insurance policies</p>
// // //         </div>
// // //         <Link
// // //           to="/policies"
// // //           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
// // //         >
// // //           Browse More Policies
// // //           <ArrowRight className="h-4 w-4" />
// // //         </Link>
// // //       </div>

// // //       {/* Policies List */}
// // //       {userPolicies.length === 0 ? (
// // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
// // //           <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// // //           <h3 className="text-lg font-semibold text-gray-900 mb-2">No policies yet</h3>
// // //           <p className="text-gray-500 mb-4">You haven't purchased any insurance policies.</p>
// // //           <Link
// // //             to="/policies"
// // //             className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
// // //           >
// // //             Browse Policies <ArrowRight className="h-4 w-4" />
// // //           </Link>
// // //         </div>
// // //       ) : (
// // //         <div className="space-y-4">
// // //           {userPolicies.map((up) => (
// // //             <div
// // //               key={up.id}
// // //               className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
// // //             >
// // //               <div className="flex flex-col lg:flex-row lg:items-center gap-6">
// // //                 {/* Policy Info */}
// // //                 <div className="flex items-start gap-4 flex-1">
// // //                   <div className="h-14 w-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
// // //                     <Shield className="h-7 w-7 text-indigo-600" />
// // //                   </div>
// // //                   <div className="flex-1 min-w-0">
// // //                     <div className="flex items-center gap-2 mb-1">
// // //                       <h3 className="font-semibold text-gray-900">{up.policy.name}</h3>
// // //                       {isExpiringSoon(up.expiryDate) && (
// // //                         <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
// // //                           <AlertTriangle className="h-3 w-3" />
// // //                           Expiring Soon
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                     <p className="text-sm text-gray-500 mb-2">{up.policy.type}</p>
// // //                     <p className="text-sm text-gray-600 line-clamp-2">{up.policy.description}</p>
// // //                   </div>
// // //                 </div>

// // //                 {/* Policy Details */}
// // //                 <div className="flex flex-wrap gap-6 lg:gap-8">
// // //                   <div>
// // //                     <p className="text-xs text-gray-500 mb-1">Coverage</p>
// // //                     <p className="font-semibold text-gray-900">
// // //                       ${up.policy.coverageAmount.toLocaleString()}
// // //                     </p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-xs text-gray-500 mb-1">Premium</p>
// // //                     <p className="font-semibold text-indigo-600">${up.policy.premium}/mo</p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
// // //                     <p className="font-medium text-gray-900 flex items-center gap-1">
// // //                       <Calendar className="h-4 w-4 text-gray-400" />
// // //                       {new Date(up.purchaseDate).toLocaleDateString()}
// // //                     </p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
// // //                     <p className={cn(
// // //                       'font-medium flex items-center gap-1',
// // //                       isExpiringSoon(up.expiryDate) ? 'text-yellow-600' : 'text-gray-900'
// // //                     )}>
// // //                       <Calendar className="h-4 w-4 text-gray-400" />
// // //                       {new Date(up.expiryDate).toLocaleDateString()}
// // //                     </p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-xs text-gray-500 mb-1">Status</p>
// // //                     <span className={cn(
// // //                       'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
// // //                       up.isActive
// // //                         ? 'bg-green-100 text-green-700'
// // //                         : 'bg-red-100 text-red-700'
// // //                     )}>
// // //                       <CheckCircle className="h-3 w-3" />
// // //                       {up.isActive ? 'Active' : 'Inactive'}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Features */}
// // //               <div className="mt-4 pt-4 border-t border-gray-100">
// // //                 <p className="text-xs text-gray-500 mb-2">Policy Features:</p>
// // //                 <div className="flex flex-wrap gap-2">
// // //                   {up.policy.features.map((feature, idx) => (
// // //                     <span
// // //                       key={idx}
// // //                       className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
// // //                     >
// // //                       {feature}
// // //                     </span>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default MyPolicies;

// // import { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import { Shield, Calendar, CheckCircle, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
// // import { policyApi } from "../api/policyApi.js";
// // import { cn } from "../utils/cn.js";

// // export function MyPolicies() {
// //   const [userPolicies, setUserPolicies] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   const username = localStorage.getItem("username"); // or however you store the logged-in username

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const data = await policyApi.getMyPolicies(username);
// //         setUserPolicies(data);
// //       } catch (error) {
// //         console.error("Failed to fetch policies:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     if (username) fetchData();
// //   }, [username]);

// //   const isExpiringSoon = (expiryDate) => {
// //     const expiry = new Date(expiryDate);
// //     const now = new Date();
// //     const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
// //     return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">My Policies</h1>
// //           <p className="text-gray-500">Manage your purchased insurance policies</p>
// //         </div>
// //         <Link
// //           to="/policies"
// //           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
// //         >
// //           Browse More Policies
// //           <ArrowRight className="h-4 w-4" />
// //         </Link>
// //       </div>

// //       {userPolicies.length === 0 ? (
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
// //           <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// //           <h3 className="text-lg font-semibold text-gray-900 mb-2">No policies yet</h3>
// //           <p className="text-gray-500 mb-4">You haven't purchased any insurance policies.</p>
// //           <Link
// //             to="/policies"
// //             className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
// //           >
// //             Browse Policies <ArrowRight className="h-4 w-4" />
// //           </Link>
// //         </div>
// //       ) : (
// //         <div className="space-y-4">
// //           {userPolicies.map((up) => (
// //             <div key={up.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //               <div className="flex flex-col lg:flex-row lg:items-center gap-6">
// //                 {/* Policy Info */}
// //                 <div className="flex items-start gap-4 flex-1">
// //                   <div className="h-14 w-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
// //                     <Shield className="h-7 w-7 text-indigo-600" />
// //                   </div>
// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex items-center gap-2 mb-1">
// //                       <h3 className="font-semibold text-gray-900">{up.policy.policyName}</h3>
// //                       {isExpiringSoon(up.expiryDate) && (
// //                         <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
// //                           <AlertTriangle className="h-3 w-3" />
// //                           Expiring Soon
// //                         </span>
// //                       )}
// //                     </div>
// //                     <p className="text-sm text-gray-500 mb-2">{up.policy.policyType}</p>
// //                     <p className="text-sm text-gray-600 line-clamp-2">
// //                       {up.policy.description || "No description available"}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Policy Details */}
// //                 <div className="flex flex-wrap gap-6 lg:gap-8">
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Coverage</p>
// //                     <p className="font-semibold text-gray-900">
// //                       ${up.policy.coverageAmount.toLocaleString()}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Premium</p>
// //                     <p className="font-semibold text-indigo-600">
// //                       ${up.policy.premiumAmount.toLocaleString()}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
// //                     <p className="font-medium text-gray-900 flex items-center gap-1">
// //                       <Calendar className="h-4 w-4 text-gray-400" />
// //                       {new Date(up.purchaseDate).toLocaleDateString()}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
// //                     <p
// //                       className={cn(
// //                         "font-medium flex items-center gap-1",
// //                         isExpiringSoon(up.expiryDate) ? "text-yellow-600" : "text-gray-900"
// //                       )}
// //                     >
// //                       <Calendar className="h-4 w-4 text-gray-400" />
// //                       {new Date(up.expiryDate).toLocaleDateString()}
// //                     </p>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Status</p>
// //                     <span
// //                       className={cn(
// //                         "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
// //                         up.status === "ACTIVE"
// //                           ? "bg-green-100 text-green-700"
// //                           : "bg-red-100 text-red-700"
// //                       )}
// //                     >
// //                       <CheckCircle className="h-3 w-3" />
// //                       {up.status}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default MyPolicies;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Shield, Calendar, CheckCircle, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
// import { policyApi } from "../api/policyApi.js";
// import { cn } from "../utils/cn.js";

// export function MyPolicies() {
//   const [userPolicies, setUserPolicies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const username = localStorage.getItem("username"); // make sure you set this on login

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!username) {
//         console.warn("No username found in localStorage");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const data = await policyApi.getMyPolicies(username);
//         console.log("Fetched policies:", data); // check console
//         setUserPolicies(data);
//       } catch (error) {
//         console.error("Failed to fetch policies:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [username]);

//   const isExpiringSoon = (expiryDate) => {
//     const expiry = new Date(expiryDate);
//     const now = new Date();
//     const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
//     return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
//       </div>
//     );
//   }

//   if (userPolicies.length === 0) {
//     return (
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//         <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">No policies yet</h3>
//         <p className="text-gray-500 mb-4">You haven't purchased any insurance policies.</p>
//         <Link
//           to="/policies"
//           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
//         >
//           Browse Policies <ArrowRight className="h-4 w-4" />
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {userPolicies.map((up) => (
//         <div key={up.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="flex flex-col lg:flex-row lg:items-center gap-6">
//             <div className="flex items-start gap-4 flex-1">
//               <div className="h-14 w-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <Shield className="h-7 w-7 text-indigo-600" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-semibold text-gray-900">{up.policy.policyName}</h3>
//                   {isExpiringSoon(up.expiryDate) && (
//                     <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
//                       <AlertTriangle className="h-3 w-3" />
//                       Expiring Soon
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500 mb-2">{up.policy.policyType}</p>
//                 <p className="text-sm text-gray-600">
//                   {up.policy.description || "No description available"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-6 lg:gap-8">
//               <div>
//                 <p className="text-xs text-gray-500 mb-1">Coverage</p>
//                 <p className="font-semibold text-gray-900">
//                   ${up.policy.coverageAmount.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 mb-1">Premium</p>
//                 <p className="font-semibold text-indigo-600">
//                   ${up.policy.premiumAmount.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
//                 <p className="font-medium text-gray-900 flex items-center gap-1">
//                   <Calendar className="h-4 w-4 text-gray-400" />
//                   {new Date(up.purchaseDate).toLocaleDateString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
//                 <p
//                   className={cn(
//                     "font-medium flex items-center gap-1",
//                     isExpiringSoon(up.expiryDate) ? "text-yellow-600" : "text-gray-900"
//                   )}
//                 >
//                   <Calendar className="h-4 w-4 text-gray-400" />
//                   {new Date(up.expiryDate).toLocaleDateString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 mb-1">Status</p>
//                 <span
//                   className={cn(
//                     "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
//                     up.status === "ACTIVE"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   )}
//                 >
//                   <CheckCircle className="h-3 w-3" />
//                   {up.status}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyPolicies;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Calendar,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { policyApi } from "../api/policyApi.js";
import { cn } from "../utils/cn.js";

export function MyPolicies() {
  const [userPolicies, setUserPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const username = localStorage.getItem("username"); // Ensure this is set on login

  useEffect(() => {
    const fetchData = async () => {
      if (!username) {
        console.warn("No username found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const data = await policyApi.getMyPolicies(username);
        console.log("Fetched policies:", data); // Debug
        setUserPolicies(data);
      } catch (error) {
        console.error("Failed to fetch policies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!userPolicies || userPolicies.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No policies yet</h3>
        <p className="text-gray-500 mb-4">
          You haven't purchased any insurance policies.
        </p>
        <Link
          to="/policies"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          Browse Policies <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {userPolicies.map((up, index) => (
        <div key={up.id ?? index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="h-14 w-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {up.policy?.policyName || "Unknown Policy"}
                  </h3>
                  {isExpiringSoon(up.expiryDate) && (
                    <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      <AlertTriangle className="h-3 w-3" />
                      Expiring Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {up.policy?.policyType || "-"}
                </p>
                <p className="text-sm text-gray-600">
                  {up.policy?.description || "No description available"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 lg:gap-8">
              <div>
                <p className="text-xs text-gray-500 mb-1">Coverage</p>
                <p className="font-semibold text-gray-900">
                  ${(up.policy?.coverageAmount ?? 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Premium</p>
                <p className="font-semibold text-indigo-600">
                  ${(up.policy?.premiumAmount ?? 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {up.purchaseDate
                    ? new Date(up.purchaseDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
                <p
                  className={cn(
                    "font-medium flex items-center gap-1",
                    isExpiringSoon(up.expiryDate) ? "text-yellow-600" : "text-gray-900"
                  )}
                >
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {up.expiryDate
                    ? new Date(up.expiryDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
                    up.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  )}
                >
                  <CheckCircle className="h-3 w-3" />
                  {up.status ?? "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPolicies;
