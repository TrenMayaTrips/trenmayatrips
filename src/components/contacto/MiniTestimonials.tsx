import { Quote } from "lucide-react";

const testimonials = [
  { text: "Respondieron en 2 horas y nos armaron un itinerario perfecto.", author: "María G.", location: "Cancún" },
  { text: "Excelente atención, resolvieron todas mis dudas sobre equipaje y horarios.", author: "Carlos R.", location: "CDMX" },
  { text: "Muy profesionales. El viaje superó nuestras expectativas.", author: "Ana L.", location: "Mérida" },
];

const MiniTestimonials = () => (
  <div className="space-y-3 pt-4">
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lo que dicen nuestros viajeros</p>
    {testimonials.map(({ text, author, location }) => (
      <div key={author} className="relative bg-muted/40 rounded-lg p-3.5 pl-9 border border-border/50">
        <Quote size={14} className="absolute left-3 top-3.5 text-gold opacity-60" />
        <p className="text-[13px] text-foreground/80 leading-relaxed italic">"{text}"</p>
        <p className="text-xs text-muted-foreground mt-1.5 font-medium">
          — {author}, {location}
        </p>
      </div>
    ))}
  </div>
);

export default MiniTestimonials;
