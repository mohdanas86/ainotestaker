"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Layout, Plus, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { UploadPdfDialog } from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = ({ setMenu }) => {
  const { user } = useUser();
  const path = usePathname();

  // Fetch user info
  const getUserInfo = useQuery(api.user.getUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress || "",
  });

  // Fetch the file list
  const fileList = useQuery(
    api.fileStorage.GetUserFiles,
    user ? { userEmail: user.primaryEmailAddress?.emailAddress || "" } : {}
  );

  const isUpgrade = getUserInfo?.upgrade || false;
  const uploadedFiles = fileList?.length || 0;

  return (
    <div className=" shadow-md h-screen p-5">
      <img src="/logo.svg" alt="logo" width={70} height={50} />

      <div className="mt-8 w-full">
        <UploadPdfDialog isMaxfile={!isUpgrade && uploadedFiles >= 5}>
          <Button className="w-full flex gap-2 items-center justify-center bg-black text-white py-2 px-4">
            <Plus className="text-xl" /> <span>Upload PDF</span>
          </Button>
        </UploadPdfDialog>

        {/* Navigation Links */}
        <Link href="/dashboard" onClick={() => setMenu((prev) => !prev)}>
          <div
            className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${
              path === "/dashboard" ? "bg-slate-200" : ""
            }`}
          >
            <Layout />
            <h2>Workspace</h2>
          </div>
        </Link>
        <Link
          href="/dashboard/upgrade"
          onClick={() => setMenu((prev) => !prev)}
        >
          <div
            className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${
              path === "/dashboard/upgrade" ? "bg-slate-200" : ""
            }`}
          >
            <Shield />
            <h2>Upgrade</h2>
          </div>
        </Link>
      </div>

      {/* User Upgrade Plan Notice */}
      {!isUpgrade && (
        <div className="absolute bottom-6 w-[80%]">
          <Progress value={(uploadedFiles / 5) * 100} />
          <p className="text-sm mt-1">{uploadedFiles} out of 5 PDFs Uploaded</p>
          <p className="mt-2 text-gray-400 text-sm">
            Upgrade to upload more PDFs
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
