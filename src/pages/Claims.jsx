import { getUserFromToken } from "../utils/jwtUtils";
import { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Loader2,
  IndianRupeeIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
// import { useNotifications } from "../context/NotificationContext";
import { claimApi } from "../api/claimApi";
import { policyApi } from "../api/policyApi";
import { Modal } from "../components/Modal";
import { cn } from "../utils/cn";

// const token = localStorage.getItem("token");
// const loggedInUser = localStorage.getItem("username") || (token ? getUserFromToken(token)?.username : null);
// console.log("Logged in user:", loggedInUser);
export function Claims() {
  const { user } = useAuth();
  // const { addNotification } = useNotifications();

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
      if (!user) return;
      try {
        const [claimsData, policiesData] = await Promise.all([
          claimApi.getUserClaims(user.username),
          policyApi.getMyPolicies(user.username),
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
  }, [user.username]);

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
        customerUsername: user.username,
        policyId: selectedPolicy.policy.id, // Correct backend ID
        claimType: formData.claimType,
        note: formData.description,
        amount: Number(formData.amount),
        documentType: formData.documentType,
        documentId: formData.documentId,
        coverageAmount: Number(formData.coverageAmount),
      };

      const newClaim = await claimApi.submitClaim(payload, user.username);

      // Add new claim to table
      setClaims((prev) => [
        {
          id: newClaim.claimId,
          userId: newClaim.customerId,
          serName: newClaim.customerUsername,
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

      // await addNotification({
      //   title: "Claim Submitted",
      //   message: `Your claim for ${selectedPolicy.policy.name} has been submitted.`,
      //   type: "info",
      // });

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

  // return (
  //   <div className="space-y-6">
  //     {/* Header */}
  //     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  //       <div>
  //         <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
  //         <p className="text-gray-500">Submit and track your insurance claims</p>
  //       </div>
  //       <button
  //         onClick={() => setShowClaimForm(true)}
  //         className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
  //       >
  //         <Plus className="h-4 w-4" />
  //         Submit New Claim
  //       </button>
  //     </div>

  //     {/* Claims Table */}
  //     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
  //       <table className="w-full">
  //         <thead className="bg-gray-50 border-b border-gray-100">
  //           <tr>
  //             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
  //               Policy Name
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
  //               Description
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
  //               Amount
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
  //               Coverage
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
  //               Status
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
  //               Policy Dates
  //             </th>
  //             <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
  //               Document
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody className="divide-y divide-gray-100">
  //           {claims.map((claim) => (
  //             <tr key={claim.id} className="hover:bg-gray-50">
  //               <td className="px-6 py-4">{claim.policyName}</td>
  //               <td className="px-6 py-4">{claim.description}</td>
  //               <td className="px-6 py-4">
  //                 <DollarSign className="inline h-4 w-4 text-gray-400 mr-1" />
  //                 {claim.amount?.toLocaleString()}
  //               </td>
  //               <td className="px-6 py-4">{claim.coverageAmount?.toLocaleString()}</td>
  //               <td className="px-6 py-4">
  //                 <span
  //                   className={cn(
  //                     "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
  //                     claim.status === "PENDING" && "bg-yellow-100 text-yellow-700",
  //                     claim.status === "APPROVED" && "bg-green-100 text-green-700",
  //                     claim.status === "REJECTED" && "bg-red-100 text-red-700"
  //                   )}
  //                 >
  //                   {getStatusIcon(claim.status)}
  //                   {claim.status}
  //                 </span>
  //               </td>
  //               <td className="px-6 py-4">
  //                 {claim.policyStartDate} - {claim.policyEndDate}
  //               </td>
  //               <td className="px-6 py-4">{claim.documentType} ({claim.documentId})</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>

  //     {/* Claim Form Modal */}
  //     <Modal isOpen={showClaimForm} onClose={() => setShowClaimForm(false)} title="Submit New Claim" size="lg">
  //       <form onSubmit={handleSubmitClaim} className="space-y-4">
  //         {/* Policy selection */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Policy</label>
  //           <select
  //             value={formData.userPolicyId}
  //             onChange={(e) => setFormData({ ...formData, userPolicyId: e.target.value })}
  //             className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
  //             required
  //           >
  //             <option value="">Choose a policy</option>
  //             {userPolicies.map((p) => (
  //               <option key={p.policy.id} value={p.policy.id}>
  //                 {p.policy.policyName} - {p.policy.policyType}
  //               </option>
  //             ))}
  //           </select>
  //         </div>

  //         {/* Claim Type */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1.5">Claim Type</label>
  //           <input type="text" value={formData.claimType} onChange={(e) => setFormData({ ...formData, claimType: e.target.value })} placeholder="Enter claim type" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
  //         </div>

  //         {/* Amount */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount ($)</label>
  //           <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} min="1" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
  //         </div>

  //         {/* Description */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
  //           <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your claim" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
  //         </div>

  //         {/* Document Type */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type</label>
  //           <input type="text" value={formData.documentType} onChange={(e) => setFormData({ ...formData, documentType: e.target.value })} placeholder="Enter document type" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
  //         </div>

  //         {/* Document ID */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1.5">Document ID</label>
  //           <input type="text" value={formData.documentId} onChange={(e) => setFormData({ ...formData, documentId: e.target.value })} placeholder="Enter document ID" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
  //         </div>

  //         {/* Coverage Amount */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1.5">Coverage Amount ($)</label>
  //           <input type="number" value={formData.coverageAmount} onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })} min="0" placeholder="Enter coverage amount" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
  //         </div>

  //         {/* Buttons */}
  //         <div className="flex gap-3 pt-4">
  //           <button type="button" onClick={() => setShowClaimForm(false)} className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg">Cancel</button>
  //           <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg">{isSubmitting ? "Submitting..." : "Submit Claim"}</button>
  //         </div>
  //       </form>
  //     </Modal>
  //   </div>
  // );

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col space-y-10">

    {/* Hero Section */}
    <section className="bg-gradient-to-br from-[#1A73E8] to-[#34A853] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          My Insurance Claims
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Submit, manage, and track the status of your insurance claims in real time.
        </p>

        <button
          onClick={() => setShowClaimForm(true)}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1A73E8] rounded-xl font-medium hover:bg-gray-100 transition shadow-md"
        >
          <Plus className="h-5 w-5" />
          Submit New Claim
        </button>
      </div>
    </section>

    {isLoading ? (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-10 w-10 text-[#1A73E8] animate-spin" />
      </div>
    ) : claims.length === 0 ? (

      /* Empty State */
      <section className="px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-16 text-center">
          <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No claims submitted yet
          </h3>
          <p className="text-gray-500 mb-6">
            Submit your first claim and track its progress here.
          </p>
          <button
            onClick={() => setShowClaimForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#1A73E8] to-[#34A853] text-white rounded-xl hover:opacity-90 transition shadow-md"
          >
            Submit First Claim
          </button>
        </div>
      </section>

    ) : (

      <>
        {/* Stats Section */}
        <section className="px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <p className="text-sm text-gray-500">Total Claims</p>
              <p className="text-2xl font-bold text-gray-900">{claims.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {claims.filter(c => c.status === "PENDING").length}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {claims.filter(c => c.status === "APPROVED").length}
              </p>
            </div>

          </div>
        </section>

        {/* Claims Cards */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto grid gap-8">

            {claims.map((claim) => (
              <div
                key={claim.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300 p-8"
              >
                <div className="flex flex-col lg:flex-row gap-8">

                  {/* Left */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {claim.policyName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {claim.description}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">

                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        ₹
                        {claim.amount?.toLocaleString()}
                      </span>

                      <span className="text-sm text-gray-500">
                        Coverage: ₹{claim.coverageAmount?.toLocaleString()}
                      </span>

                      <span className="text-sm text-gray-500">
                        {claim.policyStartDate} - {claim.policyEndDate}
                      </span>

                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full",
                        claim.status === "PENDING" && "bg-yellow-100 text-yellow-700",
                        claim.status === "APPROVED" && "bg-green-100 text-green-700",
                        claim.status === "REJECTED" && "bg-red-100 text-red-700"
                      )}
                    >
                      {getStatusIcon(claim.status)}
                      {claim.status}
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </section>
      </>
    )}

    {/* Modal */}
    <Modal
      isOpen={showClaimForm}
      onClose={() => setShowClaimForm(false)}
      title="Submit New Claim"
      size="lg"
    >
      <form onSubmit={handleSubmitClaim} className="space-y-5">

        <select
          value={formData.userPolicyId}
          onChange={(e) =>
            setFormData({ ...formData, userPolicyId: e.target.value })
          }
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
        >
          <option value="">Select Policy</option>
          {userPolicies.map((p) => (
            <option key={p.policy.id} value={p.policy.id}>
              {p.policy.policyName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Claim Type"
          value={formData.claimType}
          onChange={(e) =>
            setFormData({ ...formData, claimType: e.target.value })
          }
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
        />

        <input
          type="number"
          placeholder="Claim Amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
        />

        <textarea
          rows={4}
          placeholder="Describe your claim..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
        />

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowClaimForm(false)}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[#1A73E8] to-[#34A853] text-white rounded-xl"
          >
            {isSubmitting ? "Submitting..." : "Submit Claim"}
          </button>
        </div>

      </form>
    </Modal>

  </div>
);

}
