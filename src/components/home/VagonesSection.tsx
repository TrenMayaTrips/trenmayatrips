import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Play } from "lucide-react";
import vagonXiinbal from "@/assets/vagon-xiinbal.jpg";
import vagonJanal from "@/assets/vagon-janal.jpg";
import vagonPatal from "@/assets/vagon-patal.jpg";
import GrecaDivider from "@/components/maya/GrecaDivider";
import VideoEmbed from "@/components/ui/VideoEmbed";

const vagones = [
  {
    name: "Xiinbal",
    tagline: "Clase económica",
    features: ["Asientos reclinables", "Vista panorámica", "Servicio de snacks", "Amenidades básicas"],
    price: "Desde $800 MXN",
    image: vagonXiinbal,
    alt: "Interior del vagón clase económica Xiinbal con asientos cómodos",
    videoUrl: "https://www.youtube.com/watch?v=xKBSfMCFhiY",
  },
  {
    name: "Janal",
    tagline: "Clase intermedia",
    features: ["Asientos premium", "Comida a bordo", "Wi-Fi incluido", "Amenidades mejoradas", "Bar a bordo"],
    price: "Desde $1,500 MXN",
    featured: true,
    image: vagonJanal,
    alt: "Interior del vagón clase intermedia Janal con bar y sofás",
    videoUrl: "https://www.youtube.com/watch?v=xKBSfMCFhiY",
  },
  {
    name: "P'atal",
    tagline: "Clase premium",
    features: ["Cabina de lujo", "Gastronomía gourmet", "Servicio personalizado", "Amenidades completas", "Acceso VIP"],
    price: "Desde $3,200 MXN",
    image: vagonPatal,
    alt: "Interior del vagón clase premium P'atal con cena gourmet",
    videoUrl: "https://www.youtube.com/watch?v=xKBSfMCFhiY",
  },
];

const VagonesSection = () => {
  return (
    <section id="vagones" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Vagones</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Tres clases, un mismo destino
          </h2>
          <GrecaDivider variant="jade" size="sm" className="mt-6 max-w-xs mx-auto" />
        </div>

        {/* Mobile: swipeable cards */}
        <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
          {vagones.map((v, i) => (
            <VagonCard key={v.name} vagon={v} index={i} isFeatured={v.featured} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {vagones.map((v, i) => (
            <VagonCard key={v.name} vagon={v} index={i} isFeatured={v.featured} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VagonCard = ({ vagon, index, isFeatured }: { vagon: typeof vagones[0]; index: number; isFeatured?: boolean }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`snap-center min-w-[280px] md:min-w-0 flex flex-col rounded-xl border overflow-hidden transition-all ${
        isFeatured
          ? "border-accent shadow-lg ring-1 ring-accent/20"
          : "border-border hover:shadow-md"
      }`}
    >
      <div className="h-44 md:h-52 relative overflow-hidden">
        {showVideo && vagon.videoUrl ? (
          <VideoEmbed
            url={vagon.videoUrl}
            poster={vagon.image}
            className="h-full"
            onClose={() => setShowVideo(false)}
          />
        ) : (
          <>
            <img
              src={vagon.image}
              alt={vagon.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Play overlay */}
            {vagon.videoUrl && (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center group/play"
                aria-label="Ver video del vagón"
              >
                <span className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-colors group-hover/play:bg-accent/80">
                  <Play size={20} className="text-white ml-0.5" fill="white" />
                </span>
              </button>
            )}
          </>
        )}
        {isFeatured && !showVideo && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
            Más elegido
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6 bg-card">
        <p className="text-xs text-accent font-medium uppercase tracking-wider">{vagon.tagline}</p>
        <h3 className="font-heading text-xl font-bold text-foreground mt-1">{vagon.name}</h3>

        <ul className="mt-4 space-y-2 flex-1">
          {vagon.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check size={14} className="text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-border">
          <p className="font-heading text-lg font-bold text-foreground">{vagon.price}</p>
          <a
            href="#reservar"
            className={`mt-3 block text-center py-2.5 rounded-md text-sm font-semibold transition-colors ${
              isFeatured
                ? "bg-accent text-accent-foreground hover:bg-gold-light"
                : "bg-primary text-primary-foreground hover:bg-jade-light"
            }`}
          >
            Seleccionar
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default VagonesSection;
