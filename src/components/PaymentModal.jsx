import { useAuth } from "../context/AuthContext";

import { useState } from "react";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react";
import { Modal } from "./Modal";
import axios from "axios";

// const token = localStorage.getItem("token");
// const loggedInUser = token ? getUserFromToken(token) : null;


export function PaymentModal({
  isOpen,
  onClose,
  policy,
  onPaymentComplete,
}) {
  const [status, setStatus] = useState("idle");
  const { user } = useAuth();
  if (!policy) return null;

  // ✅ Load Razorpay Script Dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      if (!user) {
  alert("User not logged in");
  setStatus("failed");
  return;
}

      setStatus("processing");

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setStatus("failed");
        return;
      }
      console.log("Sending payment request:", {
  username: user.username,
  amount: policy.premiumAmount,
  policyId: policy.id
});

      // ✅ 1️⃣ Create Order in Backend
     const orderResponse = await axios.post(
  "http://localhost:8085/api/payments/create",
  {
    username: user.username,
    policyId: policy.id,
    amount: policy.premiumAmount, // For testing, use a fixed amount (₹100) instead of policy.premiumAmount
    
  }
);


      const { razorpayOrderId, currency } = orderResponse.data;

      // ✅ 2️⃣ Configure Razorpay
      const options = {
        key: "rzp_test_SEQHT7tqw33nRK", // your test key
        amount: policy.premium * 100,
        currency: currency,
        name: "Insurance App",
        description: policy.policyType,
        order_id: razorpayOrderId,

        handler: async function (response) {
          try {
            // ✅ 3️⃣ Verify Payment
            await axios.post(
              "http://localhost:8085/api/payments/verify",
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }
            );

            setStatus("success");

            setTimeout(() => {
              onPaymentComplete(true);
              setStatus("idle");
            }, 1500);

          } catch (err) {
            console.error("Verification failed", err);
            setStatus("failed");

            setTimeout(() => {
              onPaymentComplete(false);
              setStatus("idle");
            }, 1500);
          }
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      setStatus("failed");
      onPaymentComplete(false);
    }
  };

  const handleClose = () => {
    if (status !== "processing") {
      setStatus("idle");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Complete Payment"
      size="md"
    >
      {status === "processing" ? (
        <div className="py-12 text-center">
          <Loader2 className="h-16 w-16 text-indigo-600 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Processing Payment...
          </h3>
        </div>
      ) : status === "success" ? (
        <div className="py-12 text-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Successful!
          </h3>
        </div>
      ) : status === "failed" ? (
        <div className="py-12 text-center">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Failed
          </h3>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Policy Summary */}
          <div className="bg-indigo-50 rounded-lg p-4 flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">
                {policy.policyType}
              </h4>
              <p className="text-sm text-gray-500">
                Coverage: ₹{policy.coverageAmount}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-indigo-600">
                ₹{policy.premium}
              </p>
              <p className="text-xs text-gray-500">per month</p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Pay ₹{policy.premium}
          </button>
        </div>
      )}
    </Modal>
  );
}

export default PaymentModal;
