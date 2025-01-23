import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddDileEntryToDb = mutation({
  args: v.object({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
    fileUrl: v.string(),
  }),
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      fileName: args.fileName,
      storageId: args.storageId,
      createdBy: args.createdBy,
      fileUrl: args.fileUrl,
    });
    return "inserted";
  },
});

export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const getFileRecord = query(async ({ db }, { fileId }) => {
  const result = await db
    .query("pdfFiles")
    .filter((q) => q.eq(q.field("fileId"), fileId))
    .collect();
  // console.log("Query result:", result);
  return result[0];
});

export const GetUserFiles = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args?.userEmail) {
      return;
    }

    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args?.userEmail))
      .collect();

    return result;
  },
});
