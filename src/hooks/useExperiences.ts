import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const stateEnumToSlug: Record<string, string> = {
  quintana_roo: "quintana-roo",
  yucatan: "yucatan",
  campeche: "campeche",
  tabasco: "tabasco",
  chiapas: "chiapas",
};

const stateSlugToEnum: Record<string, string> = {
  "quintana-roo": "quintana_roo",
  yucatan: "yucatan",
  campeche: "campeche",
  tabasco: "tabasco",
  chiapas: "chiapas",
};

export const categoryLabels: Record<string, string> = {
  aventura: "Aventura y naturaleza",
  cultural: "Cultural y patrimonio",
  gastronomico: "Gastronómico",
  bienestar: "Bienestar y relajación",
};

export const stateLabels: Record<string, string> = {
  "quintana-roo": "Quintana Roo",
  yucatan: "Yucatán",
  campeche: "Campeche",
  tabasco: "Tabasco",
  chiapas: "Chiapas",
};

export interface ExperienceFromDB {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  categoryId: string | null;
  state: string; // legacy slug format
  stateName: string;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  groupSize: string;
  languages: string[];
  includes: string[];
  notIncludes: string[];
  recommendations: string[];
  itinerary: { time: string; activity: string }[];
  related: string[];
  videoUrl?: string;
  featuredImage: string | null;
  gallery: string[];
  isFeatured: boolean;
}

function mapExperience(row: any): ExperienceFromDB {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    longDescription: row.long_description || "",
    category: row.category_key,
    categoryId: row.category_id,
    state: stateEnumToSlug[row.state] || row.state,
    stateName: row.state_label,
    duration: row.duration,
    price: Number(row.price),
    currency: row.currency || "MXN",
    rating: Number(row.rating) || 0,
    reviews: row.reviews_count || 0,
    groupSize: row.group_size || "",
    languages: row.languages || [],
    includes: row.includes || [],
    notIncludes: row.not_includes || [],
    recommendations: row.recommendations || [],
    itinerary: Array.isArray(row.itinerary) ? row.itinerary : [],
    related: row.related_slugs || [],
    videoUrl: row.video_url || undefined,
    featuredImage: row.featured_image || null,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    isFeatured: row.is_featured || false,
  };
}

export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapExperience);
    },
  });
};

export const useExperienceBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["experience", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapExperience(data);
    },
    enabled: !!slug,
  });
};

export const useExperiencesByCategory = (categoryKey: string) => {
  return useQuery({
    queryKey: ["experiences", "category", categoryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("category_key", categoryKey)
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapExperience);
    },
    enabled: !!categoryKey,
  });
};

export const useExperiencesByState = (stateSlug: string) => {
  const stateEnum = stateSlugToEnum[stateSlug] || stateSlug;
  return useQuery({
    queryKey: ["experiences", "state", stateSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("state", stateEnum as any)
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapExperience);
    },
    enabled: !!stateSlug,
  });
};

export const useRelatedExperiences = (slugs: string[]) => {
  return useQuery({
    queryKey: ["experiences", "related", slugs],
    queryFn: async () => {
      if (!slugs.length) return [];
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .in("slug", slugs)
        .eq("status", "published");
      if (error) throw error;
      return (data || []).map(mapExperience);
    },
    enabled: slugs.length > 0,
  });
};
