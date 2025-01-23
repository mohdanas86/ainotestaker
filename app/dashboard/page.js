"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();

  // Loading state to prevent rendering while checking user
  const [loading, setLoading] = useState(true);

  // Redirect to the home page if the user is not logged in
  useEffect(() => {
    if (user === undefined) return; // Avoid redirecting if user status is still unknown
    if (!user) {
      router.push("/"); // Redirect to home if not logged in
    } else {
      setLoading(false); // Set loading to false once user is available
    }
  }, [user, router]);

  // Fetch the files using Convex's useQuery hook
  const fileList = useQuery(
    api.fileStorage.GetUserFiles,
    user
      ? { userEmail: user.primaryEmailAddress?.emailAddress || "" }
      : undefined // Safeguard: Don't query if the user is not available
  );

  // console.log("fileList", Array.isArray(fileList), fileList);

  if (!user) {
    // Prevent rendering while redirecting
    return null;
  }

  return (
    <div className="md:p-6 p-0">
      <h2 className="font-medium text-3xl mb-6">Dashboard</h2>

      <div
        className={`${
          fileList
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "w-full"
        }`}
      >
        {Array.isArray(fileList) && fileList.length > 0 ? (
          // Display files if there are any
          fileList.map((file, i) => (
            <Link href={`/workspace/${file.fileId}`} key={i}>
              <div className="group relative p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-gray-300 transition-all duration-200 bg-white cursor-pointer">
                <div className="flex md:flex-col items-center gap-4">
                  {/* File Icon */}
                  <div className="flex-shrink-0 flex justify-center items-center">
                    <Image
                      src="/pdf.png"
                      alt="pdf"
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </div>
                  {/* File Details */}
                  <div className="flex flex-col justify-start items-start w-full">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 capitalize">
                      {file.fileName.length > 20
                        ? file.fileName.slice(0, 20) + "..."
                        : file.fileName}
                    </h3>

                    <p className="text-sm text-gray-500">PDF Document</p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-500 rounded-full group-hover:bg-gray-200 group-hover:text-gray-600 transition">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          // Show loading skeleton or "No files found"
          <div className="w-full">
            {fileList === undefined ? (
              // Loading skeleton
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2, 3, 4, 5, 6].map((v, i) => (
                  <div
                    key={i}
                    className="bg-slate-100 rounded-md h-[120px] w-full animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              // "No files found" message
              <div className="flex justify-center items-center h-[200px] text-center">
                <p className="text-xl text-gray-500">No files found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
