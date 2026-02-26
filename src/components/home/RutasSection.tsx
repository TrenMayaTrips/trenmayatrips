import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MayaPattern from "@/components/maya/MayaPattern";
import GrecaDivider from "@/components/maya/GrecaDivider";

const routes = [
  { name: "Ruta de la grandeza maya", slug: "merida-palenque", from: "Palenque", to: "Tulum", days: 7, stops: 8 },
  { name: "Caribe y Cenotes", slug: "cancun-tulum", from: "Cancún", to: "Bacalar", days: 4, stops: 5 },
  { name: "Ruta Puuc", slug: "cancun-merida", from: "Mérida", to: "Uxmal", days: 2, stops: 4 },
  { name: "Selva y Cacao", slug: "merida-campeche", from: "Villahermosa", to: "Palenque", days: 3, stops: 4 },
];

const RutasSection = () => {
  return (
    <section id="rutas" className="py-16 md:py-24 bg-jade-dark text-primary-foreground relative">
      <MayaPattern variant="greca" opacity={0.05} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-gold font-medium tracking-widest uppercase text-xs mb-2">Rutas</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold">
            Circuitos por el sureste
          </h2>
          <GrecaDivider variant="gold" size="sm" className="mt-6 max-w-xs mx-auto" />
        </div>

        <div className="space-y-4">
          {routes.map((route, i) => (
            <motion.div
              key={route.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/tren-maya/rutas/${route.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-xl bg-primary-foreground/5 hover:bg-primary-foreground/10 border border-primary-foreground/10 transition-all block"
              >
                <div className="flex-1">
                  <h3 className="font-heading text-lg md:text-xl font-semibold">{route.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-primary-foreground/60">
                    <span>{route.from}</span>
                    <ArrowRight size={14} />
                    <span>{route.to}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-3 md:mt-0">
                  <div className="text-center">
                    <p className="text-xs text-primary-foreground/50 uppercase">Duración</p>
                    <p className="font-semibold text-gold">{route.days} {route.days > 1 ? "días" : "día"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-primary-foreground/50 uppercase">Paradas</p>
                    <p className="font-semibold">{route.stops}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-gold opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
                    Ver ruta <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/paquetes" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors underline underline-offset-4">
            Ver todos los paquetes <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RutasSection;
