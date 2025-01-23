import { BookOpen, Briefcase, Award } from "lucide-react"; // Fixed icon imports
import React from "react";

const Features = () => {
  return (
    <div className="w-full relative min-h-screen soverflow-hidden bg-white">
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="max-w-screen-xl min-h-[90%] mx-auto py-9 pt-[5%] grid grid-cols-1 gap-8 relative">
          {/* TOP SECTION */}
          <div className="feature-left flex flex-col gap-6 justify-center items-center px-6 md:pr-20 relative text-center md:pt-0 pt-8">
            <span className="border border-slate-500 rounded-md py-2 px-4 text-sm md:text-base">
              Everything you need
            </span>

            <h3 className="md:text-5xl text-4xl font-semibold">
              Revolutionize Your Note-Taking <br /> Experience with AI
            </h3>

            <p className="text-center w-full md:w-[42%]">
              Enhance your note-taking with AI-powered tools that automatically
              organize, categorize, and process your notes, making it easier to
              capture and manage your ideas with unmatched efficiency.
            </p>
          </div>

          {/* BOTTOM SECTION */}
          <div className="feature-bottom grid grid-cols-1 sm:grid-cols-2 gap-20 mx-auto w-[80%] md:mt-10 mt-4 md:p-4">
            {/* Left Section - Lang Chain AI Mode */}
            <div
              className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-xl transition-all group py-8 pb-12"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              }}
            >
              <div className="flex w-[80%] justify-center items-center">
                <img
                  src="/cube-helix.png"
                  alt="Lang Chain AI Mode"
                  className="w-full animate-breathing"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mt-4  ">
                Lang Chain AI Model
              </h2>
              <p className="text-gray-600 text-center  ">
                Leverage AI-driven automation with Lang Chain to quickly process
                and organize your notes with precision, boosting productivity
                and saving time.
              </p>
            </div>

            {/* Right Section - Not Editing Mode */}
            <div
              className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-xl transition-all group py-8 pb-12"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              }}
            >
              <div className="flex w-[80%] justify-center items-center">
                <img
                  src="/cube-helix2.png"
                  alt="Not Editing Mode"
                  className="w-full animate-breathing"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mt-4  ">
                Data Security
              </h2>
              <p className="text-gray-600 text-center  ">
                Ensure your notes are protected with robust security measures,
                keeping your information safe and confidential at all times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
