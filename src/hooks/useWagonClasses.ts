import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Local image imports for fallback
import trenXiinbalInterior from "@/assets/tren-xiinbal-interior.jpg";
import trenJanalInterior from "@/assets/tren-janal-interior.jpg";
import trenPatalInterior from "@/assets/tren-patal-interior.jpg";
import vagonXiinbal from "@/assets/vagon-xiinbal.jpg";
import vagonJanal from "@/assets/vagon-janal.jpg";
import vagonPatal from "@/assets/vagon-patal.jpg";

export interface WagonAmenity {
  icon: string;
  name: string;
  detail: string;
}

export interface WagonFAQ {
  q: string;
  a: string;
}

export interface WagonClass {
  slug: string;
  name: string;
  meaning: string;
  meaningFull: string;
  type: string;
  typeShort: string;
  priceBase: number;
  seats: number;
  config: string;
  seatWidth: string;
  colorToken: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  videoUrl?: string;
  isFeatured: boolean;
  badge?: string;
  amenities: WagonAmenity[];
  comparison: {
    comida: string;
    pantalla: string;
    espacio: string;
    lounge: string;
    atencionVIP: string;
  };
  faqs: WagonFAQ[];
}

const heroImageMap: Record<string, string> = {
  xiinbal: trenXiinbalInterior,
  janal: trenJanalInterior,
  patal: trenPatalInterior,
};

const galleryImageMap: Record<string, string[]> = {
  xiinbal: [trenXiinbalInterior, vagonXiinbal],
  janal: [trenJanalInterior, vagonJanal],
  patal: [trenPatalInterior, vagonPatal],
};

function mapWagon(row: any): WagonClass {
  return {
    slug: row.slug,
    name: row.name,
    meaning: row.meaning || "",
    meaningFull: row.meaning_full || "",
    type: row.type,
    typeShort: row.type_short || "",
    priceBase: Number(row.price_base),
    seats: row.seats || 0,
    config: row.config || "",
    seatWidth: row.seat_width || "",
    colorToken: row.color_token || "primary",
    description: row.description || "",
    heroImage: row.hero_image || heroImageMap[row.slug] || "",
    galleryImages: (row.gallery_images as string[] | null)?.length
      ? (row.gallery_images as string[])
      : galleryImageMap[row.slug] || [],
    videoUrl: row.video_url || undefined,
    isFeatured: row.is_featured || false,
    badge: row.badge || undefined,
    amenities: (row.amenities as WagonAmenity[]) || [],
    comparison: (row.comparison as WagonClass["comparison"]) || {
      comida: "❌",
      pantalla: "❌",
      espacio: "",
      lounge: "❌",
      atencionVIP: "❌",
    },
    faqs: (row.faqs as WagonFAQ[]) || [],
  };
}

export const useWagonClasses = () => {
  return useQuery({
    queryKey: ["wagon-classes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wagon_classes")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data || []).map(mapWagon);
    },
  });
};

export const useWagonBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["wagon-class", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("wagon_classes")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data ? mapWagon(data) : null;
    },
    enabled: !!slug,
  });
};
