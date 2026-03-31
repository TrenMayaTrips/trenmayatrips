import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogAuthor {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  initials: string | null;
  photo: string | null;
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
}

export const useAuthorByName = (name: string) => {
  return useQuery({
    queryKey: ["blog-author", name],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_authors")
        .select("*")
        .eq("name", name)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        // Fallback: generate from name
        return {
          id: "",
          name,
          role: "",
          bio: "",
          initials: name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase(),
          photo: null,
          linkedin: null,
          twitter: null,
          website: null,
        } as BlogAuthor;
      }
      return data as BlogAuthor;
    },
    enabled: !!name,
  });
};
