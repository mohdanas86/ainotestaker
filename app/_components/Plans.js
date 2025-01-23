import { BookOpen, Briefcase, Award } from "lucide-react"; // Fixed icon imports
import React from "react";
import UpgradeComponent from "../dashboard/upgrade/UpgradeComponent";

const Plans = () => {
  return (
    <div className="w-full relative min-h-screen overflow-hidden bg-white">
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="max-w-screen-xl min-h-[90%] mx-auto py-9 pt-[5%] grid grid-cols-1 gap-8 relative">
          {/* TOP SECTION */}
          <div className="feature-left flex flex-col gap-6 justify-center items-center px-6 md:pr-20 relative text-center mt-12">
            <span className="border border-slate-500 rounded-md py-2 px-4 text-sm md:text-base">
              Choose Your Plan
            </span>

            <h3 className="md:text-5xl text-4xl font-semibold">
              Find the Right Plan for You
            </h3>

            <p className="text-center w-full md:w-[42%]">
              Whether you're an individual looking for a personal solution or a
              team in need of advanced features, we have the perfect plan to
              suit your needs.
            </p>
          </div>

          {/* BOTTOM SECTION */}
          <div className="feature-bottom grid grid-cols-1 gap-20 mx-auto w-[100%] md:mt-5 p-4">
            <UpgradeComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
