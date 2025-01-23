"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";
import { MyProvider } from "./context/MyContext";

const ConvexClientProvider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <ConvexProvider client={convex}>
      <MyProvider>
        <PayPalScriptProvider
          // options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
          options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
        >
          {children}
        </PayPalScriptProvider>
      </MyProvider>
    </ConvexProvider>
  );
};

export default ConvexClientProvider;
