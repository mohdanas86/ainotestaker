"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useAction } from "convex/react";
import { useMutation } from "convex/react";
import { Loader2Icon, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import uuid4 from "uuid4";

export function UploadPdfDialog({ children, isMaxfile }) {
  const { user } = useUser();
  const emmbedDocument = useAction(api.myAction.ingest);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddDileEntryToDb = useMutation(api.fileStorage.AddDileEntryToDb);

  const onFileselect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onNameChange = (e) => {
    setFileName(e.target.value);
  };

  const onUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    if (!fileName.trim()) {
      console.error("File name is required");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error("File upload failed");
      }

      const { storageId } = await result.json();
      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId: storageId });

      // Step 3: Save the file details (including the name) to the database
      const response = await AddDileEntryToDb({
        fileId: fileId,
        fileName: fileName ?? "Untitled File",
        storageId: storageId,
        fileUrl: fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      console.log("File uploaded successfully with StorageId:", storageId);
      console.log("response:", response);

      // API call to fetch PDF Process Data
      const ApiRes = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
      console.log(ApiRes.data.result);
      await emmbedDocument({
        splitText: ApiRes.data.result,
        fileId: fileId,
      });
    } catch (err) {
      console.error("Error during file upload:", err);
    } finally {
      setLoading(false);
      setOpen(false);
      toast("File is ready...");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          disabled={isMaxfile}
          className="w-full"
        >
          <Plus /> Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:w-[40%] md:w-[30%] lg:w-[30%] max-w-3xl">
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col items-start w-full">
              {/* Make the h2 responsive */}
              <h2 className="mt-5 text-sm">Select a file to upload</h2>

              {/* File input with responsive padding and size */}
              <div className="gap-2 p-3 rounded-md border w-full">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={onFileselect} // Properly attach the onChange handler
                  className="w-full text-sm sm:text-base"
                />
              </div>

              {/* File name input with responsive margin and padding */}
              <div className="mt-4 sm:mt-5 w-full">
                <h2 className="text-sm w-full text-start">File Name *</h2>
                <Input
                  placeholder="Enter a file name"
                  value={fileName}
                  onChange={onNameChange} // Attach the name input handler
                  className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Footer with responsive buttons */}
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 mt-4">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={onUpload}
            disabled={loading}
            className="w-full sm:w-auto mt-3 sm:mt-0"
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
