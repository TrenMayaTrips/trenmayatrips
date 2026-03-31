import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Image fallbacks for stations with detail pages
import destCancun from "@/assets/dest-cancun.jpg";
import destPlayaDelCarmen from "@/assets/dest-playa-del-carmen.jpg";
import destTulum from "@/assets/dest-tulum.jpg";
import destValladolid from "@/assets/dest-valladolid.jpg";
import destChichenItza from "@/assets/dest-chichen-itza.jpg";
import destIzamal from "@/assets/dest-izamal.jpg";
import destMerida from "@/assets/dest-merida.jpg";
import destCampeche from "@/assets/dest-campeche-ciudad.jpg";
import destPalenque from "@/assets/dest-palenque.jpg";
import destBacalar from "@/assets/dest-bacalar.jpg";

const imageFallbacks: Record<string, string> = {
  cancun: destCancun,
  "playa-del-carmen": destPlayaDelCarmen,
  tulum: destTulum,
  valladolid: destValladolid,
  "chichen-itza": destChichenItza,
  izamal: destIzamal,
  merida: destMerida,
  campeche: destCampeche,
  palenque: destPalenque,
  bacalar: destBacalar,
};

// Map tmt_state enum to legacy stateKey format
const stateKeyMap: Record<string, string> = {
  quintana_roo: "quintana-roo",
  yucatan: "yucatan",
  campeche: "campeche",
  tabasco: "tabasco",
  chiapas: "chiapas",
};

export interface StationFromDB {
  id: string;
  slug: string;
  name: string;
  fullName: string | null;
  subtitle: string | null;
  state: string;
  stateKey: string;
  stateLabel: string;
  km: number;
  type: "principal" | "estacion" | "paradero";
  image: string | null;
  schedule: string | null;
  parking: string | null;
  accessibility: string | null;
  highlights: string[];
  services: { icon: string; name: string }[];
  connections: { direction: string; destination: string; time: string; price: string; stationSlug?: string }[];
  nearbyDestinations: { name: string; badge?: string; access: string; type: string }[];
  transport: { icon: string; method: string; detail: string }[];
  tips: string[];
  hasDetailPage: boolean;
  sortOrder: number;
  stateBadge: string;
}

function mapStation(row: any): StationFromDB {
  const stateKey = stateKeyMap[row.state] || row.state;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    fullName: row.full_name,
    subtitle: row.subtitle,
    state: row.state,
    stateKey,
    stateLabel: row.state_label,
    km: Number(row.km),
    type: row.type,
    image: row.image || imageFallbacks[row.slug] || null,
    schedule: row.schedule,
    parking: row.parking,
    accessibility: row.accessibility,
    highlights: row.highlights || [],
    services: (row.services as any[]) || [],
    connections: (row.connections as any[]) || [],
    nearbyDestinations: (row.nearby_destinations as any[]) || [],
    transport: (row.transport as any[]) || [],
    tips: row.tips || [],
    hasDetailPage: row.has_detail_page,
    sortOrder: row.sort_order,
    stateBadge: row.state_label?.toUpperCase() || "",
  };
}

export const useStations = () => {
  return useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stations")
        .select("*")
        .eq("status", "published")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapStation);
    },
  });
};

export const useStationBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["station", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stations")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapStation(data);
    },
    enabled: !!slug,
  });
};

export const useDetailStations = () => {
  return useQuery({
    queryKey: ["stations", "detail"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stations")
        .select("*")
        .eq("status", "published")
        .eq("has_detail_page", true)
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapStation);
    },
  });
};
