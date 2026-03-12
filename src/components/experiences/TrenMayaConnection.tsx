import { Link } from "react-router-dom";
import { Train, Clock, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrainConnection } from "@/data/experience-train-connections";

interface TrenMayaConnectionProps {
  connection: TrainConnection;
  experienceTitle: string;
}

const TrenMayaConnection = ({ connection, experienceTitle }: TrenMayaConnectionProps) => {
  const primaryRoute = connection.travelTimes[0];

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-5">
          🚆 Cómo llegar en Tren Maya
        </h2>

        <div className="bg-secondary/60 border-l-4 border-accent rounded-lg md:rounded-xl overflow-hidden">
          <div className="p-5 md:p-7">
            {/* Station info */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                <Train className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Estación de llegada recomendada</p>
                <p className="font-heading text-lg font-semibold text-foreground mt-0.5">
                  Estación {connection.stationName}
                </p>
              </div>
            </div>

            {/* Travel times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {connection.travelTimes.map((tt) => (
                <Link
                  key={tt.from}
                  to={`/tren-maya/rutas/${tt.routeSlug}`}
                  className="flex items-center gap-3 p-3 bg-background/70 rounded-lg border border-border/50 hover:border-accent/40 hover:shadow-sm transition-all group"
                >
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      Desde {tt.from}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {tt.duration}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-accent transition-colors shrink-0" />
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/tren-maya/rutas/${primaryRoute.routeSlug}`} className="flex-1">
                <Button variant="outline" className="w-full gap-2 border-accent/30 hover:bg-accent/10 hover:text-accent">
                  <Train className="w-4 h-4" />
                  Ver rutas y horarios
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/itinerarios" className="flex-1">
                <Button className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Armar paquete completo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Combina tu boleto de Tren Maya con esta experiencia. Desde la estación {connection.stationName} hay transporte disponible al punto de encuentro de <span className="font-medium">"{experienceTitle}"</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrenMayaConnection;
