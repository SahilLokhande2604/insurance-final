// import { useState, useEffect } from 'react';
// import { Search, Filter, Shield, Loader2 } from 'lucide-react';
// import { policyApi } from '../api/policyApi.js';
// import { useAuth } from '../context/AuthContext.jsx';
// import { useNotifications } from '../context/NotificationContext.jsx';
// import { PolicyCard } from '../components/PolicyCard.jsx';
// import { PaymentModal } from '../components/PaymentModal.jsx';

// export function Policies() {
//   const { user } = useAuth();
//   const { addNotification } = useNotifications();
  
//   const [policies, setPolicies] = useState([]);
//   const [userPolicies, setUserPolicies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedType, setSelectedType] = useState('all');
//   const [selectedPolicy, setSelectedPolicy] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   const policyTypes = ['all', 'Health Insurance', 'Life Insurance', 'Auto Insurance', 'Home Insurance', 'Travel Insurance'];
//   const userId = user?.id || user?.username || '2';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [allPolicies, myPolicies] = await Promise.all([
//           policyApi.getAllPolicies(),
//           policyApi.getUserPolicies(userId),
//         ]);
//         setPolicies(allPolicies);
//         setUserPolicies(myPolicies);
//       } catch (error) {
//         console.error('Failed to fetch policies:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const filteredPolicies = policies.filter(policy => {
//     const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          policy.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = selectedType === 'all' || policy.type === selectedType;
//     return matchesSearch && matchesType;
//   });

//   const isPurchased = (policyId) => {
//     return userPolicies.some(up => up.policyId === policyId && up.isActive);
//   };

//   const handlePurchase = (policy) => {
//     setSelectedPolicy(policy);
//     setShowPaymentModal(true);
//   };

//   const handlePaymentComplete = async (success) => {
//     if (success && selectedPolicy) {
//       try {
//         const result = await policyApi.purchasePolicy(userId, selectedPolicy.id);
//         setUserPolicies(prev => [...prev, result.userPolicy]);
//         await addNotification({
//           title: 'Policy Purchased!',
//           message: `You have successfully purchased ${selectedPolicy.name}. Your coverage is now active.`,
//           type: 'success',
//         });
//       } catch (error) {
//         console.error('Purchase failed:', error);
//       }
//     } else if (!success) {
//       await addNotification({
//         title: 'Payment Failed',
//         message: 'Your payment could not be processed. Please try again.',
//         type: 'error',
//       });
//     }
//     setShowPaymentModal(false);
//     setSelectedPolicy(null);
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
//           <h1 className="text-2xl font-bold text-gray-900">Insurance Policies</h1>
//           <p className="text-gray-500">Browse and purchase insurance plans that suit your needs</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Search */}
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search policies..."
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//             />
//           </div>

//           {/* Type filter */}
//           <div className="flex items-center gap-2">
//             <Filter className="h-5 w-5 text-gray-400" />
//             <select
//               value={selectedType}
//               onChange={(e) => setSelectedType(e.target.value)}
//               className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
//             >
//               {policyTypes.map(type => (
//                 <option key={type} value={type}>
//                   {type === 'all' ? 'All Types' : type}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Policies Grid */}
//       {filteredPolicies.length === 0 ? (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//           <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No policies found</h3>
//           <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredPolicies.map(policy => (
//             <PolicyCard
//               key={policy.id}
//               policy={policy}
//               isPurchased={isPurchased(policy.id)}
//               onPurchase={() => handlePurchase(policy)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Payment Modal */}
//       <PaymentModal
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         policy={selectedPolicy}
//         onPaymentComplete={handlePaymentComplete}
//       />
//     </div>
//   );
// }

// export default Policies;

import { useState, useEffect } from "react";
import { Search, Filter, Shield, Loader2 } from "lucide-react";
import { policyApi } from "../api/policyApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";
import { PolicyCard } from "../components/PolicyCard.jsx";
import { PaymentModal } from "../components/PaymentModal.jsx";
import { getUserFromToken } from "../utils/jwtUtils";
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

  const policyTypes = [
    "all",
    "Health Insurance",
    "Life Insurance",
    "Auto Insurance",
    "Home Insurance",
    "Travel Insurance",
  ];

  // ⚠️ Backend expects Long userId
  // const userId = user?.id ? Number(user.id) : 2;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const allPolicies = await policyApi.getAllPolicies();
  //       setPolicies(allPolicies);

  //       // fetch user policies only if userId exists
  //       if (userId) {
  //         const myPolicies = await policyApi.getUserPolicies(userId);
  //         setUserPolicies(myPolicies);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch policies:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [userId]);

  const token = localStorage.getItem("token");
  const loggedInUser = localStorage.getItem("username") || (token ? getUserFromToken(token)?.username : null);
  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const allPolicies = await policyApi.getAllPolicies();
      setPolicies(allPolicies);

      const myPolicies = await policyApi.getMyPolicies(loggedInUser);
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
      policy.policyType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" || policy.policyType === selectedType;

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

  // const handlePaymentComplete = async (success) => {
  //   if (success && selectedPolicy) {
  //     try {
  //       // const result = await policyApi.purchasePolicy(
  //       //   userId,
  //       //   selectedPolicy.id
  //       // );
  //       // const result = await policyApi.purchasePolicy(
  //       // selectedPolicy.id
  //       // );
  //       const result  = await policyApi.getUserPolicies(); // or navigate to My Policies



  //       setUserPolicies((prev) => [...prev, result]);

  //       await addNotification({
  //         title: "Policy Purchased!",
  //         message: `You have successfully purchased ${selectedPolicy.policyType}.`,
  //         type: "success",
  //       });
  //     } catch (error) {
  //       console.error("Purchase failed:", error);
  //     }
  //   } else if (!success) {
  //     await addNotification({
  //       title: "Payment Failed",
  //       message: "Your payment could not be processed. Please try again.",
  //       type: "error",
  //     });
  //   }

  //   setShowPaymentModal(false);
  //   setSelectedPolicy(null);
  // };

  const handlePaymentComplete = async (success) => {
  if (success && selectedPolicy) {
    try {
      // ✅ Just refresh policies from backend
      const policies = await policyApi.getUserPolicies();

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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Insurance Policies
        </h1>
        <p className="text-gray-500">
          Browse and purchase insurance plans
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search policies..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
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

      {/* Policies Grid */}
      {filteredPolicies.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No policies found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              isPurchased={isPurchased(policy.id)}
              onPurchase={() => handlePurchase(policy)}
            />
          ))}
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        policy={selectedPolicy}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}

export default Policies;
