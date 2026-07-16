import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export default defineTool({
  name: "list_experiences",
  title: "List experiences",
  description: "List tours and experiences available along the Tren Maya route.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(50),
    category_slug: z.string().optional().describe("Optional experience category slug filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, category_slug }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    let q = supabase.from("experiences").select("*").limit(limit);
    if (category_slug) q = q.eq("category_slug", category_slug);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: { experiences: data ?? [] } };
  },
});