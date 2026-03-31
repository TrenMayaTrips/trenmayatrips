import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Local image imports for fallback
import destCancun from "@/assets/dest-cancun.jpg";
import destMerida from "@/assets/dest-merida.jpg";
import destTulum from "@/assets/dest-tulum.jpg";
import destPalenque from "@/assets/dest-palenque.jpg";
import destCampeche from "@/assets/dest-campeche-ciudad.jpg";
import destBacalar from "@/assets/dest-bacalar.jpg";

export interface RouteStop {
  name: string;
  time: string;
  highlights: string[];
  isOrigin?: boolean;
  isDestination?: boolean;
  stationSlug?: string;
}

export interface RouteTip {
  icon: string;
  title: string;
  description: string;
}

export interface Route {
  slug: string;
  origin: string;
  destination: string;
  duration: string;
  durationMinutes: number;
  stops: number;
  dailyDepartures: number;
  badge: string;
  badgeEmoji: string;
  prices: {
    xiinbal: number;
    janal: number;
    patal: number;
  };
  schedules: string[];
  timeline: RouteStop[];
  description: string;
  heroImage: string;
  statesTraversed: string[];
  scenicHighlights: string;
  tips: RouteTip[];
}

const heroImageMap: Record<string, string> = {
  "cancun-merida": destCancun,
  "cancun-tulum": destTulum,
  "merida-palenque": destPalenque,
  "merida-campeche": destCampeche,
  "tulum-bacalar": destBacalar,
};

function mapRoute(row: any): Route {
  const prices = (row.prices as any) || {};
  return {
    slug: row.slug,
    origin: row.origin,
    destination: row.destination,
    duration: row.duration,
    durationMinutes: row.duration_minutes,
    stops: row.stops,
    dailyDepartures: row.daily_departures,
    badge: row.badge || "",
    badgeEmoji: row.badge_emoji || "",
    prices: {
      xiinbal: Number(prices.xiinbal) || 0,
      janal: Number(prices.janal) || 0,
      patal: Number(prices.patal) || 0,
    },
    schedules: row.schedules || [],
    timeline: (row.timeline as RouteStop[]) || [],
    description: row.description || "",
    heroImage: row.hero_image || heroImageMap[row.slug] || "",
    statesTraversed: row.states_traversed || [],
    scenicHighlights: row.scenic_highlights || "",
    tips: (row.tips as RouteTip[]) || [],
  };
}

export const useRoutes = () => {
  return useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapRoute);
    },
  });
};

export const useRouteBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["route", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data ? mapRoute(data) : null;
    },
    enabled: !!slug,
  });
};

export const useFindRoute = (origin: string, destination: string) => {
  const { data: routes = [] } = useRoutes();
  return routes.find(
    (r) =>
      (r.origin === origin && r.destination === destination) ||
      (r.origin === destination && r.destination === origin)
  ) || null;
};
