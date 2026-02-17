// // import { useState } from 'react';
// // import { X, AlertCircle, Loader2 } from 'lucide-react';
// // import { supportApi } from '../api/supportApi';
// // import { useAuth } from '../context/AuthContext';

// // /**
// //  * PolicyChangeModal Component
// //  * Modal to request a policy change
// //  */
// // export function PolicyChangeModal({ isOpen, onClose, onSuccess, policyId }) {
// //   const { user } = useAuth();
  
// //   // Form state
// //   const [changeType, setChangeType] = useState('');
// //   const [details, setDetails] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   // Change type options
// //   const changeTypes = [
// //     { value: 'ADDRESS_UPDATE', label: 'Address Update' },
// //     { value: 'COVERAGE_UPDATE', label: 'Coverage Update' },
// //     { value: 'BENEFICIARY_UPDATE', label: 'Beneficiary Update' },
// //     { value: 'PAYMENT_METHOD_UPDATE', label: 'Payment Method Update' },
// //     { value: 'CONTACT_UPDATE', label: 'Contact Information Update' },
// //     { value: 'OTHER', label: 'Other' },
// //   ];

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setIsLoading(true);

// //     try {
// //       // Prepare request data
// //       const requestData = {
// //         policyId: Number(policyId),
// //         changeType: changeType,
// //         details: details.trim(),
// //       };

// //       // Call API to request policy change
// //       const response = await supportApi.requestPolicyChange(requestData, user?.username);

// //       // Success - close modal and notify parent
// //       if (onSuccess) {
// //         onSuccess(response.data);
// //       }
      
// //       // Reset form
// //       setChangeType('');
// //       setDetails('');
      
// //       onClose();
// //     } catch (err) {
// //       setError(err.message || 'Failed to submit policy change request. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Don't render if not open
// //   if (!isOpen) return null;

// //   return (
// //     <>
// //       {/* Backdrop */}
// //       <div
// //         className="fixed inset-0 bg-black/50 z-50"
// //         onClick={onClose}
// //       />

// //       {/* Modal */}
// //       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
// //         <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
// //           {/* Header */}
// //           <div className="flex items-center justify-between p-6 border-b border-gray-200">
// //             <div>
// //               <h2 className="text-xl font-bold text-gray-900">
// //                 Request Policy Change
// //               </h2>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 Policy ID: {policyId}
// //               </p>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
// //             >
// //               <X className="h-5 w-5" />
// //             </button>
// //           </div>

// //           {/* Form */}
// //           <form onSubmit={handleSubmit} className="p-6 space-y-4">
// //             {/* Error message */}
// //             {error && (
// //               <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
// //                 <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
// //                 <p className="text-sm text-red-600">{error}</p>
// //               </div>
// //             )}

// //             {/* Change Type */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1.5">
// //                 Change Type <span className="text-red-500">*</span>
// //               </label>
// //               <select
// //                 value={changeType}
// //                 onChange={(e) => setChangeType(e.target.value)}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //                 required
// //               >
// //                 <option value="">Select change type...</option>
// //                 {changeTypes.map((type) => (
// //                   <option key={type.value} value={type.value}>
// //                     {type.label}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Details */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1.5">
// //                 Details <span className="text-red-500">*</span>
// //               </label>
// //               <textarea
// //                 value={details}
// //                 onChange={(e) => setDetails(e.target.value)}
// //                 placeholder="Provide detailed information about the requested change..."
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
// //                 rows={6}
// //                 required
// //                 minLength={5}
// //                 maxLength={2000}
// //               />
// //               <p className="text-xs text-gray-500 mt-1">
// //                 {details.length}/2000 characters (minimum 5)
// //               </p>
// //             </div>

// //             {/* Info note */}
// //             <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
// //               <p className="text-sm text-blue-800">
// //                 <strong>Note:</strong> Your request will be reviewed by our team. 
// //                 You will receive a notification once the request has been processed.
// //               </p>
// //             </div>

// //             {/* Buttons */}
// //             <div className="flex gap-3 pt-4">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 disabled={isLoading || !changeType || !details.trim() || details.length < 5}
// //                 className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //               >
// //                 {isLoading ? (
// //                   <>
// //                     <Loader2 className="h-5 w-5 animate-spin" />
// //                     Submitting...
// //                   </>
// //                 ) : (
// //                   'Submit Request'
// //                 )}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default PolicyChangeModal;



// import { useState } from 'react';
// import { X, Loader2, AlertCircle } from 'lucide-react';
// import { supportApi } from '../api/supportApi';
// import { useAuth } from '../context/AuthContext';
// import policyApi from '../api/policyApi';

// export function PolicyChangeModal({ isOpen, onClose, onSuccess, policies = [] }) {
//   const { user } = useAuth();

//   const [policyId, setPolicyId] = useState('');
//   const [changeType, setChangeType] = useState('');
//   const [details, setDetails] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const ticket = await supportApi.requestPolicyChange(
//         {
//           policyId: Number(policyId),
//           changeType,
//           details
//         },
//         user?.username
//       );

//       onSuccess(ticket);
//       onClose();

//       setPolicyId('');
//       setChangeType('');
//       setDetails('');

//     } catch (err) {
//       setError(err.message || 'Failed to request policy change');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">

//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Request Policy Change</h2>
//             <button onClick={onClose}>
//               <X className="h-5 w-5" />
//             </button>
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4 flex gap-2">
//               <AlertCircle className="h-5 w-5 text-red-600" />
//               <p className="text-sm text-red-600">{error}</p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">

//             {/* Policy Dropdown */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Select Policy
//               </label>
//               <select
//                 value={policyId}
//                 onChange={(e) => setPolicyId(e.target.value)}
//                 required
//                 className="w-full border rounded-lg px-4 py-2"
//               >
//                 <option value="">Choose policy</option>
//                 {policies.map(policy => (
//                   <option key={policy.id} value={policy.id}>
//                     #{policy.policyName} - {policy.policyType}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Change Type */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Change Type
//               </label>
//               <select
//                 value={changeType}
//                 onChange={(e) => setChangeType(e.target.value)}
//                 required
//                 className="w-full border rounded-lg px-4 py-2"
//               >
//                 <option value="">Select change</option>
//                 <option value="ADDRESS_UPDATE">Address Update</option>
//                 <option value="NOMINEE_CHANGE">Nominee Change</option>
//                 <option value="SUM_INSURED_UPDATE">Sum Insured Update</option>
//                 <option value="OTHER">Other</option>
//               </select>
//             </div>

//             {/* Details */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Details
//               </label>
//               <textarea
//                 value={details}
//                 onChange={(e) => setDetails(e.target.value)}
//                 rows={4}
//                 required
//                 className="w-full border rounded-lg px-4 py-2"
//                 placeholder="Describe the requested change..."
//               />
//             </div>

//             <div className="flex gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 bg-gray-200 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-indigo-600 text-white py-2 rounded-lg flex justify-center items-center"
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   'Submit Request'
//                 )}
//               </button>
//             </div>
//           </form>

//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { supportApi } from '../api/supportApi';
import { useAuth } from '../context/AuthContext';
import policyApi from '../api/policyApi';

export function PolicyChangeModal({ isOpen, onClose, onSuccess }) {
  const { user } = useAuth();

  const [policies, setPolicies] = useState([]);
  const [policyId, setPolicyId] = useState('');
  const [changeType, setChangeType] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingPolicies, setLoadingPolicies] = useState(false);

  // ✅ Fetch user policies when modal opens
  useEffect(() => {
    if (!isOpen || !user?.username) return;

    const fetchPolicies = async () => {
      try {
        setLoadingPolicies(true);
        const data = await policyApi.getMyPolicies(user.username);
        setPolicies(data);
        // console.log("Fetched policies for policy change modal:", data);
      } catch (err) {
        setError("Failed to load policies");
      } finally {
        setLoadingPolicies(false);
      }
    };

    fetchPolicies();
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const ticket = await supportApi.requestPolicyChange(
        {
          policyId: Number(policyId),
          changeType,
          details
        },
        user?.username
      );

      onSuccess(ticket);
      onClose();

      setPolicyId('');
      setChangeType('');
      setDetails('');

    } catch (err) {
      setError(err.message || 'Failed to request policy change');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Request Policy Change</h2>
            <button onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4 flex gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Policy Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Policy
              </label>

              {loadingPolicies ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading policies...
                </div>
              ) : (
                <select
                  value={policyId}
                  onChange={(e) => setPolicyId(e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Choose policy</option>
                  {policies.map(policy => (
                    <option key={policy.id} value={policy.id}>
                      {policy.policy.policyName} ({policy.policy.policyType})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Change Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Change Type
              </label>
              <select
                value={changeType}
                onChange={(e) => setChangeType(e.target.value)}
                required
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">Select change</option>
                <option value="ADDRESS_UPDATE">Address Update</option>
                <option value="NOMINEE_CHANGE">Nominee Change</option>
                <option value="SUM_INSURED_UPDATE">Sum Insured Update</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Details */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Details
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                required
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Describe the requested change..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg flex justify-center items-center"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
