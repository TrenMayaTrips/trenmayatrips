import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import GrecaDivider from "@/components/maya/GrecaDivider";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Reservas y boletos",
    items: [
      {
        question: "¿Cómo compro mis boletos para el Tren Maya?",
        answer: "Puedes reservar tus boletos directamente desde nuestra página web seleccionando tu ruta, fecha y clase de vagón preferida. También puedes contactarnos por WhatsApp o teléfono para que un asesor te guíe en el proceso de compra."
      },
      {
        question: "¿Puedo cancelar o modificar mi reserva?",
        answer: "Sí, las reservas pueden modificarse o cancelarse hasta 48 horas antes de la fecha de salida. Para cambios de fecha o ruta, contáctanos directamente y nuestro equipo te ayudará sin costo adicional. Las cancelaciones están sujetas a la política de reembolso vigente."
      },
      {
        question: "¿Hay descuentos para niños, adultos mayores o estudiantes?",
        answer: "El Tren Maya ofrece tarifas preferenciales para niños menores de 12 años (50% de descuento), adultos mayores con credencial INAPAM (descuento especial) y estudiantes con credencial vigente. Los menores de 3 años viajan gratis sin asiento asignado."
      }
    ]
  },
  {
    title: "Viaje y equipaje",
    items: [
      {
        question: "¿Qué puedo llevar en el Tren Maya?",
        answer: "Cada pasajero puede llevar hasta 2 maletas de mano y 1 equipaje documentado (máximo 25 kg). Se permiten artículos personales como mochilas, laptops y cámaras. No se permite llevar mascotas (excepto perros guía), armas, sustancias inflamables ni objetos voluminosos."
      },
      {
        question: "¿Cuánto tiempo dura el recorrido entre estaciones?",
        answer: "Los tiempos varían según la ruta. Por ejemplo: Cancún–Mérida toma aproximadamente 4 horas, Mérida–Palenque alrededor de 6 horas, y Cancún–Tulum cerca de 1.5 horas. Consulta nuestra sección de rutas para ver los horarios completos y planificar tu viaje."
      }
    ]
  },
  {
    title: "Paquetes y experiencias",
    items: [
      {
        question: "¿Los paquetes incluyen hospedaje y transporte?",
        answer: "Sí, nuestros paquetes completos incluyen boletos de tren, hospedaje seleccionado, traslados desde la estación al hotel y experiencias guiadas. Los paquetes básicos incluyen solo transporte y experiencias. Puedes ver el detalle de cada paquete en nuestra sección de paquetes."
      },
      {
        question: "¿Puedo personalizar un itinerario?",
        answer: "¡Por supuesto! Ofrecemos itinerarios 100% personalizables. Puedes usar nuestro planificador en línea para armar tu viaje ideal o contactarnos para que un asesor diseñe una experiencia a tu medida, ajustándose a tu presupuesto, intereses y fechas disponibles."
      }
    ]
  }
];

// Flat list for schema
export const faqSchemaData = faqData.flatMap(cat => cat.items);

const ContactFAQ = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-gold font-medium tracking-[0.25em] uppercase text-xs mb-2">Resolvemos tus dudas</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-8">
          {faqData.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3 px-1">
                {category.title}
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {category.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${category.title}-${idx}`}
                    className="bg-card border border-border rounded-lg px-4 data-[state=open]:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-sm md:text-base font-medium hover:no-underline [&>svg]:text-gold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm mb-3">¿No encontraste lo que buscabas?</p>
          <Button variant="outline" onClick={scrollToForm}>
            Contáctanos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
