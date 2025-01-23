"use client";

import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import { useParams, useRouter } from "next/navigation";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_components/TextEditor";
import { useUser } from "@clerk/nextjs";

const WorkSpace = () => {
  const { user } = useUser();
  const { fileId } = useParams();

  const FileInfo = useQuery(api.fileStorage.getFileRecord, { fileId });

  useEffect(() => {
    // console.log("fileId:", fileId);
    // console.log("FileInfo:", FileInfo);
  }, [fileId, FileInfo]); // Proper dependencies

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

  return (
    FileInfo && (
      <div className="min-h-screen overflow-hidden">
        <WorkspaceHeader fileName={FileInfo?.fileName} />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {/* Mobile: PDF Viewer first */}
          <div className="order-2 md:order-1">
            {/* Text Editor */}
            <TextEditor fileId={fileId} />
          </div>
          <div className="order-1 md:order-2">
            {/* Pdf Viewer */}
            <PdfViewer fileUrl={FileInfo?.fileUrl} />
          </div>
        </div>
      </div>
    )
  );
};

export default WorkSpace;
