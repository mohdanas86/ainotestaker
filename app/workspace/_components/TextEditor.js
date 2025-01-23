import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, ref, useState } from "react";
import EditorExtention from "./EditorExtention";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Subscript, Superscript } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import WorkspaceHeader from "./WorkspaceHeader";
import { useMyContext } from "@/app/context/MyContext";

// import html2pdf from "html2pdf.js"; // Import html2pdf.js

import dynamic from "next/dynamic";

const TextEditor = ({ fileId }) => {
  const { setEditor } = useMyContext();
  const [pdfHeight, setPdfheight] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start Taking your notes here....",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[50vh] max-h-[68vh] p-5",
      },
    },
  });

  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
      setEditor(editor);
    }
  }, [notes, editor]);

  // Function to save content as PDF
  const saveAsPDF = () => {
    const element = document.getElementById("editor-content");

    if (element) {
      // Ensure the total height of the scrollable content is captured
      const totalHeight = element.scrollHeight;

      console.log(totalHeight);
      // const totalWidth = element.scrollWidth;

      const options = {
        margin: 0.5,
        filename: "note.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 3, // Increase scale for higher quality
          logging: true, // Turn on logging for debugging
          x: 0, // Start at the top-left of the element
          y: 0, // Start at the top-left of the element
          // width: element.offsetWidth, // Capture the entire width of the content
          height: totalHeight, // Capture the entire height of the content
          scrollX: 0, // Make sure the full width is captured
          scrollY: 0, // Make sure the full height is captured
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
          pagesplit: true, // Enable page splitting for long content
        },
      };

      // Generate the PDF
      html2pdf().set(options).from(element).save();
    }
  };

  return (
    <div className="md:h-full h-screen flex flex-col">
      <div className="hidden">
        <WorkspaceHeader editor={editor} />
      </div>
      <div className="w-full sticky top-0 z-10">
        <EditorExtention editor={editor} saveAsPDF={saveAsPDF} />
      </div>

      {/* Scrollable editor content */}
      <div className="flex-1 overflow-y-auto scrollable">
        <EditorContent editor={editor} id="editor-content" />
      </div>
    </div>
  );
};

export default TextEditor;

// import Placeholder from "@tiptap/extension-placeholder";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React, { useEffect, ref } from "react";
// import EditorExtention from "./EditorExtention";
// import Underline from "@tiptap/extension-underline";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import { Subscript, Superscript } from "lucide-react";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import WorkspaceHeader from "./WorkspaceHeader";
// import { useMyContext } from "@/app/context/MyContext";

// // import html2pdf from "html2pdf.js"; // Import html2pdf.js
// import dynamic from "next/dynamic";

// const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

// const TextEditor = ({ fileId }) => {
//   const { setEditor } = useMyContext();
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Highlight,
//       Subscript,
//       Superscript,
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       Placeholder.configure({
//         placeholder: "Start Taking your notes here....",
//       }),
//     ],
//     editorProps: {
//       attributes: {
//         class: "focus:outline-none min-h-[50vh] max-h-[68vh] p-5",
//       },
//     },
//   });

//   const notes = useQuery(api.notes.GetNotes, {
//     fileId: fileId,
//   });

//   useEffect(() => {
//     if (editor && notes) {
//       editor.commands.setContent(notes);
//       setEditor(editor);
//     }
//   }, [notes, editor]);

//   // Function to save content as PDF
//   const saveAsPDF = () => {
//     const element = document.getElementById("editor-content");

//     if (element) {
//       // Ensure the total height of the scrollable content is captured
//       const totalHeight = element.scrollHeight;
//       // const totalWidth = element.scrollWidth;

//       const options = {
//         margin: 0.5,
//         filename: "editor-content.pdf",
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: {
//           scale: 3, // Increase scale for higher quality
//           logging: true, // Turn on logging for debugging
//           x: 0, // Start at the top-left of the element
//           y: 0, // Start at the top-left of the element
//           // width: element.offsetWidth, // Capture the entire width of the content
//           height: totalHeight, // Capture the entire height of the content
//           scrollX: 0, // Make sure the full width is captured
//           scrollY: 0, // Make sure the full height is captured
//         },
//         jsPDF: {
//           unit: "in",
//           format: "letter",
//           orientation: "portrait",
//           pagesplit: true, // Enable page splitting for long content
//         },
//       };

//       // Generate the PDF
//       html2pdf().set(options).from(element).save();
//     }
//   };

//   return (
//     <div className="md:h-full h-screen flex flex-col">
//       <div className="hidden">
//         <WorkspaceHeader editor={editor} />
//       </div>
//       <div className="w-full sticky top-0 z-10">
//         <EditorExtention editor={editor} saveAsPDF={saveAsPDF} />
//       </div>

//       {/* Scrollable editor content */}
//       <div className="flex-1 overflow-y-auto scrollable">
//         <EditorContent editor={editor} id="editor-content" />
//       </div>
//     </div>
//   );
// };

// export default TextEditor;
