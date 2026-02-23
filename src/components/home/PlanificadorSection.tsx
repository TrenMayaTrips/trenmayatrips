import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, CalendarDays, Users, MapPin } from "lucide-react";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import sabachtsche from "@/assets/litografias/sabachtsche.jpg";

const steps = [
  { id: 1, label: "Destino", icon: MapPin },
  { id: 2, label: "Fechas", icon: CalendarDays },
  { id: 3, label: "Viajeros", icon: Users },
];

const PlanificadorSection = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section id="reservar" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      <MayaPattern variant="pop" opacity={0.03} />
      <div
        className="catherwood-lithograph catherwood-lithograph--light"
        style={{ backgroundImage: `url(${sabachtsche})` }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Planificador</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Planifica tu viaje
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            En 3 simples pasos, diseña la experiencia perfecta por la ruta del Tren Maya.
          </p>
          <GrecaDivider variant="jade" size="sm" className="mt-6 max-w-xs mx-auto" />
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.id
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <step.icon size={16} />
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.id}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm"
          >
            {currentStep === 1 && (
              <div>
                <h3 className="font-heading text-xl font-semibold mb-4">¿A dónde quieres ir?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Chichén Itzá y Valladolid", state: "Yucatán" },
                    { name: "Riviera Maya y Tulum", state: "Quintana Roo" },
                    { name: "Palenque y Agua Azul", state: "Chiapas" },
                    { name: "Calakmul y Campeche", state: "Campeche" },
                  ].map((dest) => (
                    <button
                      key={dest.name}
                      className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 text-left transition-all min-h-[48px]"
                    >
                      <p className="font-medium text-foreground">{dest.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{dest.state}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <h3 className="font-heading text-xl font-semibold mb-4">¿Cuándo viajas?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Enero - Marzo", "Abril - Junio", "Julio - Sept", "Oct - Diciembre"].map((period) => (
                    <button
                      key={period}
                      className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 text-center transition-all min-h-[48px]"
                    >
                      <p className="font-medium text-foreground text-sm">{period}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <h3 className="font-heading text-xl font-semibold mb-4">¿Cuántos viajeros?</h3>
                <div className="space-y-4">
                  {[{ label: "Adultos", sub: "13+ años" }, { label: "Niños", sub: "2-12 años" }].map((type) => (
                    <div key={type.label} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{type.label}</p>
                        <p className="text-xs text-muted-foreground">{type.sub}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                          <ChevronDown size={18} />
                        </button>
                        <span className="w-6 text-center font-semibold">2</span>
                        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                          <ChevronUp size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6 pt-4 border-t border-border">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                Atrás
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="px-6 py-2.5 bg-accent text-accent-foreground text-sm font-semibold rounded-md hover:bg-gold-light transition-colors"
              >
                {currentStep === 3 ? "Solicitar cotización" : "Siguiente"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlanificadorSection;
