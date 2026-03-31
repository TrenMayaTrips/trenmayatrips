import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { destinationImageMap } from "@/data/destination-images";

// Map tmt_state enum to legacy slug format used in the UI
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

export const destinationTypes: Record<string, string> = {
  ciudad: "🏙️ Ciudad",
  arqueologia: "🏛️ Arqueología",
  naturaleza: "🌿 Naturaleza",
  playa: "🏖️ Playa",
  pueblo: "🎨 Pueblo Mágico",
};

export interface DestinationFromDB {
  slug: string;
  name: string;
  state: string; // legacy slug format: "quintana-roo"
  stateLabel: string;
  type: "ciudad" | "arqueologia" | "naturaleza" | "playa" | "pueblo";
  tagline: string;
  description: string;
  highlights: string[];
  nearestStation: string;
  travelTime: string;
  bestMonths: string;
  emoji: string;
  videoUrl?: string;
  featuredImage: string | null;
}

export interface StateInfoFromDB {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  capital: string;
  tagline: string;
  destinationCount?: number;
}

function mapDestination(row: any): DestinationFromDB {
  return {
    slug: row.slug,
    name: row.name,
    state: stateEnumToSlug[row.state] || row.state,
    stateLabel: row.state_label,
    type: row.type,
    tagline: row.tagline || "",
    description: row.description || "",
    highlights: row.highlights || [],
    nearestStation: row.nearest_station_name || "",
    travelTime: row.travel_time || "",
    bestMonths: row.best_months || "",
    emoji: row.emoji || "",
    videoUrl: row.video_url || undefined,
    featuredImage: row.featured_image || destinationImageMap[row.slug] || null,
  };
}

function mapState(row: any): StateInfoFromDB {
  return {
    slug: row.slug,
    name: row.name,
    emoji: row.emoji || "",
    color: row.color || "hsl(0, 0%, 50%)",
    capital: row.capital || "",
    tagline: row.tagline || "",
  };
}

export const useDestinations = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapDestination);
    },
  });
};

export const useDestinationBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["destination", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapDestination(data);
    },
    enabled: !!slug,
  });
};

export const useDestinationsByState = (stateSlug: string) => {
  const stateEnum = stateSlugToEnum[stateSlug] || stateSlug;
  return useQuery({
    queryKey: ["destinations", "state", stateSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("state", stateEnum)
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapDestination);
    },
    enabled: !!stateSlug,
  });
};

export const useStatesInfo = () => {
  return useQuery({
    queryKey: ["states_info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("states_info")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapState);
    },
  });
};
