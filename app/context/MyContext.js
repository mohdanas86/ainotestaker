"use client";

import { useAction, useMutation } from "convex/react";
import { createContext, useContext, useState } from "react";
import { api } from "@/convex/_generated/api";

// Create the context
const MyContext = createContext();

// Create the provider component
export const MyProvider = ({ children }) => {
  const [editor, setEditor] = useState(null);
  const [pdfData, setPdfdata] = useState("");
  const [fileId, setFileId] = useState("");

  const [pdfHeight, setPdfheight] = useState("");

  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);

  return (
    <MyContext.Provider
      value={{
        SearchAI,
        pdfData,
        setPdfdata,
        editor,
        setEditor,
        saveNotes,
        fileId,
        setFileId,
        pdfHeight,
        setPdfheight,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
