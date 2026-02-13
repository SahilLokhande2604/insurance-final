// import { useState, useEffect } from 'react';
// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Plus,
//   Loader2,
//   Calendar,
//   DollarSign,
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useNotifications } from '../context/NotificationContext';
// import { claimApi } from '../api/claimApi';
// import { policyApi } from '../api/policyApi';
// import { Modal } from '../components/Modal';
// import { cn } from '../utils/cn';

// export function Claims() {
//   const { user } = useAuth();
//   const { addNotification } = useNotifications();

//   const [claims, setClaims] = useState([]);
//   const [userPolicies, setUserPolicies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showClaimForm, setShowClaimForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     userPolicyId: '',
//     description: '',
//     amount: '',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user) return;

//       try {
//         const [claimsData, policiesData] = await Promise.all([
//           claimApi.getUserClaims(user.id),
//           policyApi.getUserPolicies(user.id),
//         ]);
//         setClaims(claimsData);
//         setUserPolicies(policiesData);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const handleSubmitClaim = async (e) => {
//     e.preventDefault();
//     if (!user) return;

//     const selectedPolicy = userPolicies.find(
//       (up) => up.id === formData.userPolicyId
//     );
//     if (!selectedPolicy) return;

//     setIsSubmitting(true);
//     try {
//       const newClaim = await claimApi.submitClaim({
//         userPolicyId: formData.userPolicyId,
//         userId: user.id,
//         userName: user.name,
//         policyName: selectedPolicy.policy.name,
//         description: formData.description,
//         amount: parseFloat(formData.amount),
//       });

//       setClaims((prev) => [newClaim, ...prev]);

//       await addNotification({
//         title: 'Claim Submitted',
//         message: `Your claim for ${selectedPolicy.policy.name} has been submitted and is pending review.`,
//         type: 'info',
//       });

//       setShowClaimForm(false);
//       setFormData({ userPolicyId: '', description: '', amount: '' });
//     } catch (error) {
//       console.error('Failed to submit claim:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'PENDING':
//         return <Clock className="h-5 w-5 text-yellow-600" />;
//       case 'APPROVED':
//         return <CheckCircle className="h-5 w-5 text-green-600" />;
//       case 'REJECTED':
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
//           <p className="text-gray-500">
//             Submit and track your insurance claims
//           </p>
//         </div>
//         <button
//           onClick={() => setShowClaimForm(true)}
//           disabled={userPolicies.length === 0}
//           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <Plus className="h-4 w-4" />
//           Submit New Claim
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
//           <div className="flex items-center gap-3">
//             <Clock className="h-8 w-8 text-yellow-600" />
//             <div>
//               <p className="text-2xl font-bold text-yellow-700">
//                 {claims.filter((c) => c.status === 'PENDING').length}
//               </p>
//               <p className="text-sm text-yellow-600">Pending</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-green-50 rounded-xl p-4 border border-green-100">
//           <div className="flex items-center gap-3">
//             <CheckCircle className="h-8 w-8 text-green-600" />
//             <div>
//               <p className="text-2xl font-bold text-green-700">
//                 {claims.filter((c) => c.status === 'APPROVED').length}
//               </p>
//               <p className="text-sm text-green-600">Approved</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-red-50 rounded-xl p-4 border border-red-100">
//           <div className="flex items-center gap-3">
//             <XCircle className="h-8 w-8 text-red-600" />
//             <div>
//               <p className="text-2xl font-bold text-red-700">
//                 {claims.filter((c) => c.status === 'REJECTED').length}
//               </p>
//               <p className="text-sm text-red-600">Rejected</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Claims List */}
//       {claims.length === 0 ? (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//           <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             No claims yet
//           </h3>
//           <p className="text-gray-500 mb-4">
//             {userPolicies.length === 0
//               ? 'Purchase a policy to submit claims'
//               : 'Submit your first claim when needed'}
//           </p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-100">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Claim Details
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Submitted
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {claims.map((claim) => (
//                   <tr key={claim.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <p className="font-medium text-gray-900">
//                         {claim.policyName}
//                       </p>
//                       <p className="text-sm text-gray-500 line-clamp-1">
//                         {claim.description}
//                       </p>
//                     </td>

//                     <td className="px-6 py-4 font-semibold text-gray-900">
//                       <div className="flex items-center gap-1">
//                         <DollarSign className="h-4 w-4 text-gray-400" />
//                         {claim.amount.toLocaleString()}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4" />
//                         {new Date(claim.submittedAt).toLocaleDateString()}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4">
//                       <span
//                         className={cn(
//                           'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full',
//                           claim.status === 'PENDING' &&
//                             'bg-yellow-100 text-yellow-700',
//                           claim.status === 'APPROVED' &&
//                             'bg-green-100 text-green-700',
//                           claim.status === 'REJECTED' &&
//                             'bg-red-100 text-red-700'
//                         )}
//                       >
//                         {getStatusIcon(claim.status)}
//                         {claim.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Claim Form Modal */}
//       <Modal
//         isOpen={showClaimForm}
//         onClose={() => setShowClaimForm(false)}
//         title="Submit New Claim"
//         size="lg"
//       >
//         <form onSubmit={handleSubmitClaim} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Select Policy
//             </label>
//             <select
//               value={formData.userPolicyId}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   userPolicyId: e.target.value,
//                 })
//               }
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
//               required
//             >
//               <option value="">Choose a policy</option>
//               {userPolicies.map((up) => (
//                 <option key={up.id} value={up.id}>
//                   {up.policy.name} - {up.policy.type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Claim Amount ($)
//             </label>
//             <input
//               type="number"
//               value={formData.amount}
//               onChange={(e) =>
//                 setFormData({ ...formData, amount: e.target.value })
//               }
//               min="1"
//               placeholder="Enter claim amount"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Description
//             </label>
//             <textarea
//               rows={4}
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   description: e.target.value,
//                 })
//               }
//               placeholder="Describe the reason for your claim..."
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
//               required
//             />
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={() => setShowClaimForm(false)}
//               className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   Submitting...
//                 </>
//               ) : (
//                 'Submit Claim'
//               )}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Loader2,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { claimApi } from '../api/claimApi';
import { policyApi } from '../api/policyApi';
import { Modal } from '../components/Modal';
import { cn } from '../utils/cn';
import axiosInstance from '../api/axiosInstance';

// Helper function to get userId from username
async function getUserIdByUsername(username) {
  const response = await axiosInstance.get(`/api/users/${username}`);
  return response.data.id; // make sure API returns { id, username, ... }
}

export function Claims() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [claims, setClaims] = useState([]);
  const [userPolicies, setUserPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userPolicyId: '',
    description: '',
    amount: '',
  });

  // Fetch userId, claims, and policies
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.username) return;

      try {
        // Step 1: get userId from localStorage or API
        let userId = localStorage.getItem('userId');
        if (!userId) {
          userId = await getUserIdByUsername(user.username);
          localStorage.setItem('userId', userId);
        }

        // Step 2: fetch claims and policies using userId
        const [claimsData, policiesData] = await Promise.all([
          claimApi.getUserClaims(userId),
          policyApi.getUserPolicies(userId),
        ]);

        setClaims(claimsData);
        setUserPolicies(policiesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Submit a new claim
  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    if (!user?.username) return;

    const selectedPolicy = userPolicies.find(
      (up) => up.id === formData.userPolicyId
    );
    if (!selectedPolicy) return;

    setIsSubmitting(true);
    try {
      // Get userId from localStorage (already fetched)
      const userId = localStorage.getItem('userId');

      const newClaim = await claimApi.submitClaim({
        userPolicyId: formData.userPolicyId,
        userId: userId,
        userName: user.name || user.username,
        policyName: selectedPolicy.policy.name,
        description: formData.description,
        amount: parseFloat(formData.amount),
      });

      setClaims((prev) => [newClaim, ...prev]);

      await addNotification({
        title: 'Claim Submitted',
        message: `Your claim for ${selectedPolicy.policy.name} has been submitted and is pending review.`,
        type: 'info',
      });

      setShowClaimForm(false);
      setFormData({ userPolicyId: '', description: '', amount: '' });
    } catch (error) {
      console.error('Failed to submit claim:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'APPROVED':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'REJECTED':
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
          <p className="text-gray-500">
            Submit and track your insurance claims
          </p>
        </div>
        <button
          onClick={() => setShowClaimForm(true)}
          disabled={userPolicies.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          Submit New Claim
        </button>
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
              <p className="text-sm text-yellow-600">Pending</p>
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

      {/* Claims List */}
      {claims.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No claims yet
          </h3>
          <p className="text-gray-500 mb-4">
            {userPolicies.length === 0
              ? 'Purchase a policy to submit claims'
              : 'Submit your first claim when needed'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Claim Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {claim.policyName}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {claim.description}
                      </p>
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        {claim.amount.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(claim.submittedAt).toLocaleDateString()}
                      </div>
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
                        {getStatusIcon(claim.status)}
                        {claim.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Claim Form Modal */}
      <Modal
        isOpen={showClaimForm}
        onClose={() => setShowClaimForm(false)}
        title="Submit New Claim"
        size="lg"
      >
        <form onSubmit={handleSubmitClaim} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Select Policy
            </label>
            <select
              value={formData.userPolicyId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userPolicyId: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              required
            >
              <option value="">Choose a policy</option>
              {userPolicies.map((up) => (
                <option key={up.id} value={up.id}>
                  {up.policy.name} - {up.policy.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Claim Amount ($)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              min="1"
              placeholder="Enter claim amount"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Describe the reason for your claim..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowClaimForm(false)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Claim'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
