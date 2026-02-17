import { cn } from "@/lib/utils";

interface MayaPatternProps {
  className?: string;
  variant?: "pop" | "greca";
  opacity?: number;
}

/**
 * Subtle background pattern overlay.
 * "pop" = woven mat (estera Pop) cross-hatch pattern.
 * "greca" = stepped fret repeating background.
 */
const MayaPattern = ({ className, variant = "pop", opacity = 0.04 }: MayaPatternProps) => {
  const patternId = `maya-bg-${variant}`;

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)} aria-hidden="true">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          {variant === "pop" ? (
            <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              {/* Woven mat cross-hatch */}
              <line x1="0" y1="0" x2="20" y2="20" stroke="hsl(var(--jade))" strokeWidth="0.5" opacity={opacity} />
              <line x1="20" y1="0" x2="0" y2="20" stroke="hsl(var(--jade))" strokeWidth="0.5" opacity={opacity} />
              <line x1="10" y1="0" x2="10" y2="20" stroke="hsl(var(--gold))" strokeWidth="0.3" opacity={opacity * 0.6} />
              <line x1="0" y1="10" x2="20" y2="10" stroke="hsl(var(--gold))" strokeWidth="0.3" opacity={opacity * 0.6} />
            </pattern>
          ) : (
            <pattern id={patternId} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              {/* Stepped fret micro-pattern */}
              <path
                d="M0 32 L0 24 L8 24 L8 16 L16 16 L16 8 L24 8 L24 0 L32 0 L32 8 L24 8 L24 16 L16 16 L16 24 L8 24 L8 32 Z"
                fill="none"
                stroke="hsl(var(--jade))"
                strokeWidth="0.5"
                opacity={opacity}
              />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

export default MayaPattern;
