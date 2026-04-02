import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  listings: defineTable({
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
  }).index("by_userId", ["userId"]),
  usages: defineTable({
    userId: v.id("users"),
    type: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
