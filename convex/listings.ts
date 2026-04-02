import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Please sign in to upload images");
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveListing = mutation({
  args: {
    storageId: v.id("_storage"),
    title: v.string(),
    description: v.string(),
    priceLow: v.number(),
    priceHigh: v.number(),
    priceSuggested: v.number(),
    condition: v.string(),
    category: v.string(),
    postedTo: v.optional(v.array(v.string())),
  },
  returns: v.id("listings"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Hard limit to prevent abuse (Pro users checked client-side, this is a safety net)
    const MAX_LISTINGS = 100;
    const existingListings = await ctx.db
      .query("listings")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    if (existingListings.length >= MAX_LISTINGS) {
      throw new Error(
        "You've reached the maximum number of listings. Please contact support."
      );
    }

    return await ctx.db.insert("listings", {
      ...args,
      userId,
      createdAt: Date.now(),
    });
  },
});

export const getUsageCount = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return 0;
    const usages = await ctx.db
      .query("usages")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    return usages.length;
  },
});

export const recordUsage = mutation({
  args: { type: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.insert("usages", {
      userId,
      type: args.type,
      createdAt: Date.now(),
    });
    return null;
  },
});

export const getMyListings = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("listings"),
      _creationTime: v.number(),
      userId: v.id("users"),
      storageId: v.id("_storage"),
      title: v.string(),
      description: v.string(),
      priceLow: v.number(),
      priceHigh: v.number(),
      priceSuggested: v.number(),
      condition: v.string(),
      category: v.string(),
      postedTo: v.optional(v.array(v.string())),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const listings = await ctx.db
      .query("listings")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    return listings;
  },
});
