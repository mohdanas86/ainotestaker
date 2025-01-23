import { BookOpen, Briefcase, Award } from "lucide-react"; // Fixed icon imports
import React from "react";

const DashboardContainer = () => {
  return (
    <div className="w-full relative min-h-screen bg-[#EAEEFE] overflow-hidden">
      <div
        className="w-full flex justify-center items-center min-h-screen"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 50%, rgba(210,220,255,1) 100%)",
        }}
      >
        <div className="max-w-screen-xl min-h-[90%] mx-auto py-9 pt-[5%] grid grid-cols-1 gap-8 relative">
          {/* TOP SECTION */}
          <div className="hero-left flex flex-col gap-6 justify-center items-center md:px-6 px-4 md:pr-20 relative text-center mx-auto md:pt-0 pt-8">
            <span className="border border-slate-500 rounded-md py-2 px-4 text-sm md:text-base">
              Boost your productivity
            </span>

            <h3 className="md:text-5xl text-4xl font-semibold">
              Your Dashboard
            </h3>

            <p className="text-center w-full md:w-[42%]">
              Transform how you manage and organize information with AI-driven
              note-taking, making your notes smarter, faster, and more efficient
              at capturing and processing your ideas.
            </p>
          </div>

          {/* BOTTOM SECTION */}
          <div className="hero-right flex flex-col justify-center items-center relative">
            <img
              src="/dashboard.png"
              className="border shadow-xl rounded-lg mx-auto md:w-full w-[85%]"
              alt="dashboard"
            />

            {/* Icons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 lg:gap-20 mx-auto  w-full lg:mt-16 mt-6 z-50 p-8">
              {/* Students */}
              <div className="flex flex-col justify-center items-start gap-4 group">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-200 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" /> {/* Fixed icon here */}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  Students
                </h2>
                <p className="text-gray-600">
                  Enhance learning, improve grades, and stay organized.
                </p>
              </div>

              {/* Professionals */}
              <div className="flex flex-col justify-center items-start gap-4 group">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  Professionals
                </h2>
                <p className="text-gray-600">
                  Boost productivity, streamline workflows, and manage projects.
                </p>
              </div>

              {/* Lifelong Learners */}
              <div className="flex flex-col justify-center items-start gap-4 group">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors">
                  Lifelong Learners
                </h2>
                <p className="text-gray-600">
                  Stay informed, explore new topics, and expand knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
