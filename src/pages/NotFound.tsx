import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Map, Compass, TrainFront } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";

const popularDestinos = [
  { name: "Chichén Itzá", href: "/destinos/chichen-itza", icon: Compass },
  { name: "Tren Maya", href: "/tren-maya", icon: TrainFront },
  { name: "Destinos", href: "/destinos", icon: Map },
];

const NotFound = () => {
  return (
    <PageLayout >
      <section className="py-20 md:py-32 relative min-h-[60vh] flex items-center">
        <MayaPattern variant="greca" opacity={0.04} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            {/* Maya-styled 404 number */}
            <div className="mb-6">
              <span className="text-8xl md:text-9xl font-heading font-bold text-primary/20">
                404
              </span>
            </div>

            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ruta no encontrada
            </h1>
            <GrecaDivider variant="jade" size="sm" className="max-w-[120px] mx-auto mb-4" />
            <p className="text-muted-foreground mb-10">
              Parece que esta ruta se perdió entre las selvas del Mundo Maya. Te ayudamos a encontrar tu camino.
            </p>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {popularDestinos.map((dest) => (
                <Link
                  key={dest.name}
                  to={dest.href}
                  className="flex items-center justify-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-foreground"
                >
                  <dest.icon size={16} className="text-primary" />
                  {dest.name}
                </Link>
              ))}
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-jade-light transition-colors"
            >
              <Home size={16} />
              Volver al inicio
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
