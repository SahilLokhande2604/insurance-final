import Footer from "../components/FooterNew.jsx";
// import Navbar from "../components/NavbarNew.jsx";
// import { useState, useEffect } from "react";
import Navbar from "../components/NavbarNew.jsx";
import { useState, useEffect } from "react";
import { Search, Filter, Shield, Loader2 } from "lucide-react";
import { policyApi } from "../api/policyApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";
import { PolicyCard } from "../components/PolicyCard.jsx";
import { PaymentModal } from "../components/PaymentModal.jsx";


export function Policies() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [policies, setPolicies] = useState([]);
  const [userPolicies, setUserPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  

  const policyTypes = [
    "all",
    "Health Insurance",
    "Life Insurance",
    "Auto Insurance",
    "Home Insurance",
    "Travel Insurance",
  ];


  // const token = localStorage.getItem("token");
  // const loggedInUser = localStorage.getItem("username") || (token ? getUserFromToken(token)?.username : null);
  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const allPolicies = await policyApi.getAllPolicies();
      setPolicies(allPolicies);

      const myPolicies = await policyApi.getMyPolicies(user.username);
      setUserPolicies(myPolicies);

    } catch (error) {
      console.error("Failed to fetch policies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);


  // ✅ MATCHING BACKEND FIELDS
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.policyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyId;

    const matchesType =
      selectedType === "all" || policy.policyName === selectedType;

    return matchesSearch && matchesType;
  });

  const isPurchased = (policyId) => {
    return userPolicies.some(
      (up) => up.policy?.id === policyId && up.status === "ACTIVE"
    );
  };

   const handlePurchase = (policy) => {
     setSelectedPolicy(policy);
     setShowPaymentModal(true);
   };

   const handleViewDetails = (policy) => {
     setSelectedPolicy(policy);
     setShowDetailsModal(true);
   };

  const handlePaymentComplete = async (success) => {
  if (success && selectedPolicy) {
    try {
      // ✅ Just refresh policies from backend
      const policies = await policyApi.getMyPolicies(user.username);

      setUserPolicies(policies);

      await addNotification({
        title: "Policy Purchased!",
        message: `You have successfully purchased ${selectedPolicy.policyType}.`,
        type: "success",
      });
    } catch (error) {
      console.error("Fetching policies failed:", error);
    }
  } else if (!success) {
    await addNotification({
      title: "Payment Failed",
      message: "Your payment could not be processed. Please try again.",
      type: "error",
    });
  }

  setShowPaymentModal(false);
  setSelectedPolicy(null);
};


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    {/* Hero Section */}
    <section className="bg-gradient-to-br from-[#1A73E8] to-[#34A853] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Insurance Policies
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Secure your future with flexible, affordable, and trusted coverage plans.
        </p>
      </div>
    </section>

    {/* Filters Section */}
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full lg:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search policies..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A73E8] outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A73E8] outline-none bg-white"
            >
              {policyTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>

    {/* Policies Grid */}
    <section className="pb-16 px-4">
      <div className="max-w-7xl mx-auto">

        {filteredPolicies.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-16 text-center">
            <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No policies found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
              >
                <PolicyCard
                  policy={policy}
                  isPurchased={isPurchased(policy.id)}
                  onPurchase={() => handlePurchase(policy)}
                  onViewDetails={() => handleViewDetails(policy)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>

    {/* Details Modal */}
    {showDetailsModal && selectedPolicy && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            onClick={() => setShowDetailsModal(false)}
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-3 text-[#1A73E8]">
            {selectedPolicy.name || selectedPolicy.id}
          </h2>

          <p className="text-gray-600 mb-4">
            {selectedPolicy.description}
          </p>

          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-semibold">Coverage:</span> ₹
              {selectedPolicy.coverageAmount?.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Premium:</span> ₹
              {selectedPolicy.premiumAmount}/month
            </p>
          </div>

          <button
            className="mt-6 w-full bg-gradient-to-r from-[#1A73E8] to-[#34A853] text-white py-2.5 rounded-xl hover:opacity-90 transition"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}

    {/* Payment Modal */}
    <PaymentModal
      isOpen={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      policy={selectedPolicy}
      onPaymentComplete={handlePaymentComplete}
    />

    <Footer/>
  </div>
);

}

export default Policies;
