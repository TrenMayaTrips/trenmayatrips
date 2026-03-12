import { Star, MessageSquareQuote, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ExperienceReviewData } from "@/data/experience-reviews";

interface ReviewsSectionProps {
  data: ExperienceReviewData;
  overallRating: number;
  totalReviews: number;
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? "text-gold fill-gold" : "text-muted-foreground/30"}
        />
      ))}
    </span>
  );
}

const categoryLabels: Record<string, string> = {
  guide: "Guía",
  transport: "Transporte",
  accommodation: "Alojamiento",
  value: "Calidad-precio",
};

const ReviewsSection = ({ data, overallRating, totalReviews }: ReviewsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? data.reviews : data.reviews.slice(0, 3);
  const starLabels = ["5", "4", "3", "2", "1"];

  return (
    <section id="resenas" className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-2 mb-8">
            <MessageSquareQuote size={22} className="text-primary" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Reseñas de viajeros
            </h2>
          </div>

          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 p-6 rounded-xl border border-border bg-card">
            {/* Overall */}
            <div className="flex flex-col items-center justify-center text-center md:border-r md:border-border">
              <span className="font-heading text-5xl font-bold text-foreground">{overallRating}</span>
              <Stars rating={Math.round(overallRating)} size={18} />
              <span className="text-sm text-muted-foreground mt-1">{totalReviews} reseñas</span>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2">
              {data.distribution.map((pct, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-4 text-right text-muted-foreground">{starLabels[i]}</span>
                  <Star size={12} className="text-gold fill-gold shrink-0" />
                  <Progress value={pct} className="h-2 flex-1" />
                  <span className="w-8 text-right text-muted-foreground text-xs">{pct}%</span>
                </div>
              ))}
            </div>

            {/* Category scores */}
            <div className="space-y-2.5">
              {Object.entries(data.breakdown).map(([key, val]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{categoryLabels[key]}</span>
                  <span className="font-medium text-foreground flex items-center gap-1">
                    <Star size={11} className="text-gold fill-gold" /> {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {visibleReviews.map((review, i) => (
                <motion.div
                  key={review.name + i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-sm text-foreground">{review.name}</span>
                        <Stars rating={review.rating} size={12} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Viajó en {review.date}
                      </p>
                      <p className="text-sm text-foreground/80 mt-2 leading-relaxed line-clamp-3">
                        {review.text}
                      </p>
                      <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {review.highlight}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show all */}
          {data.reviews.length > 3 && !showAll && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setShowAll(true)} className="gap-1">
                Ver todas las reseñas <ChevronDown size={14} />
              </Button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
            <p className="font-heading text-lg md:text-xl font-semibold text-foreground">
              Estos viajeros ya vivieron esta experiencia. ¿Tú eres el siguiente?
            </p>
            <Button variant="cta" className="mt-4" asChild>
              <a href="#reservar">Reservar ahora</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
