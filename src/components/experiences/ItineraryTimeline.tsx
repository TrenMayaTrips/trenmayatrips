import { motion } from "framer-motion";
import {
  Bus, Footprints, Landmark, UtensilsCrossed, Hotel, Sunrise, Waves,
  Music, Anchor, Leaf, Sparkles, Coffee, ShoppingBag, Flag, Compass,
  Fish, Palette, Heart, Camera, Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { enrichedItineraries, detectIcon, detectDay, cleanTime, type ItineraryIcon } from "@/data/experience-itinerary";

const iconMap: Record<ItineraryIcon, React.ElementType> = {
  bus: Bus, hiking: Footprints, landmark: Landmark, utensils: UtensilsCrossed,
  hotel: Hotel, sunrise: Sunrise, waves: Waves, music: Music, anchor: Anchor,
  leaf: Leaf, sparkles: Sparkles, coffee: Coffee, shopping: ShoppingBag,
  flag: Flag, compass: Compass, fish: Fish, palette: Palette, heart: Heart,
  camera: Camera,
};

interface Props {
  itinerary: { time: string; activity: string }[];
  slug: string;
}

const ItineraryTimeline = ({ itinerary, slug }: Props) => {
  const enriched = enrichedItineraries[slug] || {};
  let lastDay: number | undefined;

  return (
    <div className="space-y-0">
      {itinerary.map((item, i) => {
        const extra = enriched[i];
        const icon = detectIcon(item.activity);
        const IconComp = iconMap[icon];
        const day = detectDay(item.time);
        const time = cleanTime(item.time);
        const showDayBadge = day !== undefined && day !== lastDay;
        if (day !== undefined) lastDay = day;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {/* Day separator */}
            {showDayBadge && (
              <div className="flex items-center gap-3 mb-4 mt-2">
                <Badge className="bg-gold/15 text-gold-dark border-gold/30 font-heading text-xs px-3 py-1">
                  Día {day}
                </Badge>
                <div className="flex-1 h-px bg-gold/20" />
              </div>
            )}

            <div className="flex gap-4 relative">
              {/* Timeline line & node */}
              <div className="flex flex-col items-center">
                <div className="w-[10px] h-[10px] rounded-full bg-gold border-2 border-gold-dark/30 shrink-0 mt-2 z-10" />
                {i < itinerary.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-gold/60 to-gold/20" />
                )}
              </div>

              {/* Content */}
              <div className="pb-6 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-gold-dark font-heading tracking-wide">{time}</span>
                  {extra?.duration && (
                    <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {extra.duration}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-2.5 mt-1.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComp size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">{item.activity}</p>
                    {extra?.description && (
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {extra.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Flexibility note */}
      <div className="flex items-start gap-3 mt-4 p-4 bg-gold/5 border border-gold/15 rounded-xl">
        <Info size={16} className="text-gold-dark shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Este itinerario es orientativo. Los horarios y actividades pueden variar según condiciones climáticas y del grupo.
        </p>
      </div>
    </div>
  );
};

export default ItineraryTimeline;
