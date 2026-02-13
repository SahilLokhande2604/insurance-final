// import { Shield, Check, ArrowRight } from 'lucide-react';
// import { cn } from '../utils/cn.js';

// const policyTypeColors = {
//   'Health Insurance': 'bg-green-100 text-green-700',
//   'Life Insurance': 'bg-purple-100 text-purple-700',
//   'Auto Insurance': 'bg-blue-100 text-blue-700',
//   'Home Insurance': 'bg-orange-100 text-orange-700',
//   'Travel Insurance': 'bg-pink-100 text-pink-700',
// };

// export function PolicyCard({
//   policy,
//   onPurchase,
//   onViewDetails,
//   isPurchased = false,
//   showActions = true,
// }) {
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
//       {/* Header */}
//       <div className="p-6 pb-4">
//         <div className="flex items-start justify-between mb-4">
//           <div className={cn(
//             'px-3 py-1 rounded-full text-xs font-medium',
//             policyTypeColors[policy.type] || 'bg-gray-100 text-gray-700'
//           )}>
//             {policy.type}
//           </div>
//           {isPurchased && (
//             <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
//               <Check className="h-3 w-3" />
//               Owned
//             </span>
//           )}
//         </div>

//         <div className="flex items-center gap-3 mb-3">
//           <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
//             <Shield className="h-6 w-6 text-indigo-600" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900">{policy.name}</h3>
//             <p className="text-sm text-gray-500">{policy.duration}</p>
//           </div>
//         </div>

//         <p className="text-sm text-gray-600 line-clamp-2 mb-4">
//           {policy.description}
//         </p>

//         {/* Features */}
//         <div className="space-y-2 mb-4">
//           {policy.features.slice(0, 3).map((feature, idx) => (
//             <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
//               <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
//               <span>{feature}</span>
//             </div>
//           ))}
//           {policy.features.length > 3 && (
//             <p className="text-xs text-indigo-600 font-medium">
//               +{policy.features.length - 3} more features
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <p className="text-xs text-gray-500">Coverage Amount</p>
//             <p className="text-lg font-bold text-gray-900">
//               ${policy.coverageAmount.toLocaleString()}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-gray-500">Premium</p>
//             <p className="text-lg font-bold text-indigo-600">
//               ${policy.premium}<span className="text-sm font-normal text-gray-500">/mo</span>
//             </p>
//           </div>
//         </div>

//         {showActions && (
//           <div className="flex gap-2">
//             {onViewDetails && (
//               <button
//                 onClick={onViewDetails}
//                 className="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
//               >
//                 View Details
//               </button>
//             )}
//             {onPurchase && !isPurchased && (
//               <button
//                 onClick={onPurchase}
//                 className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 Purchase
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PolicyCard;


import { Shield, Check, ArrowRight } from "lucide-react";
import { cn } from "../utils/cn.js";

const policyTypeColors = {
  "Health Insurance": "bg-green-100 text-green-700",
  "Life Insurance": "bg-purple-100 text-purple-700",
  "Auto Insurance": "bg-blue-100 text-blue-700",
  "Home Insurance": "bg-orange-100 text-orange-700",
  "Travel Insurance": "bg-pink-100 text-pink-700",
};

export function PolicyCard({
  policy,
  onPurchase,
  onViewDetails,
  isPurchased = false,
  showActions = true,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              policyTypeColors[policy.policyType] ||
                "bg-gray-100 text-gray-700"
            )}
          >
            {policy.policyType}
          </div>

          {isPurchased && (
            <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <Check className="h-3 w-3" />
              Owned
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Shield className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {policy.policyNumber}
            </h3>
            <p className="text-sm text-gray-500">
              {policy.durationInMonths} Months
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {policy.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">Coverage Amount</p>
            <p className="text-lg font-bold text-gray-900">
              ₹{policy.coverageAmount?.toLocaleString()}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Premium</p>
            <p className="text-lg font-bold text-indigo-600">
              ₹{policy.premium}
              <span className="text-sm font-normal text-gray-500">
                /mo
              </span>
            </p>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2">
            {onViewDetails && (
              <button
                onClick={onViewDetails}
                className="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                View Details
              </button>
            )}

            {onPurchase && !isPurchased && (
              <button
                onClick={onPurchase}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                Purchase
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PolicyCard;
