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

    // Check if user is admin - admins get unlimited free analyses
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const authAccounts = await ctx.db
        .query("authAccounts")
        .filter((q: any) => q.eq(q.field("userId"), userId))
        .collect();
      const userEmail = authAccounts[0]?.providerAccountId;
      if (userEmail === adminEmail) return 0;
    } else {
      // Fallback: first user created is admin
      const allUsers = await ctx.db.query("users").order("asc").take(1);
      if (allUsers[0] && allUsers[0]._id === userId) return 0;
    }

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

export const saveAnalysis = mutation({
  args: {
    storageId: v.id("_storage"),
    title: v.string(),
    description: v.string(),
    priceLow: v.number(),
    priceHigh: v.number(),
    priceSuggested: v.number(),
    condition: v.string(),
    category: v.string(),
  },
  returns: v.id("listings"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("listings", {
      ...args,
      userId,
      postedTo: undefined,
      createdAt: Date.now(),
    });
  },
});

export const updateListingPosted = mutation({
  args: {
    listingId: v.id("listings"),
    title: v.string(),
    description: v.string(),
    priceLow: v.number(),
    priceHigh: v.number(),
    priceSuggested: v.number(),
    condition: v.string(),
    category: v.string(),
    postedTo: v.array(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const listing = await ctx.db.get(args.listingId);
    if (!listing || listing.userId !== userId)
      throw new Error("Listing not found");

    await ctx.db.patch(args.listingId, {
      title: args.title,
      description: args.description,
      priceLow: args.priceLow,
      priceHigh: args.priceHigh,
      priceSuggested: args.priceSuggested,
      condition: args.condition,
      category: args.category,
      postedTo: args.postedTo,
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
