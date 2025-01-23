"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import React from "react";
import { toast } from "sonner";

const Upgrade = () => {
  const { user } = useUser();
  // Handler to create an order with custom amount and currency
  const upgradePlan = useMutation(api.user?.userUpgradePlan);

  const createOrder = (data, actions, amount, currency) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount, // Custom amount
            currency_code: currency, // Custom currency
          },
        },
      ],
    });
  };

  // Handler for successful payment approval
  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async (details) => {
      toast(`Transaction completed by ${details.payer.name.given_name}`);
      const result = await upgradePlan({
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      console.log("Plan Upgrade Successfully...");
    });
  };

  return (
    <div className="">
      <h2 className="text-3xl font-medium">Plans</h2>
      <p className="mb-8">
        Upgrade your plan to upload multiple PDFs and take comprehensive notes.
      </p>

      {/* Pricing Plans */}
      <div className="flex justify-center items-start gap-8 w-full max-w-screen-xl mx-auto">
        {/* Basic Plan */}
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm w-[30%]">
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-medium text-gray-900">Basic</h2>
            <p className="mt-2 text-gray-700">Perfect for use once.</p>
            <p className="mt-4">
              <strong className="text-3xl font-bold text-gray-900">$0</strong>
              <span className="text-sm font-medium text-gray-700">
                /one time
              </span>
            </p>
            <div className="mt-6">
              <PayPalButtons
                createOrder={(data, actions) =>
                  createOrder(data, actions, "0", "USD")
                }
                onCancel={() => console.log("payment cancel")}
                onApprove={onApprove}
              />
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

                <span className="text-gray-700"> 10 users </span>
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

                <span className="text-gray-700"> 2GB of storage </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Basic Plan */}
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm w-[30%]">
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-medium text-gray-900">Basic</h2>
            <p className="mt-2 text-gray-700">
              Perfect for individuals managing fewer notes.
            </p>
            <p className="mt-4">
              <strong className="text-3xl font-bold text-gray-900">$9</strong>
              <span className="text-sm font-medium text-gray-700">
                /one time
              </span>
            </p>
            <div className="mt-6">
              <PayPalButtons
                createOrder={(data, actions) =>
                  createOrder(data, actions, "9", "USD")
                }
                onCancel={() => console.log("payment cancel")}
                onApprove={onApprove}
              />
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

                <span className="text-gray-700"> 10 users </span>
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

                <span className="text-gray-700"> 2GB of storage </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm w-[30%]">
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-medium text-gray-900">Premium</h2>
            <p className="mt-2 text-gray-700">
              Best for businesses or power users needing unlimited notes.
            </p>
            <p className="mt-4">
              <strong className="text-3xl font-bold text-gray-900">$19</strong>
              <span className="text-sm font-medium text-gray-700">
                /one time
              </span>
            </p>
            <div className="mt-6">
              <PayPalButtons
                createOrder={(data, actions) =>
                  createOrder(data, actions, "19", "USD")
                }
                onApprove={onApprove}
              />
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

                <span className="text-gray-700"> 10 users </span>
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

                <span className="text-gray-700"> 2GB of storage </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
