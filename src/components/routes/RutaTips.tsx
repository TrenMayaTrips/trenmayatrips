import { motion } from "framer-motion";
import { Armchair, Backpack, Bus, Clock } from "lucide-react";
import EstelaCard from "@/components/maya/EstelaCard";
import MayaPattern from "@/components/maya/MayaPattern";
import type { RouteTip } from "@/hooks/useRoutes";

const iconMap: Record<string, React.ElementType> = {
  seat: Armchair,
  pack: Backpack,
  transport: Bus,
  schedule: Clock,
};

interface RutaTipsProps {
  tips: RouteTip[];
}

const RutaTips = ({ tips }: RutaTipsProps) => {
  if (tips.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-secondary/30 border-y border-border relative">
      <MayaPattern variant="pop" opacity={0.03} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <p className="section-label">
            Viaja preparado
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Consejos prácticos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {tips.map((tip, i) => {
            const Icon = iconMap[tip.icon] || Clock;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <EstelaCard className="p-4 h-full">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground text-sm">
                        {tip.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </EstelaCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RutaTips;
