// import { useAction, useMutation } from "convex/react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import {
//   Bold,
//   Italic,
//   Underline,
//   Strikethrough,
//   Highlight,
//   List,
//   ListOrdered,
//   Heading,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Undo,
//   Redo,
//   Highlighter,
//   Code,
//   Quote,
//   HorizontalRule,
//   Minus,
//   Sparkles,
//   FileText,
// } from "lucide-react";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { api } from "@/convex/_generated/api";
// import { chatSession } from "@/configs/AiModel";
// import { useUser } from "@clerk/nextjs";
// import { useMyContext } from "@/app/context/MyContext";
// import Loading from "./Loding";

// const EditorExtension = ({ editor, saveAsPDF }) => {
//   const { setFileId } = useMyContext();
//   const [loding, setLoding] = useState(false);

//   const { user } = useUser();
//   const { fileId } = useParams();
//   useEffect(() => {
//     if (fileId) {
//       setFileId(fileId);
//     }
//   }, [fileId]);
//   const SearchAI = useAction(api.myAction.search);
//   const saveNotes = useMutation(api.notes.AddNotes);

//   if (!editor) {
//     // Early return if editor is not initialized
//     return null;
//   }

//   // const AiEditor = async () => {
//   //   toast("AI is getting your answer...");
//   //   setLoding(true);
//   //   try {
//   //     // Extract selected text from the editor.
//   //     const selectText = editor.state.doc.textBetween(
//   //       editor.state.selection.from,
//   //       editor.state.selection.to,
//   //       " "
//   //     );
//   //     // console.log("Selected text:", selectText);

//   //     // Call the SearchAI function to get content based on the selected text.
//   //     const searchResult = await SearchAI({
//   //       query: selectText,
//   //       fileId: fileId,
//   //     });

//   //     let unformattedAnswers;
//   //     try {
//   //       unformattedAnswers = JSON.parse(searchResult);
//   //     } catch (parseError) {
//   //       throw new Error(
//   //         "Failed to parse SearchAI result: " + parseError.message
//   //       );
//   //     }

//   //     // Combine all unformatted answers into a single string.
//   //     const allUnformattedAnswer = unformattedAnswers
//   //       .map((item) => item.pageContent)
//   //       .join(" ");
//   //     // console.log("Unformatted answer:", allUnformattedAnswer);

//   //     const PROMPT = `
//   //         You are tasked with refining an answer for better accuracy and presentation.

//   //         **Question:** "${selectText}"

//   //         **Initial Answer:** "${allUnformattedAnswer}"

//   //         If the initial answer lacks accuracy, correctness, or clarity, revise it to make it more precise and helpful. Ensure your response is formatted as clean, concise, and semantic HTML. Exclude boilerplate tags like <!DOCTYPE html>, <html>, <head>, or <body>, and use only relevant HTML tags such as <h1>, <h2>, <p>, <ul>, <li>, <strong>, etc.

//   //         Your goal is to provide a well-structured, accurate, and readable HTML snippet. Respond only with the HTML output.`;

//   //     // Get the AI-generated HTML response.
//   //     const aiModelResult = await chatSession.sendMessage(PROMPT);
//   //     const htmlResponse = await aiModelResult.response.text();

//   //     // console.log("AI Model Result:", htmlResponse);

//   //     const finalAnswer = htmlResponse
//   //       .replace("```", "")
//   //       .replace("html", "")
//   //       .replace("```", "")
//   //       .replace(`{"response": "`, "")
//   //       .replace(/"}$/, "")
//   //       .trim();
//   //     // console.log("finalAnswer:", finalAnswer);

//   //     // Typing animation logic
//   //     const AllText = editor.getHTML();
//   //     setPdfdata(editor.getHTML());
//   //     setEditor(editor);
//   //     setFileId(fileId);

//   //     let currentText = AllText;
//   //     let index = 0;

//   //     const interval = setInterval(() => {
//   //       if (index < finalAnswer.length) {
//   //         currentText += finalAnswer[index];
//   //         editor.commands.setContent(currentText);
//   //         index++;
//   //       } else {
//   //         clearInterval(interval); // Clear interval after typing animation completes
//   //         saveNotes({
//   //           notes: editor.getHTML(),
//   //           fileId: fileId,
//   //           createdBy: user?.primaryEmailAddress?.emailAddress,
//   //         });
//   //       }
//   //     }, 0.02); // Adjust typing speed (50ms delay per character)
//   //   } catch (err) {
//   //     console.error("Error in AI Editor:", err);
//   //   } finally {
//   //     setLoding(false);
//   //   }
//   // };

//   const AiEditor = async () => {
//     toast("AI is getting your answer...");
//     setLoding(true);

//     try {
//       // Extract selected text from the editor
//       const selectText = editor.state.doc.textBetween(
//         editor.state.selection.from,
//         editor.state.selection.to,
//         " "
//       );

//       // Call the SearchAI function to get content based on the selected text
//       const searchResult = await SearchAI({
//         query: selectText,
//         fileId: fileId,
//       });

//       let unformattedAnswers;
//       try {
//         unformattedAnswers = JSON.parse(searchResult);
//       } catch (parseError) {
//         throw new Error(
//           "Failed to parse SearchAI result: " + parseError.message
//         );
//       }

//       // Combine all unformatted answers into a single string
//       const allUnformattedAnswer = unformattedAnswers
//         .map((item) => item.pageContent)
//         .join(" ");

//       // console.log("allUnformattedAnswer: ", allUnformattedAnswer);

//       const PROMPT = `
//           You are tasked with refining an answer for better accuracy and presentation.

//           **Question:** "${selectText}"

//           **Initial Answer:** "${allUnformattedAnswer}"

//           If the initial answer lacks accuracy, correctness, or clarity, revise it to make it more precise and helpful. Ensure your response is formatted as clean, concise, and semantic HTML. Exclude boilerplate tags like <!DOCTYPE html>, <html>, <head>, or <body>, and use only relevant HTML tags such as <h1>, <h2>, <p>, <ul>, <li>, <strong>, etc.

//           Your goal is to provide a well-structured, accurate, and readable HTML snippet. Respond only with the HTML output.`;

//       // Get the AI-generated HTML response
//       const aiModelResult = await chatSession.sendMessage(PROMPT);
//       const htmlResponse = await aiModelResult.response.text();
//       // console.log("htmlResponse: ", htmlResponse);

//       const finalAnswer = htmlResponse
//         .replace(/```html|```/g, "") // Remove markdown formatting
//         .replace(`{"response": "`, "")
//         .replace(/"}$/, "")
//         .trim();

//       // Chunk the final answer for gradual rendering
//       const chunkSize = 100; // Adjust chunk size for optimal performance
//       const answerChunks = [];
//       for (let i = 0; i < finalAnswer.length; i += chunkSize) {
//         answerChunks.push(finalAnswer.slice(i, i + chunkSize));
//       }

//       // console.log("chunks final ans: ", answerChunks);

//       // Initialize typing animation
//       const AllText = editor.getHTML();
//       let currentText = AllText;
//       let chunkIndex = 0;

//       const interval = setInterval(() => {
//         if (chunkIndex < answerChunks.length) {
//           currentText += answerChunks[chunkIndex];
//           editor.commands.setContent(currentText);
//           chunkIndex++;
//         } else {
//           clearInterval(interval); // Clear interval after typing animation completes
//           saveNotes({
//             notes: editor.getHTML(),
//             fileId: fileId,
//             createdBy: user?.primaryEmailAddress?.emailAddress,
//           });
//           toast("Answer added successfully!");
//         }
//       }, 0.5); // Adjust delay for smoother typing animation
//     } catch (err) {
//       console.error("Error in AI Editor:", err);
//       toast("Failed to process the AI response.");
//     } finally {
//       setLoding(false);
//     }
//   };

//   const getButtonClass = (isActive) =>
//     isActive ? "bg-gray-300 text-black" : "";

//   const EditorButton = ({ onClick, isActive, children }) => (
//     <Button onClick={onClick} className={getButtonClass(isActive)}>
//       {children}
//     </Button>
//   );

//   return (
//     <div className="control-group p-5 pb-2 relative">
//       {loding && <Loading />}
//       <div className="scrollable button-group flex md:flex-wrap gap-2 overflow-x-scroll md:overscroll-none">
//         {/* Undo and Redo */}
//         <EditorButton onClick={() => editor.chain().focus().undo().run()}>
//           <Undo />
//         </EditorButton>
//         <EditorButton onClick={() => editor.chain().focus().redo().run()}>
//           <Redo />
//         </EditorButton>

//         {/* Formatting Buttons */}
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           isActive={editor.isActive("bold")}
//         >
//           <Bold />
//         </EditorButton>
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           isActive={editor.isActive("italic")}
//         >
//           <Italic />
//         </EditorButton>
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           isActive={editor.isActive("underline")}
//         >
//           <Underline />
//         </EditorButton>
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           isActive={editor.isActive("strike")}
//         >
//           <Strikethrough />
//         </EditorButton>
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleHighlight().run()}
//           isActive={editor.isActive("highlight")}
//         >
//           <Highlighter />
//         </EditorButton>

//         {/* List Buttons */}
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           isActive={editor.isActive("bulletList")}
//         >
//           <List />
//         </EditorButton>
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           isActive={editor.isActive("orderedList")}
//         >
//           <ListOrdered />
//         </EditorButton>

//         {/* Headings */}
//         {[1, 2, 3].map((level) => (
//           <EditorButton
//             key={level}
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level }).run()
//             }
//             isActive={editor.isActive("heading", { level })}
//           >
//             {`H${level}`}
//           </EditorButton>
//         ))}

//         {/* Paragraph */}
//         <EditorButton
//           onClick={() => editor.chain().focus().setParagraph().run()}
//           isActive={editor.isActive("paragraph")}
//         >
//           P
//         </EditorButton>

//         {/* Code Block */}
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//           isActive={editor.isActive("codeBlock")}
//         >
//           <Code />
//         </EditorButton>

//         {/* Blockquote */}
//         <EditorButton
//           onClick={() => editor.chain().focus().toggleBlockquote().run()}
//           isActive={editor.isActive("blockquote")}
//         >
//           <Quote />
//         </EditorButton>

//         {/* Horizontal Rule */}
//         <Button
//           onClick={() => editor.chain().focus().setHorizontalRule().run()}
//         >
//           <Minus />
//         </Button>

//         {/* Alignment */}
//         <EditorButton
//           onClick={() => editor.chain().focus().setTextAlign("left").run()}
//           isActive={editor.isActive({ textAlign: "left" })}
//         >
//           <AlignLeft />
//         </EditorButton>
//         <EditorButton
//           onClick={() => editor.chain().focus().setTextAlign("center").run()}
//           isActive={editor.isActive({ textAlign: "center" })}
//         >
//           <AlignCenter />
//         </EditorButton>
//         <EditorButton
//           onClick={() => editor.chain().focus().setTextAlign("right").run()}
//           isActive={editor.isActive({ textAlign: "right" })}
//         >
//           <AlignRight />
//         </EditorButton>

//         {/* AI Button */}
//         <Button onClick={AiEditor} className="hover:text-violet-300">
//           <Sparkles />
//         </Button>

//         {/* AI Button */}
//         <Button
//           onClick={saveAsPDF}
//           className="hover:text-gray-900 bg-blue-500 hover:bg-blue-400 duration-300"
//         >
//           <FileText /> <span>Save as PDF</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default EditorExtension;
