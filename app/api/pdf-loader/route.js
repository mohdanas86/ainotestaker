// import { NextResponse } from "next/server";
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// export async function GET(req) {
//   const reqUrl = req.url;
//   const { searchParams } = new URL(reqUrl);
//   const pdfUrl = searchParams.get("pdfUrl");

//   if (!pdfUrl) {
//     return NextResponse.json({ error: "pdfUrl is required" }, { status: 400 });
//   }

//   try {
//     // 1. load the pdf file
//     const response = await fetch(pdfUrl);
//     if (!response.ok) {
//       throw new Error("Failed to fetch PDF");
//     }

//     const data = await response.blob();
//     const loader = new PDFLoader(data);
//     const docs = await loader.load();

//     let pdfTextContent = "";
//     docs.forEach((doc) => {
//       pdfTextContent += doc.pageContent;
//     });

//     // 2. split the text into small chunks
//     const textSplitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 500,
//       chunkOverlap: 20,
//     });
//     const output = await textSplitter.createDocuments([pdfTextContent]);

//     return NextResponse.json({ result: output });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");

  if (!pdfUrl) {
    return NextResponse.json({ error: "pdfUrl is required" }, { status: 400 });
  }

  try {
    // 1. Load the PDF file
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch PDF");
    }

    const data = await response.blob();
    const loader = new PDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = "";
    docs.forEach((doc) => {
      pdfTextContent += doc.pageContent;
    });

    // 2. Enhanced text splitting with semantic awareness
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, // Base chunk size
      chunkOverlap: 100, // Overlap to preserve context
      preserveWhitespace: true, // Ensure paragraphs stay intact
    });

    console.log(
      "Enhanced text splitting with semantic awareness : ",
      textSplitter
    );

    // Dynamically split based on paragraphs or headings
    const output = await textSplitter.createDocuments([pdfTextContent]);
    console.log("Dynamically split based on paragraphs or headings : ", output);

    // 3. Add metadata for better retrieval
    const enrichedOutput = output.map((chunk, index) => ({
      chunkIndex: index,
      text: chunk.pageContent,
      metadata: {
        estimatedWordCount: chunk.pageContent.split(/\s+/).length,
        keywords: extractKeywords(chunk.pageContent), // A placeholder function for keyword extraction
        headings: extractHeadings(chunk.pageContent), // Placeholder for semantic headings
      },
    }));

    console.log("after metadata : ", enrichedOutput);

    return NextResponse.json({ result: enrichedOutput });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Helper functions for metadata extraction (implement with NLP tools or regex)
function extractKeywords(text) {
  // Simple keyword extraction (enhance with libraries like `compromise` or `natural` for better results)
  const words = text.match(/\b(\w+)\b/g);
  const freqMap = {};
  words.forEach((word) => {
    freqMap[word] = (freqMap[word] || 0) + 1;
  });
  return Object.keys(freqMap)
    .sort((a, b) => freqMap[b] - freqMap[a])
    .slice(0, 10);
}

function extractHeadings(text) {
  // Use regex to find lines that resemble headings (e.g., capitalized or ending with a colon)
  return text.match(/^(?:[A-Z0-9][^\n]{1,100}:?)/gm) || [];
}
