/**
 * useRazorpay — handles the full payment flow:
 * 1. Loads the Razorpay checkout.js script
 * 2. Calls /api/create-order to get an order_id
 * 3. Opens the Razorpay payment modal
 * 4. Calls /api/verify-payment to confirm the payment
 */

import { useCallback, useEffect, useState } from "react";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_BASE = "https://gharrat-backend.onrender.com";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function useRazorpay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRazorpayScript(); // pre-load on mount for faster checkout
  }, []);

 const pay = useCallback(async ({
  amount,
  productName,
  customerName,
  customerEmail,
  customerPhone,

  customer,
  shipping,
  items,
  total,

  receipt,
  onSuccess,
  onCancel,
}) => {
    setError(null);
    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Could not load Razorpay checkout. Check your internet connection.");

      // Step 1: Create order on backend
     // Step 1: Create order on backend
const orderRes = await fetch(`${API_BASE}/api/create-order`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount,
    receipt,
  }),
});

if (!orderRes.ok) {
  const err = await orderRes.json();
  throw new Error(err.error || "Failed to create payment order");
}

const {
  order_id,
  amount: orderAmount,
  currency,
} = await orderRes.json();

      // Step 2: Open Razorpay modal
      await new Promise((resolve, reject) => {
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: orderAmount,
          currency,
          name: "GHARRAT",
          description: productName || "Raw Himalayan Honey",
          image: "/logo.png",
          order_id,
          prefill: {
            name: customerName || "",
            email: customerEmail || "",
            contact: customerPhone || "",
          },
          theme: { color: "#5C6652" },
          modal: {
            ondismiss: () => {
              setLoading(false);
              if (onCancel) onCancel();
              resolve();
            },
          },
          handler: async (response) => {
            // Step 3: Verify payment on backend
            try {
              const verifyRes = await fetch(`${API_BASE}/api/verify-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature,

  customer,
  shipping,
  items,
  total,
}),
              });

              const result = await verifyRes.json();

              if (!verifyRes.ok || !result.success) {
                throw new Error(result.error || "Payment verification failed");
              }

              setLoading(false);
              if (onSuccess) onSuccess({ payment_id: result.payment_id, order_id: result.order_id });
              resolve();
            } catch (verifyErr) {
              setLoading(false);
              setError(verifyErr.message);
              reject(verifyErr);
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
          setLoading(false);
          setError(`Payment failed: ${response.error.description}`);
          resolve();
        });
        rzp.open();
      });
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }, []);

  return { pay, loading, error, clearError: () => setError(null) };
}
