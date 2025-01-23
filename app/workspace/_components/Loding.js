"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center absolute md:top-[8%] top-[-25%] md:left-[35%] right-[-10%] w-full h-[50vh]">
      <div className="flex justify-center items-center md:w-[50%] w-[70%] h-[50%] bg-white rounded-xl shadow-lg px-4 md:px-0">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
          <h1 className="text-lg font-semibold text-gray-700 animate-pulse">
            Genrating...
          </h1>
          <p className="text-sm text-gray-500 animate-pulse">
            Please wait while we prepare everything for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
