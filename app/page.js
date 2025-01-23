"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import DashboardContainer from "./_components/DashboardContainer";
import Features from "./_components/Features";
import Plans from "./_components/Plans";
import Welcome from "./_components/Welcome";
import Footer from "./_components/Footer";

export default function Home() {
  const { user } = useUser();
  const CreateUser = useMutation(api.user.CreateUser);

  const CheackUser = async () => {
    if (user) {
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
        userName: user?.fullName,
      });
      console.log(result);
    }
  };

  useEffect(() => {
    CheackUser();
  }, [user]);

  return (
    <div className="scrollable lg:max-w-screen-2xl md:w-full w-full mx-auto">
      <Header />
      <Hero />
      <DashboardContainer />
      <Features />
      <Plans />
      <Welcome />
      <Footer />
    </div>
  );
}
