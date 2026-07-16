import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export default defineTool({
  name: "list_routes",
  title: "List Tren Maya routes",
  description: "List the Tren Maya train routes (origin, destination, duration, highlights).",
  inputSchema: { limit: z.number().int().min(1).max(100).default(50) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    const { data, error } = await supabase.from("routes").select("*").limit(limit);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: { routes: data ?? [] } };
  },
});