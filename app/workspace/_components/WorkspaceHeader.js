"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useMyContext } from "@/app/context/MyContext";
import { toast } from "sonner";
import Link from "next/link";

const WorkspaceHeader = ({ fileName }) => {
  const { editor, saveNotes, fileId } = useMyContext();
  const { user } = useUser();

  const handleNotes = async () => {
    if (!editor || !fileId || !user?.primaryEmailAddress?.emailAddress) {
      console.log("Missing required data:", {
        editor: editor?.getHTML(),
        fileId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      return toast("Unable to save notes. Missing required data.");
      // return toast("file id: ", fileId);
    }

    try {
      const response = await saveNotes({
        notes: editor.getHTML(),
        fileId: fileId,
        createdBy: user.primaryEmailAddress.emailAddress,
      });
      // console.log("Data saved:", response);
      toast("Notes saved successfully!");
    } catch (error) {
      console.log("Error saving notes:", error);
      toast("Failed to save notes.");
    }
  };

  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <Link href="/" className="md:block hidden">
        <Image src="/ainoteslogo.png" alt="logo" width={150} height={100} />
      </Link>
      <h2 className="font-bold capitalize">{fileName}</h2>
      <div className="flex gap-3 justify-center items-center">
        <Button onClick={handleNotes}>Save</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
