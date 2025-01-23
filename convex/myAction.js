"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { v } from "convex/values";
import { TaskType } from "@google/generative-ai";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, { splitText, fileId }) => {
    // Log the full object structure
    // console.log("Type of splitText:", typeof splitText);
    // console.log("splitText object:", splitText);

    // If splitText is an array of objects, inspect each object
    if (Array.isArray(splitText)) {
      // Log each item in the array to check its structure
      splitText.forEach((item, index) => {
        // console.log(`Item ${index}:`, item); // Log the entire object for each index
        if (item.pageContent) {
          // console.log(`Page Content at ${index}:`, item.pageContent); // Log the 'pageContent' if available
        }
      });

      // If each object in the array has a 'pageContent' field, let's extract it into a new array
      const processedText = splitText.map((item) => item.pageContent || item); // Fallback to item itself if no 'pageContent'

      // console.log("Processed Text:", processedText); // Check the processed text

      // Proceed to pass processedText to ConvexVectorStore
      await ConvexVectorStore.fromTexts(
        processedText, // array of strings extracted from pageContent
        fileId, // string
        new GoogleGenerativeAIEmbeddings({
          // apiKey: "AIzaSyBUhXl1VthRcnetWqhYhlJm8MxAUnMXi-c",
          apiKey: "AIzaSyA39SuyOL-3_ESlERm1QMcAu9ApoSk4pk0",
          model: "text-embedding-004",
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        }),
        { ctx }
      );
    }

    return "Completed...";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // console.log("Received query:", args.query);
    // console.log("Received fileId:", args.fileId);

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        // apiKey: "AIzaSyBUhXl1VthRcnetWqhYhlJm8MxAUnMXi-c",
        apiKey: "AIzaSyA39SuyOL-3_ESlERm1QMcAu9ApoSk4pk0",
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Perform search and filter results
    const results = await vectorStore.similaritySearch(args.query, 1);
    // console.log("Raw search results:", results);

    // const resultOne = results.filter((q) => {
    //   // console.log("Checking metadata:", q.metadata);
    //   return q.metadata.fileId == args.fileId;
    // });

    // console.log("Filtered results:", results);
    return JSON.stringify(results);
  },
});
