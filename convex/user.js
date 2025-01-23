import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values"; // Use the correct import for validation

export const CreateUser = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // if no, then insert new user entry
    if (user?.length === 0) {
      await ctx.db.insert("users", {
        email: args.email,
        userName: args.userName,
        imageUrl: args.imageUrl,
        upgrade: false,
      });

      return "Inserted New User....";
    }
    return "User Already Exists.";
  },
});

export const userUpgradePlan = mutation({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.userEmail))
      .collect();

    if (result) {
      await ctx.db.patch(result[0]?._id, { upgrade: true });
      return "success";
    }
    return "error";
  },
});

export const getUserInfo = query({
  args: {
    userEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.userEmail) {
      return null; // Return a clear value when userEmail is not provided
    }
    const result = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.userEmail))
      .collect();

    return result[0]; // Return the result of the query
  },
});
