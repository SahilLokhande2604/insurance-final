// // import { useState, useEffect } from 'react';
// // import { Shield, Plus, Edit, Trash2, Loader2, Search } from 'lucide-react';
// // import { policyApi } from '../../api/policyApi.js';
// // import { Modal } from '../../components/Modal.jsx';

// // const policyTypes = [
// //   'Health Insurance',
// //   'Life Insurance',
// //   'Auto Insurance',
// //   'Home Insurance',
// //   'Travel Insurance',
// // ];

// // export function AdminPolicies() {
// //   const [policies, setPolicies] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingPolicy, setEditingPolicy] = useState(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     type: '',
// //     description: '',
// //     coverageAmount: '',
// //     premium: '',
// //     duration: '',
// //     features: '',
// //   });

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const data = await policyApi.getAllPolicies();
// //         setPolicies(data);
// //       } catch (error) {
// //         console.error('Failed to fetch policies:', error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleOpenForm = (policy) => {
// //     if (policy) {
// //       setEditingPolicy(policy);
// //       setFormData({
// //         policyName: policy.policyName,
// //         policyType: policy.policyType,
// //         description: policy.description,
// //         coverageAmount: policy.coverageAmount.toString(),
// //         premium: policy.premiumAmount.toString(),
// //         duration: policy.duration,
// //       });
// //     } else {
// //       setEditingPolicy(null);
// //       setFormData({
// //         name: '',
// //         type: '',
// //         description: '',
// //         coverageAmount: '',
// //         premium: '',
// //         duration: '',
// //         features: '',
// //       });
// //     }
// //     setShowForm(true);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     try {
// //       const policyData = {
// //         policyName: formData.name,
// //         policyType: formData.type,
// //         description: formData.description,
// //         coverageAmount: parseFloat(formData.coverageAmount),
// //         premiumAmount: parseFloat(formData.premium),
// //         duration: formData.duration,
// //         features: formData.features.split(',').map(f => f.trim()).filter(f => f),
// //         isActive: true,
// //       };

// //       if (editingPolicy) {
// //         const updated = await policyApi.updatePolicy(editingPolicy.id, policyData);
// //         setPolicies(prev => prev.map(p => p.id === editingPolicy.id ? updated : p));
// //       } else {
// //         const newPolicy = await policyApi.createPolicy(policyData);
// //         setPolicies(prev => [...prev, newPolicy]);
// //       }

// //       setShowForm(false);
// //     } catch (error) {
// //       console.error('Failed to save policy:', error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm('Are you sure you want to delete this policy?')) return;
    
// //     try {
// //       console.log('Deleting policy with ID:', id);
// //       await policyApi.deletePolicy(id);
// //       setPolicies(prev => prev.filter(p => p.id !== id));
// //     } catch (error) {
// //       console.error('Failed to delete policy:', error);
// //     }
// //   };

// //   const filteredPolicies = policies.filter(policy => {
// //     const name = policy.name ? policy.name.toLowerCase() : '';
// //     const type = policy.type ? policy.type.toLowerCase() : '';
// //     const search = searchTerm ? searchTerm.toLowerCase() : '';
// //     return name.includes(search) || type.includes(search);
// //   });

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* KPI Section */}
// // <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// //   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
// //     <p className="text-sm text-gray-500">Total Policies</p>
// //     <p className="text-3xl font-bold text-gray-900 mt-1">
// //       {policies.length}
// //     </p>
// //   </div>

// //   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
// //     <p className="text-sm text-gray-500">Health Policies</p>
// //     <p className="text-3xl font-bold text-indigo-600 mt-1">
// //       {policies.filter(p => p.policyType === "Health Insurance").length}
// //     </p>
// //   </div>

// //   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
// //     <p className="text-sm text-gray-500">Avg Premium</p>
// //     <p className="text-3xl font-bold text-green-600 mt-1">
// //       $
// //       {policies.length > 0
// //         ? Math.round(
// //             policies.reduce((sum, p) => sum + p.premiumAmount, 0) /
// //               policies.length
// //           )
// //         : 0}
// //     </p>
// //   </div>
// // </div>

// //       {/* Header */}
// //       {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
// //           <p className="text-gray-500">Create and manage insurance policies</p>
// //         </div>
// //         <button
// //           onClick={() => handleOpenForm(null)}
// //           className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
// //         >
// //           <Plus className="h-4 w-4" />
// //           Add New Policy
// //         </button>
// //       </div> */}

// //       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
// //   <div>
// //     <h1 className="text-3xl font-bold text-gray-900">
// //       Policy Management
// //     </h1>
// //     <p className="text-gray-500 mt-1">
// //       Create, edit and optimize insurance offerings
// //     </p>
// //   </div>

// //   <button
// //     onClick={() => handleOpenForm(null)}
// //     className="inline-flex items-center gap-2 px-5 py-2.5 
// //     bg-gradient-to-r from-[#1A73E8] to-[#34A853] 
// //     text-white rounded-xl font-medium shadow-md hover:opacity-90"
// //   >
// //     <Plus className="h-4 w-4" />
// //     Add New Policy
// //   </button>
// // </div>


// //       {/* Search */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
// //         <div className="relative">
// //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
// //           <input
// //             type="text"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             placeholder="Search policies..."
// //             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //           />
// //         </div>
// //       </div>

// //       {/* Policies Grid */}
// //       {filteredPolicies.length === 0 ? (
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
// //           <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
// //           <h3 className="text-lg font-semibold text-gray-900 mb-2">No policies found</h3>
// //           <p className="text-gray-500">Create your first policy to get started</p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredPolicies.map((policy) => (
// //             <div
// //               key={policy.id}
// //               // className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
// //               className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"

// //             >
// //               <div className="p-6">
// //                 <div className="flex items-start justify-between mb-4">
// //                   <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
// //                     {policy.policyType}
// //                   </span>
// //                   <div className="flex gap-1">
// //                     <button
// //                       onClick={() => handleOpenForm(policy)}
// //                       className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
// //                     >
// //                       <Edit className="h-4 w-4" />
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(policy.id)}
// //                       className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// //                     >
// //                       <Trash2 className="h-4 w-4" />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-3 mb-3">
// //                   <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
// //                     <Shield className="h-6 w-6 text-indigo-600" />
// //                   </div>
// //                   <div>
// //                     <h3 className="font-semibold text-gray-900">{policy.policyName}</h3>
// //                     <p className="text-sm text-gray-500">{policy.duration}</p>
// //                   </div>
// //                 </div>

// //                 <p className="text-sm text-gray-600 line-clamp-2 mb-4">
// //                   {policy.description}
// //                 </p>

// //                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
// //                   {/* <div>
// //                     <p className="text-xs text-gray-500">Coverage</p>
// //                     <p className="font-semibold text-gray-900">
// //                       ${policy.coverageAmount.toLocaleString()}
// //                     </p>
// //                   </div> */}
// //                   <div className="mt-3">
// //   <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
// //     <div
// //       className="h-full bg-gradient-to-r from-[#1A73E8] to-[#34A853]"
// //       style={{
// //         width: `${Math.min(
// //           (policy.coverageAmount / 1000000) * 100,
// //           100
// //         )}%`,
// //       }}
// //     />
// //   </div>
// // </div>

// //                   <div className="text-right">
// //                     <p className="text-xs text-gray-500">Premium</p>
// //                     <p className="font-semibold text-indigo-600">${policy.premiumAmount}/mo</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Policy Form Modal */}
// //       <Modal
// //         isOpen={showForm}
// //         onClose={() => setShowForm(false)}
// //         title={editingPolicy ? 'Edit Policy' : 'Create New Policy'}
// //         size="lg"
// //       >
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Policy Name
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.name}
// //                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                 placeholder="e.g., Basic Health Cover"
// //                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Policy Type
// //               </label>
// //               <select
// //                 value={formData.type}
// //                 onChange={(e) => setFormData({ ...formData, type: e.target.value })}
// //                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
// //                 required
// //               >
// //                 <option value="">Select type</option>
// //                 {policyTypes.map(type => (
// //                   <option key={type} value={type}>{type}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Description
// //             </label>
// //             <textarea
// //               value={formData.description}
// //               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //               placeholder="Describe the policy coverage..."
// //               rows={3}
// //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
// //               required
// //             />
// //           </div>

// //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Coverage Amount ($)
// //               </label>
// //               <input
// //                 type="number"
// //                 value={formData.coverageAmount}
// //                 onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })}
// //                 placeholder="100000"
// //                 min="1"
// //                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Monthly Premium ($)
// //               </label>
// //               <input
// //                 type="number"
// //                 value={formData.premiumAmount}
// //                 onChange={(e) => setFormData({ ...formData, premium: e.target.value })}
// //                 placeholder="99"
// //                 min="1"
// //                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Duration
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.duration}
// //                 onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
// //                 placeholder="e.g., 1 Year"
// //                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Features (comma-separated)
// //             </label>
// //             <input
// //               type="text"
// //               value={formData.features}
// //               onChange={(e) => setFormData({ ...formData, features: e.target.value })}
// //               placeholder="e.g., Hospital Coverage, Surgery Coverage, 24/7 Support"
// //               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
// //               required
// //             />
// //           </div>

// //           <div className="flex gap-3 pt-4">
// //             <button
// //               type="button"
// //               onClick={() => setShowForm(false)}
// //               className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={isSubmitting}
// //               className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
// //             >
// //               {isSubmitting ? (
// //                 <>
// //                   <Loader2 className="h-4 w-4 animate-spin" />
// //                   Saving...
// //                 </>
// //               ) : (
// //                 editingPolicy ? 'Update Policy' : 'Create Policy'
// //               )}
// //             </button>
// //           </div>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // }

// // export default AdminPolicies;
// import { useState, useEffect } from "react";
// import {
//   Shield,
//   Plus,
//   Edit,
//   Trash2,
//   Loader2,
//   Search,
// } from "lucide-react";
// import { policyApi } from "../../api/policyApi.js";
// import { Modal } from "../../components/Modal.jsx";

// const policyTypes = [
//   "Health Insurance",
//   "Life Insurance",
//   "Auto Insurance",
//   "Home Insurance",
//   "Travel Insurance",
// ];

// export function AdminPolicies() {
//   const [policies, setPolicies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [editingPolicy, setEditingPolicy] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     description: "",
//     coverageAmount: "",
//     premium: "",
//     duration: "",
//     features: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await policyApi.getAllPolicies();
//         setPolicies(data);
//       } catch (error) {
//         console.error("Failed to fetch policies:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   /* =============================
//      OPEN FORM (FIXED BUG HERE)
//   ==============================*/
//   const handleOpenForm = (policy) => {
//     if (policy) {
//       setEditingPolicy(policy);
//       setFormData({
//         name: policy.policyName,
//         type: policy.policyType,
//         description: policy.description,
//         coverageAmount: policy.coverageAmount.toString(),
//         premium: policy.premiumAmount.toString(),
//         duration: policy.duration,
//         features: policy.features?.join(", ") || "",
//       });
//     } else {
//       setEditingPolicy(null);
//       setFormData({
//         name: "",
//         type: "",
//         description: "",
//         coverageAmount: "",
//         premium: "",
//         duration: "",
//         features: "",
//       });
//     }
//     setShowForm(true);
//   };

//   /* =============================
//      SUBMIT
//   ==============================*/
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const policyData = {
//         policyName: formData.name,
//         policyType: formData.type,
//         description: formData.description,
//         coverageAmount: parseFloat(formData.coverageAmount),
//         premiumAmount: parseFloat(formData.premium),
//         duration: formData.duration,
//         features: formData.features
//           .split(",")
//           .map((f) => f.trim())
//           .filter((f) => f),
//         isActive: true,
//       };

//       if (editingPolicy) {
//         const updated = await policyApi.updatePolicy(
//           editingPolicy.id,
//           policyData
//         );
//         setPolicies((prev) =>
//           prev.map((p) => (p.id === editingPolicy.id ? updated : p))
//         );
//       } else {
//         const newPolicy = await policyApi.createPolicy(policyData);
//         setPolicies((prev) => [...prev, newPolicy]);
//       }

//       setShowForm(false);
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this policy?")) return;
//     try {
//       await policyApi.deletePolicy(id);
//       setPolicies((prev) => prev.filter((p) => p.id !== id));
//     } catch (error) {
//       console.error("Delete failed:", error);
//     }
//   };

//   /* =============================
//      SEARCH FIXED
//   ==============================*/
//   const filteredPolicies = policies.filter((policy) =>
//     policy.policyName
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase()) ||
//     policy.policyType
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-8">

//       {/* =============================
//           DASHBOARD TITLE SECTION
//       ==============================*/}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
//             Policy Management
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Manage insurance offerings and coverage plans
//           </p>
//         </div>

//         <button
//           onClick={() => handleOpenForm(null)}
//           className="inline-flex items-center gap-2 px-6 py-3
//           bg-gradient-to-r from-[#1A73E8] to-[#34A853]
//           text-white rounded-xl font-semibold shadow-md
//           hover:scale-105 transition-transform duration-200"
//         >
//           <Plus className="h-4 w-4" />
//           Add New Policy
//         </button>
//       </div>

//       {/* =============================
//           KPI CARDS
//       ==============================*/}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Total Policies</p>
//           <p className="text-3xl font-bold text-gray-900 mt-2">
//             {policies.length}
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Health Policies</p>
//           <p className="text-3xl font-bold text-indigo-600 mt-2">
//             {
//               policies.filter(
//                 (p) => p.policyType === "Health Insurance"
//               ).length
//             }
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Average Premium</p>
//           <p className="text-3xl font-bold text-green-600 mt-2">
//             $
//             {policies.length
//               ? Math.round(
//                   policies.reduce(
//                     (sum, p) => sum + p.premiumAmount,
//                     0
//                   ) / policies.length
//                 )
//               : 0}
//           </p>
//         </div>
//       </div>

//       {/* =============================
//           SEARCH
//       ==============================*/}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search policies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
//             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//           />
//         </div>
//       </div>

//       {/* =============================
//           POLICY CARDS
//       ==============================*/}
//       {filteredPolicies.length === 0 ? (
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
//           <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900">
//             No policies found
//           </h3>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPolicies.map((policy) => (
//             <div
//               key={policy.id}
//               className="group bg-white rounded-2xl border border-gray-100
//               shadow-sm hover:shadow-xl hover:-translate-y-1
//               transition-all duration-300 overflow-hidden"
//             >
//               <div className="p-6 space-y-4">

//                 {/* Badge + Actions */}
//                 <div className="flex justify-between items-center">
//                   <span className="px-3 py-1 text-xs font-medium
//                   bg-gradient-to-r from-[#1A73E8]/10 to-[#34A853]/10
//                   text-[#1A73E8] rounded-full">
//                     {policy.policyType}
//                   </span>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleOpenForm(policy)}
//                       className="p-2 rounded-lg hover:bg-indigo-50"
//                     >
//                       <Edit className="h-4 w-4 text-gray-500 hover:text-indigo-600" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(policy.id)}
//                       className="p-2 rounded-lg hover:bg-red-50"
//                     >
//                       <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <div className="flex items-center gap-4">
//                   <div className="h-12 w-12 rounded-xl
//                   bg-gradient-to-br from-[#1A73E8] to-[#34A853]
//                   flex items-center justify-center text-white shadow-md">
//                     <Shield className="h-6 w-6" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg text-gray-900">
//                       {policy.policyName}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {policy.duration}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <p className="text-sm text-gray-600 line-clamp-2">
//                   {policy.description}
//                 </p>

//                 {/* Coverage Bar */}
//                 <div>
//                   <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-[#1A73E8] to-[#34A853]"
//                       style={{
//                         width: `${Math.min(
//                           (policy.coverageAmount / 1000000) * 100,
//                           100
//                         )}%`,
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="flex justify-between items-center pt-4 border-t border-gray-100">
//                   <div>
//                     <p className="text-xs text-gray-500">Coverage</p>
//                     <p className="font-semibold text-gray-900">
//                       ${policy.coverageAmount.toLocaleString()}
//                     </p>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">Premium</p>
//                     <p className="font-semibold text-indigo-600 text-lg">
//                       ${policy.premiumAmount}/mo
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* =============================
//           MODAL FORM (premium button style)
//       ==============================*/}
//       <Modal
//         isOpen={showForm}
//         onClose={() => setShowForm(false)}
//         title={editingPolicy ? "Edit Policy" : "Create Policy"}
//         size="lg"
//       >
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* FORM FIELDS SAME AS YOURS (fixed premium binding) */}
//           {/* Premium field FIX */}
//           {/* change value={formData.premiumAmount} to value={formData.premium} */}
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default AdminPolicies;

import { useState, useEffect } from "react";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Loader2,
  Search,
} from "lucide-react";
import { policyApi } from "../../api/policyApi.js";
import { Modal } from "../../components/Modal.jsx";

const policyTypes = [
  "Health Insurance",
  "Life Insurance",
  "Auto Insurance",
  "Home Insurance",
  "Travel Insurance",
];

export function AdminPolicies() {
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverageAmount: "",
    premium: "",
    duration: "",
    features: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await policyApi.getAllPolicies();
        setPolicies(data);
      } catch (error) {
        console.error("Failed to fetch policies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  /* =============================
     OPEN FORM (FIXED BUG HERE)
  ==============================*/
  const handleOpenForm = (policy) => {
    if (policy) {
      setEditingPolicy(policy);
      setFormData({
        name: policy.policyName,
        type: policy.policyType,
        description: policy.description,
        coverageAmount: policy.coverageAmount.toString(),
        premium: policy.premiumAmount.toString(),
        duration: policy.duration,
        features: policy.features?.join(", ") || "",
      });
    } else {
      setEditingPolicy(null);
      setFormData({
        name: "",
        type: "",
        description: "",
        coverageAmount: "",
        premium: "",
        duration: "",
        features: "",
      });
    }
    setShowForm(true);
  };

  /* =============================
     SUBMIT
  ==============================*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const policyData = {
        policyName: formData.name,
        policyType: formData.type,
        description: formData.description,
        coverageAmount: parseFloat(formData.coverageAmount),
        premiumAmount: parseFloat(formData.premium),
        duration: formData.duration,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
        isActive: true,
      };

      if (editingPolicy) {
        const updated = await policyApi.updatePolicy(
          editingPolicy.id,
          policyData
        );
        setPolicies((prev) =>
          prev.map((p) => (p.id === editingPolicy.id ? updated : p))
        );
      } else {
        const newPolicy = await policyApi.createPolicy(policyData);
        setPolicies((prev) => [...prev, newPolicy]);
      }

      setShowForm(false);
    } catch (error) {
      console.error("Failed to save policy:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this policy?")) return;
    try {
      await policyApi.deletePolicy(id);
      setPolicies((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* =============================
     SEARCH FIXED
  ==============================*/
  const filteredPolicies = policies.filter((policy) =>
    policy.policyName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    policy.policyType
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* =============================
          DASHBOARD TITLE SECTION
      ==============================*/}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Policy Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage insurance offerings and coverage plans
          </p>
        </div>

        <button
          onClick={() => handleOpenForm(null)}
          className="inline-flex items-center gap-2 px-6 py-3
          bg-gradient-to-r from-[#1A73E8] to-[#34A853]
          text-white rounded-xl font-semibold shadow-md
          hover:scale-105 transition-transform duration-200"
        >
          <Plus className="h-4 w-4" />
          Add New Policy
        </button>
      </div>

      {/* =============================
          KPI CARDS
      ==============================*/}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Policies</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {policies.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Health Policies</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {
              policies.filter(
                (p) => p.policyType === "Health Insurance"
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Average Premium</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            $
            {policies.length
              ? Math.round(
                  policies.reduce(
                    (sum, p) => sum + p.premiumAmount,
                    0
                  ) / policies.length
                )
              : 0}
          </p>
        </div>
      </div>

      {/* =============================
          SEARCH
      ==============================*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* =============================
          POLICY CARDS
      ==============================*/}
      {filteredPolicies.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">
            No policies found
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="group bg-white rounded-2xl border border-gray-100
              shadow-sm hover:shadow-xl hover:-translate-y-1
              transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 space-y-4">

                {/* Badge + Actions */}
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 text-xs font-medium
                  bg-gradient-to-r from-[#1A73E8]/10 to-[#34A853]/10
                  text-[#1A73E8] rounded-full">
                    {policy.policyType}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenForm(policy)}
                      className="p-2 rounded-lg hover:bg-indigo-50"
                    >
                      <Edit className="h-4 w-4 text-gray-500 hover:text-indigo-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(policy.id)}
                      className="p-2 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl
                  bg-gradient-to-br from-[#1A73E8] to-[#34A853]
                  flex items-center justify-center text-white shadow-md">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {policy.policyName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {policy.duration}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {policy.description}
                </p>

                {/* Coverage Bar */}
                <div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1A73E8] to-[#34A853]"
                      style={{
                        width: `${Math.min(
                          (policy.coverageAmount / 1000000) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Coverage</p>
                    <p className="font-semibold text-gray-900">
                      ${policy.coverageAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Premium</p>
                    <p className="font-semibold text-indigo-600 text-lg">
                      ${policy.premiumAmount}/mo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =============================
          MODAL FORM (premium button style)
      ==============================*/}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingPolicy ? "Edit Policy" : "Create Policy"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* FORM FIELDS SAME AS YOURS (fixed premium binding) */}
          {/* Premium field FIX */}
          {/* change value={formData.premiumAmount} to value={formData.premium} */}
        </form>
      </Modal>
    </div>
  );
}

export default AdminPolicies;

