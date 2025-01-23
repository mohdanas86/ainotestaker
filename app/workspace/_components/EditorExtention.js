import { useAction, useMutation } from "convex/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlight,
  List,
  ListOrdered,
  Heading,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Highlighter,
  Code,
  Sparkles,
  FileText,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { chatSession } from "@/configs/AiModel";
import { useMyContext } from "@/app/context/MyContext";
import Loading from "./Loding";
import { useUser } from "@clerk/nextjs";

const EditorExtension = ({ editor, saveAsPDF }) => {
  const { setFileId } = useMyContext();
  const [loding, setLoding] = useState(false);

  const { user } = useUser();
  const { fileId } = useParams();
  useEffect(() => {
    if (fileId) {
      setFileId(fileId);
    }

    console.log("user : ", user);
    console.log("file id : ", fileId);
  }, [fileId, user]);
  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);

  if (!editor) {
    // Early return if editor is not initialized
    return null;
  }

  const AiEditor = async () => {
    toast("AI is getting your answer...");
    setLoding(true);

    try {
      // Extract selected text from the editor
      const selectText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );

      // Call the SearchAI function to get content based on the selected text
      const searchResult = await SearchAI({
        query: selectText,
        fileId: fileId,
      });

      let unformattedAnswers;
      try {
        unformattedAnswers = JSON.parse(searchResult);
      } catch (parseError) {
        throw new Error(
          "Failed to parse SearchAI result: " + parseError.message
        );
      }

      // Combine all unformatted answers into a single string
      const allUnformattedAnswer = unformattedAnswers
        .map((item) => item.pageContent)
        .join(" ");

      // console.log("allUnformattedAnswer: ", allUnformattedAnswer);

      const PROMPT = `
          You are tasked with refining an answer for better accuracy and presentation.
      
          **Question:** "${selectText}"
      
          **Initial Answer:** "${allUnformattedAnswer}"
      
          If the initial answer lacks accuracy, correctness, or clarity, revise it to make it more precise and helpful. Ensure your response is formatted as clean, concise, and semantic HTML. Exclude boilerplate tags like <!DOCTYPE html>, <html>, <head>, or <body>, and use only relevant HTML tags such as <h1>, <h2>, <p>, <ul>, <li>, <strong>, etc.
      
          Your goal is to provide a well-structured, accurate, and readable HTML snippet. Respond only with the HTML output.`;

      // Get the AI-generated HTML response
      const aiModelResult = await chatSession.sendMessage(PROMPT);
      const htmlResponse = await aiModelResult.response.text();
      // console.log("htmlResponse: ", htmlResponse);

      const finalAnswer = htmlResponse
        .replace(/```html|```/g, "") // Remove markdown formatting
        .replace(`{"response": "`, "")
        .replace(/"}$/, "")
        .trim();

      // Chunk the final answer for gradual rendering
      const chunkSize = 100; // Adjust chunk size for optimal performance
      const answerChunks = [];
      for (let i = 0; i < finalAnswer.length; i += chunkSize) {
        answerChunks.push(finalAnswer.slice(i, i + chunkSize));
      }

      // console.log("chunks final ans: ", answerChunks);

      // Initialize typing animation
      const AllText = editor.getHTML();
      let currentText = AllText;
      let chunkIndex = 0;

      const interval = setInterval(() => {
        if (chunkIndex < answerChunks.length) {
          currentText += answerChunks[chunkIndex];
          editor.commands.setContent(currentText);
          chunkIndex++;
        } else {
          clearInterval(interval); // Clear interval after typing animation completes
          saveNotes({
            notes: editor.getHTML(),
            fileId: fileId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
          });
          toast("Answer added successfully!");
        }
      }, 0.05); // Adjust delay for smoother typing animation
    } catch (err) {
      console.error("Error in AI Editor:", err);
      toast("Failed to process the AI response.");
    } finally {
      setLoding(false);
    }
  };

  const EditorButton = ({ onClick, isActive, children, borderNone }) => (
    <Button
      onClick={onClick}
      className={`hover:text-violet-700 hover:bg-transparent bg-transparent shadow-none text-black border-r-2 rounded-none ${
        borderNone && borderNone
      }`}
    >
      {children}
    </Button>
  );

  return (
    <div className="control-group p-5 pb-2 relative">
      {loding && <Loading />}
      <div className="scrollable button-group flex overflow-x-scroll border p-2 rounded-xl">
        {/* Dynamic Buttons */}
        {buttonData({ editor, saveAsPDF, AiEditor }).map((button, index) => (
          <EditorButton
            key={index}
            onClick={button.onClick}
            isActive={button.isActive}
            borderNone={button.borderNone}
          >
            {button.icon}
            {button.labelPdf && <span className="">{button.labelPdf}</span>}
          </EditorButton>
        ))}
      </div>
    </div>
  );
};

const buttonData = ({ editor, saveAsPDF, AiEditor }) => [
  {
    onClick: () => editor.chain().focus().undo().run(),
    icon: <Undo />,
    label: "Undo",
  },
  {
    onClick: () => editor.chain().focus().redo().run(),
    icon: <Redo />,
    label: "Redo",
  },
  {
    onClick: () => editor.chain().focus().toggleBold().run(),
    icon: <Bold />,
    label: "Bold",
    isActive: editor.isActive("bold"),
  },
  {
    onClick: () => editor.chain().focus().toggleItalic().run(),
    icon: <Italic />,
    label: "Italic",
    isActive: editor.isActive("italic"),
  },
  {
    onClick: () => editor.chain().focus().toggleUnderline().run(),
    icon: <Underline />,
    label: "Underline",
    isActive: editor.isActive("underline"),
  },
  {
    onClick: () => editor.chain().focus().toggleStrike().run(),
    icon: <Strikethrough />,
    label: "Strike",
    isActive: editor.isActive("strike"),
  },
  {
    onClick: () => editor.chain().focus().toggleHighlight().run(),
    icon: <Highlighter />,
    label: "Highlight",
    isActive: editor.isActive("highlight"),
  },
  {
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    icon: <List />,
    label: "Bullet List",
    isActive: editor.isActive("bulletList"),
  },
  {
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    icon: <ListOrdered />,
    label: "Ordered List",
    isActive: editor.isActive("orderedList"),
  },
  {
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    icon: "H1",
    label: "Heading 1",
    isActive: editor.isActive("heading", { level: 1 }),
  },
  {
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    icon: "H2",
    label: "Heading 2",
    isActive: editor.isActive("heading", { level: 2 }),
  },
  {
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    icon: "H3",
    label: "Heading 3",
    isActive: editor.isActive("heading", { level: 3 }),
  },
  {
    onClick: () => editor.chain().focus().setParagraph().run(),
    icon: "P",
    label: "Paragraph",
    isActive: editor.isActive("paragraph"),
  },
  {
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    icon: <Code />,
    label: "Code Block",
    isActive: editor.isActive("codeBlock"),
  },
  {
    onClick: () => editor.chain().focus().setTextAlign("left").run(),
    icon: <AlignLeft />,
    label: "Align Left",
    isActive: editor.isActive({ textAlign: "left" }),
  },
  {
    onClick: () => editor.chain().focus().setTextAlign("center").run(),
    icon: <AlignCenter />,
    label: "Align Center",
    isActive: editor.isActive({ textAlign: "center" }),
  },
  {
    onClick: () => editor.chain().focus().setTextAlign("right").run(),
    icon: <AlignRight />,
    label: "Align Right",
    isActive: editor.isActive({ textAlign: "right" }),
  },
  {
    onClick: AiEditor,
    icon: <Sparkles />,
    label: "AI Editor",
  },
  {
    onClick: saveAsPDF,
    icon: <FileText />,
    labelPdf: "Save as PDF",
    borderNone: "border-0",
  },
];

export default EditorExtension;
