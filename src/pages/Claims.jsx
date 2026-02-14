// // // // import { useState, useEffect } from 'react';
// // // // import {
// // // //   FileText,
// // // //   Clock,
// // // //   CheckCircle,
// // // //   XCircle,
// // // //   Plus,
// // // //   Loader2,
// // // //   Calendar,
// // // //   DollarSign,
// // // // } from 'lucide-react';
// // // // import { useAuth } from '../context/AuthContext';
// // // // import { useNotifications } from '../context/NotificationContext';
// // // // import { claimApi } from '../api/claimApi';
// // // // import { policyApi } from '../api/policyApi';
// // // // import { Modal } from '../components/Modal';
// // // // import { cn } from '../utils/cn';

// // // // export function Claims() {
// // // //   const { user } = useAuth();
// // // //   const { addNotification } = useNotifications();

// // // //   const [claims, setClaims] = useState([]);
// // // //   const [userPolicies, setUserPolicies] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [showClaimForm, setShowClaimForm] = useState(false);
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   const [formData, setFormData] = useState({
// // // //     userPolicyId: '',
// // // //     description: '',
// // // //     amount: '',
// // // //   });

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       if (!user) return;

// // // //       try {
// // // //         const [claimsData, policiesData] = await Promise.all([
// // // //           claimApi.getUserClaims(user.id),
// // // //           policyApi.getUserPolicies(user.id),
// // // //         ]);
// // // //         setClaims(claimsData);
// // // //         setUserPolicies(policiesData);
// // // //       } catch (error) {
// // // //         console.error('Failed to fetch data:', error);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [user]);

// // // //   const handleSubmitClaim = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!user) return;

// // // //     const selectedPolicy = userPolicies.find(
// // // //       (up) => up.id === formData.userPolicyId
// // // //     );
// // // //     if (!selectedPolicy) return;

// // // //     setIsSubmitting(true);
// // // //     try {
// // // //       const newClaim = await claimApi.submitClaim({
// // // //         userPolicyId: formData.userPolicyId,
// // // //         userId: user.id,
// // // //         userName: user.name,
// // // //         policyName: selectedPolicy.policy.name,
// // // //         description: formData.description,
// // // //         amount: parseFloat(formData.amount),
// // // //       });

// // // //       setClaims((prev) => [newClaim, ...prev]);

// // // //       await addNotification({
// // // //         title: 'Claim Submitted',
// // // //         message: `Your claim for ${selectedPolicy.policy.name} has been submitted and is pending review.`,
// // // //         type: 'info',
// // // //       });

// // // //       setShowClaimForm(false);
// // // //       setFormData({ userPolicyId: '', description: '', amount: '' });
// // // //     } catch (error) {
// // // //       console.error('Failed to submit claim:', error);
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };

// // // //   const getStatusIcon = (status) => {
// // // //     switch (status) {
// // // //       case 'PENDING':
// // // //         return <Clock className="h-5 w-5 text-yellow-600" />;
// // // //       case 'APPROVED':
// // // //         return <CheckCircle className="h-5 w-5 text-green-600" />;
// // // //       case 'REJECTED':
// // // //         return <XCircle className="h-5 w-5 text-red-600" />;
// // // //       default:
// // // //         return null;
// // // //     }
// // // //   };

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center h-64">
// // // //         <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       {/* Header */}
// // // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //         <div>
// // // //           <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
// // // //           <p className="text-gray-500">
// // // //             Submit and track your insurance claims
// // // //           </p>
// // // //         </div>
// // // //         <button
// // // //           onClick={() => setShowClaimForm(true)}
// // // //           disabled={userPolicies.length === 0}
// // // //           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
// // // //         >
// // // //           <Plus className="h-4 w-4" />
// // // //           Submit New Claim
// // // //         </button>
// // // //       </div>

// // // //       {/* Stats */}
// // // //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // // //         <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
// // // //           <div className="flex items-center gap-3">
// // // //             <Clock className="h-8 w-8 text-yellow-600" />
// // // //             <div>
// // // //               <p className="text-2xl font-bold text-yellow-700">
// // // //                 {claims.filter((c) => c.status === 'PENDING').length}
// // // //               </p>
// // // //               <p className="text-sm text-yellow-600">Pending</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="bg-green-50 rounded-xl p-4 border border-green-100">
// // // //           <div className="flex items-center gap-3">
// // // //             <CheckCircle className="h-8 w-8 text-green-600" />
// // // //             <div>
// // // //               <p className="text-2xl font-bold text-green-700">
// // // //                 {claims.filter((c) => c.status === 'APPROVED').length}
// // // //               </p>
// // // //               <p className="text-sm text-green-600">Approved</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="bg-red-50 rounded-xl p-4 border border-red-100">
// // // //           <div className="flex items-center gap-3">
// // // //             <XCircle className="h-8 w-8 text-red-600" />
// // // //             <div>
// // // //               <p className="text-2xl font-bold text-red-700">
// // // //                 {claims.filter((c) => c.status === 'REJECTED').length}
// // // //               </p>
// // // //               <p className="text-sm text-red-600">Rejected</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Claims List */}
// // // //       {claims.length === 0 ? (
// // // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
// // // //           <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// // // //           <h3 className="text-lg font-semibold text-gray-900 mb-2">
// // // //             No claims yet
// // // //           </h3>
// // // //           <p className="text-gray-500 mb-4">
// // // //             {userPolicies.length === 0
// // // //               ? 'Purchase a policy to submit claims'
// // // //               : 'Submit your first claim when needed'}
// // // //           </p>
// // // //         </div>
// // // //       ) : (
// // // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full">
// // // //               <thead className="bg-gray-50 border-b border-gray-100">
// // // //                 <tr>
// // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// // // //                     Claim Details
// // // //                   </th>
// // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// // // //                     Amount
// // // //                   </th>
// // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// // // //                     Submitted
// // // //                   </th>
// // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// // // //                     Status
// // // //                   </th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-gray-100">
// // // //                 {claims.map((claim) => (
// // // //                   <tr key={claim.id} className="hover:bg-gray-50">
// // // //                     <td className="px-6 py-4">
// // // //                       <p className="font-medium text-gray-900">
// // // //                         {claim.policyName}
// // // //                       </p>
// // // //                       <p className="text-sm text-gray-500 line-clamp-1">
// // // //                         {claim.description}
// // // //                       </p>
// // // //                     </td>

// // // //                     <td className="px-6 py-4 font-semibold text-gray-900">
// // // //                       <div className="flex items-center gap-1">
// // // //                         <DollarSign className="h-4 w-4 text-gray-400" />
// // // //                         {claim.amount.toLocaleString()}
// // // //                       </div>
// // // //                     </td>

// // // //                     <td className="px-6 py-4 text-sm text-gray-500">
// // // //                       <div className="flex items-center gap-1">
// // // //                         <Calendar className="h-4 w-4" />
// // // //                         {new Date(claim.submittedAt).toLocaleDateString()}
// // // //                       </div>
// // // //                     </td>

// // // //                     <td className="px-6 py-4">
// // // //                       <span
// // // //                         className={cn(
// // // //                           'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full',
// // // //                           claim.status === 'PENDING' &&
// // // //                             'bg-yellow-100 text-yellow-700',
// // // //                           claim.status === 'APPROVED' &&
// // // //                             'bg-green-100 text-green-700',
// // // //                           claim.status === 'REJECTED' &&
// // // //                             'bg-red-100 text-red-700'
// // // //                         )}
// // // //                       >
// // // //                         {getStatusIcon(claim.status)}
// // // //                         {claim.status}
// // // //                       </span>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Claim Form Modal */}
// // // //       <Modal
// // // //         isOpen={showClaimForm}
// // // //         onClose={() => setShowClaimForm(false)}
// // // //         title="Submit New Claim"
// // // //         size="lg"
// // // //       >
// // // //         <form onSubmit={handleSubmitClaim} className="space-y-4">
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //               Select Policy
// // // //             </label>
// // // //             <select
// // // //               value={formData.userPolicyId}
// // // //               onChange={(e) =>
// // // //                 setFormData({
// // // //                   ...formData,
// // // //                   userPolicyId: e.target.value,
// // // //                 })
// // // //               }
// // // //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
// // // //               required
// // // //             >
// // // //               <option value="">Choose a policy</option>
// // // //               {userPolicies.map((up) => (
// // // //                 <option key={up.id} value={up.id}>
// // // //                   {up.policy.name} - {up.policy.type}
// // // //                 </option>
// // // //               ))}
// // // //             </select>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //               Claim Amount ($)
// // // //             </label>
// // // //             <input
// // // //               type="number"
// // // //               value={formData.amount}
// // // //               onChange={(e) =>
// // // //                 setFormData({ ...formData, amount: e.target.value })
// // // //               }
// // // //               min="1"
// // // //               placeholder="Enter claim amount"
// // // //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// // // //               required
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // // //               Description
// // // //             </label>
// // // //             <textarea
// // // //               rows={4}
// // // //               value={formData.description}
// // // //               onChange={(e) =>
// // // //                 setFormData({
// // // //                   ...formData,
// // // //                   description: e.target.value,
// // // //                 })
// // // //               }
// // // //               placeholder="Describe the reason for your claim..."
// // // //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
// // // //               required
// // // //             />
// // // //           </div>

// // // //           <div className="flex gap-3 pt-4">
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => setShowClaimForm(false)}
// // // //               className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
// // // //             >
// // // //               Cancel
// // // //             </button>

// // // //             <button
// // // //               type="submit"
// // // //               disabled={isSubmitting}
// // // //               className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
// // // //             >
// // // //               {isSubmitting ? (
// // // //                 <>
// // // //                   <Loader2 className="h-4 w-4 animate-spin" />
// // // //                   Submitting...
// // // //                 </>
// // // //               ) : (
// // // //                 'Submit Claim'
// // // //               )}
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </Modal>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState, useEffect } from 'react';
// // // import {
// // //   FileText,
// // //   Clock,
// // //   CheckCircle,
// // //   XCircle,
// // //   Plus,
// // //   Loader2,
// // //   Calendar,
// // //   DollarSign,
// // // } from 'lucide-react';
// // // import { useAuth } from '../context/AuthContext';
// // // import { useNotifications } from '../context/NotificationContext';
// // // import { claimApi } from '../api/claimApi';
// // // import { policyApi } from '../api/policyApi';
// // // import { Modal } from '../components/Modal';
// // // import { cn } from '../utils/cn';
// // // import axiosInstance from '../api/axiosInstance';
// // // import { getUserFromToken } from "../utils/jwtUtils";

// // // // Helper function to get userId from username
// // // async function getUserIdByUsername(username) {
// // //   const response = await axiosInstance.get(`/api/users/${username}`);
// // //   return response.data.id; // make sure API returns { id, username, ... }
// // // }

// // // const token = localStorage.getItem("token");
// // // const loggedInUser = token ? getUserFromToken(token) : null;


// // // export function Claims() {
// // //   const { user } = useAuth();
// // //   const { addNotification } = useNotifications();

// // //   const [claims, setClaims] = useState([]);
// // //   const [userPolicies, setUserPolicies] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [showClaimForm, setShowClaimForm] = useState(false);
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     userPolicyId: '',
// // //     description: '',
// // //     amount: '',
// // //   });

// // //   // Fetch userId, claims, and policies
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       if (!user?.username) return;

// // //       try {
// // //         // Step 1: get userId from localStorage or API
// // //         let userId = localStorage.getItem('userId');
// // //         if (!loggedInUser.username) {
// // //           userId = await getUserIdByUsername(user.username);
// // //           localStorage.setItem('userId', userId);
// // //         }

// // //         // Step 2: fetch claims and policies using userId
// // //         const [claimsData, policiesData] = await Promise.all([
// // //           claimApi.getUserClaims(loggedInUser.username),
// // //           policyApi.getMyPolicies(loggedInUser.username),
// // //         ]);

// // //         setClaims(claimsData);
// // //         setUserPolicies(policiesData);
// // //       } catch (error) {
// // //         console.error('Failed to fetch data:', error);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [user]);

// // //   // Submit a new claim
// // //   const handleSubmitClaim = async (e) => {
// // //     e.preventDefault();
// // //     if (!user?.username) return;

// // //     const selectedPolicy = userPolicies.find(
// // //       (up) => up.id === formData.userPolicyId
// // //     );
// // //     if (!selectedPolicy) return;

// // //     setIsSubmitting(true);
// // //     try {
// // //       // Get userId from localStorage (already fetched)
// // //       const userId = localStorage.getItem('userId');

// // //       // const newClaim = await claimApi.submitClaim({
// // //       //   userPolicyId: formData.userPolicyId,
// // //       //   userId: userId,
// // //       //   userName: user.name || user.username,
// // //       //   policyName: selectedPolicy.policy.name,
// // //       //   description: formData.description,
// // //       //   amount: parseFloat(formData.amount),
// // //       // });
// // //       const newClaim = await claimApi.submitClaim({
// // //   customerId: Number(userId),
// // //   policyName: selectedPolicy.policy.name,
// // //   description: formData.description,
// // //   amount: Number(formData.amount)
// // // });


// // //       setClaims((prev) => [newClaim, ...prev]);

// // //       await addNotification({
// // //         title: 'Claim Submitted',
// // //         message: `Your claim for ${selectedPolicy.policy.name} has been submitted and is pending review.`,
// // //         type: 'info',
// // //       });

// // //       setShowClaimForm(false);
// // //       setFormData({ userPolicyId: '', description: '', amount: '' });
// // //     } catch (error) {
// // //       console.error('Failed to submit claim:', error);
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   // Display status icon
// // //   const getStatusIcon = (status) => {
// // //     switch (status) {
// // //       case 'PENDING':
// // //         return <Clock className="h-5 w-5 text-yellow-600" />;
// // //       case 'APPROVED':
// // //         return <CheckCircle className="h-5 w-5 text-green-600" />;
// // //       case 'REJECTED':
// // //         return <XCircle className="h-5 w-5 text-red-600" />;
// // //       default:
// // //         return null;
// // //     }
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
// // //           <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
// // //           <p className="text-gray-500">
// // //             Submit and track your insurance claims
// // //           </p>
// // //         </div>
// // //         <button
// // //           onClick={() => setShowClaimForm(true)}
// // //           // disabled={userPolicies.length === 0}
// // //           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
// // //         >
// // //           <Plus className="h-4 w-4" />
// // //           Submit New Claim
// // //         </button>
// // //       </div>

// // //       {/* Stats */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // //         <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
// // //           <div className="flex items-center gap-3">
// // //             <Clock className="h-8 w-8 text-yellow-600" />
// // //             <div>
// // //               <p className="text-2xl font-bold text-yellow-700">
// // //                 {claims.filter((c) => c.status === 'PENDING').length}
// // //               </p>
// // //               <p className="text-sm text-yellow-600">Pending</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-green-50 rounded-xl p-4 border border-green-100">
// // //           <div className="flex items-center gap-3">
// // //             <CheckCircle className="h-8 w-8 text-green-600" />
// // //             <div>
// // //               <p className="text-2xl font-bold text-green-700">
// // //                 {claims.filter((c) => c.status === 'APPROVED').length}
// // //               </p>
// // //               <p className="text-sm text-green-600">Approved</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-red-50 rounded-xl p-4 border border-red-100">
// // //           <div className="flex items-center gap-3">
// // //             <XCircle className="h-8 w-8 text-red-600" />
// // //             <div>
// // //               <p className="text-2xl font-bold text-red-700">
// // //                 {claims.filter((c) => c.status === 'REJECTED').length}
// // //               </p>
// // //               <p className="text-sm text-red-600">Rejected</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Claims List */}
// // //       {claims.length === 0 ? (
// // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
// // //           <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// // //           <h3 className="text-lg font-semibold text-gray-900 mb-2">
// // //             No claims yet
// // //           </h3>
// // //           <p className="text-gray-500 mb-4">
// // //             {userPolicies.length === 0
// // //               ? 'Purchase a policy to submit claims'
// // //               : 'Submit your first claim when needed'}
// // //           </p>
// // //         </div>
// // //       ) : (
// // //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full">
// // //               <thead className="bg-gray-50 border-b border-gray-100">
// // //                 <tr>
// // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// // //                     Claim Details
// // //                   </th>
// // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// // //                     Amount
// // //                   </th>
// // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// // //                     Submitted
// // //                   </th>
// // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
// // //                     Status
// // //                   </th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-gray-100">
// // //                 {claims.map((claim) => (
// // //                   <tr key={claim.id} className="hover:bg-gray-50">
// // //                     <td className="px-6 py-4">
// // //                       <p className="font-medium text-gray-900">
// // //                         {claim.policyName}
// // //                       </p>
// // //                       <p className="text-sm text-gray-500 line-clamp-1">
// // //                         {claim.description}
// // //                       </p>
// // //                     </td>

// // //                     <td className="px-6 py-4 font-semibold text-gray-900">
// // //                       <div className="flex items-center gap-1">
// // //                         <DollarSign className="h-4 w-4 text-gray-400" />
// // //                         {claim.amount.toLocaleString()}
// // //                       </div>
// // //                     </td>

// // //                     <td className="px-6 py-4 text-sm text-gray-500">
// // //                       <div className="flex items-center gap-1">
// // //                         <Calendar className="h-4 w-4" />
// // //                         {new Date(claim.submittedAt).toLocaleDateString()}
// // //                       </div>
// // //                     </td>

// // //                     <td className="px-6 py-4">
// // //                       <span
// // //                         className={cn(
// // //                           'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full',
// // //                           claim.status === 'PENDING' &&
// // //                             'bg-yellow-100 text-yellow-700',
// // //                           claim.status === 'APPROVED' &&
// // //                             'bg-green-100 text-green-700',
// // //                           claim.status === 'REJECTED' &&
// // //                             'bg-red-100 text-red-700'
// // //                         )}
// // //                       >
// // //                         {getStatusIcon(claim.status)}
// // //                         {claim.status}
// // //                       </span>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Claim Form Modal */}
// // //       <Modal
// // //         isOpen={showClaimForm}
// // //         onClose={() => setShowClaimForm(false)}
// // //         title="Submit New Claim"
// // //         size="lg"
// // //       >
// // //         <form onSubmit={handleSubmitClaim} className="space-y-4">
// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // //               Select Policy
// // //             </label>
// // //             <select
// // //               value={formData.userPolicyId}
// // //               onChange={(e) =>
// // //                 setFormData({
// // //                   ...formData,
// // //                   userPolicyId: e.target.value,
// // //                 })
// // //               }
// // //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
// // //               required
// // //             >
// // //               <option value="">Choose a policy</option>
// // //               {userPolicies.map((up) => (
// // //                 <option key={up.id} value={up.id}>
// // //                   {up.policy.name} - {up.policy.type}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // //               Claim Amount ($)
// // //             </label>
// // //             <input
// // //               type="number"
// // //               value={formData.amount}
// // //               onChange={(e) =>
// // //                 setFormData({ ...formData, amount: e.target.value })
// // //               }
// // //               min="1"
// // //               placeholder="Enter claim amount"
// // //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// // //               required
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1.5">
// // //               Description
// // //             </label>
// // //             <textarea
// // //               rows={4}
// // //               value={formData.description}
// // //               onChange={(e) =>
// // //                 setFormData({
// // //                   ...formData,
// // //                   description: e.target.value,
// // //                 })
// // //               }
// // //               placeholder="Describe the reason for your claim..."
// // //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
// // //               required
// // //             />
// // //           </div>

// // //           <div className="flex gap-3 pt-4">
// // //             <button
// // //               type="button"
// // //               onClick={() => setShowClaimForm(false)}
// // //               className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
// // //             >
// // //               Cancel
// // //             </button>

// // //             <button
// // //               type="submit"
// // //               disabled={isSubmitting}
// // //               className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
// // //             >
// // //               {isSubmitting ? (
// // //                 <>
// // //                   <Loader2 className="h-4 w-4 animate-spin" />
// // //                   Submitting...
// // //                 </>
// // //               ) : (
// // //                 'Submit Claim'
// // //               )}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </Modal>
// // //     </div>
// // //   );
// // // }

// // import { getUserFromToken } from "../utils/jwtUtils";
// // import { useState, useEffect } from 'react';
// // import {
// //   FileText,
// //   Clock,
// //   CheckCircle,
// //   XCircle,
// //   Plus,
// //   Loader2,
// //   Calendar,
// //   DollarSign,
// // } from 'lucide-react';
// // import { useAuth } from '../context/AuthContext';
// // import { useNotifications } from '../context/NotificationContext';
// // import { claimApi } from '../api/claimApi';
// // import { policyApi } from '../api/policyApi';
// // import { Modal } from '../components/Modal';
// // import { cn } from '../utils/cn';

// // const token = localStorage.getItem("token");
// // const loggedInUser = token ? getUserFromToken(token) : null;



// // export function Claims() {
// //   const { user } = useAuth();
// //   const { addNotification } = useNotifications();

// //   const [claims, setClaims] = useState([]);
// //   const [userPolicies, setUserPolicies] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [showClaimForm, setShowClaimForm] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [formData, setFormData] = useState({
// //     userPolicyId: '',
// //     description: '',
// //     amount: '',
// //   });

// //   // Fetch claims and policies
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!loggedInUser?.username) return;
// //       try {
// //         // Step 1: get userId from backend (or localStorage)
// //         let userId = localStorage.getItem('username');
// //         if (!userId) {
// //           const response = await policyApi.getUserIdByUsername(loggedInUser.username);
// //           userId = response.id;
// //           localStorage.setItem('userId', userId);
// //         }

// //         // Step 2: fetch claims and policies
// //         const [claimsData, policiesData] = await Promise.all([
// //           claimApi.getUserClaims(userId),
// //           policyApi.getMyPolicies(userId),
// //         ]);

// //         // Map backend response to frontend keys
// //         const mappedClaims = claimsData.map((c) => ({
// //           id: c.claimId,
// //           userId: c.customerId,
// //           userName: c.customerUsername,
// //           policyId: c.policyId,
// //           policyName: c.claimType, // or c.policyName if backend has it
// //           description: c.note,
// //           amount: c.amount,
// //           status: c.status,
// //           documentType: c.documentType,
// //           documentId: c.documentId,
// //           coverageAmount: c.coverageAmount,
// //           policyStartDate: c.policyStartDate,
// //           policyEndDate: c.policyEndDate,
// //           submittedAt: c.submittedAt || new Date(), // fallback
// //         }));

// //         setClaims(mappedClaims);
// //         setUserPolicies(policiesData);
// //       } catch (error) {
// //         console.error('Failed to fetch data:', error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [user]);

// //   // const handleSubmitClaim = async (e) => {
// //   //   e.preventDefault();
// //   //   const selectedPolicy = userPolicies.find(
// //   //     (up) => up.id === formData.userPolicyId
// //   //   );
// //   //   if (!selectedPolicy) return;

// //   //   setIsSubmitting(true);
// //   //   try {
// //   //     const userId = localStorage.getItem('userId');
// //   //     const newClaim = await claimApi.submitClaim({
// //   //       customerId: Number(userId),
// //   //       policyName: selectedPolicy.policy.name,
// //   //       description: formData.description,
// //   //       amount: Number(formData.amount),
// //   //     });

// //   //     // Map response to frontend keys
// //   //     const mappedClaim = {
// //   //       id: newClaim.claimId,
// //   //       userId: newClaim.customerId,
// //   //       userName: newClaim.customerUsername,
// //   //       policyId: newClaim.policyId,
// //   //       policyName: newClaim.claimType,
// //   //       description: newClaim.note,
// //   //       amount: newClaim.amount,
// //   //       status: newClaim.status,
// //   //       documentType: newClaim.documentType,
// //   //       documentId: newClaim.documentId,
// //   //       coverageAmount: newClaim.coverageAmount,
// //   //       policyStartDate: newClaim.policyStartDate,
// //   //       policyEndDate: newClaim.policyEndDate,
// //   //       submittedAt: newClaim.submittedAt || new Date(),
// //   //     };

// //   //     setClaims((prev) => [mappedClaim, ...prev]);

// //   //     await addNotification({
// //   //       title: 'Claim Submitted',
// //   //       message: `Your claim for ${selectedPolicy.policy.name} has been submitted.`,
// //   //       type: 'info',
// //   //     });

// //   //     setShowClaimForm(false);
// //   //     setFormData({ userPolicyId: '', description: '', amount: '' });
// //   //   } catch (error) {
// //   //     console.error('Failed to submit claim:', error);
// //   //   } finally {
// //   //     setIsSubmitting(false);
// //   //   }
// //   // };

// // const handleSubmitClaim = async (e) => {
// //   e.preventDefault();
// //   const selectedPolicy = userPolicies.find(
// //     (up) => up.id === Number(formData.userPolicyId)
// //   );
// //   if (!selectedPolicy) {
// //     alert("Please select a policy");
// //     return;
// //   }

// //   setIsSubmitting(true);
// //   try {
// //     const userId = Number(localStorage.getItem('userId'));

// //     // Send proper payload to backend
// //     const payload = {
// //       customerId: userId,
// //       policyId: selectedPolicy.id,
// //       claimType: formData.claimType,
// //       note: formData.description,
// //       amount: Number(formData.amount),
// //       documentType: formData.documentType,
// //       documentId: formData.documentId,
// //       coverageAmount: Number(formData.coverageAmount),
// //     };

// //     const newClaim = await claimApi.submitClaim(payload);

// //     // Add newly created claim to frontend table
// //     setClaims((prev) => [
// //       {
// //         id: newClaim.claimId,
// //         userId: newClaim.customerId,
// //         policyId: newClaim.policyId,
// //         policyName: selectedPolicy.policy.name,
// //         claimType: newClaim.claimType,
// //         description: newClaim.note,
// //         amount: newClaim.amount,
// //         status: newClaim.status,
// //         documentType: newClaim.documentType,
// //         documentId: newClaim.documentId,
// //         coverageAmount: newClaim.coverageAmount,
// //         policyStartDate: selectedPolicy.policyStartDate,
// //         policyEndDate: selectedPolicy.policyEndDate,
// //         submittedAt: new Date(),
// //       },
// //       ...prev,
// //     ]);

// //     await addNotification({
// //       title: 'Claim Submitted',
// //       message: `Your claim for ${selectedPolicy.policy.name} has been submitted.`,
// //       type: 'info',
// //     });

// //     setShowClaimForm(false);
// //     setFormData({
// //       userPolicyId: '',
// //       claimType: '',
// //       description: '',
// //       amount: '',
// //       documentType: '',
// //       documentId: '',
// //       coverageAmount: '',
// //     });
// //   } catch (error) {
// //     console.error('Failed to submit claim:', error);
// //     alert('Failed to submit claim. Check console for details.');
// //   } finally {
// //     setIsSubmitting(false);
// //   }
// // };



// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case 'PENDING':
// //         return <Clock className="h-5 w-5 text-yellow-600" />;
// //       case 'APPROVED':
// //         return <CheckCircle className="h-5 w-5 text-green-600" />;
// //       case 'REJECTED':
// //         return <XCircle className="h-5 w-5 text-red-600" />;
// //       default:
// //         return null;
// //     }
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
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
// //           <p className="text-gray-500">
// //             Submit and track your insurance claims
// //           </p>
// //         </div>
// //         <button
// //           onClick={() => setShowClaimForm(true)}
// //           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
// //         >
// //           <Plus className="h-4 w-4" />
// //           Submit New Claim
// //         </button>
// //       </div>

// //       {/* Claims Table */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
// //         <table className="w-full">
// //           <thead className="bg-gray-50 border-b border-gray-100">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Policy Type
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Description
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Amount
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Coverage
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Status
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Policy Dates
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
// //                 Document
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-100">
// //             {claims.map((claim) => (
// //               <tr key={claim.id} className="hover:bg-gray-50">
// //                 <td className="px-6 py-4">{claim.policyName}</td>
// //                 <td className="px-6 py-4">{claim.description}</td>
// //                 <td className="px-6 py-4">
// //                   <DollarSign className="inline h-4 w-4 text-gray-400 mr-1" />
// //                   {claim.amount.toLocaleString()}
// //                 </td>
// //                 <td className="px-6 py-4">{claim.coverageAmount?.toLocaleString()}</td>
// //                 <td className="px-6 py-4">
// //                   <span
// //                     className={cn(
// //                       'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
// //                       claim.status === 'PENDING' && 'bg-yellow-100 text-yellow-700',
// //                       claim.status === 'APPROVED' && 'bg-green-100 text-green-700',
// //                       claim.status === 'REJECTED' && 'bg-red-100 text-red-700'
// //                     )}
// //                   >
// //                     {getStatusIcon(claim.status)}
// //                     {claim.status}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4">
// //                   {claim.policyStartDate} - {claim.policyEndDate}
// //                 </td>
// //                 <td className="px-6 py-4">{claim.documentType} ({claim.documentId})</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Claim Form Modal */}
// //       {/* <Modal isOpen={showClaimForm} onClose={() => setShowClaimForm(false)} title="Submit New Claim" size="lg">
// //         <form onSubmit={handleSubmitClaim} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Policy</label>
// //             <select
// //               value={formData.userPolicyId}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, userPolicyId: e.target.value })
// //               }
// //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //               required
// //             >
// //               <option value="">Choose a policy</option>
// //               {userPolicies.map((p) => (
// //                 <option key={p.id} value={p.id}>
// //                   {p.policy.name} - {p.policy.type}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount ($)</label>
// //             <input
// //               type="number"
// //               value={formData.amount}
// //               onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
// //               required
// //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //               min="1"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
// //             <textarea
// //               rows={4}
// //               value={formData.description}
// //               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //               placeholder="Describe your claim"
// //               required
// //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //             />
// //           </div>
// //           <div className="flex gap-3 pt-4">
// //             <button type="button" onClick={() => setShowClaimForm(false)} className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg">Cancel</button>
// //             <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg">
// //               {isSubmitting ? 'Submitting...' : 'Submit Claim'}
// //             </button>
// //           </div>
// //         </form>
// //       </Modal> */}
// //       <Modal isOpen={showClaimForm} onClose={() => setShowClaimForm(false)} title="Submit New Claim" size="lg">
// //   <form onSubmit={handleSubmitClaim} className="space-y-4">
// //     {/* Policy selection */}
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Policy</label>
// //       <select
// //         value={formData.userPolicyId}
// //         onChange={(e) =>
// //           setFormData({ ...formData, userPolicyId: e.target.value })
// //         }
// //         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //         required
// //       >
// //         <option value="">Choose a policy</option>
// //         {userPolicies.map((p) => (
// //           <option key={p.id} value={p.id}>
// //             {p.policy.name} - {p.policy.type}
// //           </option>
// //         ))}
// //       </select>
// //     </div>

// //     {/* Claim Type */}
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">Claim Type</label>
// //       <input
// //         type="text"
// //         value={formData.claimType || ''}
// //         onChange={(e) =>
// //           setFormData({ ...formData, claimType: e.target.value })
// //         }
// //         placeholder="Enter claim type (e.g., Health, Accident)"
// //         required
// //         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //       />
// //     </div>

// //     {/* Amount */}
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount ($)</label>
// //       <input
// //         type="number"
// //         value={formData.amount || ''}
// //         onChange={(e) =>
// //           setFormData({ ...formData, amount: e.target.value })
// //         }
// //         min="1"
// //         placeholder="Enter claim amount"
// //         required
// //         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //       />
// //     </div>

// //     {/* Description */}
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
// //       <textarea
// //         rows={4}
// //         value={formData.description || ''}
// //         onChange={(e) =>
// //           setFormData({ ...formData, description: e.target.value })
// //         }
// //         placeholder="Describe your claim"
// //         required
// //         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //       />
// //     </div>

// //     {/* Document Type */}
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type</label>
// //       <input
// //         type="text"
// //         value={formData.documentType || ''}
// //         onChange={(e) =>
// //           setFormData({ ...formData, documentType: e.target.value })
// //         }
// //         placeholder="Enter document type (e.g., Medical Bill)"
// //         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //       />
// //     </div>

// //     {/* Document ID */}
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">Document ID</label>
// //       <input
// //         type="text"
// //         value={formData.documentId || ''}
// //         onChange={(e) =>
// //           setFormData({ ...formData, documentId: e.target.value })
// //         }
// //         placeholder="Enter document ID"
// //         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //       />
// //     </div>

// //     {/* Coverage Amount */}
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1.5">Coverage Amount ($)</label>
// //       <input
// //         type="number"
// //         value={formData.coverageAmount || ''}
// //         onChange={(e) =>
// //           setFormData({ ...formData, coverageAmount: e.target.value })
// //         }
// //         min="0"
// //         placeholder="Enter coverage amount"
// //         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
// //       />
// //     </div>

// //     {/* Submit/Cancel buttons */}
// //     <div className="flex gap-3 pt-4">
// //       <button
// //         type="button"
// //         onClick={() => setShowClaimForm(false)}
// //         className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg"
// //       >
// //         Cancel
// //       </button>
// //       <button
// //         type="submit"
// //         disabled={isSubmitting}
// //         className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
// //       >
// //         {isSubmitting ? 'Submitting...' : 'Submit Claim'}
// //       </button>
// //     </div>
// //   </form>
// // </Modal>

// //     </div>
// //   );
// // }
// import { getUserFromToken } from "../utils/jwtUtils";
// import { useState, useEffect } from "react";
// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Plus,
//   Loader2,
//   DollarSign,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { useNotifications } from "../context/NotificationContext";
// import { claimApi } from "../api/claimApi";
// import { policyApi } from "../api/policyApi";
// import { Modal } from "../components/Modal";
// import { cn } from "../utils/cn";

// const token = localStorage.getItem("token");
// const loggedInUser = token ? getUserFromToken(token) : null;

// export function Claims() {
//   const { user } = useAuth();
//   const { addNotification } = useNotifications();

//   const [claims, setClaims] = useState([]);
//   const [userPolicies, setUserPolicies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showClaimForm, setShowClaimForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     userPolicyId: "",
//     claimType: "",
//     description: "",
//     amount: "",
//     documentType: "",
//     documentId: "",
//     coverageAmount: "",
//   });
  

//   // Fetch claims and policies
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!loggedInUser?.username) return;
//       try {
//         // Fetch user claims and policies
//         const [claimsData, policiesData] = await Promise.all([
//           claimApi.getUserClaims(loggedInUser.username),
//           policyApi.getMyPolicies(loggedInUser.username),
//         ]);

//         const mappedClaims = claimsData.map((c) => ({
//           id: c.claimId,
//           userId: c.customerId,
//           userName: c.customerUsername,
//           policyId: c.policyId,
//           policyName: c.policy?.name || c.claimType,
//           description: c.note,
//           amount: c.amount,
//           status: c.status,
//           documentType: c.documentType,
//           documentId: c.documentId,
//           coverageAmount: c.coverageAmount,
//           policyStartDate: c.policyStartDate,
//           policyEndDate: c.policyEndDate,
//           submittedAt: c.submittedAt || new Date(),
//         }));

//         setClaims(mappedClaims);
//         setUserPolicies(policiesData);
//         console.log("Fetched claims:", mappedClaims);
//         console.log("Fetched policies:", policiesData);
//       } catch (error) {
//         console.error("Failed to fetch claims or policies:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   // Submit claim
//   const handleSubmitClaim = async (e) => {
//     e.preventDefault();

//     const selectedPolicy = userPolicies.find(
//       (p) => p.id === Number(formData.userPolicyId)
//     );
//     if (!selectedPolicy) {
//       alert("Please select a policy");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         customerId: loggedInUser.id,
//         policyId: selectedPolicy.id,
//         claimType: formData.claimType,
//         note: formData.description,
//         amount: Number(formData.amount),
//         documentType: formData.documentType,
//         documentId: formData.documentId,
//         coverageAmount: Number(formData.coverageAmount),
//       };

//       const newClaim = await claimApi.submitClaim(payload);

//       // Update frontend table
//       setClaims((prev) => [
//         {
//           id: newClaim.claimId,
//           userId: newClaim.customerId,
//           policyId: newClaim.policyId,
//           policyName: selectedPolicy.policy?.name || formData.claimType,
//           claimType: newClaim.claimType,
//           description: newClaim.note,
//           amount: newClaim.amount,
//           status: newClaim.status,
//           documentType: newClaim.documentType,
//           documentId: newClaim.documentId,
//           coverageAmount: newClaim.coverageAmount,
//           policyStartDate: selectedPolicy.policyStartDate,
//           policyEndDate: selectedPolicy.policyEndDate,
//           submittedAt: new Date(),
//         },
//         ...prev,
//       ]);

//       await addNotification({
//         title: "Claim Submitted",
//         message: `Your claim for ${selectedPolicy.policy?.name} has been submitted.`,
//         type: "info",
//       });

//       setShowClaimForm(false);
//       setFormData({
//         userPolicyId: "",
//         claimType: "",
//         description: "",
//         amount: "",
//         documentType: "",
//         documentId: "",
//         coverageAmount: "",
//       });
//     } catch (error) {
//       console.error("Failed to submit claim:", error);
//       alert("Failed to submit claim. Check console for details.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "PENDING":
//         return <Clock className="h-5 w-5 text-yellow-600" />;
//       case "APPROVED":
//         return <CheckCircle className="h-5 w-5 text-green-600" />;
//       case "REJECTED":
//         return <XCircle className="h-5 w-5 text-red-600" />;
//       default:
//         return null;
//     }
//   };

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
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
//           <p className="text-gray-500">Submit and track your insurance claims</p>
//         </div>
//         <button
//           onClick={() => setShowClaimForm(true)}
//           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
//         >
//           <Plus className="h-4 w-4" />
//           Submit New Claim
//         </button>
//       </div>

//       {/* Claims Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Policy Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Description
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Coverage
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Policy Dates
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Document
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {claims.map((claim) => (
//               <tr key={claim.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4">{claim.policyName}</td>
//                 <td className="px-6 py-4">{claim.description}</td>
//                 <td className="px-6 py-4">
//                   <DollarSign className="inline h-4 w-4 text-gray-400 mr-1" />
//                   {claim.amount?.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   {claim.coverageAmount?.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={cn(
//                       "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
//                       claim.status === "PENDING" && "bg-yellow-100 text-yellow-700",
//                       claim.status === "APPROVED" && "bg-green-100 text-green-700",
//                       claim.status === "REJECTED" && "bg-red-100 text-red-700"
//                     )}
//                   >
//                     {getStatusIcon(claim.status)}
//                     {claim.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   {claim.policyStartDate} - {claim.policyEndDate}
//                 </td>
//                 <td className="px-6 py-4">
//                   {claim.documentType} ({claim.documentId})
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Claim Form Modal */}
//       <Modal
//         isOpen={showClaimForm}
//         onClose={() => setShowClaimForm(false)}
//         title="Submit New Claim"
//         size="lg"
//       >
//         <form onSubmit={handleSubmitClaim} className="space-y-4">
//           {/* Policy selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Select Policy
//             </label>
//             <select
//               value={formData.userPolicyId}
//               onChange={(e) =>
//                 setFormData({ ...formData, userPolicyId: e.target.value })
//               }
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
//               required
//             >
//               <option value="">Choose a policy</option>
//               {userPolicies.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.policy?.name} - {p.policy?.type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Claim Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Claim Type
//             </label>
//             <input
//               type="text"
//               value={formData.claimType || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, claimType: e.target.value })
//               }
//               placeholder="Enter claim type (e.g., Health, Accident)"
//               required
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
//             />
//           </div>

//           {/* Amount */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Amount ($)
//             </label>
//             <input
//               type="number"
//               value={formData.amount || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, amount: e.target.value })
//               }
//               min="1"
//               placeholder="Enter claim amount"
//               required
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Description
//             </label>
//             <textarea
//               rows={4}
//               value={formData.description || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               placeholder="Describe your claim"
//               required
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
//             />
//           </div>

//           {/* Document Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Document Type
//             </label>
//             <input
//               type="text"
//               value={formData.documentType || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, documentType: e.target.value })
//               }
//               placeholder="Enter document type (e.g., Medical Bill)"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
//             />
//           </div>

//           {/* Document ID */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Document ID
//             </label>
//             <input
//               type="text"
//               value={formData.documentId || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, documentId: e.target.value })
//               }
//               placeholder="Enter document ID"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
//             />
//           </div>

//           {/* Coverage Amount */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Coverage Amount ($)
//             </label>
//             <input
//               type="number"
//               value={formData.coverageAmount || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, coverageAmount: e.target.value })
//               }
//               min="0"
//               placeholder="Enter coverage amount"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={() => setShowClaimForm(false)}
//               className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? "Submitting..." : "Submit Claim"}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }


// Claims.jsx
import { getUserFromToken } from "../utils/jwtUtils";
import { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Loader2,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { claimApi } from "../api/claimApi";
import { policyApi } from "../api/policyApi";
import { Modal } from "../components/Modal";
import { cn } from "../utils/cn";

const token = localStorage.getItem("token");
const loggedInUser = token ? getUserFromToken(token) : null;

export function Claims() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [claims, setClaims] = useState([]);
  const [userPolicies, setUserPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userPolicyId: "",
    claimType: "",
    description: "",
    amount: "",
    documentType: "",
    documentId: "",
    coverageAmount: "",
  });

  // Fetch claims and policies
  useEffect(() => {
    const fetchData = async () => {
      if (!loggedInUser?.username) return;
      try {
        const [claimsData, policiesData] = await Promise.all([
          claimApi.getUserClaims(loggedInUser.username),
          policyApi.getMyPolicies(loggedInUser.username),
        ]);

        console.log("Fetched claims:", claimsData);
        console.log("Fetched policies:", policiesData);

        // Map claims for frontend table
        const mappedClaims = claimsData.map((c) => ({
          id: c.claimId,
          userId: c.customerId,
          userName: c.customerUsername,
          policyId: c.policyId,
          policyName: c.policy?.name || c.claimType,
          description: c.note,
          amount: c.amount,
          status: c.status,
          documentType: c.documentType,
          documentId: c.documentId,
          coverageAmount: c.coverageAmount,
          policyStartDate: c.policyStartDate,
          policyEndDate: c.policyEndDate,
          submittedAt: c.submittedAt || new Date(),
        }));

        setClaims(mappedClaims);
        setUserPolicies(policiesData);
      } catch (error) {
        console.error("Failed to fetch claims or policies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Submit claim
  const handleSubmitClaim = async (e) => {
    e.preventDefault();

    const selectedPolicy = userPolicies.find(
      (p) => p.policy.id === Number(formData.userPolicyId)
    );
    if (!selectedPolicy) {
      alert("Please select a policy");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerId: loggedInUser.id,
        policyId: selectedPolicy.policy.id, // Correct backend ID
        claimType: formData.claimType,
        note: formData.description,
        amount: Number(formData.amount),
        documentType: formData.documentType,
        documentId: formData.documentId,
        coverageAmount: Number(formData.coverageAmount),
      };

      const newClaim = await claimApi.submitClaim(payload);

      // Add new claim to table
      setClaims((prev) => [
        {
          id: newClaim.claimId,
          userId: newClaim.customerId,
          policyId: newClaim.policyId,
          policyName: selectedPolicy.policy.name,
          claimType: newClaim.claimType,
          description: newClaim.note,
          amount: newClaim.amount,
          status: newClaim.status,
          documentType: newClaim.documentType,
          documentId: newClaim.documentId,
          coverageAmount: newClaim.coverageAmount,
          policyStartDate: selectedPolicy.purchaseDate,
          policyEndDate: selectedPolicy.expiryDate,
          submittedAt: new Date(),
        },
        ...prev,
      ]);

      await addNotification({
        title: "Claim Submitted",
        message: `Your claim for ${selectedPolicy.policy.name} has been submitted.`,
        type: "info",
      });

      setShowClaimForm(false);
      setFormData({
        userPolicyId: "",
        claimType: "",
        description: "",
        amount: "",
        documentType: "",
        documentId: "",
        coverageAmount: "",
      });
    } catch (error) {
      console.error("Failed to submit claim:", error);
      alert("Failed to submit claim. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "APPROVED":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "REJECTED":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
          <p className="text-gray-500">Submit and track your insurance claims</p>
        </div>
        <button
          onClick={() => setShowClaimForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Submit New Claim
        </button>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Policy Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Coverage
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Policy Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Document
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {claims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{claim.policyName}</td>
                <td className="px-6 py-4">{claim.description}</td>
                <td className="px-6 py-4">
                  <DollarSign className="inline h-4 w-4 text-gray-400 mr-1" />
                  {claim.amount?.toLocaleString()}
                </td>
                <td className="px-6 py-4">{claim.coverageAmount?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
                      claim.status === "PENDING" && "bg-yellow-100 text-yellow-700",
                      claim.status === "APPROVED" && "bg-green-100 text-green-700",
                      claim.status === "REJECTED" && "bg-red-100 text-red-700"
                    )}
                  >
                    {getStatusIcon(claim.status)}
                    {claim.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {claim.policyStartDate} - {claim.policyEndDate}
                </td>
                <td className="px-6 py-4">{claim.documentType} ({claim.documentId})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Claim Form Modal */}
      <Modal isOpen={showClaimForm} onClose={() => setShowClaimForm(false)} title="Submit New Claim" size="lg">
        <form onSubmit={handleSubmitClaim} className="space-y-4">
          {/* Policy selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Policy</label>
            <select
              value={formData.userPolicyId}
              onChange={(e) => setFormData({ ...formData, userPolicyId: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Choose a policy</option>
              {userPolicies.map((p) => (
                <option key={p.policy.id} value={p.policy.id}>
                  {p.policy.name} - {p.policy.type}
                </option>
              ))}
            </select>
          </div>

          {/* Claim Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Claim Type</label>
            <input type="text" value={formData.claimType} onChange={(e) => setFormData({ ...formData, claimType: e.target.value })} placeholder="Enter claim type" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount ($)</label>
            <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} min="1" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your claim" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type</label>
            <input type="text" value={formData.documentType} onChange={(e) => setFormData({ ...formData, documentType: e.target.value })} placeholder="Enter document type" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
          </div>

          {/* Document ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Document ID</label>
            <input type="text" value={formData.documentId} onChange={(e) => setFormData({ ...formData, documentId: e.target.value })} placeholder="Enter document ID" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
          </div>

          {/* Coverage Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Coverage Amount ($)</label>
            <input type="number" value={formData.coverageAmount} onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })} min="0" placeholder="Enter coverage amount" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowClaimForm(false)} className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg">{isSubmitting ? "Submitting..." : "Submit Claim"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
