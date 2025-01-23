"use client";

import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";

const UpgradeComponent = () => {
  const { user } = useUser();
  // Handler to create an order with custom amount and currency
  const upgradePlan = useMutation(api.user?.userUpgradePlan);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (amount) => {
    if (!amount) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parseFloat(amount) }), // Convert amount to paise
      });

      if (!response.ok) {
        throw new Error("Failed to create payment order.");
      }

      const data = await response.json();

      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZOR_CLIENT_ID ||
          process.env.RAZOR_CLIENT_ID,
        amount: data.orderId.amount,
        currency: "INR",
        name: user?.fullName || "User",
        order_id: data.orderId.id,
        handler: async (response) => {
          try {
            // After successful payment, update the user's plan
            const result = await upgradePlan({
              userEmail: user?.primaryEmailAddress?.emailAddress,
            });
            console.log(result);
            console.log("Payment successful: ", response);
            toast.success("Plan Upgrade Successfully!");
          } catch (err) {
            console.error("Error upgrading plan: ", err);
            toast.error("Error upgrading plan. Please try again.");
          }
        },
        prefill: {
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#528FF0",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open(); // Open Razorpay payment modal
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="upgrade-container">
      <div className="pricing-plans grid md:grid-cols-2 grid-cols-1 gap-8 md:w-[70%] w-full max-w-screen-xl mx-auto">
        {/* Free Plan */}
        <div className="plan-card divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-medium text-gray-900">Free</h2>
            <p className="mt-2 text-gray-700">
              Perfect for casual use with limited access.
            </p>
            <p className="mt-4">
              <strong className="text-3xl font-bold text-gray-900">₹0</strong>
              <span className="text-sm font-medium text-gray-700">
                /one time
              </span>
            </p>
            <div className="mt-6">
              <Link href={user ? "/dashboard/upgrade" : "/sign-up"}>
                <Button>{user ? "Upgrade to Premium" : "Get Started"}</Button>
              </Link>
            </div>
          </div>
          <div className="p-6 sm:px-8">
            <p className="text-lg font-medium text-gray-900 sm:text-xl">
              What's included:
            </p>
            <ul className="mt-2 space-y-2 sm:mt-4">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-red-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="text-gray-700">Full Access</span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">5 Notes</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">AI-Powered Generator</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="plan-card divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-medium text-gray-900">Premium</h2>
            <p className="mt-2 text-gray-700">
              Full access to all features for those who need more.
            </p>
            <p className="mt-4">
              <strong className="text-3xl font-bold text-gray-900">₹199</strong>
              <span className="text-sm font-medium text-gray-700">
                /one time
              </span>
            </p>
            <div className="mt-6">
              <Script src="https://checkout.razorpay.com/v1/checkout.js" />
              <Button
                onClick={() => handlePayment(199)}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Get Started"}
              </Button>
            </div>
          </div>
          <div className="p-6 sm:px-8">
            <p className="text-lg font-medium text-gray-900 sm:text-xl">
              What's included:
            </p>
            <ul className="mt-2 space-y-2 sm:mt-4">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">Full Access</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">Unlimited Notes</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">AI-Powered Generator</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeComponent;
