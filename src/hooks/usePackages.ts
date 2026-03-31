import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Package {
  slug: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  type: "cultural" | "aventura" | "gastronomico" | "mixto";
  states: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: { day: number; title: string; description: string }[];
  groupSize: string;
  bestFor: string;
  maxAltitude?: number;
  difficulty: "fácil" | "moderado" | "desafiante";
  seasonalRating?: Record<string, number>;
}

export const packageTypes: Record<string, string> = {
  cultural: "Cultural y patrimonio",
  aventura: "Aventura y naturaleza",
  gastronomico: "Gastronómico",
  mixto: "Circuito completo",
};

function mapPackage(row: any): Package {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    duration: row.duration_days,
    price: Number(row.price),
    currency: row.currency,
    rating: Number(row.rating) || 0,
    reviews: row.reviews_count || 0,
    type: row.type,
    states: row.states || [],
    highlights: row.highlights || [],
    includes: row.includes || [],
    excludes: row.excludes || [],
    itinerary: (row.itinerary as any[]) || [],
    groupSize: row.group_size || "",
    bestFor: row.best_for || "",
    maxAltitude: row.max_altitude ?? undefined,
    difficulty: row.difficulty,
    seasonalRating: row.seasonal_rating as Record<string, number> | undefined,
  };
}

export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapPackage);
    },
  });
};

export const usePackageBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["package", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data ? mapPackage(data) : null;
    },
    enabled: !!slug,
  });
};
