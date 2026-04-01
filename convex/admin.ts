import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx } from "./_generated/server";

// Helper to check if current user is admin
async function requireAdmin(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");

  const user = await ctx.db.get(userId);
  if (!user) throw new Error("User not found");

  // Check admin email from env var, fallback to checking the first user created
  const adminEmail = process.env.ADMIN_EMAIL;

  // Get the user's auth account to find their email
  const authAccounts = await ctx.db
    .query("authAccounts")
    .filter((q) => q.eq(q.field("userId"), userId))
    .collect();

  const userEmail = authAccounts[0]?.providerAccountId;

  if (adminEmail && userEmail !== adminEmail) {
    throw new Error("Not authorized");
  }

  // If no ADMIN_EMAIL is set, allow the first user created (the app owner)
  // This is a development convenience - the app owner will always be the first to sign up
  if (!adminEmail) {
    const allUsers = await ctx.db.query("users").order("asc").take(1);
    if (allUsers[0]?._id !== userId) {
      throw new Error("Not authorized");
    }
  }

  return userId;
}

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    try {
      await requireAdmin(ctx);
      return true;
    } catch {
      return false;
    }
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const allUsers = await ctx.db.query("users").collect();
    const allListings = await ctx.db.query("listings").collect();

    const totalValue = allListings.reduce((sum, l) => sum + l.priceSuggested, 0);

    // Users signed up in last 7 days
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentSignups = allUsers.filter((u) => u._creationTime > weekAgo).length;

    return {
      totalUsers: allUsers.length,
      totalListings: allListings.length,
      totalValue,
      recentSignups,
    };
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const allUsers = await ctx.db.query("users").order("desc").collect();
    const allListings = await ctx.db.query("listings").collect();

    // Get emails from authAccounts
    const authAccounts = await ctx.db.query("authAccounts").collect();
    const userEmailMap = new Map<string, string>();
    for (const account of authAccounts) {
      if (account.userId) {
        userEmailMap.set(account.userId.toString(), account.providerAccountId ?? "");
      }
    }

    return allUsers.map((user) => {
      const userListings = allListings.filter(
        (l) => l.userId.toString() === user._id.toString()
      );
      const totalValue = userListings.reduce((sum, l) => sum + l.priceSuggested, 0);

      return {
        _id: user._id,
        _creationTime: user._creationTime,
        name: user.name,
        email: userEmailMap.get(user._id.toString()),
        listingCount: userListings.length,
        totalValue,
      };
    });
  },
});

export const getUserListings = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const listings = await ctx.db
      .query("listings")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return listings.map((l) => ({
      _id: l._id,
      _creationTime: l._creationTime,
      title: l.title,
      description: l.description,
      priceSuggested: l.priceSuggested,
      priceLow: l.priceLow,
      priceHigh: l.priceHigh,
      condition: l.condition,
      category: l.category,
      postedTo: l.postedTo,
      createdAt: l.createdAt,
    }));
  },
});
