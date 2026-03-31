import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Local image fallback map (transition period)
import heroTrenMaya from "@/assets/hero-tren-maya.jpg";
import destChichenItza from "@/assets/dest-chichen-itza.jpg";
import destBacalar from "@/assets/dest-bacalar.jpg";
import destMerida from "@/assets/dest-merida.jpg";
import destPalenque from "@/assets/dest-palenque.jpg";
import heroTrenMayaPage from "@/assets/hero-tren-maya-page.jpg";
import destSanCristobal from "@/assets/dest-san-cristobal.jpg";
import destRivieraMaya from "@/assets/dest-riviera-maya.jpg";
import destComalcalco from "@/assets/dest-comalcalco.jpg";

const blogImageMap: Record<string, string> = {
  "guia-completa-tren-maya-2025": heroTrenMaya,
  "chichen-itza-mas-alla-piramide": destChichenItza,
  "cenotes-sagrados-yucatan": destRivieraMaya,
  "gastronomia-yucateca-imperdible": destMerida,
  "palenque-ciudad-perdida-selva": destPalenque,
  "que-empacar-viaje-tren-maya": heroTrenMayaPage,
  "bacalar-laguna-siete-colores": destBacalar,
  "chocolate-cacao-ruta-maya": destComalcalco,
  "pueblos-magicos-ruta-tren-maya": destSanCristobal,
};

export interface BlogCategory {
  id: string;
  slug: string;
  label: string;
  label_en?: string | null;
  emoji?: string | null;
  description?: string | null;
  sort_order: number;
}

export interface BlogContentImage {
  src: string | null;
  alt: string;
  caption?: string | null;
  afterBlock: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category_slug: string | null;
  category_id: string | null;
  author_name: string | null;
  author_role: string | null;
  author_id: string | null;
  published_at: string | null;
  read_time: number | null;
  featured: boolean;
  tags: string[];
  content: string[];
  featured_image: string | null;
  content_images: BlogContentImage[];
  status: string;
  // Computed
  image: string;
  /** Compat aliases */
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: number;
  contentImages?: BlogContentImage[];
}

function mapPost(row: any): BlogPost {
  const slug = row.slug as string;
  const image = row.featured_image || blogImageMap[slug] || "";
  const contentImages = Array.isArray(row.content_images) ? row.content_images : [];
  return {
    ...row,
    image,
    category: row.category_slug || "",
    author: row.author_name || "",
    authorRole: row.author_role || "",
    publishedAt: row.published_at || "",
    readTime: row.read_time || 0,
    tags: row.tags || [],
    content: row.content || [],
    contentImages,
    content_images: contentImages,
  };
}

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(mapPost);
    },
  });
};

export const useBlogPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      return data ? mapPost(data) : null;
    },
    enabled: !!slug,
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data || []) as BlogCategory[];
    },
  });
};

export const useFeaturedPosts = () => {
  return useQuery({
    queryKey: ["blog-posts-featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .eq("featured", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(mapPost);
    },
  });
};
