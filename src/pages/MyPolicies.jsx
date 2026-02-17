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
import { useAuth } from "../context/AuthContext.jsx";
import { PolicyChangeModal } from "../components/PolicyChangeModal.jsx";
import {supportApi} from "../api/supportApi.js";

export function MyPolicies() {
  const [userPolicies, setUserPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   const { user } = useAuth();

   const [showChangeModal, setShowChangeModal] = useState(false);
// const [userPolicies, setUserPolicies] = useState([]);



  // const username = localStorage.getItem("username"); // Ensure this is set on login

  useEffect(() => {
  const fetchPolicies = async () => {
    const data = await policyApi.getMyPolicies(user.username);
    setUserPolicies(data);
  };

  fetchPolicies();
}, []);


  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.warn("No username found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const data = await policyApi.getMyPolicies(user.username);
        console.log("Fetched policies:", data); // Debug
        setUserPolicies(data);
      } catch (error) {
        console.error("Failed to fetch policies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.username]);

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

  // return (
  //   <div className="space-y-4">
  //     {userPolicies.map((up, index) => (
  //       <div key={up.id ?? index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
  //         <div className="flex flex-col lg:flex-row lg:items-center gap-6">
  //           <div className="flex items-start gap-4 flex-1">
  //             <div className="h-14 w-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
  //               <Shield className="h-7 w-7 text-indigo-600" />
  //             </div>
  //             <div className="flex-1 min-w-0">
  //               <div className="flex items-center gap-2 mb-1">
  //                 <h3 className="font-semibold text-gray-900">
  //                   {up.policy?.policyName || "Unknown Policy"}
  //                 </h3>
  //                 {isExpiringSoon(up.expiryDate) && (
  //                   <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
  //                     <AlertTriangle className="h-3 w-3" />
  //                     Expiring Soon
  //                   </span>
  //                 )}
  //               </div>
  //               <p className="text-sm text-gray-500 mb-2">
  //                 {up.policy?.policyType || "-"}
  //               </p>
  //               <p className="text-sm text-gray-600">
  //                 {up.policy?.description || "No description available"}
  //               </p>
  //             </div>
  //           </div>

  //           <div className="flex flex-wrap gap-6 lg:gap-8">
  //             <div>
  //               <p className="text-xs text-gray-500 mb-1">Coverage</p>
  //               <p className="font-semibold text-gray-900">
  //                 ${(up.policy?.coverageAmount ?? 0).toLocaleString()}
  //               </p>
  //             </div>
  //             <div>
  //               <p className="text-xs text-gray-500 mb-1">Premium</p>
  //               <p className="font-semibold text-indigo-600">
  //                 ${(up.policy?.premiumAmount ?? 0).toLocaleString()}
  //               </p>
  //             </div>
  //             <div>
  //               <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
  //               <p className="font-medium text-gray-900 flex items-center gap-1">
  //                 <Calendar className="h-4 w-4 text-gray-400" />
  //                 {up.purchaseDate
  //                   ? new Date(up.purchaseDate).toLocaleDateString()
  //                   : "-"}
  //               </p>
  //             </div>
  //             <div>
  //               <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
  //               <p
  //                 className={cn(
  //                   "font-medium flex items-center gap-1",
  //                   isExpiringSoon(up.expiryDate) ? "text-yellow-600" : "text-gray-900"
  //                 )}
  //               >
  //                 <Calendar className="h-4 w-4 text-gray-400" />
  //                 {up.expiryDate
  //                   ? new Date(up.expiryDate).toLocaleDateString()
  //                   : "-"}
  //               </p>
  //             </div>
  //             <div>
  //               <p className="text-xs text-gray-500 mb-1">Status</p>
  //               <span
  //                 className={cn(
  //                   "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full",
  //                   up.status === "ACTIVE"
  //                     ? "bg-green-100 text-green-700"
  //                     : "bg-red-100 text-red-700"
  //                 )}
  //               >
  //                 <CheckCircle className="h-3 w-3" />
  //                 {up.status ?? "-"}
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col space-y-10">

    {/* Hero Section */}
    <section className="bg-gradient-to-br from-[#1A73E8] to-[#34A853] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          My Insurance Policies
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          View, manage, and track all your active insurance policies in one place.
        </p>
      </div>
    </section>

    {/* Loading */}
    {isLoading ? (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-10 w-10 text-[#1A73E8] animate-spin" />
      </div>
    ) : !userPolicies || userPolicies.length === 0 ? (

      /* Empty State */
      <section className="px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-16 text-center">
          <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No policies yet
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't purchased any insurance policies yet.
          </p>

          <Link
            to="/policies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A73E8] to-[#34A853] text-white rounded-xl font-medium hover:opacity-90 transition shadow-md"
          >
            Browse Policies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    ) : (

      <>
        {/* Stats Section */}
        <section className="px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Total Policies</p>
              <p className="text-2xl font-bold text-gray-900">
                {userPolicies.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Active Policies</p>
              <p className="text-2xl font-bold text-green-600">
                {userPolicies.filter(p => p.status === "ACTIVE").length}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600">
                {userPolicies.filter(p => isExpiringSoon(p.expiryDate)).length}
              </p>
            </div>

          </div>
        </section>

        {/* Policies List */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto grid gap-8">

            {userPolicies.map((up, index) => (
              <div
                key={up.id ?? index}
                className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300 p-8"
              >
                <div className="flex flex-col lg:flex-row gap-8">

                  {/* Left Section */}
                  <div className="flex items-start gap-5 flex-1">
                    <div className="h-16 w-16 bg-[#1A73E8]/10 rounded-2xl flex items-center justify-center">
                      <Shield className="h-8 w-8 text-[#1A73E8]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {up.policy?.policyName || "Unknown Policy"}
                        </h3>

                        {isExpiringSoon(up.expiryDate) && (
                          <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                            <AlertTriangle className="h-3 w-3" />
                            Expiring Soon
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mb-2">
                        {up.policy?.policyType || "-"}
                      </p>

                      <p className="text-gray-600">
                        {up.policy?.description || "No description available"}
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Coverage</p>
                      <p className="font-semibold text-gray-900">
                        ₹{(up.policy?.coverageAmount ?? 0).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Premium</p>
                      <p className="font-semibold text-[#1A73E8]">
                        ₹{(up.policy?.premiumAmount ?? 0).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Purchase</p>
                      <p className="flex items-center gap-1 text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {up.purchaseDate
                          ? new Date(up.purchaseDate).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Expiry</p>
                      <p
                        className={cn(
                          "flex items-center gap-1 font-medium",
                          isExpiringSoon(up.expiryDate)
                            ? "text-yellow-600"
                            : "text-gray-900"
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
                          "inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full",
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
                <button
  onClick={() => setShowChangeModal(true)}
  className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
>
  Request Policy Change
</button>
<PolicyChangeModal
  isOpen={showChangeModal}
  onClose={() => setShowChangeModal(false)}
  policies={userPolicies}
  onSuccess={() => {
    alert("Policy change request submitted");
  }}
/>

              </div>
            ))}

          </div>
        </section>
      </>
    )}
  </div>
);

}

export default MyPolicies;
