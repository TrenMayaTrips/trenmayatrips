import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description: "List published Tren Maya Trips blog posts (title, slug, excerpt, category, published date).",
  inputSchema: {
    limit: z.number().int().min(1).max(50).default(10).describe("Max posts to return (default 10)."),
    category_slug: z.string().optional().describe("Optional blog category slug to filter by."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, category_slug }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    let q = supabase
      .from("blog_posts")
      .select("slug,title,excerpt,category_slug,published_at,featured")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (category_slug) q = q.eq("category_slug", category_slug);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});