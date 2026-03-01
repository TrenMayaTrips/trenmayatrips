import { cn } from "@/lib/utils";

interface GrecaDividerProps {
  className?: string;
  /** @deprecated Variant is ignored — B2 greca is always gold */
  variant?: "jade" | "gold" | "terracotta";
  /** @deprecated Size is ignored — B2 greca is fixed 150×16 */
  size?: "sm" | "md" | "lg";
}

/**
 * Greca Maya B2 — Espiral escalonada con pirámide central.
 * Dos espirales tipo Uxmal conectadas por escalones piramidales
 * con opacidad gradual al centro. Color dorado de marca.
 */
const GrecaDivider = ({ className }: GrecaDividerProps) => {
  return (
    <div className={cn("w-full flex justify-center my-4", className)} aria-hidden="true">
      <svg
        width="150"
        height="16"
        viewBox="0 0 150 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Espiral izquierda */}
        <rect x="0" y="12" width="14" height="3" fill="hsl(var(--gold))" />
        <rect x="11" y="6" width="3" height="9" fill="hsl(var(--gold))" />
        <rect x="5" y="6" width="9" height="3" fill="hsl(var(--gold))" />
        <rect x="5" y="0" width="3" height="9" fill="hsl(var(--gold))" />
        <rect x="5" y="0" width="14" height="3" fill="hsl(var(--gold))" />

        {/* Escalones piramidales centrales */}
        <rect x="32" y="12" width="8" height="3" fill="hsl(var(--gold))" opacity="0.4" />
        <rect x="42" y="9" width="8" height="3" fill="hsl(var(--gold))" opacity="0.5" />
        <rect x="52" y="6" width="8" height="3" fill="hsl(var(--gold))" opacity="0.6" />
        <rect x="62" y="3" width="10" height="3" fill="hsl(var(--gold))" opacity="0.8" />
        <rect x="68" y="0" width="14" height="3" fill="hsl(var(--gold))" />
        <rect x="78" y="3" width="10" height="3" fill="hsl(var(--gold))" opacity="0.8" />
        <rect x="90" y="6" width="8" height="3" fill="hsl(var(--gold))" opacity="0.6" />
        <rect x="100" y="9" width="8" height="3" fill="hsl(var(--gold))" opacity="0.5" />
        <rect x="110" y="12" width="8" height="3" fill="hsl(var(--gold))" opacity="0.4" />

        {/* Espiral derecha (espejo) */}
        <rect x="136" y="12" width="14" height="3" fill="hsl(var(--gold))" />
        <rect x="136" y="6" width="3" height="9" fill="hsl(var(--gold))" />
        <rect x="136" y="6" width="9" height="3" fill="hsl(var(--gold))" />
        <rect x="142" y="0" width="3" height="9" fill="hsl(var(--gold))" />
        <rect x="131" y="0" width="14" height="3" fill="hsl(var(--gold))" />
      </svg>
    </div>
  );
};

export default GrecaDivider;
