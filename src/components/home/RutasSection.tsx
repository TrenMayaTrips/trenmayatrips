import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const routes = [
  { name: "El Chepe Express", from: "Los Mochis", to: "Creel", days: 3, stops: 5 },
  { name: "Tequila Express", from: "Guadalajara", to: "Amatitán", days: 1, stops: 3 },
  { name: "Ruta Maya", from: "Mérida", to: "Cancún", days: 4, stops: 7 },
  { name: "Sierra Norte", from: "Oaxaca", to: "Ixtlán", days: 2, stops: 4 },
];

const RutasSection = () => {
  return (
    <section id="rutas" className="py-16 md:py-24 bg-jade-dark text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-gold font-medium tracking-widest uppercase text-xs mb-2">Rutas</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold">
            Nuestros recorridos
          </h2>
        </div>

        <div className="space-y-4">
          {routes.map((route, i) => (
            <motion.div
              key={route.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-xl bg-primary-foreground/5 hover:bg-primary-foreground/10 border border-primary-foreground/10 transition-all cursor-pointer"
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
                <ArrowRight size={20} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RutasSection;
