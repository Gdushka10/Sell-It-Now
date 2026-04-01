"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";

export const analyzeImage = action({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Please sign in to analyze items");

    const imageUrl = await ctx.storage.getUrl(args.storageId);

    if (!imageUrl) {
      throw new Error("Could not retrieve image. Please try uploading again.");
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a marketplace expert. Analyze this item and provide a JSON response with: 'title' (catchy title), 'priceRange' (object with 'low', 'high', and 'suggested' numbers), 'description' (compelling sales description), 'condition' (one of: Like New, Good, Fair, For Parts), 'category' (best fitting category). Return ONLY valid JSON.`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Failed to analyze image. Please try again.");
    }

    try {
      // Remove markdown code blocks if present
      const jsonString = content.replace(/```json\n?|\n?```/g, "").trim();
      const parsed = JSON.parse(jsonString);
      return parsed;
    } catch {
      throw new Error(
        "Failed to parse analysis results. Please try again with a clearer image."
      );
    }
  },
});
